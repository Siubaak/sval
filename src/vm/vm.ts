/**
 * Stack-based VM execution engine for Sval.
 *
 * Core design
 * -----------
 * `vmExec` is a generator function that implements the dispatch loop.
 * It yields in two situations:
 *   1. A `YIELD_VAL` / `YIELD_DELEGATE` opcode is reached (generator functions).
 *   2. An `AWAIT_VAL` opcode is reached (async functions) – it yields the AWAIT
 *      sentinel so that `runAsync` can suspend execution until the promise settles.
 *
 * Wrapper functions (`createVMFunc`, `buildClass`) translate the raw generator into
 * the correct callable representation for each function kind (sync, async, generator,
 * async-generator).
 */

import { Op, Instr, Module, FuncDesc, ClassDesc, MethodDesc, PropDefDesc } from './opcode.ts'
import Scope from '../scope/index.ts'
import {
  AWAIT,
  NOINIT,
  DEADZONE,
  SUPER,
  NOCTOR,
  CLSCTOR,
  NEWTARGET,
  SUPERCALL,
  PRIVATE,
} from '../share/const.ts'
import {
  define,
  getDptor,
  inherits,
  callSuper,
  assign,
  getProto,
  hasOwn,
} from '../share/util.ts'
import { runAsync, runAsyncOptions } from '../share/async.ts'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TryHandler {
  catchPC: number | null
  finallyPC: number | null
  /** depth of scopeStack when TRY_PUSH was executed */
  scopeDepth: number
  /** depth of data stack when TRY_PUSH was executed */
  stackDepth: number
}

// ---------------------------------------------------------------------------
// Core execution generator
// ---------------------------------------------------------------------------

/**
 * Execute `code` in the given scope stack.
 *
 * @param code       Instruction array to run.
 * @param scopeStack Mutable scope stack; top element is the current scope.
 * @param module     The compiled module (for function/class descriptors).
 * @param thisVal    The `this` value for the current call frame.
 * @param newTarget  The `new.target` value for the current call frame.
 * @param args       The call arguments array (used by LOAD_ARG / LOAD_REST).
 */
