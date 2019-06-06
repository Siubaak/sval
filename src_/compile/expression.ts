import * as estree from 'estree'
import State from '../state'
import compile from '../compile'
import { OP } from '../share/const'

export function UnaryExpression(node: estree.UnaryExpression, state: State) {
  compile(node.argument, state)
  state.opCodes.push({ op: OP.UNOP, val: node.operator })
}

export function BinaryExpression(node: estree.BinaryExpression, state: State) {
  compile(node.left, state)
  compile(node.right, state)
  state.opCodes.push({ op: OP.BIOP, val: node.operator })
}

export function UpdateExpression(node: estree.UnaryExpression, state: State) {
  if (node.argument.type === 'Identifier') {
    state.opCodes.push({ op: OP.LOADV, val: state.symbols[node.argument.name] })
    if (!node.prefix) {
      // state.opCodes.push({ op: OP.LOADV, val: state.symbols[node.argument.name] })
    }
    state.opCodes.push({ op: OP.LOADK, val: 1 })
    state.opCodes.push({ op: OP.BIOP, val: node.operator[0] })
    state.opCodes.push({ op: OP.MOVE, val: state.symbols[node.argument.name] })
    if (node.prefix) {
      // state.opCodes.push({ op: OP.LOADV, val: state.symbols[node.argument.name] })
    }
  }
}

export function AssignmentExpression(node: estree.AssignmentExpression, state: State) {
  compile(node.right, state)
  if (node.left.type === 'Identifier') {
    const binaryOp = node.operator.substring(0, node.operator.length - 1)
    if (binaryOp) {
      state.opCodes.push({ op: OP.LOADV, val: state.symbols[node.left.name] })
      state.opCodes.push({ op: OP.BIOP, val: binaryOp })
    }
    state.opCodes.push({ op: OP.MOVE, val: state.symbols[node.left.name] })
    // state.opCodes.push({ op: OP.LOADV, val: state.symbols[node.left.name] })
  }
}