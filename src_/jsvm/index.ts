import State from '../state'
import { OP } from '../share/const'

export default function execute(state: State) {
  const opCodes = state.opCodes
  const opLen = opCodes.length
  const stack = state.stack
  const context = state.context
  for (let pc = 0; pc < opLen; pc++) {
    const code = opCodes[pc]
    switch (code.op) {
      case OP.LOADK: {
        stack.push(code.val)
        break
      }
      case OP.LOADV: {
        stack.push(context[code.val])
        break
      }
      case OP.CONST:
      case OP.LET:
      case OP.VAR:
      case OP.FUNC:
      case OP.MOVE: {
        context[code.val] = stack.pop()
        break
      }
      case OP.JMP: {
        pc = code.val - 1
        break
      }
      case OP.BIOP: {
        const right = stack.pop()
        const left = stack.pop()
        switch (code.val) {
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
      case OP.UPOP: {
        break
      }
      case OP.UNOP: {
        break
      }
      case OP.IFJMP: {
        if (stack.pop()) pc = code.val - 1
        break
      }
      default:
        throw new Error('Unknown instruct code')
    }
  }
}