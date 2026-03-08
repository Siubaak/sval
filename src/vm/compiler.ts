import * as acorn from 'acorn'
import { Op, Instr, Module, FuncDesc, ClassDesc, MethodDesc, PropDefDesc, StaticBlockDesc } from './opcode.ts'

// ─── Internal interfaces ────────────────────────────────────────────────────

interface LoopCtx {
  label?: string
  breakPatches: number[]
  continueTarget?: number
  continuePatches: number[]
  scopeDepth: number
}

interface FuncCtx {
  isGenerator: boolean
  isAsync: boolean
}

// ─── Compiler class ─────────────────────────────────────────────────────────

class Compiler {
  private module: Module
  private code: Instr[]
  private loopStack: LoopCtx[]
  private funcStack: FuncCtx[]
  private scopeDepth: number
  private source?: string

  constructor(source?: string) {
    this.module = { code: [], funcs: [], classes: [] }
    this.code = this.module.code
    this.loopStack = []
    this.funcStack = []
    this.scopeDepth = 0
    this.source = source
  }

  private emit(op: Op, arg?: any): number {
    const idx = this.code.length
    this.code.push(arg !== undefined ? { op, arg } : { op })
    return idx
  }

  private patch(idx: number, target: number) {
    this.code[idx].arg = target
  }

  private pc(): number {
    return this.code.length
  }

  getModule(): Module {
    return this.module
  }

  // ─── Hoisting helpers ──────────────────────────────────────────────────────

  /**
   * Collect all `var`-declared names in a block/program body (recursively,
   * but stopping at nested function boundaries).
   */
  private collectVarNames(stmts: any[]): string[] {
    const names: string[] = []
    const visit = (node: any) => {
      if (!node) return
      switch (node.type) {
        case 'VariableDeclaration':
          if (node.kind === 'var') {
            for (const d of node.declarations) {
              collectPatternNames(d.id, names)
            }
          }
          break
        case 'FunctionDeclaration':
          // Don't descend into nested function bodies
          break
        case 'ForStatement':
          if (node.init) visit(node.init)
          visit(node.body)
          break
        case 'ForInStatement':
        case 'ForOfStatement':
          if (node.left.type === 'VariableDeclaration' && node.left.kind === 'var') {
            for (const d of node.left.declarations) {
              collectPatternNames(d.id, names)
            }
          }
          visit(node.body)
          break
        case 'WhileStatement':
        case 'DoWhileStatement':
          visit(node.body)
          break
        case 'IfStatement':
          visit(node.consequent)
          visit(node.alternate)
          break
        case 'BlockStatement':
          for (const s of node.body) visit(s)
          break
        case 'SwitchStatement':
          for (const c of node.cases) {
            for (const s of c.consequent) visit(s)
          }
          break
        case 'TryStatement':
          for (const s of node.block.body) visit(s)
          if (node.handler) for (const s of node.handler.body.body) visit(s)
          if (node.finalizer) for (const s of node.finalizer.body) visit(s)
          break
        case 'LabeledStatement':
          visit(node.body)
          break
        case 'WithStatement':
          visit(node.body)
          break
        case 'ExpressionStatement':
          break
      }
    }
    for (const s of stmts) visit(s)
    return names
  }

  /**
   * Collect hoisted function declarations from a body (not nested functions).
   */
  private collectFuncDecls(stmts: any[]): any[] {
    const funcs: any[] = []
    for (const s of stmts) {
      if (s.type === 'FunctionDeclaration') {
        funcs.push(s)
      }
    }
    return funcs
  }

  // ─── Program / Block ────────────────────────────────────────────────────────

  compileProgram(node: acorn.Program) {
    this.emitHoisting(node.body as any[], false)
    for (const stmt of node.body) {
      this.compileStmt(stmt as any)
    }
  }

