/**
 * Virtual Machine - executes bytecode instructions using stacks
 */

import Scope from '../scope'
import { Var } from '../scope/variable'
import { OpCode, type BytecodeChunk, type Instruction } from './opcodes'
import { Compiler } from './compiler'
import { AWAIT } from '../share/async'

class CallFrame {
  chunk: BytecodeChunk
  ip: number = 0 // Instruction pointer
  slots: any[] = [] // Local variables
  returnAddress: number = 0

  constructor(chunk: BytecodeChunk, returnAddress: number = 0) {
    this.chunk = chunk
    this.returnAddress = returnAddress
  }
}

export class VM {
  private stack: any[] = []
  private callStack: CallFrame[] = []
  private currentFrame: CallFrame | null = null
  private scopeStack: Scope[] = []
  private currentScope: Scope
  private halted: boolean = false
  private isAsync: boolean = false

  constructor(private rootScope: Scope, isAsync: boolean = false) {
    this.currentScope = rootScope
    this.scopeStack.push(rootScope)
    this.isAsync = isAsync
  }

  execute(chunk: BytecodeChunk): any {
    this.currentFrame = new CallFrame(chunk)
    this.callStack.push(this.currentFrame)

    while (!this.halted && this.currentFrame.ip < this.currentFrame.chunk.instructions.length) {
      const instruction = this.currentFrame.chunk.instructions[this.currentFrame.ip]
      this.currentFrame.ip++

      try {
        this.executeInstruction(instruction)
      } catch (error) {
        // Handle runtime errors
        throw error
      }
    }

    // Return top of stack or undefined
    return this.stack.length > 0 ? this.stack.pop() : undefined
  }

  async executeAsync(chunk: BytecodeChunk): Promise<any> {
    this.currentFrame = new CallFrame(chunk)
    this.callStack.push(this.currentFrame)

    while (!this.halted && this.currentFrame.ip < this.currentFrame.chunk.instructions.length) {
      const instruction = this.currentFrame.chunk.instructions[this.currentFrame.ip]
      this.currentFrame.ip++

      try {
        await this.executeInstructionAsync(instruction)
      } catch (error) {
        // Handle runtime errors
        throw error
      }
    }

    // Return top of stack or undefined
    return this.stack.length > 0 ? this.stack.pop() : undefined
  }