export function* vmExec(
  code: Instr[],
  scopeStack: Scope[],
  module: Module,
  thisVal: any,
  newTarget: any,
  args?: any[],
): Generator<any, any, any> {
  const stack: any[] = []
  const tryStack: TryHandler[] = []
  let pc = 0

  const push = (v: any) => { stack.push(v) }
  const pop = (): any => stack.pop()
  const peek = (): any => stack[stack.length - 1]
  const sc = (): Scope => scopeStack[scopeStack.length - 1]

  mainLoop: while (pc < code.length) {
    const instr = code[pc++]

    try {
      switch (instr.op) {

        // ── Stack manipulation ────────────────────────────────────────────
        case Op.PUSH: push(instr.arg); break
        case Op.POP: pop(); break
        case Op.DUP: push(peek()); break
        case Op.SWAP: { const a = pop(), b = pop(); push(a); push(b); break }

        // ── Variable access ───────────────────────────────────────────────
        case Op.LOAD: {
          const v = sc().find(instr.arg)
          if (!v) throw new ReferenceError(`${instr.arg} is not defined`)
          const val = v.get()
          if (val === DEADZONE) throw new ReferenceError(`Cannot access '${instr.arg}' before initialization`)
          push(val)
          break
        }
        case Op.LOAD_SAFE: {
          const v = sc().find(instr.arg)
          push(!v || v.get() === DEADZONE ? undefined : v.get())
          break
        }
        case Op.STORE: {
          const val = peek()
          const v = sc().find(instr.arg)
          if (!v) throw new ReferenceError(`${instr.arg} is not defined`)
          v.set(val)
          break
        }

        // ── Variable declarations ─────────────────────────────────────────
        case Op.DECL_VAR: sc().var(instr.arg, NOINIT); break
        case Op.DECL_VAR_INIT: sc().var(instr.arg, pop()); break
        case Op.DECL_LET_TDZ: sc().let(instr.arg, DEADZONE); break
        case Op.DECL_LET: {
          const val = pop()
          const v = sc().find(instr.arg)
          if (v && v.get() === DEADZONE) {
            v.set(val)
          } else {
            sc().let(instr.arg, val)
          }
          break
        }
        case Op.DECL_CONST: {
          const val = pop()
          const v = sc().find(instr.arg)
          if (v && v.get() === DEADZONE) {
            v.set(val)
          } else {
            sc().const(instr.arg, val)
          }
          break
        }
        case Op.DECL_FUNC: sc().func(instr.arg, pop()); break

        // ── Scope management ─────────────────────────────────────────────
        case Op.SCOPE_PUSH: {
          scopeStack.push(new Scope(sc()))
          break
        }
        case Op.SCOPE_POP: {
          scopeStack.pop()
          break
        }

        // ── Arithmetic ───────────────────────────────────────────────────
        case Op.ADD: { const b = pop(), a = pop(); push(a + b); break }
        case Op.SUB: { const b = pop(), a = pop(); push(a - b); break }
        case Op.MUL: { const b = pop(), a = pop(); push(a * b); break }
        case Op.DIV: { const b = pop(), a = pop(); push(a / b); break }
        case Op.MOD: { const b = pop(), a = pop(); push(a % b); break }
        case Op.POW: { const b = pop(), a = pop(); push(a ** b); break }

        // ── Comparison ───────────────────────────────────────────────────
        case Op.EQ:   { const b = pop(), a = pop(); push(a == b); break }   // eslint-disable-line eqeqeq
        case Op.NEQ:  { const b = pop(), a = pop(); push(a != b); break }   // eslint-disable-line eqeqeq
        case Op.SEQ:  { const b = pop(), a = pop(); push(a === b); break }
        case Op.SNEQ: { const b = pop(), a = pop(); push(a !== b); break }
        case Op.LT:   { const b = pop(), a = pop(); push(a < b); break }
        case Op.LTE:  { const b = pop(), a = pop(); push(a <= b); break }
        case Op.GT:   { const b = pop(), a = pop(); push(a > b); break }
        case Op.GTE:  { const b = pop(), a = pop(); push(a >= b); break }

        // ── Bitwise ──────────────────────────────────────────────────────
        case Op.BIT_AND: { const b = pop(), a = pop(); push(a & b); break }
        case Op.BIT_OR:  { const b = pop(), a = pop(); push(a | b); break }
        case Op.BIT_XOR: { const b = pop(), a = pop(); push(a ^ b); break }
        case Op.LSHIFT:  { const b = pop(), a = pop(); push(a << b); break }
        case Op.RSHIFT:  { const b = pop(), a = pop(); push(a >> b); break }
        case Op.URSHIFT: { const b = pop(), a = pop(); push(a >>> b); break }

        // ── Other binary ─────────────────────────────────────────────────
        case Op.IN_OP:         { const b = pop(), a = pop(); push(a in b); break }
        case Op.INSTANCEOF_OP: { const b = pop(), a = pop(); push(a instanceof b); break }

        // ── Unary ────────────────────────────────────────────────────────
        case Op.NEG:     push(-pop()); break
        case Op.POS:     push(+pop()); break
        case Op.NOT:     push(!pop()); break
        case Op.BIT_NOT: push(~pop()); break
        case Op.VOID_OP: pop(); push(undefined); break

        case Op.TYPEOF_VAR: {
          const v = sc().find(instr.arg)
          push(typeof (!v || v.get() === DEADZONE ? undefined : v.get()))
          break
        }
        case Op.TYPEOF_EXPR: push(typeof pop()); break

        // ── Control flow ─────────────────────────────────────────────────
        case Op.JUMP:            pc = instr.arg; break
        case Op.JUMP_TRUE:       { if (pop())      pc = instr.arg; break }
        case Op.JUMP_FALSE:      { if (!pop())     pc = instr.arg; break }
        case Op.JUMP_PEEK_TRUE:  { if (peek())     pc = instr.arg; break }
        case Op.JUMP_PEEK_FALSE: { if (!peek())    pc = instr.arg; break }
        case Op.JUMP_PEEK_NULLISH: { const v = peek(); if (v == null) pc = instr.arg; break } // eslint-disable-line eqeqeq

        // ── Property access ───────────────────────────────────────────────
        case Op.GET_PROP: { const obj = pop(); push(obj[instr.arg]); break }
        case Op.GET_PROP_DYN: { const key = pop(), obj = pop(); push(obj[key]); break }
        case Op.SET_PROP: {
          const val = pop(), obj = pop()
          obj[instr.arg] = val
          push(val)
          break
        }
        case Op.SET_PROP_DYN: {
          const val = pop(), key = pop(), obj = pop()
          obj[key] = val
          push(val)
          break
        }
        case Op.DEL_PROP:     { const obj = pop();             push(delete obj[instr.arg]); break }
        case Op.DEL_PROP_DYN: { const key = pop(), obj = pop(); push(delete obj[key]); break }

        // ── Super property access ─────────────────────────────────────────
        case Op.GET_SUPER_PROP: {
          const superCls = sc().find(SUPER)?.get()
          const getter = getDptor(superCls?.prototype, instr.arg)?.get
          if (getter) {
            push(getter.call(thisVal))
          } else {
            push(superCls?.prototype[instr.arg])
          }
          break
        }
        case Op.SET_SUPER_PROP: {
          const val = pop()
          const superCls = sc().find(SUPER)?.get()
          const setter = getDptor(superCls?.prototype, instr.arg)?.set
          if (setter) {
            setter.call(thisVal, val)
          } else {
            superCls.prototype[instr.arg] = val
          }
          push(val)
          break
        }
        case Op.GET_SUPER_PROTO: {
          const superCls = sc().find(SUPER)?.get()
          push(superCls?.prototype)
          break
        }

        // ── Private fields ────────────────────────────────────────────────
        case Op.GET_PRIVATE: {
          const obj = pop()
          push(obj[PRIVATE]?.[instr.arg])
          break
        }
        case Op.SET_PRIVATE: {
          const val = pop(), obj = pop()
          if (!obj[PRIVATE]) define(obj, PRIVATE, { value: Object.create(null), writable: true })
          obj[PRIVATE][instr.arg] = val
          push(val)
          break
        }
        case Op.CHECK_PRIVATE_IN: {
          const obj = pop()
          push(!!(obj[PRIVATE] && instr.arg in obj[PRIVATE]))
          break
        }

        // ── Array / object creation ───────────────────────────────────────
        case Op.MAKE_ARRAY: {
          const count: number = instr.arg
          push(stack.splice(stack.length - count, count))
          break
        }
        case Op.MAKE_OBJECT: {
          const count: number = instr.arg
          const pairs = stack.splice(stack.length - count * 2, count * 2)
          const obj: any = {}
          for (let i = 0; i < pairs.length; i += 2) obj[pairs[i]] = pairs[i + 1]
          push(obj)
          break
        }
        case Op.SPREAD_ARRAY: {
          const iterable = pop()
          const arr = peek() as any[]
          for (const item of iterable) arr.push(item)
          break
        }
        case Op.SPREAD_OBJECT: {
          assign(peek(), pop())
          break
        }

        // ── Function creation ─────────────────────────────────────────────
        case Op.MAKE_FUNC: {
          push(createVMFunc(module.funcs[instr.arg], sc(), module))
          break
        }

        // ── Function calls ────────────────────────────────────────────────
        case Op.CALL: {
          const argc: number = instr.arg
          const args = stack.splice(stack.length - argc, argc)
          const func = pop()
          push(func(...args))
          break
        }
        case Op.CALL_METHOD: {
          const { key, argc } = instr.arg as { key: string; argc: number }
          const args = stack.splice(stack.length - argc, argc)
          const obj = pop()
          push(obj[key].apply(obj, args))
          break
        }
        case Op.CALL_METHOD_DYN: {
          const argc: number = instr.arg
          const args = stack.splice(stack.length - argc, argc)
          const key = pop()
          const obj = pop()
          push(obj[key].apply(obj, args))
          break
        }
        case Op.CALL_SUPER: {
          const argc: number = instr.arg
          const args = stack.splice(stack.length - argc, argc)
          const superCls = sc().find(SUPER)?.get()
          const result = callSuper(thisVal, superCls, args)
          // Signal that super() has been called so `this` access is now valid
          const superCallVar = sc().find(SUPERCALL)
          if (superCallVar) superCallVar.set(true)
          push(result)
          break
        }
        case Op.NEW_CALL: {
          const argc: number = instr.arg
          const args = stack.splice(stack.length - argc, argc)
          const ctor = pop()
          push(new ctor(...args))
          break
        }
        case Op.RETURN: {
          return pop()
        }

        // ── Generator / Async ─────────────────────────────────────────────
        case Op.YIELD_VAL: {
          const val = pop()
          const sent: any = yield val
          push(sent !== undefined ? sent : undefined)
          break
        }
        case Op.YIELD_DELEGATE: {
          // yield* iterable – forward all values and capture the return value
          const iterable = pop()
          let sent: any = undefined
          let done = false
          const iter: Iterator<any> = makeIterator(iterable)
          while (!done) {
            let stepResult: IteratorResult<any>
            try {
              stepResult = iter.next(sent)
            } catch (e) {
              throw e
            }
            if (stepResult.done) {
              push(stepResult.value)
              done = true
            } else {
              sent = yield stepResult.value
            }
          }
          break
        }
        case Op.AWAIT_VAL: {
          const promise = pop()
          AWAIT.RES = promise
          const resolved: any = yield AWAIT
          push(resolved)
          break
        }

        // ── Exception handling ────────────────────────────────────────────
        case Op.THROW_VAL: throw pop()

        case Op.TRY_PUSH: {
          tryStack.push({
            catchPC: instr.arg.catchPC,
            finallyPC: instr.arg.finallyPC,
            scopeDepth: scopeStack.length,
            stackDepth: stack.length,
          })
          break
        }
        case Op.TRY_POP: {
          tryStack.pop()
          break
        }
        case Op.RETHROW: {
          // Stack: [..., value, isException]
          // If isException is true, throw value; otherwise push value as a normal result.
          const isException: boolean = pop()
          const value = pop()
          if (isException) throw value
          push(value)
          break
        }

        // ── Iterator operations ───────────────────────────────────────────
        case Op.GET_ITER: {
          push(makeIterator(pop()))
          break
        }
        case Op.ITER_NEXT: {
          const iter = peek()
          push(iter.next())
          break
        }
        case Op.GET_KEYS: {
          const obj = pop()
          const keys: string[] = []
          for (const k in obj) keys.push(k)
          push(keys)
          break
        }

        // ── Template literal ──────────────────────────────────────────────
        case Op.TEMPLATE_LIT: {
          const count: number = instr.arg
          const parts = stack.splice(stack.length - count, count)
          push(parts.join(''))
          break
        }

        // ── Special ───────────────────────────────────────────────────────
        case Op.DEBUGGER_STMT: debugger; break
        case Op.LOAD_THIS: push(thisVal); break
        case Op.LOAD_NEW_TARGET: push(newTarget); break

        case Op.IMPORT_DYN: {
          // Dynamic import() – treated as async; yield AWAIT with the promise.
          const source = pop()
          AWAIT.RES = import(source)
          const resolved: any = yield AWAIT
          push(resolved)
          break
        }

        // ── Class building ────────────────────────────────────────────────
        case Op.BUILD_CLASS: {
          const superClass = pop()
          push(buildClass(
            module.classes[instr.arg],
            sc(),
            module,
            superClass === null ? undefined : superClass,
          ))
          break
        }

        // ── Sequence expression ───────────────────────────────────────────
        case Op.SEQUENCE: {
          // Discard all but the top value (which is the result of the last sub-expression).
          const count: number = instr.arg
          const result = pop()
          stack.splice(stack.length - (count - 1), count - 1)
          push(result)
          break
        }

        // ── With statement ────────────────────────────────────────────────
        case Op.WITH_PUSH: {
          const obj = pop()
          const withScope = new Scope(sc())
          withScope.with(obj)
          scopeStack.push(withScope)
          break
        }
        case Op.WITH_POP: {
          scopeStack.pop()
          break
        }

        // ── Delete identifier ─────────────────────────────────────────────
        case Op.DEL_IDENTIFIER: {
          throw new SyntaxError('Delete of an unqualified identifier in strict mode.')
        }

        // ── Function argument access ──────────────────────────────────────
        case Op.LOAD_ARG: {
          push(args ? args[instr.arg] : undefined)
          break
        }
        case Op.LOAD_REST: {
          push(args ? Array.from(args as any).slice(instr.arg) : [])
          break
        }

        default:
          throw new Error(`VM: unknown opcode ${(instr as any).op}`)
      }
    } catch (err) {
      // ── Exception dispatch ────────────────────────────────────────────
      const handler = tryStack[tryStack.length - 1]
      if (!handler) throw err

      tryStack.pop()
      // Restore scope and stack to the state at TRY_PUSH time.
      while (scopeStack.length > handler.scopeDepth) scopeStack.pop()
      stack.length = handler.stackDepth

      if (handler.catchPC !== null) {
        // Enter catch block; the error is pushed as the caught value.
        push(err)
        pc = handler.catchPC
      } else if (handler.finallyPC !== null) {
        // No catch clause – enter finally with the error saved on the stack.
        // The RETHROW opcode at the end of the finally block will re-throw it.
        push(err)
        push(true) // isException flag for RETHROW
        pc = handler.finallyPC
      } else {
        // Handler with no catch and no finally – shouldn't happen; rethrow.
        throw err
      }
    }
  }

  // Implicit return: if a value was left on the stack, use it; otherwise undefined.
  return stack.length > 0 ? pop() : undefined
}

