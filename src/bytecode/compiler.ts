/**
 * Bytecode compiler - converts AST to bytecode instructions
 */

import type { Node } from 'acorn'
import type Scope from '../scope'
import { NEWTARGET } from '../share/const'
import {
  OpCode,
  createChunk,
  addInstruction,
  addConstant,
  createInstruction,
  type BytecodeChunk,
} from './opcodes'

export class Compiler {
  private chunk: BytecodeChunk
  private loopStack: Array<{ breakLabel: number[]; continueLabel: number[] }> = []
  private labelMap: Map<string, number> = new Map()
  private currentScope!: Scope

  constructor() {
    this.chunk = createChunk()
  }

  compile(node: Node, scope: Scope): BytecodeChunk {
    this.currentScope = scope
    this.compileNode(node, scope)
    this.emit(OpCode.HALT)
    return this.chunk
  }

  private compileNode(node: Node, scope: Scope): void {
    // Update current scope as we traverse
    this.currentScope = scope

    const handler = (this as any)[`compile${node.type}`]
    if (!handler) {
      throw new Error(`Unknown node type: ${node.type}`)
    }
    handler.call(this, node, scope)
  }

  // ===== Program =====
  private compileProgram(node: any, scope: Scope): void {
    for (const stmt of node.body) {
      this.compileNode(stmt, scope)
    }
  }

  // ===== Literals =====
  private compileLiteral(node: any, scope: Scope): void {
    if (node.regex) {
      const regex = new RegExp(node.regex.pattern, node.regex.flags)
      const idx = addConstant(this.chunk, regex)
      this.emit(OpCode.PUSH, idx)
    } else {
      const idx = addConstant(this.chunk, node.value)
      this.emit(OpCode.PUSH, idx)
    }
  }

  private compileTemplateLiteral(node: any, scope: Scope): void {
    const { quasis, expressions } = node
    for (let i = 0; i < quasis.length; i++) {
      if (quasis[i].value.cooked) {
        const idx = addConstant(this.chunk, quasis[i].value.cooked)
        this.emit(OpCode.PUSH, idx)
      }
      if (i < expressions.length) {
        this.compileNode(expressions[i], scope)
        this.emit(OpCode.ADD) // String concatenation
      }
    }
    // If multiple parts, concatenate them all
    for (let i = 1; i < quasis.length + expressions.length - 1; i++) {
      this.emit(OpCode.ADD)
    }
  }

  private compileIdentifier(node: any, scope: Scope): void {
    this.emit(OpCode.LOAD_VAR, node.name)
  }

  private compileThisExpression(node: any, scope: Scope): void {
    this.emit(OpCode.LOAD_THIS)
  }

  // ===== Binary Operations =====
  private compileBinaryExpression(node: any, scope: Scope): void {
    this.compileNode(node.left, scope)
    this.compileNode(node.right, scope)

    const opMap: Record<string, OpCode> = {
      '+': OpCode.ADD,
      '-': OpCode.SUB,
      '*': OpCode.MUL,
      '/': OpCode.DIV,
      '%': OpCode.MOD,
      '**': OpCode.EXP,
      '==': OpCode.EQ,
      '!=': OpCode.NEQ,
      '===': OpCode.SEQ,
      '!==': OpCode.SNEQ,
      '<': OpCode.LT,
      '<=': OpCode.LTE,
      '>': OpCode.GT,
      '>=': OpCode.GTE,
      '&': OpCode.BITWISE_AND,
      '|': OpCode.BITWISE_OR,
      '^': OpCode.BITWISE_XOR,
      '<<': OpCode.LEFT_SHIFT,
      '>>': OpCode.RIGHT_SHIFT,
      '>>>': OpCode.UNSIGNED_RIGHT_SHIFT,
      'in': OpCode.IN,
      'instanceof': OpCode.INSTANCEOF,
    }

    const opcode = opMap[node.operator]
    if (opcode === undefined) {
      throw new Error(`Unknown binary operator: ${node.operator}`)
    }
    this.emit(opcode)
  }

