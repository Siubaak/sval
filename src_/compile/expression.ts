import * as estree from 'estree'
import State from '../state'
import compile from '../compile'
import { OP } from '../share/const'
import { compileFunc } from '../share/helpers'

export function ThisExpression(node: estree.ThisExpression, state: State) {
}

export function ArrayExpression(node: estree.ArrayExpression, state: State) {
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
    const pointer = state.symbols.get(node.left.name).pointer
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
}

export function ArrowFunctionExpression(node: estree.ArrowFunctionExpression, state: State) {
  compileFunc(node, state)
}

export function TemplateLiteral(node: estree.TemplateLiteral, state: State) {
}

export function TaggedTemplateExpression(node: estree.TaggedTemplateExpression, state: State) {
}

export function TemplateElement(node: estree.TemplateElement, state: State) {
  state.opCodes.push({ op: OP.LOADK, val: node.value.raw })
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