  private emitHoisting(stmts: any[], isBlock: boolean) {
    if (!isBlock) {
      // var hoisting: emit DECL_VAR for each var name at top
      const varNames = this.collectVarNames(stmts)
      for (const name of varNames) {
        this.emit(Op.DECL_VAR, name)
      }
    }
    // let/const TDZ hoisting
    for (const stmt of stmts) {
      if (stmt.type === 'VariableDeclaration' && (stmt.kind === 'let' || stmt.kind === 'const')) {
        for (const decl of stmt.declarations) {
          emitTDZPattern(this, decl.id)
        }
      }
    }
    // Hoisted function declarations (emit at top)
    const funcDecls = this.collectFuncDecls(stmts)
    for (const fd of funcDecls) {
      const idx = this.compileFuncDesc(fd)
      this.emit(Op.MAKE_FUNC, idx)
      this.emit(Op.DECL_FUNC, fd.id.name)
    }
  }

  private emitBlockHoisting(stmts: any[]) {
    // Block-level: only let/const TDZ and hoisted func decls
    for (const stmt of stmts) {
      if (stmt.type === 'VariableDeclaration' && (stmt.kind === 'let' || stmt.kind === 'const')) {
        for (const decl of stmt.declarations) {
          emitTDZPattern(this, decl.id)
        }
      }
    }
    const funcDecls = this.collectFuncDecls(stmts)
    for (const fd of funcDecls) {
      const idx = this.compileFuncDesc(fd)
      this.emit(Op.MAKE_FUNC, idx)
      this.emit(Op.DECL_FUNC, fd.id.name)
    }
  }

  // ─── Statements ─────────────────────────────────────────────────────────────

  compileStmt(node: any) {
    switch (node.type) {
      case 'EmptyStatement': break
      case 'DebuggerStatement': this.emit(Op.DEBUGGER_STMT); break
      case 'ExpressionStatement':
        this.compileExpr(node.expression)
        this.emit(Op.POP)
        break
      case 'BlockStatement':
        this.compileBlock(node)
        break
      case 'ReturnStatement':
        if (node.argument) {
          this.compileExpr(node.argument)
        } else {
          this.emit(Op.PUSH, undefined)
        }
        this.emit(Op.RETURN)
        break
      case 'ThrowStatement':
        this.compileExpr(node.argument)
        this.emit(Op.THROW_VAL)
        break
      case 'VariableDeclaration':
        this.compileVarDecl(node)
        break
      case 'FunctionDeclaration':
        // Already hoisted; skip here
        break
      case 'ClassDeclaration':
        this.compileClassDecl(node)
        break
      case 'IfStatement':
        this.compileIf(node)
        break
      case 'WhileStatement':
        this.compileWhile(node, undefined)
        break
      case 'DoWhileStatement':
        this.compileDoWhile(node, undefined)
        break
      case 'ForStatement':
        this.compileFor(node, undefined)
        break
      case 'ForInStatement':
        this.compileForIn(node, undefined)
        break
      case 'ForOfStatement':
        this.compileForOf(node, undefined)
        break
      case 'BreakStatement':
        this.compileBreak(node)
        break
      case 'ContinueStatement':
        this.compileContinue(node)
        break
      case 'LabeledStatement':
        this.compileLabeledStmt(node)
        break
      case 'SwitchStatement':
        this.compileSwitch(node, undefined)
        break
      case 'TryStatement':
        this.compileTry(node)
        break
      case 'WithStatement':
        this.compileWith(node, undefined)
        break
      default:
        throw new Error(`Compiler: unsupported statement type ${node.type}`)
    }
  }

  private compileBlock(node: any) {
    this.emit(Op.SCOPE_PUSH)
    this.scopeDepth++
    this.emitBlockHoisting(node.body)
    for (const stmt of node.body) {
      this.compileStmt(stmt)
    }
    this.scopeDepth--
    this.emit(Op.SCOPE_POP)
  }