  private compileLogicalExpression(node: any, scope: Scope): void {
    this.compileNode(node.left, scope)

    if (node.operator === '&&') {
      this.emit(OpCode.DUP)
      const jumpIndex = this.emit(OpCode.JUMP_IF_FALSE, 0)
      this.emit(OpCode.POP)
      this.compileNode(node.right, scope)
      this.patchJump(jumpIndex)
    } else if (node.operator === '||') {
      this.emit(OpCode.DUP)
      const jumpIndex = this.emit(OpCode.JUMP_IF_TRUE, 0)
      this.emit(OpCode.POP)
      this.compileNode(node.right, scope)
      this.patchJump(jumpIndex)
    } else if (node.operator === '??') {
      // Nullish coalescing
      this.emit(OpCode.DUP)
      this.emit(OpCode.LOAD_NULL)
      this.emit(OpCode.SEQ)
      const jumpIfNull = this.emit(OpCode.JUMP_IF_TRUE, 0)
      this.emit(OpCode.DUP)
      this.emit(OpCode.LOAD_UNDEFINED)
      this.emit(OpCode.SEQ)
      const jumpIfUndefined = this.emit(OpCode.JUMP_IF_TRUE, 0)
      const skipRight = this.emit(OpCode.JUMP, 0)
      this.patchJump(jumpIfNull)
      this.patchJump(jumpIfUndefined)
      this.emit(OpCode.POP)
      this.compileNode(node.right, scope)
      this.patchJump(skipRight)
    }
  }

  private compileUnaryExpression(node: any, scope: Scope): void {
    this.compileNode(node.argument, scope)

    const opMap: Record<string, OpCode> = {
      '!': OpCode.NOT,
      '~': OpCode.BITWISE_NOT,
      'typeof': OpCode.TYPEOF,
      'void': OpCode.VOID,
      'delete': OpCode.DELETE,
      '+': OpCode.PLUS,
      '-': OpCode.MINUS,
    }

    const opcode = opMap[node.operator]
    if (opcode === undefined) {
      throw new Error(`Unknown unary operator: ${node.operator}`)
    }
    this.emit(opcode)
  }

  private compileUpdateExpression(node: any, scope: Scope): void {
    // For ++/-- we need to handle both prefix and postfix
    if (node.argument.type === 'Identifier') {
      this.emit(OpCode.LOAD_VAR, node.argument.name)
      if (!node.prefix) {
        this.emit(OpCode.DUP) // Keep original value for postfix
      }
      this.emit(node.operator === '++' ? OpCode.INC : OpCode.DEC)
      if (node.prefix) {
        this.emit(OpCode.DUP) // Keep new value for prefix
      }
      this.emit(OpCode.STORE_VAR, node.argument.name)
    } else if (node.argument.type === 'MemberExpression') {
      // obj.prop++ or obj[prop]++
      this.compileNode(node.argument.object, scope)
      if (node.argument.computed) {
        this.compileNode(node.argument.property, scope)
      } else {
        const idx = addConstant(this.chunk, node.argument.property.name)
        this.emit(OpCode.PUSH, idx)
      }
      this.emit(OpCode.DUP) // Duplicate obj and prop for later SET_MEMBER
      this.emit(OpCode.DUP)
      this.emit(OpCode.GET_MEMBER)
      if (!node.prefix) {
        this.emit(OpCode.DUP)
      }
      this.emit(node.operator === '++' ? OpCode.INC : OpCode.DEC)
      if (node.prefix) {
        this.emit(OpCode.DUP)
      }
      this.emit(OpCode.SET_MEMBER)
    }
  }

