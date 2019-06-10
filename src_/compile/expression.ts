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
    const symbol = state.symbols.get(node.argument.name)
    state.opCodes.push({ op: OP.LOADV, val: symbol })
    if (!node.prefix) {
      state.opCodes.push({ op: OP.LOADV, val: symbol })
    }
    state.opCodes.push({ op: OP.LOADK, val: 1 })
    state.opCodes.push({ op: OP.BIOP, val: node.operator[0] })
    state.opCodes.push({ op: OP.MOVE, val: symbol })
    if (node.prefix) {
      state.opCodes.push({ op: OP.LOADV, val: symbol })
    }
  }
}

export function AssignmentExpression(node: estree.AssignmentExpression, state: State) {
  compile(node.right, state)
  if (node.left.type === 'Identifier') {
    const binaryOp = node.operator.substring(0, node.operator.length - 1)
    if (binaryOp) {
      state.opCodes.push({ op: OP.LOADV, val: state.symbols.get(node.left.name) })
      state.opCodes.push({ op: OP.BIOP, val: binaryOp })
    }
    state.opCodes.push({ op: OP.MOVE, val: state.symbols.get(node.left.name) })
  }
}

export function MemberExpression(node: estree.MemberExpression, state: State) {
  compile(node.object, state)
  if (node.computed) {
    compile(node.property, state)
  } else {
    state.opCodes.push({ op: OP.LOADK, val: (node.property as estree.Identifier).name })
  }
  state.opCodes.push({ op: OP.MEMB })
}

export function CallExpression(node: estree.CallExpression, state: State) {
  for (let i = 0; i < node.arguments.length; i++) {
    const arg = node.arguments[i]
    if (arg.type === 'SpreadElement') {
    } else {
      compile(arg, state)
    }
  }

  if (node.callee.type === 'MemberExpression') {
  } else {
    state.opCodes.push({ op: OP.LOADV, val: state.symbols.get('this') })
    compile(node.callee, state)
  }

  state.opCodes.push({ op: OP.CALL, val: node.arguments.length })
}