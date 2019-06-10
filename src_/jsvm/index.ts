import State from '../state'
import { OP } from '../share/const'

function step(state: State) {
  const stack = state.stack
  const context = state.context
  const code = state.opCodes[state.pc]
  switch (code.op) {
    case OP.LOADK: {
      stack.push(code.val); break
    }
    case OP.LOADV: {
      stack.push(context[code.val]); break
    }
    case OP.CONST:{
      context[code.val] = stack.pop(); break
    }
    case OP.LET:{
      context[code.val] = stack.pop(); break
    }
    case OP.FUNC: {
      context[code.val] = function () {
        for (let i = arguments.length - 1; i > -1; i--) {
          stack.push(arguments[i])
        }
        stack.push(arguments)
        stack.push(this)
        const resetPc = state.pc
        state.pc = code.begin
        while (state.pc < code.end) step(state)
        state.pc = resetPc
      }
      state.pc = code.end - 1
      break
    }
    case OP.VAR:{
      context[code.val] = stack.pop(); break
    }
    case OP.MOVE: {
      context[code.val] = stack.pop(); break
    }
    case OP.JMP: {
      state.pc = code.val - 1; break
    }
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
        case '+': stack.push(+arg)
        case '-': stack.push(-arg)
        case '!': stack.push(!arg)
        case '~': stack.push(~arg)
        case 'void': stack.push(void arg)
        case 'typeof': stack.push(typeof arg)
        case 'delete': throw new SyntaxError('delete is not implemented')
        default: throw new SyntaxError(`Unexpected token ${code.val}`)
      }
    }
    case OP.IFJMP: {
      if (stack.pop()) state.pc = code.val - 1
      break
    }
    case OP.MEMB: {
      const key = stack.pop()
      const object = stack.pop()
      stack.push(object[key])
      break
    }
    case OP.CALL: {
      const func = stack.pop()
      const thisObj = stack.pop()
      const args = []
      for (let i = 0; i < code.val; i++) {
        args.push(stack.pop())
      }
      stack.push(func.apply(thisObj, args.reverse()))
      break
    }
    default:
      throw new Error('Unknown instruct code')
  }
  state.pc++
}

export default function execute(state: State) {
  while (state.pc < state.opCodes.length) step(state)
}