  // ===== Assignment =====
  private compileAssignmentExpression(node: any, scope: Scope): void {
    if (node.operator === '=') {
      this.compileNode(node.right, scope)
      this.compileAssignmentTarget(node.left, scope)
    } else {
      // Compound assignment: +=, -=, etc.
      const baseOp = node.operator.slice(0, -1) // Remove '='

      if (node.left.type === 'Identifier') {
        this.emit(OpCode.LOAD_VAR, node.left.name)
        this.compileNode(node.right, scope)
        this.emitBinaryOp(baseOp)
        this.emit(OpCode.DUP)
        this.emit(OpCode.STORE_VAR, node.left.name)
      } else if (node.left.type === 'MemberExpression') {
        this.compileNode(node.left.object, scope)
        if (node.left.computed) {
          this.compileNode(node.left.property, scope)
        } else {
          const idx = addConstant(this.chunk, node.left.property.name)
          this.emit(OpCode.PUSH, idx)
        }
        this.emit(OpCode.DUP)
        this.emit(OpCode.DUP)
        this.emit(OpCode.GET_MEMBER)
        this.compileNode(node.right, scope)
        this.emitBinaryOp(baseOp)
        this.emit(OpCode.DUP)
        this.emit(OpCode.SET_MEMBER)
      }
    }
  }

  private compileAssignmentTarget(target: any, scope: Scope): void {
    if (target.type === 'Identifier') {
      this.emit(OpCode.DUP)
      this.emit(OpCode.STORE_VAR, target.name)
    } else if (target.type === 'MemberExpression') {
      this.compileNode(target.object, scope)
      if (target.computed) {
        this.compileNode(target.property, scope)
      } else {
        const idx = addConstant(this.chunk, target.property.name)
        this.emit(OpCode.PUSH, idx)
      }
      this.emit(OpCode.SET_MEMBER)
    } else if (target.type === 'ArrayPattern' || target.type === 'ObjectPattern') {
      // Destructuring assignment - complex case
      this.compilePattern(target, scope)
    }
  }

  private emitBinaryOp(operator: string): void {
    const opMap: Record<string, OpCode> = {
      '+': OpCode.ADD,
      '-': OpCode.SUB,
      '*': OpCode.MUL,
      '/': OpCode.DIV,
      '%': OpCode.MOD,
      '**': OpCode.EXP,
      '&': OpCode.BITWISE_AND,
      '|': OpCode.BITWISE_OR,
      '^': OpCode.BITWISE_XOR,
      '<<': OpCode.LEFT_SHIFT,
      '>>': OpCode.RIGHT_SHIFT,
      '>>>': OpCode.UNSIGNED_RIGHT_SHIFT,
    }
    const opcode = opMap[operator]
    if (opcode === undefined) {
      throw new Error(`Unknown binary operator in compound assignment: ${operator}`)
    }
    this.emit(opcode)
  }

  // ===== Member & Call Expressions =====
  private compileMemberExpression(node: any, scope: Scope): void {
    this.compileNode(node.object, scope)
    if (node.computed) {
      this.compileNode(node.property, scope)
    } else {
      const idx = addConstant(this.chunk, node.property.name)
      this.emit(OpCode.PUSH, idx)
    }
    this.emit(OpCode.GET_MEMBER)
  }

  private compileCallExpression(node: any, scope: Scope): void {
    // Compile arguments
    for (const arg of node.arguments) {
      this.compileNode(arg, scope)
    }
    // Compile callee
    this.compileNode(node.callee, scope)
    // Call with argument count
    this.emit(OpCode.CALL, node.arguments.length)
  }

  private compileNewExpression(node: any, scope: Scope): void {
    // Compile arguments
    for (const arg of node.arguments) {
      this.compileNode(arg, scope)
    }
    // Compile constructor
    this.compileNode(node.callee, scope)
    // New with argument count
    this.emit(OpCode.NEW, node.arguments.length)
  }

  // ===== Statements =====
  private compileExpressionStatement(node: any, scope: Scope): void {
    this.compileNode(node.expression, scope)
    this.emit(OpCode.POP) // Expression statement result is discarded
  }

  private compileBlockStatement(node: any, scope: Scope): void {
    this.emit(OpCode.PUSH_SCOPE)
    for (const stmt of node.body) {
      this.compileNode(stmt, scope)
    }
    this.emit(OpCode.POP_SCOPE)
  }