  private executeInstruction(instruction: Instruction): void {
    const { opcode, operand } = instruction

    switch (opcode) {
      // ===== Stack operations =====
      case OpCode.PUSH: {
        const value = this.currentFrame!.chunk.constants[operand]
        this.push(value)
        break
      }

      case OpCode.POP: {
        this.pop()
        break
      }

      case OpCode.DUP: {
        const value = this.peek()
        this.push(value)
        break
      }

      // ===== Literal operations =====
      case OpCode.LOAD_UNDEFINED: {
        this.push(undefined)
        break
      }

      case OpCode.LOAD_NULL: {
        this.push(null)
        break
      }

      case OpCode.LOAD_TRUE: {
        this.push(true)
        break
      }

      case OpCode.LOAD_FALSE: {
        this.push(false)
        break
      }

      case OpCode.LOAD_THIS: {
        const thisValue = this.currentScope.find('this')?.get()
        this.push(thisValue)
        break
      }

      // ===== Variable operations =====
      case OpCode.LOAD_VAR: {
        const name = operand
        const variable = this.currentScope.find(name)
        if (!variable) {
          throw new ReferenceError(`${name} is not defined`)
        }
        this.push(variable.get())
        break
      }

      case OpCode.STORE_VAR: {
        const name = operand
        const value = this.peek()
        const variable = this.currentScope.find(name)
        if (!variable) {
          // Create global variable in non-strict mode
          this.currentScope.var(name, value)
        } else {
          variable.set(value)
        }
        break
      }

      case OpCode.DECLARE_VAR: {
        const name = operand
        const value = this.pop()
        this.currentScope.var(name, value)
        break
      }

      case OpCode.DECLARE_CONST: {
        const name = operand
        const value = this.pop()
        this.currentScope.const(name, value)
        break
      }

      case OpCode.DECLARE_LET: {
        const name = operand
        const value = this.pop()
        this.currentScope.let(name, value)
        break
      }

      // ===== Binary operations =====
      case OpCode.ADD: {
        const right = this.pop()
        const left = this.pop()
        this.push(left + right)
        break
      }

      case OpCode.SUB: {
        const right = this.pop()
        const left = this.pop()
        this.push(left - right)
        break
      }

      case OpCode.MUL: {
        const right = this.pop()
        const left = this.pop()
        this.push(left * right)
        break
      }

      case OpCode.DIV: {
        const right = this.pop()
        const left = this.pop()
        this.push(left / right)
        break
      }

      case OpCode.MOD: {
        const right = this.pop()
        const left = this.pop()
        this.push(left % right)
        break
      }

      case OpCode.EXP: {
        const right = this.pop()
        const left = this.pop()
        this.push(left ** right)
        break
      }

      case OpCode.EQ: {
        const right = this.pop()
        const left = this.pop()
        this.push(left == right)
        break
      }

      case OpCode.NEQ: {
        const right = this.pop()
        const left = this.pop()
        this.push(left != right)
        break
      }

      case OpCode.SEQ: {
        const right = this.pop()
        const left = this.pop()
        this.push(left === right)
        break
      }

      case OpCode.SNEQ: {
        const right = this.pop()
        const left = this.pop()
        this.push(left !== right)
        break
      }

      case OpCode.LT: {
        const right = this.pop()
        const left = this.pop()
        this.push(left < right)
        break
      }

      case OpCode.LTE: {
        const right = this.pop()
        const left = this.pop()
        this.push(left <= right)
        break
      }

      case OpCode.GT: {
        const right = this.pop()
        const left = this.pop()
        this.push(left > right)
        break
      }

      case OpCode.GTE: {
        const right = this.pop()
        const left = this.pop()
        this.push(left >= right)
        break
      }

      case OpCode.BITWISE_AND: {
        const right = this.pop()
        const left = this.pop()
        this.push(left & right)
        break
      }

      case OpCode.BITWISE_OR: {
        const right = this.pop()
        const left = this.pop()
        this.push(left | right)
        break
      }

      case OpCode.BITWISE_XOR: {
        const right = this.pop()
        const left = this.pop()
        this.push(left ^ right)
        break
      }

      case OpCode.LEFT_SHIFT: {
        const right = this.pop()
        const left = this.pop()
        this.push(left << right)
        break
      }

      case OpCode.RIGHT_SHIFT: {
        const right = this.pop()
        const left = this.pop()
        this.push(left >> right)
        break
      }

      case OpCode.UNSIGNED_RIGHT_SHIFT: {
        const right = this.pop()
        const left = this.pop()
        this.push(left >>> right)
        break
      }

      case OpCode.IN: {
        const right = this.pop()
        const left = this.pop()
        this.push(left in right)
        break
      }

      case OpCode.INSTANCEOF: {
        const right = this.pop()
        const left = this.pop()
        this.push(left instanceof right)
        break
      }

      // ===== Unary operations =====
      case OpCode.NOT: {
        const value = this.pop()
        this.push(!value)
        break
      }

      case OpCode.BITWISE_NOT: {
        const value = this.pop()
        this.push(~value)
        break
      }

      case OpCode.TYPEOF: {
        const value = this.pop()
        this.push(typeof value)
        break
      }

      case OpCode.VOID: {
        this.pop()
        this.push(undefined)
        break
      }

      case OpCode.DELETE: {
        // Simplified delete - would need more context
        this.pop()
        this.push(true)
        break
      }

      case OpCode.PLUS: {
        const value = this.pop()
        this.push(+value)
        break
      }

      case OpCode.MINUS: {
        const value = this.pop()
        this.push(-value)
        break
      }

      // ===== Update operations =====
      case OpCode.INC: {
        const value = this.pop()
        this.push(value + 1)
        break
      }

      case OpCode.DEC: {
        const value = this.pop()
        this.push(value - 1)
        break
      }

      // ===== Property access =====
      case OpCode.GET_MEMBER: {
        const property = this.pop()
        const object = this.pop()
        this.push(object[property])
        break
      }

      case OpCode.SET_MEMBER: {
        const value = this.pop()
        const property = this.pop()
        const object = this.pop()
        object[property] = value
        this.push(value)
        break
      }

      // ===== Function operations =====
      case OpCode.CALL: {
        const argCount = operand
        const callee = this.pop()
        const args = []
        for (let i = 0; i < argCount; i++) {
          args.unshift(this.pop())
        }

        if (typeof callee !== 'function') {
          throw new TypeError(`${callee} is not a function`)
        }

        const result = callee(...args)
        this.push(result)
        break
      }

      case OpCode.NEW: {
        const argCount = operand
        const constructor = this.pop()
        const args = []
        for (let i = 0; i < argCount; i++) {
          args.unshift(this.pop())
        }

        const instance = new constructor(...args)
        this.push(instance)
        break
      }

      case OpCode.RETURN: {
        const returnValue = this.pop()

        // Pop the current frame
        this.callStack.pop()

        if (this.callStack.length > 0) {
          this.currentFrame = this.callStack[this.callStack.length - 1]
          this.push(returnValue)
        } else {
          this.push(returnValue)
          this.halted = true
        }
        break
      }

      case OpCode.AWAIT: {
        throw new Error('AWAIT instruction requires async execution')
      }

      case OpCode.YIELD: {
        const value = this.pop()
        // For now, just push the value back
        // Full generator support would require more infrastructure
        this.push(value)
        break
      }

      // ===== Object/Array operations =====
      case OpCode.NEW_OBJECT: {
        const propCount = operand
        const obj: any = {}
        for (let i = propCount - 1; i >= 0; i--) {
          const value = this.pop()
          const key = this.pop()
          obj[key] = value
        }
        this.push(obj)
        break
      }

      case OpCode.NEW_ARRAY: {
        const elementCount = operand
        const arr: any[] = []
        for (let i = 0; i < elementCount; i++) {
          arr.unshift(this.pop())
        }
        this.push(arr)
        break
      }

      case OpCode.SPREAD: {
        const iterable = this.pop()
        // Spread into array - simplified
        if (Array.isArray(iterable)) {
          for (const item of iterable) {
            this.push(item)
          }
        } else if (typeof iterable === 'object' && iterable !== null) {
          for (const key in iterable) {
            this.push(key)
            this.push(iterable[key])
          }
        }
        break
      }

      // ===== Control flow =====
      case OpCode.JUMP: {
        this.currentFrame!.ip = operand
        break
      }

      case OpCode.JUMP_IF_FALSE: {
        const condition = this.pop()
        if (!condition) {
          this.currentFrame!.ip = operand
        }
        break
      }

      case OpCode.JUMP_IF_TRUE: {
        const condition = this.pop()
        if (condition) {
          this.currentFrame!.ip = operand
        }
        break
      }

      // ===== Scope operations =====
      case OpCode.PUSH_SCOPE: {
        const newScope = new Scope(this.currentScope)
        this.scopeStack.push(newScope)
        this.currentScope = newScope
        break
      }

      case OpCode.POP_SCOPE: {
        this.scopeStack.pop()
        if (this.scopeStack.length > 0) {
          this.currentScope = this.scopeStack[this.scopeStack.length - 1]
        }
        break
      }

      // ===== Function/Class creation =====
      case OpCode.CREATE_FUNCTION: {
        const funcNode = this.currentFrame!.chunk.constants[operand]
        const func = this.createFunction(funcNode, this.currentScope)
        this.push(func)
        break
      }

      case OpCode.CREATE_ARROW_FUNCTION: {
        const funcNode = this.currentFrame!.chunk.constants[operand]
        const func = this.createArrowFunction(funcNode, this.currentScope)
        this.push(func)
        break
      }

      case OpCode.CREATE_CLASS: {
        // Simplified class creation
        const classNode = this.currentFrame!.chunk.constants[operand]
        const classConstructor = this.createClass(classNode, this.currentScope)
        this.push(classConstructor)
        break
      }

      // ===== Exception handling =====
      case OpCode.THROW: {
        const error = this.pop()
        throw error
      }

      case OpCode.TRY_START:
      case OpCode.TRY_END:
      case OpCode.CATCH_START:
      case OpCode.CATCH_END:
      case OpCode.FINALLY_START:
      case OpCode.FINALLY_END: {
        // Exception handling would require more complex control flow
        // For now, these are placeholders
        break
      }

      // ===== Loop control =====
      case OpCode.BREAK:
      case OpCode.CONTINUE: {
        // These are handled by jump instructions in the compiler
        break
      }

      // ===== Special =====
      case OpCode.NOP: {
        // No operation
        break
      }

      case OpCode.HALT: {
        this.halted = true
        break
      }

      default: {
        throw new Error(`Unknown opcode: ${opcode}`)
      }
    }
  }

