import State from '../state'
import { OP, SIGNAL } from '../share/const'

function step(state: State) {
  const stack = state.stack
  const context = state.context
  const code = state.opCodes[state.pc]
  let signal = SIGNAL.NONE
  switch (code.op) {
    case OP.LOADK: stack.push(code.val); break
    case OP.LOADV: stack.push(context[code.val]); break
    case OP.MOVE: context[code.val] = stack.pop(); break
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
    case OP.ARR: stack.push(stack.splice(stack.length - code.val)); break
    case OP.MEMB: {
      const key = stack.pop()
      const object = stack.pop()
      stack.push(object[key])
      break
    }
    case OP.FUNC: {
      const beginPc = state.pc + 1 // the begin pc
      const endPc = code.val // the end pc
      const lexicalCtx = state.context.concat() // reserve the lexical context for function
      stack.push(function () {
        for (let i = arguments.length - 1; i > -1; i--) {
          stack.push(arguments[i]) // load arguments
        }
        stack.push(arguments) // load argument array itself
        stack.push(this) // load this

        const resetPc = state.pc // reserve the current pc
        const resetCtx = state.context // reserve the current context
        state.pc = beginPc // offset pc to the function op codes
        state.context = lexicalCtx // set the context as the lexical context of function

        while (state.pc < endPc) {
          if (step(state) === SIGNAL.RET) break
        }

        state.pc = resetPc // reset to the current pc
        state.context = resetCtx // reset to the current context
      })
      state.pc = endPc - 1
      break
    }
    case OP.CALL: {
      const func = stack.pop()
      const obj = stack.pop()
      const args = stack.splice(stack.length - code.val)
      func.apply(obj, args) // never mind the return, it's at the top of stack
      break
    }
    case OP.RET: signal = SIGNAL.RET; break
    case OP.COPY: stack.push(stack[stack.length - 1]); break
    default:
      throw new Error('Unknown instruct code')
  }
  state.pc++
  return signal
}

export default function execute(state: State) {
  while (state.pc < state.opCodes.length) step(state)
}