  private compileReturnStatement(node: any, scope: Scope): void {
    if (node.argument) {
      this.compileNode(node.argument, scope)
    } else {
      this.emit(OpCode.LOAD_UNDEFINED)
    }
    this.emit(OpCode.RETURN)
  }

  private compileIfStatement(node: any, scope: Scope): void {
    this.compileNode(node.test, scope)
    const jumpIfFalse = this.emit(OpCode.JUMP_IF_FALSE, 0)

    this.compileNode(node.consequent, scope)

    if (node.alternate) {
      const jumpEnd = this.emit(OpCode.JUMP, 0)
      this.patchJump(jumpIfFalse)
      this.compileNode(node.alternate, scope)
      this.patchJump(jumpEnd)
    } else {
      this.patchJump(jumpIfFalse)
    }
  }

  private compileWhileStatement(node: any, scope: Scope): void {
    const loopStart = this.chunk.instructions.length
    const breakLabels: number[] = []
    const continueLabels: number[] = []

    this.loopStack.push({ breakLabel: breakLabels, continueLabel: continueLabels })

    this.compileNode(node.test, scope)
    const jumpIfFalse = this.emit(OpCode.JUMP_IF_FALSE, 0)

    this.compileNode(node.body, scope)

    this.emit(OpCode.JUMP, loopStart)
    this.patchJump(jumpIfFalse)

    // Patch break/continue jumps
    const loopEnd = this.chunk.instructions.length
    for (const label of breakLabels) {
      this.chunk.instructions[label].operand = loopEnd
    }
    for (const label of continueLabels) {
      this.chunk.instructions[label].operand = loopStart
    }

    this.loopStack.pop()
  }

  private compileDoWhileStatement(node: any, scope: Scope): void {
    const loopStart = this.chunk.instructions.length
    const breakLabels: number[] = []
    const continueLabels: number[] = []

    this.loopStack.push({ breakLabel: breakLabels, continueLabel: continueLabels })

    this.compileNode(node.body, scope)

    const testStart = this.chunk.instructions.length
    this.compileNode(node.test, scope)
    this.emit(OpCode.JUMP_IF_TRUE, loopStart)

    const loopEnd = this.chunk.instructions.length
    for (const label of breakLabels) {
      this.chunk.instructions[label].operand = loopEnd
    }
    for (const label of continueLabels) {
      this.chunk.instructions[label].operand = testStart
    }

    this.loopStack.pop()
  }

  private compileForStatement(node: any, scope: Scope): void {
    this.emit(OpCode.PUSH_SCOPE)

    if (node.init) {
      this.compileNode(node.init, scope)
      if (node.init.type !== 'VariableDeclaration') {
        this.emit(OpCode.POP)
      }
    }

    const loopStart = this.chunk.instructions.length
    const breakLabels: number[] = []
    const continueLabels: number[] = []

    this.loopStack.push({ breakLabel: breakLabels, continueLabel: continueLabels })

    let jumpIfFalse: number | null = null
    if (node.test) {
      this.compileNode(node.test, scope)
      jumpIfFalse = this.emit(OpCode.JUMP_IF_FALSE, 0)
    }

    this.compileNode(node.body, scope)

    const updateStart = this.chunk.instructions.length
    if (node.update) {
      this.compileNode(node.update, scope)
      this.emit(OpCode.POP)
    }

    this.emit(OpCode.JUMP, loopStart)

    const loopEnd = this.chunk.instructions.length
    if (jumpIfFalse !== null) {
      this.patchJump(jumpIfFalse)
    }

    for (const label of breakLabels) {
      this.chunk.instructions[label].operand = loopEnd
    }
    for (const label of continueLabels) {
      this.chunk.instructions[label].operand = updateStart
    }

    this.loopStack.pop()
    this.emit(OpCode.POP_SCOPE)
  }

  private compileBreakStatement(node: any, scope: Scope): void {
    if (this.loopStack.length === 0) {
      throw new Error('Break statement outside of loop')
    }
    const breakIndex = this.emit(OpCode.JUMP, 0)
    this.loopStack[this.loopStack.length - 1].breakLabel.push(breakIndex)
  }