  private async executeInstructionAsync(instruction: Instruction): Promise<void> {
    const { opcode, operand } = instruction

    switch (opcode) {
      // ===== Stack operations =====
      case OpCode.PUSH: {
        const value = this.currentFrame!.chunk.constants[operand]
        this.push(value)
        break
      }

      case OpCode.POP: {
        this.pop()
        break
      }

      case OpCode.DUP: {
        const value = this.peek()
        this.push(value)
        break
      }

      // ===== Literal operations =====
      case OpCode.LOAD_UNDEFINED: {
        this.push(undefined)
        break
      }

      case OpCode.LOAD_NULL: {
        this.push(null)
        break
      }

      case OpCode.LOAD_TRUE: {
        this.push(true)
        break
      }

      case OpCode.LOAD_FALSE: {
        this.push(false)
        break
      }

      case OpCode.LOAD_THIS: {
        const thisValue = this.currentScope.find('this')?.get()
        this.push(thisValue)
        break
      }

      // ===== Variable operations =====
      case OpCode.LOAD_VAR: {
        const name = operand
        const variable = this.currentScope.find(name)
        if (!variable) {
          throw new ReferenceError(`${name} is not defined`)
        }
        this.push(variable.get())
        break
      }

      case OpCode.STORE_VAR: {
        const name = operand
        const value = this.peek()
        const variable = this.currentScope.find(name)
        if (!variable) {
          // Create global variable in non-strict mode
          this.currentScope.var(name, value)
        } else {
          variable.set(value)
        }
        break
      }

      case OpCode.DECLARE_VAR: {
        const name = operand
        const value = this.pop()
        this.currentScope.var(name, value)
        break
      }

      case OpCode.DECLARE_CONST: {
        const name = operand
        const value = this.pop()
        this.currentScope.const(name, value)
        break
      }

      case OpCode.DECLARE_LET: {
        const name = operand
        const value = this.pop()
        this.currentScope.let(name, value)
        break
      }

      // ===== Binary operations =====
      case OpCode.ADD: {
        const right = this.pop()
        const left = this.pop()
        this.push(left + right)
        break
      }

      case OpCode.SUB: {
        const right = this.pop()
        const left = this.pop()
        this.push(left - right)
        break
      }

      case OpCode.MUL: {
        const right = this.pop()
        const left = this.pop()
        this.push(left * right)
        break
      }

      case OpCode.DIV: {
        const right = this.pop()
        const left = this.pop()
        this.push(left / right)
        break
      }

      case OpCode.MOD: {
        const right = this.pop()
        const left = this.pop()
        this.push(left % right)
        break
      }

      case OpCode.EXP: {
        const right = this.pop()
        const left = this.pop()
        this.push(left ** right)
        break
      }

      case OpCode.EQ: {
        const right = this.pop()
        const left = this.pop()
        this.push(left == right)
        break
      }

      case OpCode.NEQ: {
        const right = this.pop()
        const left = this.pop()
        this.push(left != right)
        break
      }

      case OpCode.SEQ: {
        const right = this.pop()
        const left = this.pop()
        this.push(left === right)
        break
      }

      case OpCode.SNEQ: {
        const right = this.pop()
        const left = this.pop()
        this.push(left !== right)
        break
      }

      case OpCode.LT: {
        const right = this.pop()
        const left = this.pop()
        this.push(left < right)
        break
      }

      case OpCode.LTE: {
        const right = this.pop()
        const left = this.pop()
        this.push(left <= right)
        break
      }

      case OpCode.GT: {
        const right = this.pop()
        const left = this.pop()
        this.push(left > right)
        break
      }

      case OpCode.GTE: {
        const right = this.pop()
        const left = this.pop()
        this.push(left >= right)
        break
      }

      case OpCode.BITWISE_AND: {
        const right = this.pop()
        const left = this.pop()
        this.push(left & right)
        break
      }

      case OpCode.BITWISE_OR: {
        const right = this.pop()
        const left = this.pop()
        this.push(left | right)
        break
      }

      case OpCode.BITWISE_XOR: {
        const right = this.pop()
        const left = this.pop()
        this.push(left ^ right)
        break
      }

      case OpCode.LEFT_SHIFT: {
        const right = this.pop()
        const left = this.pop()
        this.push(left << right)
        break
      }

      case OpCode.RIGHT_SHIFT: {
        const right = this.pop()
        const left = this.pop()
        this.push(left >> right)
        break
      }

      case OpCode.UNSIGNED_RIGHT_SHIFT: {
        const right = this.pop()
        const left = this.pop()
        this.push(left >>> right)
        break
      }

      case OpCode.IN: {
        const right = this.pop()
        const left = this.pop()
        this.push(left in right)
        break
      }

      case OpCode.INSTANCEOF: {
        const right = this.pop()
        const left = this.pop()
        this.push(left instanceof right)
        break
      }

      // ===== Unary operations =====
      case OpCode.NOT: {
        const value = this.pop()
        this.push(!value)
        break
      }

      case OpCode.BITWISE_NOT: {
        const value = this.pop()
        this.push(~value)
        break
      }

      case OpCode.TYPEOF: {
        const value = this.pop()
        this.push(typeof value)
        break
      }

      case OpCode.VOID: {
        this.pop()
        this.push(undefined)
        break
      }

      case OpCode.DELETE: {
        // Simplified delete - would need more context
        this.pop()
        this.push(true)
        break
      }

      case OpCode.PLUS: {
        const value = this.pop()
        this.push(+value)
        break
      }

      case OpCode.MINUS: {
        const value = this.pop()
        this.push(-value)
        break
      }

      // ===== Update operations =====
      case OpCode.INC: {
        const value = this.pop()
        this.push(value + 1)
        break
      }

      case OpCode.DEC: {
        const value = this.pop()
        this.push(value - 1)
        break
      }

      // ===== Property access =====
      case OpCode.GET_MEMBER: {
        const property = this.pop()
        const object = this.pop()
        this.push(object[property])
        break
      }

      case OpCode.SET_MEMBER: {
        const value = this.pop()
        const property = this.pop()
        const object = this.pop()
        object[property] = value
        this.push(value)
        break
      }

      // ===== Function operations =====
      case OpCode.CALL: {
        const argCount = operand
        const callee = this.pop()
        const args = []
        for (let i = 0; i < argCount; i++) {
          args.unshift(this.pop())
        }

        if (typeof callee !== 'function') {
          throw new TypeError(`${callee} is not a function`)
        }

        const result = await callee(...args)
        this.push(result)
        break
      }

      case OpCode.NEW: {
        const argCount = operand
        const constructor = this.pop()
        const args = []
        for (let i = 0; i < argCount; i++) {
          args.unshift(this.pop())
        }

        const instance = new constructor(...args)
        this.push(instance)
        break
      }

      case OpCode.RETURN: {
        const returnValue = this.pop()

        // Pop the current frame
        this.callStack.pop()

        if (this.callStack.length > 0) {
          this.currentFrame = this.callStack[this.callStack.length - 1]
          this.push(returnValue)
        } else {
          this.push(returnValue)
          this.halted = true
        }
        break
      }

      case OpCode.AWAIT: {
        const promise = this.pop()
        const result = await AWAIT(promise)
        this.push(result)
        break
      }

      case OpCode.YIELD: {
        const value = this.pop()
        // For now, just push the value back
        // Full generator support would require more infrastructure
        this.push(value)
        break
      }

      // ===== Object/Array operations =====
      case OpCode.NEW_OBJECT: {
        const propCount = operand
        const obj: any = {}
        for (let i = 0; i < propCount; i++) {
          const value = this.pop()
          const key = this.pop()
          obj[key] = value
        }
        this.push(obj)
        break
      }

      case OpCode.NEW_ARRAY: {
        const elementCount = operand
        const arr: any[] = []
        for (let i = 0; i < elementCount; i++) {
          arr.unshift(this.pop())
        }
        this.push(arr)
        break
      }

      case OpCode.SPREAD: {
        const iterable = this.pop()
        // Spread into array - simplified
        if (Array.isArray(iterable)) {
          for (const item of iterable) {
            this.push(item)
          }
        } else if (typeof iterable === 'object' && iterable !== null) {
          for (const key in iterable) {
            this.push(key)
            this.push(iterable[key])
          }
        }
        break
      }

      // ===== Control flow =====
      case OpCode.JUMP: {
        this.currentFrame!.ip = operand
        break
      }

      case OpCode.JUMP_IF_FALSE: {
        const condition = this.pop()
        if (!condition) {
          this.currentFrame!.ip = operand
        }
        break
      }

      case OpCode.JUMP_IF_TRUE: {
        const condition = this.pop()
        if (condition) {
          this.currentFrame!.ip = operand
        }
        break
      }

      // ===== Scope operations =====
      case OpCode.PUSH_SCOPE: {
        const newScope = new Scope(this.currentScope)
        this.scopeStack.push(newScope)
        this.currentScope = newScope
        break
      }

      case OpCode.POP_SCOPE: {
        this.scopeStack.pop()
        if (this.scopeStack.length > 0) {
          this.currentScope = this.scopeStack[this.scopeStack.length - 1]
        }
        break
      }

      // ===== Function/Class creation =====
      case OpCode.CREATE_FUNCTION: {
        const funcNode = this.currentFrame!.chunk.constants[operand]
        const func = this.createFunction(funcNode, this.currentScope)
        this.push(func)
        break
      }

      case OpCode.CREATE_ARROW_FUNCTION: {
        const funcNode = this.currentFrame!.chunk.constants[operand]
        const func = this.createArrowFunction(funcNode, this.currentScope)
        this.push(func)
        break
      }

      case OpCode.CREATE_CLASS: {
        // Simplified class creation
        const classNode = this.currentFrame!.chunk.constants[operand]
        const classConstructor = this.createClass(classNode, this.currentScope)
        this.push(classConstructor)
        break
      }

      // ===== Exception handling =====
      case OpCode.THROW: {
        const error = this.pop()
        throw error
      }

      case OpCode.TRY_START:
      case OpCode.TRY_END:
      case OpCode.CATCH_START:
      case OpCode.CATCH_END:
      case OpCode.FINALLY_START:
      case OpCode.FINALLY_END: {
        // Exception handling would require more complex control flow
        // For now, these are placeholders
        break
      }

      // ===== Loop control =====
      case OpCode.BREAK:
      case OpCode.CONTINUE: {
        // These are handled by jump instructions in the compiler
        break
      }

      // ===== Special =====
      case OpCode.NOP: {
        // No operation
        break
      }

      case OpCode.HALT: {
        this.halted = true
        break
      }

      default: {
        throw new Error(`Unknown opcode: ${opcode}`)
      }
    }
  }

