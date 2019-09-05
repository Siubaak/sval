import State from '../state'
import { OP, SIGNAL } from '../share/const'
import { getDptor, define, inherits } from '../share/utils'

function step(state: State) {
  const stack = state.stack
  const code = state.opCodes[state.pc]
  let signal = SIGNAL.NONE
  switch (code.op) {
    case OP.LOADK: stack.push(code.val); break
    case OP.LOADV: stack.push(state.context[code.val].store); break
    case OP.ALLOC: state.context[code.val] = {
      store: stack.length > state.ebpList[state.ebpList.length - 1] ? stack.pop() : undefined
    }; break
    case OP.STORE: state.context[code.val].store = stack.pop(); break
    case OP.BIOP: {
      const right = stack.pop()
      const left = stack.pop()
      switch (code.val) {
        // very often used
        case '+': stack.push(left + right); break
        case '-': stack.push(left - right); break
        case '*': stack.push(left * right); break
        case '/': stack.push(left / right); break
        case '==': stack.push(left == right); break
        case '!=': stack.push(left != right); break
        case '===': stack.push(left === right); break
        case '!==': stack.push(left !== right); break
        case '<': stack.push(left < right); break
        case '<=': stack.push(left <= right); break
        case '>': stack.push(left > right); break
        case '>=': stack.push(left >= right); break
        case '||': stack.push(left || right); break
        case '&&': stack.push(left && right); break
        case 'in': stack.push(left in right); break
        case 'instanceof': stack.push(left instanceof right); break
        // not quite often used
        case '**': stack.push(left ** right); break
        case '%': stack.push(left % right); break
        case '|': stack.push(left | right); break
        case '^': stack.push(left ^ right); break
        case '&': stack.push(left & right); break
        case '<<': stack.push(left << right); break
        case '>>': stack.push(left >> right); break
        case '>>>': stack.push(left >>> right); break
        default: throw new SyntaxError(`Unexpected token ${code.val}`)
      }
      break
    }
    case OP.UNOP: {
      const arg = stack.pop()
      switch (code.val) {
        case '+': stack.push(+arg); break
        case '-': stack.push(-arg); break
        case '!': stack.push(!arg); break
        case '~': stack.push(~arg); break
        case 'void': stack.push(void arg); break
        case 'typeof': stack.push(typeof arg); break
        case 'delete': throw new SyntaxError('delete is not implemented')
        default: throw new SyntaxError(`Unexpected token ${code.val}`)
      }
      break
    }
    case OP.JMP: state.pc = code.val - 1; break
    case OP.IF: stack.pop() && (state.pc = code.val - 1); break
    case OP.IFNOT: !stack.pop() && (state.pc = code.val - 1); break
    case OP.CSNE: stack.pop() !== stack[stack.length - 1] && (state.pc = code.val - 1); break
    case OP.ARR: {
      const spread = code.val.concat()
      const arrItems = stack.splice(stack.length - spread.pop())
      let arr: any[] = []
      for (let i = 0; i < arrItems.length; i++) {
        if (spread.indexOf(i) === -1) {
          arr.push(arrItems[i])
        } else {
          arr = [...arr, ...arrItems[i]]
        }
      }
      stack.push(arr)
      break
    }
    case OP.OBJ: {
      const object: any = {}
      const propKinds = code.val
      const keyValue = stack.splice(stack.length - propKinds.length * 2)
      for (let i = 0; i < propKinds.length * 2; i += 2) {
        const key = keyValue[i]
        const value = keyValue[i + 1]
        const kind = propKinds[i / 2]
        if (kind === 'init') {
          object[key] = value
        } else if (kind === 'get') {
          const oriDptor = getDptor(object, key)
          define(object, key, {
            get: value,
            set: oriDptor && oriDptor.set,
            enumerable: true,
            configurable: true
          })
        } else if (kind === 'set') {
          const oriDptor = getDptor(object, key)
          define(object, key, {
            get: oriDptor && oriDptor.get,
            set: value,
            enumerable: true,
            configurable: true
          })
        } else { // kind === 'sprd'
          Object.assign(object, value)
        }
      }
      stack.push(object)
      break
    }
    case OP.MGET: {
      const key = stack.pop()
      const object = stack.pop()
      if (object == undefined) {
        throw new TypeError(`Cannot read property '${key}' of ${object}`)
      }
      const dptor = getDptor(object, key)
      // if getter, just call
      dptor && dptor.get ? object[key] : stack.push(object[key])
      break
    }
    case OP.MSET: {
      const key = stack.pop()
      const object = stack.pop()
      const value = stack.pop()
      object[key] = value
      break
    }
    case OP.REST: {
      if (code.val === 'obj') {
        const rmKeys = stack.splice(stack.length - code.remove)
        const object = Object.assign({}, stack.pop())
        for (let i = 0; i < rmKeys.length; i++) {
          delete object[rmKeys[i]]
        }
        stack.push(object)
      } else if (code.val === 'arr') {
        stack.push(stack.pop().slice(code.remove))
      } else { // code.val === 'func'
        stack.push(stack.splice(state.ebpList[state.ebpList.length - 1]).reverse())
      }
      break
    }
    case OP.KOVS: {
      const kovs = []
      if (code.val) {
        for (const key in stack.pop()) {
          kovs.push(key)
        }
      } else {
        const iterator = stack.pop()
        if (!iterator[Symbol.iterator]) {
          throw new TypeError(`${JSON.stringify(iterator)} is not iterable`)
        }
        for (const value of iterator) {
          kovs.push(value)
        }
      }
      stack.push(kovs)
      stack.push(kovs.length)
      break
    }
    case OP.FUNC: {
      const beginPc = state.pc + 1 // the begin pc
      const endPc = code.end // the end pc
      const lexicalCtx = state.context.concat() // reserve the lexical context for function
      if (!code.generator && !code.async) {
        const func = function () {
          for (let i = arguments.length - 1; i > -1; i--) {
            stack.push(arguments[i]) // load arguments
          }
          if (!code.arrow) {
            stack.push(arguments) // load argument array itself
            stack.push(this) // load this
          }
  
          const resetPc = state.pc // reserve the current pc
          const resetCtx = state.context // reserve the current context
          state.pc = beginPc // offset pc to the function op codes
          state.context = lexicalCtx // set the context as the lexical context of function
  
          let signal = SIGNAL.NONE
          let ret: any
          while (state.pc < endPc) {
            signal = step(state)
            if (signal === SIGNAL.RET) {
              ret = stack.pop()
              break
            }
          }
          
          state.pc = resetPc // reset to the current pc
          state.context = resetCtx // reset to the current context

          return ret
        }
        define(func, 'name', {
          value: code.val,
          configurable: true
        })
        define(func, 'length', {
          value: code.length,
          configurable: true
        })
        stack.push(func)
      } else {
        // const tmpFunc = function* () {
        //   for (let i = arguments.length - 1; i > -1; i--) {
        //     stack.push(arguments[i]) // load arguments
        //   }
        //   if (!code.arrow) {
        //     stack.push(arguments) // load argument array itself
        //     stack.push(this) // load this
        //   }
  
        //   const resetPc = state.pc // reserve the current pc
        //   const resetCtx = state.context // reserve the current context
        //   state.pc = beginPc // offset pc to the function op codes
        //   state.context = lexicalCtx // set the context as the lexical context of function
  
        //   while (state.pc < endPc) {
        //     const s = step(state)
        //     if (s === SIGNAL.RET) break
        //     else if (s === SIGNAL.YIELD) yield
        //   }
  
        //   state.pc = resetPc // reset to the current pc
        //   state.context = resetCtx // reset to the current context
        // }
        // if (code.async && code.generator) {
        //   stack.push(function (): AsyncIterator<any> {
        //     const iterator = tmpFunc.apply(void 0, arguments)
        //     let last: Promise<any> = Promise.resolve()
        //     let hasCatch = false
        //     const run = (opts: runAsyncOptions) =>
        //       last = last
        //         .then(() => runAsync(iterator, assign({ fullRet: true }, opts)))
        //         .catch(err => {
        //           if (!hasCatch) {
        //             hasCatch = true
        //             return Promise.reject(err)
        //           }
        //         })
        //     const asyncIterator: AsyncIterator<any> = {
        //       next: (res?: any) => run({ res }),
        //       throw: (err?: any) => run({ err }),
        //       return: (ret?: any) => run({ ret })
        //     }
        //     if (typeof Symbol === 'function') {
        //       (asyncIterator as any)[Symbol.iterator] = function () { return this }
        //     }
        //     return asyncIterator
        //   })
        // } else if (code.async) {
        //   stack.push(function () {
        //     return runAsync(tmpFunc.apply(void 0, arguments))
        //   })
        // } else {
        //   stack.push(tmpFunc)
        // }
      }
      state.pc = endPc - 1
      break
    }
    case OP.CLS: {
      let superClass: any = null
      if (code.inherit) {
        superClass = stack.pop()
      }
      let ctor = function () {
        if (superClass) {
          superClass.apply(this)
        }
      }
      if (code.constructor) {
        ctor = stack.pop()
      }
      if (superClass) {
        inherits(ctor, superClass)
      }
      define(ctor, 'name', {
        value: code.val,
        configurable: true
      })
      stack.push(ctor)
      break
    }
    case OP.CMET: {
      const key = stack.pop()
      const met = stack.pop()
      const obj = code.static ? stack[stack.length - 1] : stack[stack.length - 1].prototype
      switch (code.val) {
        case 'get': {
          const oriDptor = getDptor(obj, key)
          define(obj, key, {
            get: met,
            set: oriDptor && oriDptor.set,
            configurable: true,
          })
          break
        }
        case 'set': {
          const oriDptor = getDptor(obj, key)
          define(obj, key, {
            get: oriDptor && oriDptor.get,
            set: met,
            configurable: true,
          })
          break
        }
        default: // kind is 'method'
          define(obj, key, {
            value: met,
            writable: true,
            configurable: true,
          })
      }
      break
    }
    case OP.CALL: {
      const func = stack.pop()
      const obj = stack.pop()

      const spread = code.val.concat()
      const argsItems = stack.splice(stack.length - spread.pop())
      let args: any[] = []
      for (let i = 0; i < argsItems.length; i++) {
        if (spread.indexOf(i) === -1) {
          args.push(argsItems[i])
        } else {
          args = [...args, ...argsItems[i]]
        }
      }

      // push ebp here instead of inside functions
      // to avoid a wrong ebp list caused by throwing error in functions
      state.ebpList.push(stack.length)
      let result: any
      if (code.catch) {
        try {
          result = func.apply(obj, args)
        } catch (err) {
          result = err
          state.pc = code.catch.pc - 1
        }
      } else {
        result = func.apply(obj, args)
      }
      stack.length = state.ebpList.pop()
      stack.push(result)
      break
    }
    case OP.NEW: {
      const ctor = stack.pop()
      
      const spread = code.val.concat()
      const argsItems = stack.splice(stack.length - spread.pop())
      let args: any[] = []
      for (let i = 0; i < argsItems.length; i++) {
        if (spread.indexOf(i) === -1) {
          args.push(argsItems[i])
        } else {
          args = [...args, ...argsItems[i]]
        }
      }

      // push ebp here instead of inside functions
      // to avoid a wrong ebp list caused by throwing error in functions
      state.ebpList.push(stack.length)
      let result: any
      if (code.catch) {
        try {
          result = new ctor(...args)
        } catch (err) {
          result = err
          state.pc = code.catch.pc - 1
        }
      } else {
        result = new ctor(...args)
      }
      stack.length = state.ebpList.pop()
      stack.push(result)
      break
    }
    case OP.RET: signal = SIGNAL.RET; break
    case OP.YIELD: signal = SIGNAL.YIELD; break
    case OP.AWAIT: signal = SIGNAL.AWAIT; break
    case OP.COPY: stack.push(stack[stack.length - 1]); break
    case OP.POP: stack.pop(); break
    case OP.DBG: debugger; break
    case OP.THROW: {
      if (code.val) {
        state.pc = code.val.pc - 1
        break
      } else {
        throw stack.pop()
      }
    }
    case OP.GC: stack.length = state.ebpList[state.ebpList.length - 1]; break
    default: throw new Error('Unknown instruct code')
  }
  state.pc++
  return signal
}

export default function execute(state: State) {
  while (state.pc < state.opCodes.length) step(state)
}