  private compileContinueStatement(node: any, scope: Scope): void {
    if (this.loopStack.length === 0) {
      throw new Error('Continue statement outside of loop')
    }
    const continueIndex = this.emit(OpCode.JUMP, 0)
    this.loopStack[this.loopStack.length - 1].continueLabel.push(continueIndex)
  }

  // ===== Declarations =====
  private compileVariableDeclaration(node: any, scope: Scope): void {
    for (const declarator of node.declarations) {
      if (declarator.init) {
        this.compileNode(declarator.init, scope)
      } else {
        this.emit(OpCode.LOAD_UNDEFINED)
      }

      if (declarator.id.type === 'Identifier') {
        if (node.kind === 'const') {
          this.emit(OpCode.DECLARE_CONST, declarator.id.name)
        } else if (node.kind === 'let') {
          this.emit(OpCode.DECLARE_LET, declarator.id.name)
        } else {
          this.emit(OpCode.DECLARE_VAR, declarator.id.name)
        }
      } else {
        // Destructuring
        this.compilePattern(declarator.id, scope)
      }
    }
  }

  private compileFunctionDeclaration(node: any, scope: Scope): void {
    const funcIdx = addConstant(this.chunk, node)
    this.emit(OpCode.CREATE_FUNCTION, funcIdx)
    this.emit(OpCode.DECLARE_VAR, node.id.name)
  }

  // ===== Special =====
  private compileConditionalExpression(node: any, scope: Scope): void {
    this.compileNode(node.test, scope)
    const jumpIfFalse = this.emit(OpCode.JUMP_IF_FALSE, 0)
    this.compileNode(node.consequent, scope)
    const jumpEnd = this.emit(OpCode.JUMP, 0)
    this.patchJump(jumpIfFalse)
    this.compileNode(node.alternate, scope)
    this.patchJump(jumpEnd)
  }

  private compileSequenceExpression(node: any, scope: Scope): void {
    for (let i = 0; i < node.expressions.length; i++) {
      this.compileNode(node.expressions[i], scope)
      if (i < node.expressions.length - 1) {
        this.emit(OpCode.POP)
      }
    }
  }

  private compileArrayExpression(node: any, scope: Scope): void {
    for (const element of node.elements) {
      if (element) {
        if (element.type === 'SpreadElement') {
          this.compileNode(element.argument, scope)
          this.emit(OpCode.SPREAD)
        } else {
          this.compileNode(element, scope)
        }
      } else {
        this.emit(OpCode.LOAD_UNDEFINED)
      }
    }
    this.emit(OpCode.NEW_ARRAY, node.elements.length)
  }

  private compileObjectExpression(node: any, scope: Scope): void {
    let propCount = 0
    for (const prop of node.properties) {
      if (prop.type === 'SpreadElement') {
        this.compileNode(prop.argument, scope)
        this.emit(OpCode.SPREAD)
      } else {
        // Key
        if (prop.computed) {
          this.compileNode(prop.key, scope)
        } else {
          const key = prop.key.type === 'Identifier' ? prop.key.name : prop.key.value
          const idx = addConstant(this.chunk, key)
          this.emit(OpCode.PUSH, idx)
        }
        // Value
        this.compileNode(prop.value, scope)
        propCount++
      }
    }
    this.emit(OpCode.NEW_OBJECT, propCount)
  }

  private compileArrowFunctionExpression(node: any, scope: Scope): void {
    const funcIdx = addConstant(this.chunk, node)
    this.emit(OpCode.CREATE_ARROW_FUNCTION, funcIdx)
  }

  private compileFunctionExpression(node: any, scope: Scope): void {
    const funcIdx = addConstant(this.chunk, node)
    this.emit(OpCode.CREATE_FUNCTION, funcIdx)
  }

  private compileAwaitExpression(node: any, scope: Scope): void {
    this.compileNode(node.argument, scope)
    this.emit(OpCode.AWAIT)
  }