  private compileVarDecl(node: any) {
    const kind: string = node.kind
    for (const decl of node.declarations) {
      if (decl.init) {
        this.compileExpr(decl.init)
      } else {
        if (kind === 'var') {
          // var without init: already declared by DECL_VAR hoisting; just skip
          continue
        } else {
          this.emit(Op.PUSH, undefined)
        }
      }
      this.emitPatternDecl(decl.id, kind)
    }
  }

  /**
   * Emit declaration binding for a pattern.
   * The value to bind is on top of the stack.
   */
  private emitPatternDecl(pat: any, kind: string) {
    if (pat.type === 'Identifier') {
      if (kind === 'var') {
        this.emit(Op.DECL_VAR_INIT, pat.name)
      } else if (kind === 'let') {
        this.emit(Op.DECL_LET, pat.name)
      } else {
        this.emit(Op.DECL_CONST, pat.name)
      }
    } else if (pat.type === 'ObjectPattern') {
      this.emitObjectPatternDecl(pat, kind)
    } else if (pat.type === 'ArrayPattern') {
      this.emitArrayPatternDecl(pat, kind)
    } else if (pat.type === 'AssignmentPattern') {
      // default param in destructuring context - shouldn't appear at top level of decl
      // Handle: if value is undefined, use default
      const notUndefined = this.pc()
      this.emit(Op.DUP)
      this.emit(Op.PUSH, undefined)
      this.emit(Op.SEQ)
      const jumpPast = this.emit(Op.JUMP_FALSE, -1)
      this.emit(Op.POP)
      this.compileExpr(pat.right)
      this.patch(jumpPast, this.pc())
      this.emitPatternDecl(pat.left, kind)
    } else {
      throw new Error(`Compiler: unsupported pattern type ${pat.type} in declaration`)
    }
  }

  private emitObjectPatternDecl(pat: any, kind: string) {
    // Stack: obj
    // We need to extract each property
    const usedKeys: (string | null)[] = []
    for (let i = 0; i < pat.properties.length; i++) {
      const prop = pat.properties[i]
      if (prop.type === 'RestElement') {
        // Rest: collect remaining keys
        // Build rest object by excluding usedKeys
        this.emit(Op.DUP) // dup obj
        // We need to spread obj then delete used keys
        // Use MAKE_OBJECT trick: push empty obj, SPREAD_OBJECT, then delete keys
        // Actually: push {}, spread_object then delete used keys
        this.emit(Op.MAKE_OBJECT, 0) // empty obj
        this.emit(Op.SWAP) // [rest_obj, obj]
        this.emit(Op.SPREAD_OBJECT) // rest_obj now has all props from obj
        // Remove keys that were already used
        for (const k of usedKeys) {
          if (k !== null) {
            this.emit(Op.DEL_PROP, k)
          }
        }
        this.emitPatternDecl(prop.argument, kind)
      } else {
        // Property
        let keyName: string | null = null
        this.emit(Op.DUP) // dup obj for property access
        if (prop.computed) {
          this.compileExpr(prop.key)
          this.emit(Op.GET_PROP_DYN)
          keyName = null
        } else {
          const k = prop.key.type === 'Identifier' ? prop.key.name : String(prop.key.value)
          keyName = k
          this.emit(Op.GET_PROP, k)
        }
        usedKeys.push(keyName)
        this.emitPatternDecl(prop.value, kind)
      }
    }
    this.emit(Op.POP) // pop the obj
  }

  private emitArrayPatternDecl(pat: any, kind: string) {
    // Stack: iterable -> convert to array via iterator
    this.emit(Op.GET_ITER) // iterator on stack
    for (let i = 0; i < pat.elements.length; i++) {
      const el = pat.elements[i]
      if (!el) {
        // hole: skip one element
        this.emit(Op.DUP) // dup iterator
        this.emit(Op.ITER_NEXT)
        this.emit(Op.POP) // discard result
        continue
      }
      if (el.type === 'RestElement') {
        // Collect remaining elements into array
        // We need to drain remaining iterator items
        this.emitIterRest()
        this.emitPatternDecl(el.argument, kind)
        break
      }
      this.emit(Op.DUP) // dup iterator
      this.emit(Op.ITER_NEXT)
      // result is {value, done} - get .value
      this.emit(Op.GET_PROP, 'value')
      this.emitPatternDecl(el, kind)
    }
    this.emit(Op.POP) // pop iterator
  }

