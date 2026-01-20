/**
 * Virtual Machine - executes bytecode instructions using stacks
 */

import Scope from '../scope'
import { Var } from '../scope/variable'
import { OpCode, type BytecodeChunk, type Instruction } from './opcodes'
import { Compiler } from './compiler'
import { AWAIT } from '../share/const'

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

interface ExceptionHandler {
  catchJump: number
  finallyJump: number
  hasCatch: boolean
  hasFinally: boolean
  scopeDepth: number
}

// Generator state for pausing and resuming execution
class GeneratorState {
  stack: any[]
  callStack: CallFrame[]
  currentFrame: CallFrame | null
  scopeStack: Scope[]
  currentScope: Scope
  exceptionHandlers: ExceptionHandler[]
  done: boolean = false
  value: any = undefined

  constructor(
    stack: any[],
    callStack: CallFrame[],
    currentFrame: CallFrame | null,
    scopeStack: Scope[],
    currentScope: Scope,
    exceptionHandlers: ExceptionHandler[]
  ) {
    this.stack = [...stack]
    this.callStack = callStack.map(frame => {
      const newFrame = new CallFrame(frame.chunk, frame.returnAddress)
      newFrame.ip = frame.ip
      newFrame.slots = [...frame.slots]
      return newFrame
    })
    this.currentFrame = currentFrame
    this.scopeStack = [...scopeStack]
    this.currentScope = currentScope
    this.exceptionHandlers = [...exceptionHandlers]
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
  private exceptionHandlers: ExceptionHandler[] = []
  private superClass: any = null  // For super() calls in class constructors

  constructor(private rootScope: Scope, isAsync: boolean = false) {
    this.currentScope = rootScope
    this.scopeStack.push(rootScope)
    this.isAsync = isAsync
  }

  setSuperClass(superClass: any): void {
    this.superClass = superClass
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
        // Handle exceptions with try/catch/finally
        if (!this.handleException(error)) {
          // No exception handler, rethrow
          throw error
        }
      }
    }