  private compileYieldExpression(node: any, scope: Scope): void {
    if (node.argument) {
      this.compileNode(node.argument, scope)
    } else {
      this.emit(OpCode.LOAD_UNDEFINED)
    }
    this.emit(OpCode.YIELD, node.delegate ? 1 : 0)
  }

  private compileThrowStatement(node: any, scope: Scope): void {
    this.compileNode(node.argument, scope)
    this.emit(OpCode.THROW)
  }

  private compileTryStatement(node: any, scope: Scope): void {
    this.emit(OpCode.TRY_START)
    this.compileNode(node.block, scope)
    this.emit(OpCode.TRY_END)

    if (node.handler) {
      this.emit(OpCode.CATCH_START, node.handler.param?.name)
      this.compileNode(node.handler.body, scope)
      this.emit(OpCode.CATCH_END)
    }

    if (node.finalizer) {
      this.emit(OpCode.FINALLY_START)
      this.compileNode(node.finalizer, scope)
      this.emit(OpCode.FINALLY_END)
    }
  }

  private compileSwitchStatement(node: any, scope: Scope): void {
    this.compileNode(node.discriminant, scope)

    const caseJumps: number[] = []
    const breakLabels: number[] = []

    this.loopStack.push({ breakLabel: breakLabels, continueLabel: [] })

    // Generate case tests
    for (const switchCase of node.cases) {
      if (switchCase.test) {
        this.emit(OpCode.DUP)
        this.compileNode(switchCase.test, scope)
        this.emit(OpCode.SEQ)
        caseJumps.push(this.emit(OpCode.JUMP_IF_TRUE, 0))
      }
    }

    // Default case or end
    const defaultJump = this.emit(OpCode.JUMP, 0)

    // Patch case jumps and compile case bodies
    let caseIndex = 0
    for (let i = 0; i < node.cases.length; i++) {
      const switchCase = node.cases[i]
      if (switchCase.test) {
        this.patchJump(caseJumps[caseIndex++])
      }
      for (const stmt of switchCase.consequent) {
        this.compileNode(stmt, scope)
      }
    }

    const endLabel = this.chunk.instructions.length
    this.patchJump(defaultJump)

    for (const label of breakLabels) {
      this.chunk.instructions[label].operand = endLabel
    }

    this.loopStack.pop()
    this.emit(OpCode.POP) // Pop discriminant
  }

  // ===== Pattern compilation (destructuring) =====
  private compilePattern(pattern: any, scope: Scope): void {
    // Simplified pattern handling - full implementation would be more complex
    if (pattern.type === 'Identifier') {
      this.emit(OpCode.STORE_VAR, pattern.name)
    } else if (pattern.type === 'ArrayPattern') {
      // Array destructuring
      for (let i = 0; i < pattern.elements.length; i++) {
        const element = pattern.elements[i]
        if (element) {
          this.emit(OpCode.DUP)
          const idx = addConstant(this.chunk, i)
          this.emit(OpCode.PUSH, idx)
          this.emit(OpCode.GET_MEMBER)
          this.compilePattern(element, scope)
        }
      }
      this.emit(OpCode.POP)
    } else if (pattern.type === 'ObjectPattern') {
      // Object destructuring
      for (const property of pattern.properties) {
        this.emit(OpCode.DUP)
        const key = property.key.name || property.key.value
        const idx = addConstant(this.chunk, key)
        this.emit(OpCode.PUSH, idx)
        this.emit(OpCode.GET_MEMBER)
        this.compilePattern(property.value, scope)
      }
      this.emit(OpCode.POP)
    }
  }

  // ===== Additional statement types =====
  private compileEmptyStatement(node: any, scope: Scope): void {
    // Empty statement - no code generation needed
  }

  private compileDebuggerStatement(node: any, scope: Scope): void {
    // Debugger statement - in a real implementation this would set a breakpoint
    this.emit(OpCode.NOP)
  }