  private createFunction(funcNode: any, captureScope: Scope): Function {
    const self = this

    return async function (this: any, ...args: any[]) {
      // Create new scope for function execution (isolated function scope)
      const funcScope = new Scope(captureScope, true)

      // Bind parameters
      for (let i = 0; i < funcNode.params.length; i++) {
        const param = funcNode.params[i]
        if (param.type === 'Identifier') {
          funcScope.var(param.name, args[i])
        }
      }

      // Bind 'this' and 'arguments'
      funcScope.var('this', this)
      funcScope.var('arguments', arguments)

      // Compile and execute function body
      const compiler = new Compiler()
      const chunk = compiler.compile(funcNode.body, funcScope)

      const funcVM = new VM(funcScope)
      return await funcVM.executeAsync(chunk)
    }
  }

  private createArrowFunction(funcNode: any, captureScope: Scope): Function {
    const self = this
    const capturedThis = captureScope.find('this')?.get()

    return async (...args: any[]) => {
      // Create new scope for function execution (isolated function scope)
      const funcScope = new Scope(captureScope, true)

      // Bind parameters
      for (let i = 0; i < funcNode.params.length; i++) {
        const param = funcNode.params[i]
        if (param.type === 'Identifier') {
          funcScope.var(param.name, args[i])
        }
      }

      // Arrow functions capture 'this'
      if (capturedThis !== undefined) {
        funcScope.var('this', capturedThis)
      }

      // Compile and execute function body
      const compiler = new Compiler()
      let chunk: BytecodeChunk

      if (funcNode.body.type === 'BlockStatement') {
        chunk = compiler.compile(funcNode.body, funcScope)
      } else {
        // Expression body - auto-return
        chunk = compiler.compile({
          type: 'ReturnStatement',
          argument: funcNode.body
        }, funcScope)
      }

      const funcVM = new VM(funcScope)
      return await funcVM.executeAsync(chunk)
    }
  }

  private createClass(classNode: any, captureScope: Scope): any {
    // Simplified class creation - full implementation would be more complex
    const className = classNode.id?.name || 'AnonymousClass'

    // Create constructor function
    const constructor = function (this: any, ...args: any[]) {
      // Initialize instance
    }

    // Add methods to prototype
    for (const method of classNode.body.body) {
      if (method.type === 'MethodDefinition') {
        const methodName = method.key.name
        if (method.kind === 'constructor') {
          // Constructor logic
        } else {
          constructor.prototype[methodName] = this.createFunction(method.value, captureScope)
        }
      }
    }

    return constructor
  }

  // ===== Stack helpers =====
  private push(value: any): void {
    this.stack.push(value)
  }

  private pop(): any {
    if (this.stack.length === 0) {
      throw new Error('Stack underflow')
    }
    return this.stack.pop()
  }

  private peek(offset: number = 0): any {
    if (this.stack.length === 0) {
      throw new Error('Stack is empty')
    }
    return this.stack[this.stack.length - 1 - offset]
  }
}