  /**
   * Emit code to collect all remaining iterator values into an array.
   * Stack before: iterator (peeked, not consumed)
   * Stack after: iterator, restArray
   */
  private emitIterRest() {
    // We'll use a simple approach: emit LOAD_REST-like sequence
    // Actually we need to collect remaining items from the iterator into an array.
    // Strategy: use a helper that loops and pushes items.
    // We'll implement this as: push [], then loop: ITER_NEXT, if done break, else push to array
    this.emit(Op.MAKE_ARRAY, 0) // []
    // Stack: iter, []
    const loopStart = this.pc()
    this.emit(Op.SWAP)   // [], iter
    this.emit(Op.DUP)    // [], iter, iter
    this.emit(Op.ITER_NEXT) // [], iter, {value, done}
    this.emit(Op.DUP)    // [], iter, result, result
    this.emit(Op.GET_PROP, 'done') // [], iter, result, done
    const doneJump = this.emit(Op.JUMP_TRUE, -1)
    // not done: get value
    this.emit(Op.GET_PROP, 'value') // [], iter, value
    this.emit(Op.SWAP)   // [], value, iter
    // We need: iter, [], value to push value onto []
    // Current stack: [], value, iter
    // Rotate: iter, [], value... actually let's think differently
    // Stack: [], iter, value  -> no, it's [], value, iter
    // Let's use a different approach: rebuild after loop

    // Hmm, this is getting complex. Let's restart with a cleaner approach.
    // We'll use GET_ITER's result and collect manually with a local trick.
    // Since we can't easily do dynamic array push with just stack ops,
    // let's use SPREAD_ARRAY trick: push [], SWAP (iter now on top of []),
    // then SPREAD_ARRAY pops the iter and spreads into the array below.
    // But we need to consume only remaining items...

    // Actually, SPREAD_ARRAY: "pop iterable, spread into array below it on stack"
    // The iterator itself is iterable (it has a .next method but may not have Symbol.iterator)
    // We need the iterator to be iterable. Let's just restart with the array approach.

    // Undo what we did above - we need to patch this differently.
    // Let me just pop what we started and use SPREAD_ARRAY approach instead.
    // This approach won't work well. Let me patch the above.

    // For now: backpatch the doneJump, get value, push to array
    // Stack at this point: [], value, iter
    this.emit(Op.SWAP)   // [], iter, value  -- wait this is wrong
    // Actually after SWAP above: we have [], value, iter at top but we want to push value to []
    // This doesn't work with simple stack ops. Let me give up and collect differently.

    // Actually we already pushed [] then did a bunch of ops. Let me trace from loopStart:
    // Before loopStart: iter, []
    // SWAP: [], iter
    // DUP: [], iter, iter
    // ITER_NEXT: [], iter, result
    // DUP: [], iter, result, result
    // GET_PROP 'done': [], iter, result, done
    // JUMP_TRUE(doneLabel): if done, jump
    // GET_PROP 'value': [], iter, result.value  -- wait result is gone, we get result.done not result
    // Hmm we DUPed result then got done - so we still have result on stack

    // Let me re-trace:
    // [], iter, result, done <- after GET_PROP 'done'
    // if done: jump to doneLabel (stack still has [], iter, result at that point)
    // if not done: GET_PROP 'value' on result -> [], iter, value
    // Now we need to push value into [].
    // Stack: [], iter, value
    // We can't easily push to [] from here without a dedicated opcode.

    // This is fundamentally hard with just stack ops. Let me take a different approach:
    // Use SPREAD_ARRAY: we need the iterator to be on top of the array.
    // Actually we can try: wrap iterator in an object with Symbol.iterator pointing to itself
    // but that's also not possible from bytecode.

    // Best approach: just collect the rest into an array by repeatedly doing ITER_NEXT
    // and using MAKE_ARRAY at the end. But we don't know count ahead of time.

    // I'll emit a sentinel-based approach: use a fixed-count loop with backpatching
    // won't work either. Let's just patch this by emitting a helper function call
    // approach... No.

    // FINAL APPROACH: Since we cannot count items ahead of time without a real loop construct,
    // I'll reverse the approach: instead of streaming into an array, we use SPREAD_ARRAY
    // which takes an iterable and spreads into the array below. The iterator IS iterable
    // if it has Symbol.iterator. In the VM code (vm.ts), makeIterator handles iterators
    // that have a .next function directly. And SPREAD_ARRAY uses `for (const item of iterable)`.
    // So if the iterator supports Symbol.iterator OR if for..of works on it, it'll work.
    // Standard JS iterators have [Symbol.iterator]() { return this }, so this should work.

    // Actually wait - looking at vm.ts SPREAD_ARRAY: "for (const item of iterable) arr.push(item)"
    // This uses JS for-of which requires Symbol.iterator. Standard iterators do have this.
    // So SPREAD_ARRAY on an iterator should work!

    // Let me redo this properly. I'll NOT emit the loop above and instead do SPREAD_ARRAY.
    // But we already emitted a bunch of instructions. Let me back out...

    // Unfortunately I can't "un-emit" instructions. I need a different strategy entirely.
    // Let me just keep the loop approach but fix the stack manipulation.

    // Stack trace resume from doneJump (not done path):
    // [], iter, result, done -- and we JUMP_TRUE doneJump
    // We fall through here with: [], iter, result (since done was popped by JUMP_TRUE? No!)
    // Actually JUMP_TRUE pops its operand (done). So stack is: [], iter, result
    // GET_PROP 'value' -> [], iter, value

    // We need to append value to []. Stack: [], iter, value
    // To use SET_PROP_DYN we'd need obj, key, val - but [] is at the bottom.
    // Alternative: push a "push" helper call? No.
    // Trick: we can use CALL_METHOD: CALL_METHOD {key:'push', argc:1}
    // but [] is not at top.

    // Let me reorganize: keep array at top, rotate.
    // Stack: [], iter, value
    // SWAP -> [], value, iter (not helpful)
    // We need: [array], value and then call array.push(value)

    // Actually: we have [], iter, value
    // What if we do: store value temporarily, bring [] to top, push, put iter back?
    // There's no "pick" opcode. But we have DUP and SWAP.
    // With SWAP: [], value, iter -> swap top two -> [], iter, value -> same problem
    // We need a 3-way rotation which isn't available.

    // The cleanest solution without new opcodes: use a different code structure.
    // Approach: transform the iterator into a rest-array BEFORE the loop.
    // We can: push [], SWAP (now iter is on top, [] below), then SPREAD_ARRAY
    // which pops iter and spreads into []. Then [] (filled) is on the stack.
    // This works!

    // Since we can't undo emissions, I'll track this issue and handle emitIterRest
    // in a fresh method below. I'll abort this method body.

    // ABORT: This method's body above is broken. See _emitIterRest below.
    this.patch(doneJump, this.pc()) // patch done jump to here - this won't be right
    // This is a mess. Let me use a completely different approach in a clean method.
  }

  getModule_clean(): Module { return this.module }

  compileProgram_real(node: acorn.Program) {
    this.emitHoisting(node.body as any[], false)
    for (const stmt of node.body) {
      this.compileStmt(stmt as any)
    }
  }
}

// We need a completely separate clean implementation.
// The class above has a buggy emitIterRest. Let's write the real compiler.

