/**
 * Virtual Machine - executes bytecode instructions using stacks
 */

import Scope from '../scope'
import { Var } from '../scope/variable'
import { OpCode, type BytecodeChunk, type Instruction } from './opcodes'
import { Compiler } from './compiler'
import { AWAIT, NOINIT } from '../share/const'

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
  delegatedIterator: any = null // For yield* delegation

  constructor(
    stack: any[],
    callStack: CallFrame[],
    currentFrame: CallFrame | null,
    scopeStack: Scope[],
    currentScope: Scope,
    exceptionHandlers: ExceptionHandler[],
    delegatedIterator: any = null
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
    this.delegatedIterator = delegatedIterator
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

      case OpCode.LOAD_NOINIT: {
        this.push(NOINIT)
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

      case OpCode.ASSIGN_VAR: {
        const name = operand
        const value = this.pop()
        const variable = this.currentScope.find(name)
        if (!variable) {
          throw new ReferenceError(`${name} is not defined`)
        }
        variable.set(value)
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

      case OpCode.CALL_WITH_SPREAD: {
        const method = this.pop()
        const receiver = this.pop()
        const argsArray = this.pop()

        if (typeof method !== 'function') {
          throw new TypeError(`${method} is not a function`)
        }

        // If receiver is undefined, this is a regular function call
        if (receiver === undefined) {
          const result = method(...argsArray)
          this.push(result)
        } else {
          const result = method.call(receiver, ...argsArray)
          this.push(result)
        }
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

      case OpCode.ARRAY_PUSH: {
        const value = this.pop()
        const array = this.pop()
        array.push(value)
        this.push(array)
        break
      }

      case OpCode.ARRAY_CONCAT: {
        const iterable = this.pop()
        const array = this.pop()
        if (Array.isArray(iterable)) {
          array.push(...iterable)
        } else if (typeof iterable === 'string') {
          array.push(...iterable)
        } else if (iterable && typeof iterable[Symbol.iterator] === 'function') {
          for (const item of iterable) {
            array.push(item)
          }
        } else {
          // Not iterable - throw TypeError
          throw new TypeError(`${Object.prototype.toString.call(iterable)} is not iterable`)
        }
        this.push(array)
        break
      }

      case OpCode.OBJECT_ASSIGN: {
        const source = this.pop()
        const target = this.pop()
        Object.assign(target, source)
        this.push(target)
        break
      }

      case OpCode.OBJECT_SET_PROP: {
        const value = this.pop()
        const key = this.pop()
        const object = this.pop()
        object[key] = value
        this.push(object)
        break
      }

      case OpCode.OBJECT_DEFINE_GETTER: {
        const getter = this.pop()
        const key = this.pop()
        const object = this.pop()
        Object.defineProperty(object, key, {
          get: getter,
          enumerable: true,
          configurable: true
        })
        this.push(object)
        break
      }

      case OpCode.OBJECT_DEFINE_SETTER: {
        const setter = this.pop()
        const key = this.pop()
        const object = this.pop()
        Object.defineProperty(object, key, {
          set: setter,
          enumerable: true,
          configurable: true
        })
        this.push(object)
        break
      }

      case OpCode.OBJECT_REST: {
        const excludedKeys = this.pop()
        const sourceObject = this.pop()
        const restObject: any = {}

        // Copy all properties except the excluded ones
        for (const key in sourceObject) {
          if (sourceObject.hasOwnProperty(key) && !excludedKeys.includes(key)) {
            restObject[key] = sourceObject[key]
          }
        }

        this.push(restObject)
        break
      }

      case OpCode.ARRAY_REST: {
        const startIndex = this.pop()
        const sourceArray = this.pop()
        // Slice from startIndex to end
        const restArray = Array.isArray(sourceArray)
          ? sourceArray.slice(startIndex)
          : []
        this.push(restArray)
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

      case OpCode.LOAD_NOINIT: {
        this.push(NOINIT)
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

      case OpCode.ASSIGN_VAR: {
        const name = operand
        const value = this.pop()
        const variable = this.currentScope.find(name)
        if (!variable) {
          throw new ReferenceError(`${name} is not defined`)
        }
        variable.set(value)
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

      case OpCode.CALL_WITH_SPREAD: {
        const method = this.pop()
        const receiver = this.pop()
        const argsArray = this.pop()

        if (typeof method !== 'function') {
          throw new TypeError(`${method} is not a function`)
        }

        // If receiver is undefined, this is a regular function call
        if (receiver === undefined) {
          const result = await method(...argsArray)
          this.push(result)
        } else {
          const result = await method.call(receiver, ...argsArray)
          this.push(result)
        }
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
        const result = await promise
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

      case OpCode.ARRAY_PUSH: {
        const value = this.pop()
        const array = this.pop()
        array.push(value)
        this.push(array)
        break
      }

      case OpCode.ARRAY_CONCAT: {
        const iterable = this.pop()
        const array = this.pop()
        if (Array.isArray(iterable)) {
          array.push(...iterable)
        } else if (typeof iterable === 'string') {
          array.push(...iterable)
        } else if (iterable && typeof iterable[Symbol.iterator] === 'function') {
          for (const item of iterable) {
            array.push(item)
          }
        } else {
          // Not iterable - throw TypeError
          throw new TypeError(`${Object.prototype.toString.call(iterable)} is not iterable`)
        }
        this.push(array)
        break
      }

      case OpCode.OBJECT_ASSIGN: {
        const source = this.pop()
        const target = this.pop()
        Object.assign(target, source)
        this.push(target)
        break
      }

      case OpCode.OBJECT_SET_PROP: {
        const value = this.pop()
        const key = this.pop()
        const object = this.pop()
        object[key] = value
        this.push(object)
        break
      }

      case OpCode.OBJECT_DEFINE_GETTER: {
        const getter = this.pop()
        const key = this.pop()
        const object = this.pop()
        Object.defineProperty(object, key, {
          get: getter,
          enumerable: true,
          configurable: true
        })
        this.push(object)
        break
      }

      case OpCode.OBJECT_DEFINE_SETTER: {
        const setter = this.pop()
        const key = this.pop()
        const object = this.pop()
        Object.defineProperty(object, key, {
          set: setter,
          enumerable: true,
          configurable: true
        })
        this.push(object)
        break
      }

      case OpCode.OBJECT_REST: {
        const excludedKeys = this.pop()
        const sourceObject = this.pop()
        const restObject: any = {}

        // Copy all properties except the excluded ones
        for (const key in sourceObject) {
          if (sourceObject.hasOwnProperty(key) && !excludedKeys.includes(key)) {
            restObject[key] = sourceObject[key]
          }
        }

        this.push(restObject)
        break
      }

      case OpCode.ARRAY_REST: {
        const startIndex = this.pop()
        const sourceArray = this.pop()
        // Slice from startIndex to end
        const restArray = Array.isArray(sourceArray)
          ? sourceArray.slice(startIndex)
          : []
        this.push(restArray)
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

  // Helper to bind function parameters including rest parameters
  private bindParameters(params: any[], args: any[], scope: Scope): void {
    for (let i = 0; i < params.length; i++) {
      const param = params[i]
      if (param.type === 'Identifier') {
        scope.var(param.name, args[i])
      } else if (param.type === 'RestElement') {
        // Rest parameter - collect remaining arguments
        const restArgs = args.slice(i)
        scope.var(param.argument.name, restArgs)
        break // Rest must be last parameter
      } else if (param.type === 'AssignmentPattern') {
        // Default parameter
        const value = args[i] !== undefined ? args[i] : this.evaluateDefault(param.right, scope)
        if (param.left.type === 'Identifier') {
          scope.var(param.left.name, value)
        } else {
          // Destructuring with default value
          this.bindPattern(param.left, value, scope)
        }
      } else if (param.type === 'ArrayPattern' || param.type === 'ObjectPattern') {
        // Destructuring parameter
        this.bindPattern(param, args[i], scope)
      }
    }
  }

  private bindPattern(pattern: any, value: any, scope: Scope): void {
    if (pattern.type === 'Identifier') {
      scope.var(pattern.name, value)
    } else if (pattern.type === 'ArrayPattern') {
      // Array destructuring
      const arr = value || []
      for (let i = 0; i < pattern.elements.length; i++) {
        const element = pattern.elements[i]
        if (!element) continue // Hole in array pattern
        if (element.type === 'RestElement') {
          this.bindPattern(element.argument, arr.slice(i), scope)
          break
        } else {
          this.bindPattern(element, arr[i], scope)
        }
      }
    } else if (pattern.type === 'ObjectPattern') {
      // Object destructuring
      const obj = value || {}
      for (const property of pattern.properties) {
        if (property.type === 'RestElement') {
          // Object rest
          const rest: any = {}
          const extractedKeys = new Set()
          for (const prop of pattern.properties) {
            if (prop !== property && prop.key) {
              const key = prop.key.type === 'Identifier' ? prop.key.name : prop.key.value
              extractedKeys.add(key)
            }
          }
          for (const key in obj) {
            if (!extractedKeys.has(key)) {
              rest[key] = obj[key]
            }
          }
          this.bindPattern(property.argument, rest, scope)
        } else {
          const key = property.key.type === 'Identifier' ? property.key.name : property.key.value
          const propValue = obj[key]
          this.bindPattern(property.value, propValue, scope)
        }
      }
    } else if (pattern.type === 'AssignmentPattern') {
      // Default value in destructuring
      const actualValue = value !== undefined ? value : this.evaluateDefault(pattern.right, scope)
      this.bindPattern(pattern.left, actualValue, scope)
    }
  }

  private evaluateDefault(node: any, scope: Scope): any {
    // Evaluate default parameter value
    const compiler = new Compiler()
    const chunk = compiler.compile({
      type: 'Program',
      body: [{ type: 'ReturnStatement', argument: node }],
      sourceType: 'script'
    }, scope)
    const vm = new VM(scope)
    return vm.execute(chunk)
  }

  private createClassMethod(funcNode: any, captureScope: Scope, superClass: any): Function {
    const self = this
    const isGenerator = funcNode.generator
    const isAsync = funcNode.async

    // Create a super proxy object for property access
    const createSuperProxy = (thisContext: any) => {
      return new Proxy(superClass.prototype, {
        get(target, prop) {
          const value = target[prop]
          // If it's a function, bind it to thisContext
          if (typeof value === 'function') {
            return value.bind(thisContext)
          }
          return value
        },
        set(target, prop, value) {
          // Setting properties on super actually sets them on this
          thisContext[prop] = value
          return true
        }
      })
    }

    // Generator method
    if (isGenerator && !isAsync) {
      return function (this: any, ...args: any[]) {
        const funcScope = new Scope(captureScope, true)
        self.bindParameters(funcNode.params, args, funcScope)
        funcScope.var('this', this)
        funcScope.var('arguments', arguments)
        funcScope.var('super', createSuperProxy(this))

        const compiler = new Compiler()
        const chunk = compiler.compile(funcNode.body, funcScope)
        return self.createGeneratorObject(chunk, funcScope)
      }
    }
    // Async generator method
    else if (isGenerator && isAsync) {
      return function (this: any, ...args: any[]) {
        const funcScope = new Scope(captureScope, true)
        self.bindParameters(funcNode.params, args, funcScope)
        funcScope.var('this', this)
        funcScope.var('arguments', arguments)
        funcScope.var('super', createSuperProxy(this))

        const compiler = new Compiler()
        const chunk = compiler.compile(funcNode.body, funcScope)
        return self.createAsyncGeneratorObject(chunk, funcScope)
      }
    }
    // Async method
    else if (isAsync) {
      return async function (this: any, ...args: any[]) {
        const funcScope = new Scope(captureScope, true)
        self.bindParameters(funcNode.params, args, funcScope)
        funcScope.var('this', this)
        funcScope.var('arguments', arguments)
        funcScope.var('super', createSuperProxy(this))

        const compiler = new Compiler()
        const chunk = compiler.compile(funcNode.body, funcScope)
        const funcVM = new VM(funcScope)
        return await funcVM.executeAsync(chunk)
      }
    }
    // Regular method
    else {
      return function (this: any, ...args: any[]) {
        const funcScope = new Scope(captureScope, true)
        self.bindParameters(funcNode.params, args, funcScope)
        funcScope.var('this', this)
        funcScope.var('arguments', arguments)
        funcScope.var('super', createSuperProxy(this))

        const compiler = new Compiler()
        const chunk = compiler.compile(funcNode.body, funcScope)
        const funcVM = new VM(funcScope)
        return funcVM.execute(chunk)
      }
    }
  }

  private createFunction(funcNode: any, captureScope: Scope): Function {
    const self = this
    const isGenerator = funcNode.generator
    const isAsync = funcNode.async

    // Generator function
    if (isGenerator && !isAsync) {
      // For named function expressions, we need an intermediate scope
      let effectiveCaptureScope = captureScope
      if (funcNode.id && funcNode.type === 'FunctionExpression') {
        effectiveCaptureScope = new Scope(captureScope, false)
      }

      const func = function (this: any, ...args: any[]) {
        const funcScope = new Scope(effectiveCaptureScope, true)
        self.bindParameters(funcNode.params, args, funcScope)
        funcScope.var('this', this)
        funcScope.var('arguments', arguments)

        // Compile the generator body
        const compiler = new Compiler()
        const chunk = compiler.compile(funcNode.body, funcScope)

        // Return a generator object
        return self.createGeneratorObject(chunk, funcScope)
      }

      // Set toString for function
      self.setFunctionToString(func, funcNode)

      // Bind the function name in intermediate scope
      if (funcNode.id && funcNode.type === 'FunctionExpression') {
        effectiveCaptureScope.const(funcNode.id.name, func)
      }

      return func
    }
    // Async generator function
    else if (isGenerator && isAsync) {
      // For named function expressions, we need an intermediate scope
      let effectiveCaptureScope = captureScope
      if (funcNode.id && funcNode.type === 'FunctionExpression') {
        effectiveCaptureScope = new Scope(captureScope, false)
      }

      const func = function (this: any, ...args: any[]) {
        const funcScope = new Scope(effectiveCaptureScope, true)
        self.bindParameters(funcNode.params, args, funcScope)
        funcScope.var('this', this)
        funcScope.var('arguments', arguments)

        // Compile the generator body
        const compiler = new Compiler()
        const chunk = compiler.compile(funcNode.body, funcScope)

        // Return an async generator object
        return self.createAsyncGeneratorObject(chunk, funcScope)
      }

      // Set toString for function
      self.setFunctionToString(func, funcNode)

      // Bind the function name in intermediate scope
      if (funcNode.id && funcNode.type === 'FunctionExpression') {
        effectiveCaptureScope.const(funcNode.id.name, func)
      }

      return func
    }
    // Async function
    else if (isAsync) {
      // For named function expressions, we need an intermediate scope
      let effectiveCaptureScope = captureScope
      if (funcNode.id && funcNode.type === 'FunctionExpression') {
        effectiveCaptureScope = new Scope(captureScope, false)
      }

      const func = async function (this: any, ...args: any[]) {
        const funcScope = new Scope(effectiveCaptureScope, true)
        self.bindParameters(funcNode.params, args, funcScope)
        funcScope.var('this', this)
        funcScope.var('arguments', arguments)

        const compiler = new Compiler()
        const chunk = compiler.compile(funcNode.body, funcScope)
        const funcVM = new VM(funcScope)
        return await funcVM.executeAsync(chunk)
      }

      // Set toString for function
      self.setFunctionToString(func, funcNode)

      // Bind the function name in intermediate scope
      if (funcNode.id && funcNode.type === 'FunctionExpression') {
        effectiveCaptureScope.const(funcNode.id.name, func)
      }

      return func
    }
    // Regular function
    else {
      // For named function expressions, we need an intermediate scope
      let effectiveCaptureScope = captureScope
      if (funcNode.id && funcNode.type === 'FunctionExpression') {
        effectiveCaptureScope = new Scope(captureScope, false)
      }

      const func = function (this: any, ...args: any[]) {
        const funcScope = new Scope(effectiveCaptureScope, true)
        self.bindParameters(funcNode.params, args, funcScope)
        funcScope.var('this', this)
        funcScope.var('arguments', arguments)

        const compiler = new Compiler()
        const chunk = compiler.compile(funcNode.body, funcScope)
        const funcVM = new VM(funcScope)
        return funcVM.execute(chunk)
      }

      // Set toString for function
      self.setFunctionToString(func, funcNode)

      // Bind the function name in intermediate scope
      if (funcNode.id && funcNode.type === 'FunctionExpression') {
        effectiveCaptureScope.const(funcNode.id.name, func)
      }

      return func
    }
  }

  private createArrowFunction(funcNode: any, captureScope: Scope): Function {
    const self = this
    const capturedThis = captureScope.find('this')?.get()
    const isAsync = funcNode.async || funcNode.generator

    let func: Function
    if (isAsync) {
      func = async (...args: any[]) => {
        const funcScope = new Scope(captureScope, true)
        self.bindParameters(funcNode.params, args, funcScope)
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
      func = (...args: any[]) => {
        const funcScope = new Scope(captureScope, true)
        self.bindParameters(funcNode.params, args, funcScope)
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

    // Set toString for arrow function
    self.setFunctionToString(func, funcNode)

    return func
  }

  private createClass(classNode: any, captureScope: Scope): any {
    const self = this
    const className = classNode.id?.name || 'AnonymousClass'

    // For class expressions, create an intermediate scope with the class name
    // This scope will be accessible inside methods but not outside
    const classScope = new Scope(captureScope, false)

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

        // Bind super for property access if there's a superclass
        if (superClass) {
          const thisContext = this
          const superProxy = new Proxy(superClass.prototype, {
            get(target, prop) {
              const value = target[prop]
              // If it's a function, bind it to thisContext
              if (typeof value === 'function') {
                return value.bind(thisContext)
              }
              return value
            },
            set(target, prop, value) {
              // Setting properties on super actually sets them on thisContext
              thisContext[prop] = value
              return true
            }
          })
          constructorScope.var('super', superProxy)
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

    // Bind the class constructor to the class scope for class expressions
    // This makes the class name available inside methods
    if (classNode.id) {
      classScope.const(className, classConstructor)
    }

    // Add instance methods to prototype
    for (const method of instanceMethods) {
      const methodName = method.key.name || method.key.value
      // Create method with super access if there's a superclass
      const methodFunc = superClass
        ? this.createClassMethod(method.value, classScope, superClass)
        : this.createFunction(method.value, classScope)

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
      const methodFunc = this.createFunction(method.value, classScope)

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
          // Check if we're in the middle of delegating to another iterator
          if (generatorState && generatorState.delegatedIterator) {
            const result = generatorState.delegatedIterator.next(value)
            if (!result.done) {
              // Still yielding from delegated iterator
              return { value: result.value, done: false }
            }
            // Delegated iterator is exhausted, clear it and continue
            generatorState.delegatedIterator = null
            // Push the return value of the iterator (becomes value of yield* expression)
            vm.push(result.value)
          }

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
                  const result = iterator.next()
                  if (!result.done) {
                    // Save state with the delegated iterator
                    generatorState = new GeneratorState(
                      vm.stack,
                      vm.callStack,
                      vm.currentFrame,
                      vm.scopeStack,
                      vm.currentScope,
                      vm.exceptionHandlers,
                      iterator  // Save the iterator for next call
                    )
                    return { value: result.value, done: false }
                  }
                  // Iterator was empty or had only one value, push return value and continue
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
                vm.exceptionHandlers,
                null  // No delegation
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
              vm.exceptionHandlers,
              null
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
              vm.exceptionHandlers,
              null
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
    let pendingNext: Promise<any> | null = null

    const asyncGeneratorObject = {
      next: async (value?: any) => {
        // Queue this call if there's already a next() in progress
        if (pendingNext) {
          await pendingNext
        }

        // Create a promise for this next() call
        const currentNext = (async () => {
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
              // Note: Full yield* support requires more complex state management
              // This is a simplified implementation
              if (delegate) {
                // For yield*, just yield the iterable value for now
                // A full implementation would iterate and yield each value
              }

              // Save state for next call
              generatorState = new GeneratorState(
                vm.stack,
                vm.callStack,
                vm.currentFrame,
                vm.scopeStack,
                vm.currentScope,
                vm.exceptionHandlers,
                null
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
              vm.exceptionHandlers,
              null
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
              vm.exceptionHandlers,
              null
            )
          }
          generatorState.done = true
          throw error
        } finally {
          // Clear pending when this call completes
          if (pendingNext === currentNext) {
            pendingNext = null
          }
        }
        })()

        // Store this promise as the current pending call
        pendingNext = currentNext
        return await currentNext
      },

      return: async (value?: any) => {
        // Queue this call if there's already a next() in progress
        if (pendingNext) {
          await pendingNext
        }

        const currentOp = (async () => {
          if (generatorState) {
            generatorState.done = true
          }
          return { value, done: true }
        })()

        pendingNext = currentOp
        return await currentOp
      },

      throw: async (error: any) => {
        // Queue this call if there's already a next() in progress
        if (pendingNext) {
          await pendingNext
        }

        const currentOp = (async () => {
          if (generatorState) {
            generatorState.done = true
          }
          throw error
        })()

        pendingNext = currentOp
        return await currentOp
      },

      [Symbol.asyncIterator]: function() {
        return this
      }
    }

    return asyncGeneratorObject
  }

  // ===== Function toString helper =====
  private setFunctionToString(func: Function, funcNode: any): void {
    const sourceCode = this.generateFunctionSource(funcNode)
    Object.defineProperty(func, 'toString', {
      value: () => sourceCode,
      writable: true,
      configurable: true
    })
  }

  private generateFunctionSource(funcNode: any): string {
    // Try to extract source from the AST node if available
    if (funcNode.start !== undefined && funcNode.end !== undefined && funcNode.loc?.source) {
      return funcNode.loc.source.substring(funcNode.start, funcNode.end)
    }

    // Otherwise, reconstruct from AST
    const parts: string[] = []

    // Async
    if (funcNode.async) {
      parts.push('async ')
    }

    // Function keyword or arrow
    if (funcNode.type === 'ArrowFunctionExpression') {
      // Arrow function
      const params = this.generateParams(funcNode.params)
      parts.push(`(${params}) => `)
      if (funcNode.body.type === 'BlockStatement') {
        parts.push(this.generateBlockBody(funcNode.body))
      } else {
        parts.push(this.generateExpression(funcNode.body))
      }
    } else {
      // Regular function or generator
      parts.push('function')
      if (funcNode.generator) {
        parts.push('* ')
      } else {
        parts.push(' ')
      }

      // Function name
      if (funcNode.id) {
        parts.push(funcNode.id.name)
      }

      // Parameters
      const params = this.generateParams(funcNode.params)
      parts.push(`(${params}) `)

      // Body
      parts.push(this.generateBlockBody(funcNode.body))
    }

    return parts.join('')
  }

  private generateParams(params: any[]): string {
    return params.map(p => {
      if (p.type === 'Identifier') return p.name
      if (p.type === 'RestElement') return '...' + this.generateParams([p.argument])
      // Simplified - could handle destructuring, defaults, etc.
      return 'param'
    }).join(', ')
  }

  private generateBlockBody(body: any): string {
    if (!body.body || body.body.length === 0) return '{ }'

    // Simplified - just try to reconstruct basic statements
    const statements = body.body.map((stmt: any) => this.generateStatement(stmt))
    return `{ ${statements.join(' ')} }`
  }

  private generateStatement(stmt: any): string {
    if (stmt.type === 'ReturnStatement') {
      if (stmt.argument) {
        return 'return ' + this.generateExpression(stmt.argument)
      }
      return 'return'
    }
    if (stmt.type === 'ExpressionStatement') {
      return this.generateExpression(stmt.expression)
    }
    // Simplified for other statement types
    return ''
  }

  private generateExpression(expr: any): string {
    if (expr.type === 'Identifier') return expr.name
    if (expr.type === 'BinaryExpression') {
      return this.generateExpression(expr.left) + ' ' + expr.operator + ' ' + this.generateExpression(expr.right)
    }
    if (expr.type === 'AwaitExpression') {
      return 'await ' + this.generateExpression(expr.argument)
    }
    if (expr.type === 'YieldExpression') {
      return 'yield ' + (expr.argument ? this.generateExpression(expr.argument) : '')
    }
    // Simplified - could handle more expression types
    return ''
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