// ---------------------------------------------------------------------------
// Iterator helper
// ---------------------------------------------------------------------------

function makeIterator(iterable: any): Iterator<any> {
  if (typeof Symbol !== 'undefined' && iterable[Symbol.iterator]) {
    return iterable[Symbol.iterator]()
  }
  if (typeof iterable?.next === 'function') {
    return iterable
  }
  // Array-like fallback
  let i = 0
  return {
    next() {
      if (i >= iterable.length) return { value: undefined, done: true }
      return { value: iterable[i++], done: false }
    },
  }
}

// ---------------------------------------------------------------------------
// Parameter binding
// ---------------------------------------------------------------------------

/**
 * Bind call arguments to named parameters in `scope`.
 * Handles Identifier params, RestElement, and destructuring patterns.
 * This is intentionally simple: complex patterns (AssignmentPattern, etc.)
 * are handled by the compiler emitting DECL_* instructions at the top of
 * the function body.
 */
function bindSimpleParam(paramNode: any, args: any[], idx: number, scope: Scope): void {
  if (paramNode.type === 'Identifier') {
    scope.var(paramNode.name, args[idx])
  } else if (paramNode.type === 'RestElement') {
    if (paramNode.argument.type === 'Identifier') {
      scope.var(paramNode.argument.name, args.slice(idx))
    }
  }
  // Complex patterns (ObjectPattern, ArrayPattern, AssignmentPattern) are
  // handled by the compiled function body preamble emitted by the compiler.
}

