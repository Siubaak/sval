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
    const symbol = state.symbols.get(node.argument.name).pointer
    state.opCodes.push({ op: OP.LOADV, val: symbol })
    if (!node.prefix) {
      state.opCodes.push({ op: OP.COPY })
    }
    state.opCodes.push({ op: OP.LOADK, val: 1 })
    state.opCodes.push({ op: OP.BIOP, val: node.operator[0] })
    if (node.prefix) {
      state.opCodes.push({ op: OP.COPY })
    }
    state.opCodes.push({ op: OP.MOVE, val: symbol })
  }
}

export function AssignmentExpression(node: estree.AssignmentExpression, state: State) {
  compile(node.right, state)
  if (node.left.type === 'Identifier') {
    const pointer = state.symbols.get(node.left.name).pointer
    const binaryOp = node.operator.substring(0, node.operator.length - 1)
    if (binaryOp) {
      state.opCodes.push({ op: OP.LOADV, val: pointer })
      state.opCodes.push({ op: OP.BIOP, val: binaryOp })
    }
    state.opCodes.push({ op: OP.MOVE, val: pointer })
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

  const callee = node.callee
  if (callee.type === 'MemberExpression') {
    compile(callee.object, state)
    state.opCodes.push({ op: OP.COPY })
    if (callee.computed) {
      compile(callee.property, state)
    } else {
      state.opCodes.push({ op: OP.LOADK, val: (callee.property as estree.Identifier).name })
    }
    state.opCodes.push({ op: OP.MEMB })
  } else {
    state.opCodes.push({ op: OP.LOADV, val: state.symbols.get('this').pointer })
    compile(callee, state)
  }

  state.opCodes.push({ op: OP.CALL, val: node.arguments.length })
}

export function FunctionExpression(node: estree.FunctionExpression, state: State) {
  const funCode = { op: OP.FUNC, val: -1 }
  state.opCodes.push(funCode)

  state.symbols.pushScope()
  state.opCodes.push({ op: OP.MOVE, val: state.symbols.set('const', 'this').pointer })
  state.opCodes.push({ op: OP.MOVE, val: state.symbols.set('let', 'arguments').pointer })
  for (let i = 0; i < node.params.length; i++) {
    const param = node.params[i]
    if (param.type === 'Identifier') {
      state.opCodes.push({ op: OP.MOVE, val: state.symbols.set('let', param.name).pointer })
    } else if (param.type === 'RestElement') {
    } else {
    }
  }
  const body = node.body.type === 'BlockStatement' ? node.body.body : [node.body]
  for (let i = 0; i < body.length; i++) {
    compile(body[i], state)
  }
  state.symbols.popScope()

  funCode.val = state.opCodes.length
}