  private compileLabeledStatement(node: any, scope: Scope): void {
    // Store label position for break/continue
    const labelStart = this.chunk.instructions.length
    this.labelMap.set(node.label.name, labelStart)
    this.compileNode(node.body, scope)
    this.labelMap.delete(node.label.name)
  }

  private compileWithStatement(node: any, scope: Scope): void {
    // With statement - simplified implementation
    // In a full implementation, this would modify scope chain
    this.compileNode(node.object, scope)
    this.emit(OpCode.POP)
    this.compileNode(node.body, scope)
  }

  // ===== For-in and For-of loops =====
  private compileForInStatement(node: any, scope: Scope): void {
    this.emit(OpCode.PUSH_SCOPE)

    // Get the object to iterate over
    this.compileNode(node.right, scope)
    this.emit(OpCode.DECLARE_VAR, 'FOR_IN_OBJ')

    // Get keys array
    this.emit(OpCode.LOAD_VAR, 'FOR_IN_OBJ')
    // For now, we need to call Object.keys - simplified
    // In a real implementation, we'd have a special opcode
    const loopStart = this.chunk.instructions.length

    const breakLabels: number[] = []
    const continueLabels: number[] = []
    this.loopStack.push({ breakLabel: breakLabels, continueLabel: continueLabels })

    // Simplified: just compile the body
    // Full implementation would need iterator protocol
    this.compileNode(node.body, scope)

    this.emit(OpCode.JUMP, loopStart)

    const loopEnd = this.chunk.instructions.length
    for (const label of breakLabels) {
      this.chunk.instructions[label].operand = loopEnd
    }
    for (const label of continueLabels) {
      this.chunk.instructions[label].operand = loopStart
    }

    this.loopStack.pop()
    this.emit(OpCode.POP_SCOPE)
  }

  private compileForOfStatement(node: any, scope: Scope): void {
    this.emit(OpCode.PUSH_SCOPE)

    // Similar to for-in but uses iterator protocol
    this.compileNode(node.right, scope)
    this.emit(OpCode.DECLARE_VAR, 'FOR_OF_ITERABLE')

    const loopStart = this.chunk.instructions.length

    const breakLabels: number[] = []
    const continueLabels: number[] = []
    this.loopStack.push({ breakLabel: breakLabels, continueLabel: continueLabels })

    // Simplified: just compile the body
    this.compileNode(node.body, scope)

    this.emit(OpCode.JUMP, loopStart)

    const loopEnd = this.chunk.instructions.length
    for (const label of breakLabels) {
      this.chunk.instructions[label].operand = loopEnd
    }
    for (const label of continueLabels) {
      this.chunk.instructions[label].operand = loopStart
    }

    this.loopStack.pop()
    this.emit(OpCode.POP_SCOPE)
  }

  // ===== Class declarations =====
  private compileClassDeclaration(node: any, scope: Scope): void {
    const classIdx = addConstant(this.chunk, node)
    this.emit(OpCode.CREATE_CLASS, classIdx)
    this.emit(OpCode.DECLARE_VAR, node.id.name)
  }

  private compileClassExpression(node: any, scope: Scope): void {
    const classIdx = addConstant(this.chunk, node)
    this.emit(OpCode.CREATE_CLASS, classIdx)
  }

  // ===== Import/Export =====
  private compileImportDeclaration(node: any, scope: Scope): void {
    // Import declarations are handled at parse time by Sval.import()
    // No runtime code generation needed
  }

  private compileExportNamedDeclaration(node: any, scope: Scope): void {
    if (node.declaration) {
      this.compileNode(node.declaration, scope)
    }
    // Exports are handled via the exports object
  }

  private compileExportDefaultDeclaration(node: any, scope: Scope): void {
    this.compileNode(node.declaration, scope)
    // Store to exports.default
    this.emit(OpCode.LOAD_VAR, 'exports')
    const idx = addConstant(this.chunk, 'default')
    this.emit(OpCode.PUSH, idx)
    this.emit(OpCode.SET_MEMBER)
    this.emit(OpCode.POP)
  }

