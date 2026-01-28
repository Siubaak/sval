/**
 * Virtual Machine - executes bytecode instructions using stacks
 */

import Scope from '../scope'
import { Var } from '../scope/variable'
import { OpCode, type BytecodeChunk, type Instruction } from './opcodes'
import { Compiler } from './compiler'
import { AWAIT, NOINIT, NEWTARGET, IMPORT, EXPORTS } from '../share/const'

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

      case OpCode.SWAP: {
        const top = this.pop()
        const second = this.pop()
        this.push(top)
        this.push(second)
        break
      }

      case OpCode.ROT3: {
        // Rotate top 3 items: [a,b,c] -> [b,c,a]
        const c = this.pop()
        const b = this.pop()
        const a = this.pop()
        this.push(b)
        this.push(c)
        this.push(a)
        break
      }

      case OpCode.ROT4: {
        // Rotate top 4 items: [a,b,c,d] -> [b,c,d,a]
        const d = this.pop()
        const c = this.pop()
        const b = this.pop()
        const a = this.pop()
        this.push(b)
        this.push(c)
        this.push(d)
        this.push(a)
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

      case OpCode.TYPEOF_VAR: {
        const name = operand as string
        const variable = this.currentScope.find(name)
        if (!variable) {
          // typeof on undefined variable should return 'undefined', not throw
          this.push('undefined')
        } else {
          this.push(typeof variable.get())
        }
        break
      }

      case OpCode.VOID: {
        this.pop()
        this.push(undefined)
        break
      }

      case OpCode.DELETE: {
        // Delete variable (not commonly used, mostly for member deletion)
        this.pop()
        this.push(true)
        break
      }

      case OpCode.DELETE_MEMBER: {
        const property = this.pop()
        const object = this.pop()
        const result = delete object[property]
        this.push(result)
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

      case OpCode.NEW_WITH_SPREAD: {
        const constructor = this.pop()
        const argsArray = this.pop()

        if (typeof constructor !== 'function') {
          throw new TypeError(`${constructor} is not a constructor`)
        }

        const instance = new constructor(...argsArray)
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

        // Get new.target (the actual constructor being called)
        const newTargetVar = this.currentScope.find(NEWTARGET)
        const newTarget = newTargetVar ? newTargetVar.get() : this.superClass

        // For built-in classes, use Reflect.construct
        if (this.superClass === Array || this.superClass === Set || this.superClass === Map ||
            this.superClass === Promise || this.superClass === Error || this.superClass === RegExp ||
            this.superClass === Date || this.superClass === String || this.superClass === Number ||
            this.superClass === Boolean || this.superClass === Symbol) {
          // Use Reflect.construct to properly initialize built-ins
          const instance = Reflect.construct(this.superClass, args, newTarget)
          // Replace 'this' binding with the new instance
          thisVar.set(instance)
        } else {
          // Regular class inheritance
          this.superClass.apply(thisContext, args)
        }
        this.push(undefined)
        break
      }

      case OpCode.EXPORT_ALL: {
        // export * from 'module'
        const moduleName = this.currentFrame!.chunk.constants[operand]
        const globalScope = this.currentScope.global()

        // Get the imported module
        const module = globalScope.find(IMPORT + moduleName)
        let value: any
        if (module) {
          const result = module.get()
          if (result) {
            if (typeof result === 'function') {
              value = result()
            } else if (typeof result === 'object') {
              value = result
            }
          }
        }

        if (!value || typeof value !== 'object') {
          throw new TypeError(`Failed to resolve module specifier "${moduleName}"`)
        }

        // Get exports object
        const variable = globalScope.find(EXPORTS)
        if (variable) {
          const exports = variable.get()
          if (exports && typeof exports === 'object') {
            // Copy all properties from the module to exports
            for (const key in value) {
              if (Object.prototype.hasOwnProperty.call(value, key)) {
                exports[key] = value[key]
              }
            }
          }
        }
        break
      }

      case OpCode.EXPORT_NAMED: {
        // export named declarations
        const exportNode = this.currentFrame!.chunk.constants[operand]
        const globalScope = this.currentScope.global()

        // Get exports object
        const variable = globalScope.find(EXPORTS)
        if (!variable) break

        const exports = variable.get()
        if (!exports || typeof exports !== 'object') break

        if (exportNode.declaration) {
          // export const/let/var/function/class name = value
          if (exportNode.declaration.type === 'VariableDeclaration') {
            for (let i = 0; i < exportNode.declaration.declarations.length; i++) {
              const decl = exportNode.declaration.declarations[i]
              const name = decl.id.name
              const item = globalScope.find(name)
              if (item) {
                exports[name] = item.get()
              }
            }
          } else if (exportNode.declaration.type === 'FunctionDeclaration' ||
                     exportNode.declaration.type === 'ClassDeclaration') {
            const name = exportNode.declaration.id.name
            const item = globalScope.find(name)
            if (item) {
              exports[name] = item.get()
            }
          }
        } else if (exportNode.specifiers) {
          // export { a as b }
          for (let i = 0; i < exportNode.specifiers.length; i++) {
            const spec = exportNode.specifiers[i]
            const localName = spec.local.type === 'Identifier'
              ? spec.local.name : spec.local.value
            const exportedName = spec.exported.type === 'Identifier'
              ? spec.exported.name : spec.exported.value
            const item = globalScope.find(localName)
            if (item) {
              exports[exportedName] = item.get()
            }
          }
        }
        break
      }

      case OpCode.IMPORT_BINDINGS: {
        // import declarations
        const importNode = this.currentFrame!.chunk.constants[operand]
        const globalScope = this.currentScope.global()

        // Get the imported module
        const module = globalScope.find(IMPORT + importNode.source.value)
        let value: any
        if (module) {
          const result = module.get()
          if (result) {
            if (typeof result === 'function') {
              value = result()
            } else if (typeof result === 'object') {
              value = result
            }
          }
        }

        if (!value || typeof value !== 'object') {
          throw new TypeError(`Failed to resolve module specifier "${importNode.source.value}"`)
        }

        // Process import specifiers and create variables
        for (let i = 0; i < importNode.specifiers.length; i++) {
          const spec = importNode.specifiers[i]
          let name: string
          if (spec.type === 'ImportSpecifier') {
            name = spec.imported.type === 'Identifier'
              ? spec.imported.name : spec.imported.value
          } else if (spec.type === 'ImportDefaultSpecifier') {
            name = 'default'
          } else if (spec.type === 'ImportNamespaceSpecifier') {
            name = '*'
          } else {
            continue
          }

          if (name !== '*' && !Object.prototype.hasOwnProperty.call(value, name)) {
            throw new SyntaxError(`The requested module "${importNode.source.value}" does not provide an export named "${name}"`)
          }

          // Create variable in current scope
          const importValue = name === '*' ? Object.assign({}, value) : value[name]
          this.currentScope.var(spec.local.name, importValue)
        }
        break
      }

      case OpCode.DYNAMIC_IMPORT: {
        // Dynamic import() - returns a Promise
        const moduleName = this.pop()
        const globalScope = this.currentScope.global()

        // Get the imported module
        const module = globalScope.find(IMPORT + moduleName)

        // Create a Promise that resolves with the module
        const importPromise = new Promise((resolve, reject) => {
          try {
            let value: any
            if (module) {
              const result = module.get()
              if (result) {
                if (typeof result === 'function') {
                  value = result()
                } else if (typeof result === 'object') {
                  value = result
                }
              }
            }

            if (!value || typeof value !== 'object') {
              reject(new TypeError(`Failed to resolve module specifier "${moduleName}"`))
            } else {
              resolve(value)
            }
          } catch (err) {
            reject(err)
          }
        })

        this.push(importPromise)
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
        } else if (iterable && typeof iterable[Symbol.asyncIterator] === 'function') {
          // Use the async iterator (for async generators in for-await-of)
          iterator = iterable[Symbol.asyncIterator]()
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

      case OpCode.SWAP: {
        const top = this.pop()
        const second = this.pop()
        this.push(top)
        this.push(second)
        break
      }

      case OpCode.ROT3: {
        // Rotate top 3 items: [a,b,c] -> [b,c,a]
        const c = this.pop()
        const b = this.pop()
        const a = this.pop()
        this.push(b)
        this.push(c)
        this.push(a)
        break
      }

      case OpCode.ROT4: {
        // Rotate top 4 items: [a,b,c,d] -> [b,c,d,a]
        const d = this.pop()
        const c = this.pop()
        const b = this.pop()
        const a = this.pop()
        this.push(b)
        this.push(c)
        this.push(d)
        this.push(a)
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

      case OpCode.TYPEOF_VAR: {
        const name = operand as string
        const variable = this.currentScope.find(name)
        if (!variable) {
          // typeof on undefined variable should return 'undefined', not throw
          this.push('undefined')
        } else {
          this.push(typeof variable.get())
        }
        break
      }

      case OpCode.VOID: {
        this.pop()
        this.push(undefined)
        break
      }

      case OpCode.DELETE: {
        // Delete variable (not commonly used, mostly for member deletion)
        this.pop()
        this.push(true)
        break
      }

      case OpCode.DELETE_MEMBER: {
        const property = this.pop()
        const object = this.pop()
        const result = delete object[property]
        this.push(result)
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

      case OpCode.NEW_WITH_SPREAD: {
        const constructor = this.pop()
        const argsArray = this.pop()

        if (typeof constructor !== 'function') {
          throw new TypeError(`${constructor} is not a constructor`)
        }

        const instance = new constructor(...argsArray)
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

        // Get new.target (the actual constructor being called)
        const newTargetVar = this.currentScope.find(NEWTARGET)
        const newTarget = newTargetVar ? newTargetVar.get() : this.superClass

        // For built-in classes, use Reflect.construct
        if (this.superClass === Array || this.superClass === Set || this.superClass === Map ||
            this.superClass === Promise || this.superClass === Error || this.superClass === RegExp ||
            this.superClass === Date || this.superClass === String || this.superClass === Number ||
            this.superClass === Boolean || this.superClass === Symbol) {
          // Use Reflect.construct to properly initialize built-ins
          const instance = Reflect.construct(this.superClass, args, newTarget)
          // Replace 'this' binding with the new instance
          thisVar.set(instance)
        } else {
          // Regular class inheritance
          this.superClass.apply(thisContext, args)
        }
        this.push(undefined)
        break
      }

      case OpCode.EXPORT_ALL: {
        // export * from 'module'
        const moduleName = this.currentFrame!.chunk.constants[operand]
        const globalScope = this.currentScope.global()

        // Get the imported module
        const module = globalScope.find(IMPORT + moduleName)
        let value: any
        if (module) {
          const result = module.get()
          if (result) {
            if (typeof result === 'function') {
              value = result()
            } else if (typeof result === 'object') {
              value = result
            }
          }
        }

        if (!value || typeof value !== 'object') {
          throw new TypeError(`Failed to resolve module specifier "${moduleName}"`)
        }

        // Get exports object
        const variable = globalScope.find(EXPORTS)
        if (variable) {
          const exports = variable.get()
          if (exports && typeof exports === 'object') {
            // Copy all properties from the module to exports
            for (const key in value) {
              if (Object.prototype.hasOwnProperty.call(value, key)) {
                exports[key] = value[key]
              }
            }
          }
        }
        break
      }

      case OpCode.EXPORT_NAMED: {
        // export named declarations
        const exportNode = this.currentFrame!.chunk.constants[operand]
        const globalScope = this.currentScope.global()

        // Get exports object
        const variable = globalScope.find(EXPORTS)
        if (!variable) break

        const exports = variable.get()
        if (!exports || typeof exports !== 'object') break

        if (exportNode.declaration) {
          // export const/let/var/function/class name = value
          if (exportNode.declaration.type === 'VariableDeclaration') {
            for (let i = 0; i < exportNode.declaration.declarations.length; i++) {
              const decl = exportNode.declaration.declarations[i]
              const name = decl.id.name
              const item = globalScope.find(name)
              if (item) {
                exports[name] = item.get()
              }
            }
          } else if (exportNode.declaration.type === 'FunctionDeclaration' ||
                     exportNode.declaration.type === 'ClassDeclaration') {
            const name = exportNode.declaration.id.name
            const item = globalScope.find(name)
            if (item) {
              exports[name] = item.get()
            }
          }
        } else if (exportNode.specifiers) {
          // export { a as b }
          for (let i = 0; i < exportNode.specifiers.length; i++) {
            const spec = exportNode.specifiers[i]
            const localName = spec.local.type === 'Identifier'
              ? spec.local.name : spec.local.value
            const exportedName = spec.exported.type === 'Identifier'
              ? spec.exported.name : spec.exported.value
            const item = globalScope.find(localName)
            if (item) {
              exports[exportedName] = item.get()
            }
          }
        }
        break
      }

      case OpCode.IMPORT_BINDINGS: {
        // import declarations
        const importNode = this.currentFrame!.chunk.constants[operand]
        const globalScope = this.currentScope.global()

        // Get the imported module
        const module = globalScope.find(IMPORT + importNode.source.value)
        let value: any
        if (module) {
          const result = module.get()
          if (result) {
            if (typeof result === 'function') {
              value = result()
            } else if (typeof result === 'object') {
              value = result
            }
          }
        }

        if (!value || typeof value !== 'object') {
          throw new TypeError(`Failed to resolve module specifier "${importNode.source.value}"`)
        }

        // Process import specifiers and create variables
        for (let i = 0; i < importNode.specifiers.length; i++) {
          const spec = importNode.specifiers[i]
          let name: string
          if (spec.type === 'ImportSpecifier') {
            name = spec.imported.type === 'Identifier'
              ? spec.imported.name : spec.imported.value
          } else if (spec.type === 'ImportDefaultSpecifier') {
            name = 'default'
          } else if (spec.type === 'ImportNamespaceSpecifier') {
            name = '*'
          } else {
            continue
          }

          if (name !== '*' && !Object.prototype.hasOwnProperty.call(value, name)) {
            throw new SyntaxError(`The requested module "${importNode.source.value}" does not provide an export named "${name}"`)
          }

          // Create variable in current scope
          const importValue = name === '*' ? Object.assign({}, value) : value[name]
          this.currentScope.var(spec.local.name, importValue)
        }
        break
      }

      case OpCode.DYNAMIC_IMPORT: {
        // Dynamic import() - returns a Promise
        const moduleName = this.pop()
        const globalScope = this.currentScope.global()

        // Get the imported module
        const module = globalScope.find(IMPORT + moduleName)

        // Create a Promise that resolves with the module
        const importPromise = new Promise((resolve, reject) => {
          try {
            let value: any
            if (module) {
              const result = module.get()
              if (result) {
                if (typeof result === 'function') {
                  value = result()
                } else if (typeof result === 'object') {
                  value = result
                }
              }
            }

            if (!value || typeof value !== 'object') {
              reject(new TypeError(`Failed to resolve module specifier "${moduleName}"`))
            } else {
              resolve(value)
            }
          } catch (err) {
            reject(err)
          }
        })

        this.push(importPromise)
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
        } else if (iterable && typeof iterable[Symbol.asyncIterator] === 'function') {
          // Use the async iterator (for async generators in for-await-of)
          iterator = iterable[Symbol.asyncIterator]()
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
        const result = await iterator.next()
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
    const staticBlocks: any[] = []

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
      } else if (element.type === 'StaticBlock') {
        staticBlocks.push(element)
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
        // ES6 classes must be called with new
        if (!(this instanceof classConstructor)) {
          throw new TypeError(`Class constructor ${className} cannot be invoked without 'new'`)
        }

        // Create constructor scope
        const constructorScope = new Scope(captureScope, true)

        // Bind parameters using the helper method (handles rest params, destructuring, defaults)
        self.bindParameters(constructorParams, args, constructorScope)

        // Bind this
        constructorScope.var('this', this)
        constructorScope.var('arguments', arguments)

        // Bind new.target (points to the actual constructor being called)
        constructorScope.var(NEWTARGET, classConstructor)

        // Bind super for property access if there's a superclass
        if (superClass) {
          const superProxy = new Proxy(superClass.prototype, {
            get(target, prop) {
              // Get the current 'this' from scope (may have been replaced by super())
              const currentThis = constructorScope.find('this')?.get()

              // Check if property is a getter/setter by walking prototype chain
              let descriptor = Object.getOwnPropertyDescriptor(target, prop)
              let proto = target
              while (!descriptor && proto) {
                proto = Object.getPrototypeOf(proto)
                if (proto) {
                  descriptor = Object.getOwnPropertyDescriptor(proto, prop)
                }
              }

              // If it's a getter, invoke it with the correct 'this'
              if (descriptor && descriptor.get) {
                return descriptor.get.call(currentThis)
              }

              // Otherwise get the value normally
              const value = target[prop]
              // If it's a function, bind it to current this
              if (typeof value === 'function') {
                return value.bind(currentThis)
              }
              return value
            },
            set(target, prop, value) {
              // Get the current 'this' from scope
              const currentThis = constructorScope.find('this')?.get()
              if (!currentThis) return false

              // Check if property is a setter by walking prototype chain
              let descriptor = Object.getOwnPropertyDescriptor(target, prop)
              let proto = target
              while (!descriptor && proto) {
                proto = Object.getPrototypeOf(proto)
                if (proto) {
                  descriptor = Object.getOwnPropertyDescriptor(proto, prop)
                }
              }

              // If it's a setter, invoke it with the correct 'this'
              if (descriptor && descriptor.set) {
                descriptor.set.call(currentThis, value)
                return true
              }

              // Otherwise set the property on current this
              currentThis[prop] = value
              return true
            }
          })
          constructorScope.var('super', superProxy)
        }

        // Execute constructor body BEFORE initializing instance fields (for classes with super)
        // This allows super() to be called first and replace 'this' binding
        if (superClass) {
          const compiler = new Compiler()
          const chunk = compiler.compile({
            type: 'Program',
            body: constructorBody.body,
            sourceType: 'script'
          }, constructorScope)
          const vm = new VM(constructorScope)
          vm.setSuperClass(superClass)
          const result = vm.execute(chunk)

          // If constructor explicitly returns an object, use that and don't initialize fields
          if (result !== undefined && typeof result === 'object' && result !== null) {
            return result
          }
        }

        // Initialize instance fields (after super() for derived classes)
        for (const field of instanceFields) {
          let fieldName: any

          // Handle computed property names
          if (field.computed) {
            const compiler = new Compiler()
            const chunk = compiler.compile({
              type: 'Program',
              body: [{
                type: 'ReturnStatement',
                argument: field.key
              }],
              sourceType: 'script'
            }, constructorScope)
            const vm = new VM(constructorScope)
            fieldName = vm.execute(chunk)
          } else if (field.key.type === 'PrivateIdentifier') {
            // Mangle private field names
            fieldName = `__private_${field.key.name}`
          } else {
            fieldName = field.key.name || field.key.value
          }

          let fieldValue = undefined
          if (field.value) {
            const compiler = new Compiler()
            const chunk = compiler.compile({
              type: 'Program',
              body: [{
                type: 'ReturnStatement',
                argument: field.value
              }],
              sourceType: 'script'
            }, constructorScope)
            const vm = new VM(constructorScope)
            fieldValue = vm.execute(chunk)
          }
          // Use the current 'this' from scope (may have been set by field initializers)
          const currentThis = constructorScope.find('this')?.get() || this
          currentThis[fieldName] = fieldValue
        }

        // If no superclass, execute constructor body after field initialization
        if (!superClass) {
          const compiler = new Compiler()
          const chunk = compiler.compile({
            type: 'Program',
            body: constructorBody.body,
            sourceType: 'script'
          }, constructorScope)
          const vm = new VM(constructorScope)
          const result = vm.execute(chunk)

          // If constructor explicitly returns an object, use that instead of `this`
          if (result !== undefined && typeof result === 'object' && result !== null) {
            return result
          }
        }

        // Return the current 'this' from scope (which may have been replaced by super())
        const finalThis = constructorScope.find('this')?.get()
        return finalThis !== undefined ? finalThis : this
      }
    } else {
      // Default constructor
      classConstructor = function (this: any, ...args: any[]) {
        // ES6 classes must be called with new
        if (!(this instanceof classConstructor)) {
          throw new TypeError(`Class constructor ${className} cannot be invoked without 'new'`)
        }

        let instance = this

        // If there's a superclass, call it
        if (superClass) {
          // For built-in classes, use Reflect.construct to properly initialize
          if (superClass === Array || superClass === Set || superClass === Map ||
              superClass === Promise || superClass === Error || superClass === RegExp ||
              superClass === Date || superClass === String || superClass === Number ||
              superClass === Boolean || superClass === Symbol) {
            // Use Reflect.construct to properly initialize built-ins
            instance = Reflect.construct(superClass, args, classConstructor)
          } else {
            // Regular class inheritance
            superClass.apply(this, args)
          }
        }

        // Create a scope for field initialization with 'this' bound
        // Use a function scope which allows 'this' to be bound
        const fieldScope = new Scope(captureScope, true)
        fieldScope.var('this', instance)

        // Initialize instance fields
        for (const field of instanceFields) {
          let fieldName: any

          // Handle computed property names
          if (field.computed) {
            const compiler = new Compiler()
            const chunk = compiler.compile({
              type: 'Program',
              body: [{
                type: 'ReturnStatement',
                argument: field.key
              }],
              sourceType: 'script'
            }, fieldScope)
            const vm = new VM(fieldScope)
            fieldName = vm.execute(chunk)
          } else if (field.key.type === 'PrivateIdentifier') {
            // Mangle private field names
            fieldName = `__private_${field.key.name}`
          } else {
            fieldName = field.key.name || field.key.value
          }

          let fieldValue = undefined
          if (field.value) {
            const compiler = new Compiler()
            const chunk = compiler.compile({
              type: 'Program',
              body: [{
                type: 'ReturnStatement',
                argument: field.value
              }],
              sourceType: 'script'
            }, fieldScope)
            const vm = new VM(fieldScope)
            fieldValue = vm.execute(chunk)
          }
          instance[fieldName] = fieldValue
        }

        // Return the instance (important for built-ins where instance !== this)
        return instance
      }
    }

    // Set up prototype chain
    if (superClass) {
      classConstructor.prototype = Object.create(superClass.prototype)
      classConstructor.prototype.constructor = classConstructor
      // Set up static method inheritance
      Object.setPrototypeOf(classConstructor, superClass)
    }

    // Bind the class constructor to the class scope for class expressions
    // This makes the class name available inside methods
    if (classNode.id) {
      classScope.const(className, classConstructor)
    }

    // Add instance methods to prototype
    // Collect getters and setters by property name first to handle both get/set for same property
    const instanceAccessors = new Map<any, { get?: Function, set?: Function }>()
    const instanceRegularMethods = []

    for (const method of instanceMethods) {
      let methodName: any

      // Handle computed property names
      if (method.computed) {
        // Evaluate the key expression to get the actual key
        const compiler = new Compiler()
        const chunk = compiler.compile({
          type: 'Program',
          body: [{
            type: 'ReturnStatement',
            argument: method.key
          }],
          sourceType: 'script'
        }, classScope)
        const vm = new VM(classScope)
        methodName = vm.execute(chunk)
      } else {
        methodName = method.key.name || method.key.value
      }

      // Create method with super access if there's a superclass
      const methodFunc = superClass
        ? this.createClassMethod(method.value, classScope, superClass)
        : this.createFunction(method.value, classScope)

      // Collect getters and setters
      if (method.kind === 'get' || method.kind === 'set') {
        if (!instanceAccessors.has(methodName)) {
          instanceAccessors.set(methodName, {})
        }
        const accessor = instanceAccessors.get(methodName)!
        if (method.kind === 'get') {
          accessor.get = methodFunc
        } else {
          accessor.set = methodFunc
        }
      } else {
        instanceRegularMethods.push({ name: methodName, func: methodFunc })
      }
    }

    // Define accessors
    for (const [methodName, accessor] of instanceAccessors) {
      Object.defineProperty(classConstructor.prototype, methodName, {
        get: accessor.get,
        set: accessor.set,
        enumerable: false,
        configurable: true
      })
    }

    // Define regular methods
    for (const { name, func } of instanceRegularMethods) {
      Object.defineProperty(classConstructor.prototype, name, {
        value: func,
        writable: true,
        enumerable: false,
        configurable: true
      })
    }

    // Add static methods to constructor
    // Collect getters and setters by property name first
    const staticAccessors = new Map<any, { get?: Function, set?: Function }>()
    const staticRegularMethods = []

    for (const method of staticMethods) {
      let methodName: any

      // Handle computed property names
      if (method.computed) {
        // Evaluate the key expression to get the actual key
        const compiler = new Compiler()
        const chunk = compiler.compile({
          type: 'Program',
          body: [{
            type: 'ReturnStatement',
            argument: method.key
          }],
          sourceType: 'script'
        }, classScope)
        const vm = new VM(classScope)
        methodName = vm.execute(chunk)
      } else {
        methodName = method.key.name || method.key.value
      }

      const methodFunc = this.createFunction(method.value, classScope)

      // Collect getters and setters
      if (method.kind === 'get' || method.kind === 'set') {
        if (!staticAccessors.has(methodName)) {
          staticAccessors.set(methodName, {})
        }
        const accessor = staticAccessors.get(methodName)!
        if (method.kind === 'get') {
          accessor.get = methodFunc
        } else {
          accessor.set = methodFunc
        }
      } else {
        staticRegularMethods.push({ name: methodName, func: methodFunc })
      }
    }

    // Define accessors
    for (const [methodName, accessor] of staticAccessors) {
      Object.defineProperty(classConstructor, methodName, {
        get: accessor.get,
        set: accessor.set,
        enumerable: false,
        configurable: true
      })
    }

    // Define regular methods
    for (const { name, func } of staticRegularMethods) {
      Object.defineProperty(classConstructor, name, {
        value: func,
        writable: true,
        enumerable: false,
        configurable: true
      })
    }

    // Initialize static fields
    for (const field of staticFields) {
      let fieldName: any

      // Handle computed property names
      if (field.computed) {
        const compiler = new Compiler()
        const chunk = compiler.compile({
          type: 'Program',
          body: [{
            type: 'ReturnStatement',
            argument: field.key
          }],
          sourceType: 'script'
        }, classScope)
        const vm = new VM(classScope)
        fieldName = vm.execute(chunk)
      } else if (field.key.type === 'PrivateIdentifier') {
        // Mangle private field names
        fieldName = `__private_${field.key.name}`
      } else {
        fieldName = field.key.name || field.key.value
      }

      let fieldValue = undefined
      if (field.value) {
        // Create a scope for static field initialization with 'this' bound to the constructor
        // Use a function scope which allows 'this' to be bound
        const staticFieldScope = new Scope(classScope, true)
        staticFieldScope.var('this', classConstructor)

        const compiler = new Compiler()
        const chunk = compiler.compile({
          type: 'Program',
          body: [{
            type: 'ReturnStatement',
            argument: field.value
          }],
          sourceType: 'script'
        }, staticFieldScope)
        const vm = new VM(staticFieldScope)
        fieldValue = vm.execute(chunk)
      }
      classConstructor[fieldName] = fieldValue
    }

    // Execute static blocks
    for (const staticBlock of staticBlocks) {
      // Create a scope for static block execution with 'this' bound to the constructor
      const staticBlockScope = new Scope(classScope, true)
      staticBlockScope.var('this', classConstructor)

      const compiler = new Compiler()
      const chunk = compiler.compile({
        type: 'Program',
        body: staticBlock.body,
        sourceType: 'script'
      }, staticBlockScope)
      const vm = new VM(staticBlockScope)
      vm.execute(chunk)
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
        // Capture the previous pending promise before creating the new one
        const previousPending = pendingNext

        // Create a promise for this next() call
        const currentNext = (async () => {
        // Wait for the previous operation to complete
        if (previousPending) {
          await previousPending
        }

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
        // Capture the previous pending promise before creating the new one
        const previousPending = pendingNext

        const currentOp = (async () => {
          // Wait for the previous operation to complete
          if (previousPending) {
            await previousPending
          }

          if (generatorState) {
            generatorState.done = true
          }
          return { value, done: true }
        })()

        pendingNext = currentOp
        try {
          return await currentOp
        } finally {
          // Clear pending when this call completes
          if (pendingNext === currentOp) {
            pendingNext = null
          }
        }
      },

      throw: async (error: any) => {
        // Capture the previous pending promise before creating the new one
        const previousPending = pendingNext

        const currentOp = (async () => {
          // Wait for the previous operation to complete
          if (previousPending) {
            await previousPending
          }

          if (generatorState) {
            generatorState.done = true
          }
          throw error
        })()

        pendingNext = currentOp
        try {
          return await currentOp
        } finally {
          // Clear pending when this call completes
          if (pendingNext === currentOp) {
            pendingNext = null
          }
        }
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