// ---------------------------------------------------------------------------
// Function creation
// ---------------------------------------------------------------------------

/**
 * Create a callable JS function from a `FuncDesc`, capturing `capturedScope`.
 */
export function createVMFunc(desc: FuncDesc, capturedScope: Scope, module: Module): any {
  const { isGenerator, isAsync, isArrow, params, hasRest, code, name } = desc

  /** Inner factory: creates the generator that drives the VM. */
  function makeGen(
    this_: any,
    newTarget_: any,
    callArgs: IArguments | any[],
  ): Generator<any, any, any> {
    const subScope = new Scope(capturedScope, true)
    const argsArr = Array.from(callArgs as any)
    if (!isArrow) {
      subScope.let('this', this_)
      subScope.let('arguments', callArgs)
    }
    subScope.const(NEWTARGET, newTarget_)

    // Parameter binding is emitted as code preamble by the compiler (LOAD_ARG / LOAD_REST).
    // For FuncDescs created without a compiler (e.g. directly), fall back to simple binding
    // if the params array is non-empty and the code doesn't start with LOAD_ARG/LOAD_REST.
    const needsFallback = params.length > 0 && code.length > 0
      && code[0].op !== Op.LOAD_ARG && code[0].op !== Op.LOAD_REST
    if (needsFallback) {
      for (let i = 0; i < params.length; i++) {
        bindSimpleParam(params[i], argsArr, i, subScope)
      }
    }

    return vmExec(
      code,
      [subScope],
      module,
      isArrow ? capturedScope.find('this')?.get() : this_,
      newTarget_,
      argsArr,
    )
  }

  let func: any

  if (isGenerator && isAsync) {
    // async function* ─ returns an AsyncIterator
    func = function (this: any) {
      const gen = makeGen.call(this, this, new.target, arguments)
      return makeAsyncIterator(gen)
    }
  } else if (isGenerator) {
    // function* ─ return the VM generator directly
    func = function (this: any) {
      return makeGen.call(this, this, new.target, arguments)
    }
  } else if (isAsync) {
    // async function ─ wrap in runAsync to get a Promise
    func = function (this: any) {
      return runAsync(makeGen.call(this, this, new.target, arguments))
    }
  } else {
    // Regular sync function ─ drive the generator to completion synchronously
    func = function (this: any) {
      const gen = makeGen.call(this, this, new.target, arguments)
      let step = gen.next()
      while (!step.done) {
        // Should not yield in a sync function; ignore any stray yields.
        step = gen.next(step.value)
      }
      return step.value
    }
  }

  if (isArrow || isGenerator || isAsync) {
    define(func, NOCTOR, { value: true })
  }

  define(func, 'name', { value: name || '', configurable: true })
  define(func, 'length', {
    value: params.filter((p: any) => p.type !== 'AssignmentPattern').length,
    configurable: true,
  })

  if (desc.source && desc.start !== undefined && desc.end !== undefined) {
    const src = desc.source.substring(desc.start, desc.end)
    define(func, 'toString', { value: () => src, configurable: true })
  }

  return func
}

