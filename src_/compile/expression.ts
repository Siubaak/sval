import * as estree from 'estree'
import State from '../state'
import compile from '../compile'
import { OP } from '../share/const'
import { compileFunc } from '../share/helpers'

export function ThisExpression(node: estree.ThisExpression, state: State) {
  state.opCodes.push({ op: OP.LOADV, val: state.symbols.get('this') })
}

export function ArrayExpression(node: estree.ArrayExpression, state: State) {
  for (let i = 0; i < node.elements.length; i++) {
    const item = node.elements[i]
    compile(item, state)
  }
  state.opCodes.push({ op: OP.ARR, val: node.elements.length })
}

export function ObjectExpression(node: estree.ObjectExpression, state: State) {
}

export function FunctionExpression(node: estree.FunctionExpression, state: State) {
  compileFunc(node, state)
}

export function UnaryExpression(node: estree.UnaryExpression, state: State) {
  compile(node.argument, state)
  state.opCodes.push({ op: OP.UNOP, val: node.operator })
}

export function UpdateExpression(node: estree.UpdateExpression, state: State) {
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

export function BinaryExpression(node: estree.BinaryExpression, state: State) {
  compile(node.left, state)
  compile(node.right, state)
  state.opCodes.push({ op: OP.BIOP, val: node.operator })
}

export function AssignmentExpression(node: estree.AssignmentExpression, state: State) {
  compile(node.right, state)
  if (node.left.type === 'Identifier') {
    const symbol = state.symbols.get(node.left.name)
    if (symbol.type === 'const') throw new TypeError('Assignment to constant variable')
    const pointer = symbol.pointer
    const binaryOp = node.operator.substring(0, node.operator.length - 1)
    if (binaryOp) {
      state.opCodes.push({ op: OP.LOADV, val: pointer })
      state.opCodes.push({ op: OP.BIOP, val: binaryOp })
    }
    state.opCodes.push({ op: OP.MOVE, val: pointer })
  }
}

export function LogicalExpression(node: estree.LogicalExpression, state: State) {
  compile(node.left, state)
  compile(node.right, state)
  state.opCodes.push({ op: OP.BIOP, val: node.operator })
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

export function ConditionalExpression(node: estree.ConditionalExpression, state: State) {
  compile(node.test, state)
  const ifnotCode = { op: OP.IFNOT, val: -1 }
  state.opCodes.push(ifnotCode)
  // if true
  compile(node.consequent, state)
  const trueEndCode = { op: OP.JMP, val: -1 }
  state.opCodes.push(trueEndCode)
  ifnotCode.val = state.opCodes.length
  // else
  compile(node.alternate, state)
  trueEndCode.val = state.opCodes.length
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

export function NewExpression(node: estree.NewExpression, state: State) {
}

export function MetaProperty(node: estree.MetaProperty, state: State) {
}

export function SequenceExpression(node: estree.SequenceExpression, state: State) {
  for (let i = 0; i < node.expressions.length; i++) {
    compile(node.expressions[i], state)
  }
}

export function ArrowFunctionExpression(node: estree.ArrowFunctionExpression, state: State) {
  compileFunc(node, state)
}

export function TemplateLiteral(node: estree.TemplateLiteral, state: State) {
  const quasis = node.quasis
  const expressions = node.expressions

  state.opCodes.push({ op: OP.LOADK, val: quasis.shift().value.raw })

  let expr: estree.Expression
  while (expr = expressions.shift()) {
    compile(expr, state)
    state.opCodes.push({ op: OP.BIOP, val: '+' })
    state.opCodes.push({ op: OP.LOADK, val: quasis.shift().value.raw })
    state.opCodes.push({ op: OP.BIOP, val: '+' })
  }
}

export function TaggedTemplateExpression(node: estree.TaggedTemplateExpression, state: State) {
}

export function ClassExpression(node: estree.ClassExpression, state: State) {
}

export function Super(node: estree.Super, state: State) {
}

export function SpreadElement(node: estree.SpreadElement, state: State) {
  compile(node.argument, state)
}

export function YieldExpression(node: estree.YieldExpression, state: State) {
}

export function AwaitExpression(node: estree.AwaitExpression, state: State) {
}