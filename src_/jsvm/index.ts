import State from '../state'
import { OP } from '../share/const';

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
        const binaryOps: any = {
          '==': () => left == right,
          '!=': () => left != right,
          '===': () => left === right,
          '!==': () => left !== right,
          '<': () => left < right,
          '<=': () => left <= right,
          '>': () => left > right,
          '>=': () => left >= right,
          '<<': () => left << right,
          '>>': () => left >> right,
          '>>>': () => left >>> right,
          '+': () => left + right,
          '-': () => left - right,
          '*': () => left * right,
          '**': () => left ** right,
          '/': () => left / right,
          '%': () => left % right,
          '|': () => left | right,
          '^': () => left ^ right,
          '&': () => left & right,
          'in': () => left in right,
          'instanceof': () => left instanceof right,
        }
        const handler = binaryOps[code.val]
        if (handler) {
          stack.push(handler())
        } else {
          throw new SyntaxError(`Unexpected token ${code.val}`)
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