    // Return top of stack or undefined
    return this.stack.length > 0 ? this.stack.pop() : undefined
  }

  private handleException(error: any): boolean {
    // Find the nearest exception handler
    if (this.exceptionHandlers.length === 0) {
      return false // No handler
    }

    const handler = this.exceptionHandlers.pop()!

    // Restore scope to the handler's depth
    while (this.scopeStack.length > handler.scopeDepth) {
      this.scopeStack.pop()
    }
    this.currentScope = this.scopeStack[this.scopeStack.length - 1]

    // Jump to catch or finally
    if (handler.hasCatch) {
      // Push the error onto the stack for the catch block
      this.push(error)
      this.currentFrame!.ip = handler.catchJump
    } else if (handler.hasFinally) {
      // Jump to finally, but rethrow after
      this.currentFrame!.ip = handler.finallyJump
      // TODO: Need to track that we should rethrow after finally
    }

    return true
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

      case OpCode.CALL_METHOD: {
        const argCount = operand
        const method = this.pop()
        const receiver = this.pop()
        const args = []
        for (let i = 0; i < argCount; i++) {
          args.unshift(this.pop())
        }

        if (typeof method !== 'function') {
          throw new TypeError(`${method} is not a function`)
        }

        const result = method.call(receiver, ...args)
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

      case OpCode.SUPER_CALL: {
        const argCount = operand
        const args = []
        for (let i = 0; i < argCount; i++) {
          args.unshift(this.pop())
        }

        // Get the superclass from VM
        if (!this.superClass) {
          throw new ReferenceError('super() call outside of class constructor with parent')
        }

        // Get this from scope
        const thisVar = this.currentScope.find('this')
        if (!thisVar) {
          throw new ReferenceError('super() call without this context')
        }
        const thisContext = thisVar.get()

        // Call superclass constructor
        this.superClass.apply(thisContext, args)
        this.push(undefined)
        break
      }

      // ===== Exception handling =====
      case OpCode.THROW: {
        const error = this.pop()
        throw error
      }

      case OpCode.TRY_START: {
        // Register an exception handler
        const handlerInfo = operand
        this.exceptionHandlers.push({
          catchJump: handlerInfo.catchJump,
          finallyJump: handlerInfo.finallyJump,
          hasCatch: handlerInfo.hasCatch,
          hasFinally: handlerInfo.hasFinally,
          scopeDepth: this.scopeStack.length
        })
        break
      }

      case OpCode.TRY_END: {
        // Successfully completed try block, remove handler
        if (this.exceptionHandlers.length > 0) {
          const handler = this.exceptionHandlers.pop()!
          // If there's a finally block, we still need to execute it
          if (handler.hasFinally) {
            // Jump to finally block
            this.currentFrame!.ip = handler.finallyJump
          }
        }
        break
      }

      case OpCode.CATCH_START: {
        // Bind the exception to the catch parameter
        const paramName = operand
        if (paramName) {
          const error = this.pop()
          this.currentScope.let(paramName, error)
        }
        break
      }

      case OpCode.CATCH_END: {
        // End of catch block
        break
      }

      case OpCode.FINALLY_START: {
        // Start of finally block
        break
      }

      case OpCode.FINALLY_END: {
        // End of finally block
        break
      }

      // ===== Loop control =====
      case OpCode.BREAK:
      case OpCode.CONTINUE: {
        // These are handled by jump instructions in the compiler
        break
      }

      // ===== Iterator operations =====
      case OpCode.GET_KEYS: {
        const obj = this.pop()
        const keys = Object.keys(obj)
        this.push(keys)
        break
      }

      case OpCode.GET_ITERATOR: {
        const iterable = this.pop()
        // Get the iterator from the iterable
        let iterator
        if (Array.isArray(iterable)) {
          // For arrays, create a simple iterator
          let index = 0
          iterator = {
            next() {
              if (index < iterable.length) {
                return { value: iterable[index++], done: false }
              }
              return { value: undefined, done: true }
            }
          }
        } else if (iterable && typeof iterable[Symbol.iterator] === 'function') {
          // Use the built-in iterator
          iterator = iterable[Symbol.iterator]()
        } else if (typeof iterable === 'string') {
          // Strings are iterable
          let index = 0
          iterator = {
            next() {
              if (index < iterable.length) {
                return { value: iterable[index++], done: false }
              }
              return { value: undefined, done: true }
            }
          }
        } else {
          throw new TypeError(`${iterable} is not iterable`)
        }
        this.push(iterator)
        break
      }

      case OpCode.ITERATOR_NEXT: {
        const iterator = this.pop()
        const result = iterator.next()
        this.push(result)
        break
      }

      case OpCode.ITERATOR_DONE: {
        const result = this.pop()
        this.push(result.done)
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

      case OpCode.CALL_METHOD: {
        const argCount = operand
        const method = this.pop()
        const receiver = this.pop()
        const args = []
        for (let i = 0; i < argCount; i++) {
          args.unshift(this.pop())
        }

        if (typeof method !== 'function') {
          throw new TypeError(`${method} is not a function`)
        }

        const result = await method.call(receiver, ...args)
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

      case OpCode.SUPER_CALL: {
        const argCount = operand
        const args = []
        for (let i = 0; i < argCount; i++) {
          args.unshift(this.pop())
        }

        // Get the superclass from VM
        if (!this.superClass) {
          throw new ReferenceError('super() call outside of class constructor with parent')
        }

        // Get this from scope
        const thisVar = this.currentScope.find('this')
        if (!thisVar) {
          throw new ReferenceError('super() call without this context')
        }
        const thisContext = thisVar.get()

        // Call superclass constructor
        this.superClass.apply(thisContext, args)
        this.push(undefined)
        break
      }

      // ===== Exception handling =====
      case OpCode.THROW: {
        const error = this.pop()
        throw error
      }

      case OpCode.TRY_START: {
        // Register an exception handler
        const handlerInfo = operand
        this.exceptionHandlers.push({
          catchJump: handlerInfo.catchJump,
          finallyJump: handlerInfo.finallyJump,
          hasCatch: handlerInfo.hasCatch,
          hasFinally: handlerInfo.hasFinally,
          scopeDepth: this.scopeStack.length
        })
        break
      }

      case OpCode.TRY_END: {
        // Successfully completed try block, remove handler
        if (this.exceptionHandlers.length > 0) {
          const handler = this.exceptionHandlers.pop()!
          // If there's a finally block, we still need to execute it
          if (handler.hasFinally) {
            // Jump to finally block
            this.currentFrame!.ip = handler.finallyJump
          }
        }
        break
      }

      case OpCode.CATCH_START: {
        // Bind the exception to the catch parameter
        const paramName = operand
        if (paramName) {
          const error = this.pop()
          this.currentScope.let(paramName, error)
        }
        break
      }

      case OpCode.CATCH_END: {
        // End of catch block
        break
      }

      case OpCode.FINALLY_START: {
        // Start of finally block
        break
      }

      case OpCode.FINALLY_END: {
        // End of finally block
        break
      }

      // ===== Loop control =====
      case OpCode.BREAK:
      case OpCode.CONTINUE: {
        // These are handled by jump instructions in the compiler
        break
      }

      // ===== Iterator operations =====
      case OpCode.GET_KEYS: {
        const obj = this.pop()
        const keys = Object.keys(obj)
        this.push(keys)
        break
      }

      case OpCode.GET_ITERATOR: {
        const iterable = this.pop()
        // Get the iterator from the iterable
        let iterator
        if (Array.isArray(iterable)) {
          // For arrays, create a simple iterator
          let index = 0
          iterator = {
            next() {
              if (index < iterable.length) {
                return { value: iterable[index++], done: false }
              }
              return { value: undefined, done: true }
            }
          }
        } else if (iterable && typeof iterable[Symbol.iterator] === 'function') {
          // Use the built-in iterator
          iterator = iterable[Symbol.iterator]()
        } else if (typeof iterable === 'string') {
          // Strings are iterable
          let index = 0
          iterator = {
            next() {
              if (index < iterable.length) {
                return { value: iterable[index++], done: false }
              }
              return { value: undefined, done: true }
            }
          }
        } else {
          throw new TypeError(`${iterable} is not iterable`)
        }
        this.push(iterator)
        break
      }

      case OpCode.ITERATOR_NEXT: {
        const iterator = this.pop()
        const result = iterator.next()
        this.push(result)
        break
      }

      case OpCode.ITERATOR_DONE: {
        const result = this.pop()
        this.push(result.done)
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
    const isGenerator = funcNode.generator
    const isAsync = funcNode.async

    // Generator function
    if (isGenerator && !isAsync) {
      return function (this: any, ...args: any[]) {
        const funcScope = new Scope(captureScope, true)
        for (let i = 0; i < funcNode.params.length; i++) {
          const param = funcNode.params[i]
          if (param.type === 'Identifier') {
            funcScope.var(param.name, args[i])
          }
        }
        funcScope.var('this', this)
        funcScope.var('arguments', arguments)

        // Compile the generator body
        const compiler = new Compiler()
        const chunk = compiler.compile(funcNode.body, funcScope)

        // Return a generator object
        return self.createGeneratorObject(chunk, funcScope)
      }
    }
    // Async generator function
    else if (isGenerator && isAsync) {
      return function (this: any, ...args: any[]) {
        const funcScope = new Scope(captureScope, true)
        for (let i = 0; i < funcNode.params.length; i++) {
          const param = funcNode.params[i]
          if (param.type === 'Identifier') {
            funcScope.var(param.name, args[i])
          }
        }
        funcScope.var('this', this)
        funcScope.var('arguments', arguments)

        // Compile the generator body
        const compiler = new Compiler()
        const chunk = compiler.compile(funcNode.body, funcScope)

        // Return an async generator object
        return self.createAsyncGeneratorObject(chunk, funcScope)
      }
    }
    // Async function
    else if (isAsync) {
      return async function (this: any, ...args: any[]) {
        const funcScope = new Scope(captureScope, true)
        for (let i = 0; i < funcNode.params.length; i++) {
          const param = funcNode.params[i]
          if (param.type === 'Identifier') {
            funcScope.var(param.name, args[i])
          }
        }
        funcScope.var('this', this)
        funcScope.var('arguments', arguments)
        const compiler = new Compiler()
        const chunk = compiler.compile(funcNode.body, funcScope)
        const funcVM = new VM(funcScope)
        return await funcVM.executeAsync(chunk)
      }
    }
    // Regular function
    else {
      return function (this: any, ...args: any[]) {
        const funcScope = new Scope(captureScope, true)
        for (let i = 0; i < funcNode.params.length; i++) {
          const param = funcNode.params[i]
          if (param.type === 'Identifier') {
            funcScope.var(param.name, args[i])
          }
        }
        funcScope.var('this', this)
        funcScope.var('arguments', arguments)
        const compiler = new Compiler()
        const chunk = compiler.compile(funcNode.body, funcScope)
        const funcVM = new VM(funcScope)
        return funcVM.execute(chunk)
      }
    }
  }

  private createArrowFunction(funcNode: any, captureScope: Scope): Function {
    const self = this
    const capturedThis = captureScope.find('this')?.get()
    const isAsync = funcNode.async || funcNode.generator

    if (isAsync) {
      return async (...args: any[]) => {
        const funcScope = new Scope(captureScope, true)
        for (let i = 0; i < funcNode.params.length; i++) {
          const param = funcNode.params[i]
          if (param.type === 'Identifier') {
            funcScope.var(param.name, args[i])
          }
        }
        if (capturedThis !== undefined) {
          funcScope.var('this', capturedThis)
        }
        const compiler = new Compiler()
        let chunk: BytecodeChunk
        if (funcNode.body.type === 'BlockStatement') {
          chunk = compiler.compile(funcNode.body, funcScope)
        } else {
          chunk = compiler.compile({
            type: 'ReturnStatement',
            argument: funcNode.body
          }, funcScope)
        }
        const funcVM = new VM(funcScope)
        return await funcVM.executeAsync(chunk)
      }
    } else {
      return (...args: any[]) => {
        const funcScope = new Scope(captureScope, true)
        for (let i = 0; i < funcNode.params.length; i++) {
          const param = funcNode.params[i]
          if (param.type === 'Identifier') {
            funcScope.var(param.name, args[i])
          }
        }
        if (capturedThis !== undefined) {
          funcScope.var('this', capturedThis)
        }
        const compiler = new Compiler()
        let chunk: BytecodeChunk
        if (funcNode.body.type === 'BlockStatement') {
          chunk = compiler.compile(funcNode.body, funcScope)
        } else {
          chunk = compiler.compile({
            type: 'ReturnStatement',
            argument: funcNode.body
          }, funcScope)
        }
        const funcVM = new VM(funcScope)
        return funcVM.execute(chunk)
      }
    }
  }

  private createClass(classNode: any, captureScope: Scope): any {
    const self = this
    const className = classNode.id?.name || 'AnonymousClass'

    // Find constructor method
    let constructorMethod: any = null
    const instanceMethods: any[] = []
    const staticMethods: any[] = []
    const instanceFields: any[] = []
    const staticFields: any[] = []

    for (const element of classNode.body.body) {
      if (element.type === 'MethodDefinition') {
        if (element.kind === 'constructor') {
          constructorMethod = element
        } else if (element.static) {
          staticMethods.push(element)
        } else {
          instanceMethods.push(element)
        }
      } else if (element.type === 'PropertyDefinition') {
        if (element.static) {
          staticFields.push(element)
        } else {
          instanceFields.push(element)
        }
      }
    }

    // Get superclass if it exists
    let superClass: any = null
    if (classNode.superClass) {
      const compiler = new Compiler()
      const chunk = compiler.compile({
        type: 'Program',
        body: [{
          type: 'ReturnStatement',
          argument: classNode.superClass
        }],
        sourceType: 'script'
      }, captureScope)
      const vm = new VM(captureScope)
      superClass = vm.execute(chunk)
    }

    // Create the constructor function
    let classConstructor: any

    if (constructorMethod) {
      // Use the provided constructor
      const constructorBody = constructorMethod.value.body
      const constructorParams = constructorMethod.value.params

      classConstructor = function (this: any, ...args: any[]) {
        // Create constructor scope
        const constructorScope = new Scope(captureScope, true)

        // Bind parameters
        for (let i = 0; i < constructorParams.length; i++) {
          const param = constructorParams[i]
          if (param.type === 'Identifier') {
            constructorScope.var(param.name, args[i])
          }
        }

        // Bind this
        constructorScope.var('this', this)
        constructorScope.var('arguments', arguments)

        // Initialize instance fields
        for (const field of instanceFields) {
          const fieldName = field.key.name || field.key.value
          let fieldValue = undefined
          if (field.value) {
            const compiler = new Compiler()
            const chunk = compiler.compile({
              type: 'ExpressionStatement',
              expression: field.value
            }, constructorScope)
            const vm = new VM(constructorScope)
            fieldValue = vm.execute(chunk)
          }
          this[fieldName] = fieldValue
        }

        // Execute constructor body statements directly (not as BlockStatement to avoid scope issues)
        const compiler = new Compiler()
        const chunk = compiler.compile({
          type: 'Program',
          body: constructorBody.body,
          sourceType: 'script'
        }, constructorScope)
        const vm = new VM(constructorScope)
        // Set superclass for super() calls
        if (superClass) {
          vm.setSuperClass(superClass)
        }
        vm.execute(chunk)
      }
    } else {
      // Default constructor
      classConstructor = function (this: any, ...args: any[]) {
        // If there's a superclass, call it
        if (superClass) {
          superClass.apply(this, args)
        }

        // Initialize instance fields
        for (const field of instanceFields) {
          const fieldName = field.key.name || field.key.value
          let fieldValue = undefined
          if (field.value) {
            const compiler = new Compiler()
            const chunk = compiler.compile({
              type: 'ExpressionStatement',
              expression: field.value
            }, captureScope)
            const vm = new VM(captureScope)
            fieldValue = vm.execute(chunk)
          }
          this[fieldName] = fieldValue
        }
      }
    }

    // Set up prototype chain
    if (superClass) {
      classConstructor.prototype = Object.create(superClass.prototype)
      classConstructor.prototype.constructor = classConstructor
    }

    // Add instance methods to prototype
    for (const method of instanceMethods) {
      const methodName = method.key.name || method.key.value
      const methodFunc = this.createFunction(method.value, captureScope)

      // Handle getters and setters
      if (method.kind === 'get') {
        Object.defineProperty(classConstructor.prototype, methodName, {
          get: methodFunc,
          enumerable: false,
          configurable: true
        })
      } else if (method.kind === 'set') {
        Object.defineProperty(classConstructor.prototype, methodName, {
          set: methodFunc,
          enumerable: false,
          configurable: true
        })
      } else {
        classConstructor.prototype[methodName] = methodFunc
      }
    }

    // Add static methods to constructor
    for (const method of staticMethods) {
      const methodName = method.key.name || method.key.value
      const methodFunc = this.createFunction(method.value, captureScope)

      if (method.kind === 'get') {
        Object.defineProperty(classConstructor, methodName, {
          get: methodFunc,
          enumerable: false,
          configurable: true
        })
      } else if (method.kind === 'set') {
        Object.defineProperty(classConstructor, methodName, {
          set: methodFunc,
          enumerable: false,
          configurable: true
        })
      } else {
        classConstructor[methodName] = methodFunc
      }
    }

    // Initialize static fields
    for (const field of staticFields) {
      const fieldName = field.key.name || field.key.value
      let fieldValue = undefined
      if (field.value) {
        const compiler = new Compiler()
        const chunk = compiler.compile({
          type: 'ExpressionStatement',
          expression: field.value
        }, captureScope)
        const vm = new VM(captureScope)
        fieldValue = vm.execute(chunk)
      }
      classConstructor[fieldName] = fieldValue
    }

    // Set class name
    Object.defineProperty(classConstructor, 'name', {
      value: className,
      writable: false,
      enumerable: false,
      configurable: true
    })

    return classConstructor
  }

  // ===== Generator support =====
  private createGeneratorObject(chunk: BytecodeChunk, scope: Scope): any {
    let generatorState: GeneratorState | null = null

    const generatorObject = {
      next: (value?: any) => {
        // Create VM for execution
        const vm = new VM(scope)

        // First call - initialize state
        if (generatorState === null) {
          vm.currentFrame = new CallFrame(chunk)
          vm.callStack.push(vm.currentFrame)
        }
        // Resume from saved state
        else if (generatorState.done) {
          return { value: undefined, done: true }
        }
        else {
          // Restore state
          vm.stack = [...generatorState.stack]
          vm.callStack = generatorState.callStack.map(frame => {
            const newFrame = new CallFrame(frame.chunk, frame.returnAddress)
            newFrame.ip = frame.ip
            newFrame.slots = [...frame.slots]
            return newFrame
          })
          vm.currentFrame = vm.callStack[vm.callStack.length - 1] || null
          vm.scopeStack = [...generatorState.scopeStack]
          vm.currentScope = generatorState.currentScope
          vm.exceptionHandlers = [...generatorState.exceptionHandlers]

          // Push the value passed to next() on the stack
          // (This becomes the result of the yield expression)
          // Always push, even if undefined
          vm.push(value)
        }

        try {
          // Continue execution until next yield or end
          while (vm.currentFrame && vm.currentFrame.ip < vm.currentFrame.chunk.instructions.length && !vm.halted) {
            const instruction = vm.currentFrame.chunk.instructions[vm.currentFrame.ip]
            vm.currentFrame.ip++

            // Check if this is a YIELD instruction
            if (instruction.opcode === OpCode.YIELD) {
              const delegate = instruction.operand
              const yieldValue = vm.stack.length > 0 ? vm.pop() : undefined

              // Handle yield* (delegation)
              if (delegate) {
                // yield* delegates to another iterable
                const iterable = yieldValue
                if (iterable && typeof iterable[Symbol.iterator] === 'function') {
                  const iterator = iterable[Symbol.iterator]()
                  let result = iterator.next()
                  // Yield all values from the delegated iterator
                  while (!result.done) {
                    // Save state before yielding
                    generatorState = new GeneratorState(
                      vm.stack,
                      vm.callStack,
                      vm.currentFrame,
                      vm.scopeStack,
                      vm.currentScope,
                      vm.exceptionHandlers
                    )
                    // Temporarily return this value
                    // Note: This doesn't properly handle .next(value) sent to delegated iterator
                    // A full implementation would need more complex state management
                    return { value: result.value, done: false }
                  }
                  // Push the return value of the delegated iterator
                  vm.push(result.value)
                  continue
                }
              }

              // Save state for next call
              generatorState = new GeneratorState(
                vm.stack,
                vm.callStack,
                vm.currentFrame,
                vm.scopeStack,
                vm.currentScope,
                vm.exceptionHandlers
              )

              return { value: yieldValue, done: false }
            }

            // Execute the instruction
            vm.executeInstruction(instruction)
          }

          // Generator finished
          const returnValue = vm.stack.length > 0 ? vm.pop() : undefined
          if (generatorState === null) {
            generatorState = new GeneratorState(
              vm.stack,
              vm.callStack,
              vm.currentFrame,
              vm.scopeStack,
              vm.currentScope,
              vm.exceptionHandlers
            )
          }
          generatorState.done = true
          return { value: returnValue, done: true }
        } catch (error) {
          if (generatorState === null) {
            generatorState = new GeneratorState(
              vm.stack,
              vm.callStack,
              vm.currentFrame,
              vm.scopeStack,
              vm.currentScope,
              vm.exceptionHandlers
            )
          }
          generatorState.done = true
          throw error
        }
      },

      return: (value?: any) => {
        if (generatorState) {
          generatorState.done = true
        }
        return { value, done: true }
      },

      throw: (error: any) => {
        if (generatorState) {
          generatorState.done = true
        }
        throw error
      },

      [Symbol.iterator]: function() {
        return this
      }
    }

    return generatorObject
  }

  private createAsyncGeneratorObject(chunk: BytecodeChunk, scope: Scope): any {
    let generatorState: GeneratorState | null = null

    const asyncGeneratorObject = {
      next: async (value?: any) => {
        // Create VM for execution
        const vm = new VM(scope, true)

        // First call - initialize state
        if (generatorState === null) {
          vm.currentFrame = new CallFrame(chunk)
          vm.callStack.push(vm.currentFrame)
        }
        // Resume from saved state
        else if (generatorState.done) {
          return { value: undefined, done: true }
        }
        else {
          // Restore state
          vm.stack = [...generatorState.stack]
          vm.callStack = generatorState.callStack.map(frame => {
            const newFrame = new CallFrame(frame.chunk, frame.returnAddress)
            newFrame.ip = frame.ip
            newFrame.slots = [...frame.slots]
            return newFrame
          })
          vm.currentFrame = vm.callStack[vm.callStack.length - 1] || null
          vm.scopeStack = [...generatorState.scopeStack]
          vm.currentScope = generatorState.currentScope
          vm.exceptionHandlers = [...generatorState.exceptionHandlers]

          // Push the value passed to next() on the stack
          // (This becomes the result of the yield expression)
          // Always push, even if undefined
          vm.push(value)
        }

        try {
          // Continue execution until next yield or end
          while (vm.currentFrame && vm.currentFrame.ip < vm.currentFrame.chunk.instructions.length && !vm.halted) {
            const instruction = vm.currentFrame.chunk.instructions[vm.currentFrame.ip]
            vm.currentFrame.ip++

            // Check if this is a YIELD instruction
            if (instruction.opcode === OpCode.YIELD) {
              const delegate = instruction.operand
              const yieldValue = vm.stack.length > 0 ? vm.pop() : undefined

              // Handle yield* (delegation)
              if (delegate) {
                // yield* delegates to another iterable
                // For now, simple implementation - just yield each value
                const iterable = yieldValue
                if (iterable && typeof iterable[Symbol.asyncIterator] === 'function') {
                  const iterator = iterable[Symbol.asyncIterator]()
                  let result = await iterator.next()
                  while (!result.done) {
                    // Save state before yielding
                    generatorState = new GeneratorState(
                      vm.stack,
                      vm.callStack,
                      vm.currentFrame,
                      vm.scopeStack,
                      vm.currentScope,
                      vm.exceptionHandlers
                    )
                    // Yield the delegated value
                    const sentValue = yield { value: result.value, done: false }
                    result = await iterator.next(sentValue)
                  }
                  // Push the return value of the delegated iterator
                  vm.push(result.value)
                  continue
                }
              }

              // Save state for next call
              generatorState = new GeneratorState(
                vm.stack,
                vm.callStack,
                vm.currentFrame,
                vm.scopeStack,
                vm.currentScope,
                vm.exceptionHandlers
              )

              return { value: await yieldValue, done: false }
            }

            // Execute the instruction
            await vm.executeInstructionAsync(instruction)
          }

          // Generator finished
          const returnValue = vm.stack.length > 0 ? vm.pop() : undefined
          if (generatorState === null) {
            generatorState = new GeneratorState(
              vm.stack,
              vm.callStack,
              vm.currentFrame,
              vm.scopeStack,
              vm.currentScope,
              vm.exceptionHandlers
            )
          }
          generatorState.done = true
          return { value: returnValue, done: true }
        } catch (error) {
          if (generatorState === null) {
            generatorState = new GeneratorState(
              vm.stack,
              vm.callStack,
              vm.currentFrame,
              vm.scopeStack,
              vm.currentScope,
              vm.exceptionHandlers
            )
          }
          generatorState.done = true
          throw error
        }
      },

      return: async (value?: any) => {
        if (generatorState) {
          generatorState.done = true
        }
        return { value, done: true }
      },

      throw: async (error: any) => {
        if (generatorState) {
          generatorState.done = true
        }
        throw error
      },

      [Symbol.asyncIterator]: function() {
        return this
      }
    }

    return asyncGeneratorObject
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