// ---------------------------------------------------------------------------
// Async iterator helper (for async generators)
// ---------------------------------------------------------------------------

function makeAsyncIterator(gen: Generator<any, any, any>): AsyncIterator<any> {
  let last: Promise<any> = Promise.resolve()
  let hasCatch = false

  const run = (opts: runAsyncOptions) => {
    last = last
      .then(() => runAsync(gen, assign({ fullRet: true }, opts)))
      .catch((err) => {
        if (!hasCatch) {
          hasCatch = true
          return Promise.reject(err)
        }
      })
    return last
  }

  const asyncIter: AsyncIterator<any> = {
    next: (res?: any) => run({ res }),
    throw: (err?: any) => run({ err }),
    return: (ret?: any) => run({ ret }),
  }

  if (typeof Symbol !== 'undefined' && Symbol.asyncIterator) {
    (asyncIter as any)[Symbol.asyncIterator] = function () { return this }
  }

  return asyncIter
}

// ---------------------------------------------------------------------------
// Class building
// ---------------------------------------------------------------------------

/**
 * Instantiate a class from a `ClassDesc`, analogous to `createClass` in helper.ts.
 */
export function buildClass(
  desc: ClassDesc,
  capturedScope: Scope,
  module: Module,
  superClass?: any,
): any {
  // ── Construct the instance initialiser ────────────────────────────────────
  // Runs instance property definitions (non-static PropertyDefinition).
  function runInstanceInit(inst: any, superCls?: any) {
    for (const propDef of desc.propDefs) {
      if (propDef.isStatic) continue
      applyPropDef(propDef, inst, capturedScope, module, superCls)
    }
  }

  // ── Build the constructor ─────────────────────────────────────────────────
  let ctor: any

  if (desc.ctorDescIdx !== null) {
    const ctorDesc = module.funcs[desc.ctorDescIdx]
    ctor = createVMFunc(ctorDesc, capturedScope, module)
  } else if (superClass) {
    // Default derived constructor: constructor(...args) { super(...args) }
    ctor = function (this: any) {
      const inst = callSuper(this, superClass, Array.from(arguments))
      runInstanceInit(inst, superClass)
      return inst
    }
  } else {
    // Default base constructor
    ctor = function (this: any) {
      runInstanceInit(this, undefined)
    }
  }

  // ── Inheritance chain ─────────────────────────────────────────────────────
  if (superClass) {
    inherits(ctor, superClass)
  }

  // ── Methods ───────────────────────────────────────────────────────────────
  for (const method of desc.methods) {
    const key = resolveKey(method, capturedScope, module)
    if (key === null) continue

    const fn = createVMFunc(module.funcs[method.funcDescIdx], capturedScope, module)
    const target = method.isStatic ? ctor : ctor.prototype

    if (method.kind === 'get' || method.kind === 'set') {
      const oriDptor = getDptor(target, key)
      define(target, key, {
        [method.kind]: fn,
        ...(method.kind === 'get'
          ? { set: oriDptor?.set }
          : { get: oriDptor?.get }),
        enumerable: false,
        configurable: true,
      })
    } else {
      define(target, key, {
        value: fn,
        writable: true,
        enumerable: false,
        configurable: true,
      })
    }
  }

  // ── Static property definitions ───────────────────────────────────────────
  for (const propDef of desc.propDefs) {
    if (!propDef.isStatic) continue
    applyPropDef(propDef, ctor, capturedScope, module, superClass)
  }

  // ── Static blocks ─────────────────────────────────────────────────────────
  for (const sb of desc.staticBlocks) {
    const sbScope = new Scope(capturedScope)
    sbScope.let('this', ctor)
    const gen = vmExec(sb.code, [sbScope], module, ctor, undefined)
    let step = gen.next()
    while (!step.done) step = gen.next(step.value)
  }

  // ── Class markers ─────────────────────────────────────────────────────────
  define(ctor, CLSCTOR, { value: true })
  define(ctor, 'name', { value: desc.name || '', configurable: true })

  return ctor
}