  private compileExportAllDeclaration(node: any, scope: Scope): void {
    // Export all - simplified
  }

  // ===== Special expressions =====
  private compileChainExpression(node: any, scope: Scope): void {
    // Optional chaining - simplified
    this.compileNode(node.expression, scope)
  }

  private compileMetaProperty(node: any, scope: Scope): void {
    // new.target or import.meta
    if (node.meta.name === 'new' && node.property.name === 'target') {
      // Load new.target from scope
      const variable = this.currentScope.$find(NEWTARGET)
      if (variable) {
        this.emit(OpCode.LOAD_VAR, NEWTARGET)
      } else {
        this.emit(OpCode.LOAD_UNDEFINED)
      }
    } else if (node.meta.name === 'import' && node.property.name === 'meta') {
      // import.meta - would need module context
      this.emit(OpCode.LOAD_UNDEFINED)
    }
  }

  private compileSpreadElement(node: any, scope: Scope): void {
    this.compileNode(node.argument, scope)
    this.emit(OpCode.SPREAD)
  }

  private compileRestElement(node: any, scope: Scope): void {
    // Rest element in destructuring - simplified
    this.compilePattern(node.argument, scope)
  }

  private compileAssignmentPattern(node: any, scope: Scope): void {
    // Assignment pattern in destructuring (default values)
    // value = value ?? default
    this.emit(OpCode.DUP)
    this.emit(OpCode.LOAD_UNDEFINED)
    this.emit(OpCode.SEQ)
    const jumpIfDefined = this.emit(OpCode.JUMP_IF_FALSE, 0)
    this.emit(OpCode.POP)
    this.compileNode(node.right, scope)
    this.patchJump(jumpIfDefined)
    this.compilePattern(node.left, scope)
  }

  private compileProperty(node: any, scope: Scope): void {
    // Property in object expression - handled by parent
    if (node.kind === 'init') {
      if (node.method) {
        // Method
        const funcIdx = addConstant(this.chunk, node.value)
        this.emit(OpCode.CREATE_FUNCTION, funcIdx)
      } else {
        this.compileNode(node.value, scope)
      }
    } else if (node.kind === 'get' || node.kind === 'set') {
      // Getter/setter - simplified
      const funcIdx = addConstant(this.chunk, node.value)
      this.emit(OpCode.CREATE_FUNCTION, funcIdx)
    }
  }

  private compileMethodDefinition(node: any, scope: Scope): void {
    // Method definition in class - handled by class compilation
  }

  private compilePropertyDefinition(node: any, scope: Scope): void {
    // Class field - handled by class compilation
  }

  private compileSuper(node: any, scope: Scope): void {
    // Super keyword
    this.emit(OpCode.CREATE_SUPER)
  }

  private compileImportExpression(node: any, scope: Scope): void {
    // Dynamic import() - would need async support
    this.compileNode(node.source, scope)
    // Simplified - would need actual import logic
    this.emit(OpCode.LOAD_UNDEFINED)
  }

  private compileTaggedTemplateExpression(node: any, scope: Scope): void {
    // Tagged template literal
    // tag`template`

    // Compile the tag function
    this.compileNode(node.tag, scope)

    // Create the template strings array
    const strings = node.quasi.quasis.map((q: any) => q.value.cooked)
    const stringsIdx = addConstant(this.chunk, strings)
    this.emit(OpCode.PUSH, stringsIdx)

    // Compile the expressions
    for (const expr of node.quasi.expressions) {
      this.compileNode(expr, scope)
    }

    // Call the tag function
    this.emit(OpCode.CALL, 1 + node.quasi.expressions.length)
  }

  // ===== Helper methods =====
  private emit(opcode: OpCode, operand?: any): number {
    const instruction = createInstruction(opcode, operand)
    return addInstruction(this.chunk, instruction)
  }

  private patchJump(instructionIndex: number): void {
    const jump = this.chunk.instructions.length
    this.chunk.instructions[instructionIndex].operand = jump
  }

  getChunk(): BytecodeChunk {
    return this.chunk
  }
}