// ---------------------------------------------------------------------------
// Class helpers
// ---------------------------------------------------------------------------

function resolveKey(
  method: MethodDesc,
  scope: Scope,
  module: Module,
): string | null {
  if (method.keyName !== null) return method.keyName
  if (!method.keyCode) return null

  // Execute the key expression synchronously to get the computed key.
  const gen = vmExec(method.keyCode, [scope], module, undefined, undefined)
  let step = gen.next()
  while (!step.done) step = gen.next(step.value)
  return step.value
}

function resolveDefKey(
  propDef: PropDefDesc,
  scope: Scope,
  module: Module,
): string | null {
  if (propDef.keyName !== null) return propDef.keyName
  if (!propDef.keyCode) return null

  const gen = vmExec(propDef.keyCode, [scope], module, undefined, undefined)
  let step = gen.next()
  while (!step.done) step = gen.next(step.value)
  return step.value
}

function applyPropDef(
  propDef: PropDefDesc,
  target: any,
  scope: Scope,
  module: Module,
  superClass?: any,
): void {
  const key = resolveDefKey(propDef, scope, module)
  if (key === null) return

  let value: any
  if (propDef.funcDescIdx !== null) {
    value = createVMFunc(module.funcs[propDef.funcDescIdx], scope, module)
  } else if (propDef.valueCode) {
    const gen = vmExec(propDef.valueCode, [scope], module, target, undefined)
    let step = gen.next()
    while (!step.done) step = gen.next(step.value)
    value = step.value
  }

  if (propDef.isPrivate) {
    if (!target[PRIVATE]) define(target, PRIVATE, { value: Object.create(null), writable: true })
    target[PRIVATE][key] = value
  } else {
    target[key] = value
  }
}

// ---------------------------------------------------------------------------
// Module entry point
// ---------------------------------------------------------------------------

/**
 * Run a compiled `Module`'s top-level code synchronously in `scope`.
 */
export function runModule(module: Module, scope: Scope): any {
  const gen = vmExec(module.code, [scope], module, scope.find('this')?.get(), undefined)
  let step = gen.next()
  while (!step.done) step = gen.next(step.value)
  return step.value
}

/**
 * Run a compiled `Module`'s top-level code asynchronously (for top-level await).
 */
export function runModuleAsync(module: Module, scope: Scope): Promise<any> {
  const gen = vmExec(module.code, [scope], module, scope.find('this')?.get(), undefined)
  return runAsync(gen)
}
