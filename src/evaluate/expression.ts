import * as estree from 'estree'
import Scope from '../scope'
import evaluate from '.'
import { hoist, createFunc, pattern, createClass, createFakeGenerator } from '../share/helper'
import { define, freeze, getGetter, getSetter, createSymbol } from '../share/util'
import { RETURN, SUPER } from '../share/const'

import { Identifier } from './identifier'
import { Literal } from './literal'
import { Variable, Prop } from '../scope/variable'
import { BlockStatement } from './statement'

export function ThisExpression(node: estree.ThisExpression, scope: Scope) {
  return scope.find('this').get()
}

export function ArrayExpression(node: estree.ArrayExpression, scope: Scope) {
  return node.elements.map(item => evaluate(item, scope))
}

export function ObjectExpression(node: estree.ObjectExpression, scope: Scope) {
  const object: { [key: string]: any } = {}
  
  for (const property of node.properties) {
    const propKey = property.key
    let key: string
    if (propKey.type === 'Identifier') {
      key = Identifier(propKey, scope, { getName: true })
    } else if (propKey.type === 'Literal') {
      key = '' + Literal(propKey, scope)
    } else {
      throw new SyntaxError('Unexpected token')
    }

    const value = evaluate(property.value, scope)

    const propKind = property.kind
    if (propKind === 'init') {
      object[key] = value
    } else if (propKind === 'get') {
      define(object, key, { get: value })
    } else if (propKind === 'set') {
      define(object, key, { set: value })
    } else {
      throw new SyntaxError('Unexpected token')
    }
  }

  return object
}

export function FunctionExpression(node: estree.FunctionExpression, scope: Scope) {
  return node.generator ? createFakeGenerator(node, scope) : createFunc(node, scope)
}

export function UnaryExpression(node: estree.UnaryExpression, scope: Scope) {
  const unaryOps = {
    '+': () => +evaluate(node.argument, scope),
    '-': () => -evaluate(node.argument, scope),
    '!': () => !evaluate(node.argument, scope),
    '~': () => ~evaluate(node.argument, scope),
    'void': () => void evaluate(node.argument, scope) as any,
    'typeof': () => {
      if (node.argument.type === 'Identifier') {
        return typeof Identifier(node.argument, scope, { throwErr: false })
      } else {
        return typeof evaluate(node.argument, scope)
      }
    },
    'delete': () => {
      const arg = node.argument
      if (arg.type === 'MemberExpression') {
        const variable: Prop = MemberExpression(arg, scope, { getVar: true })
        return variable.del()
      } else if (arg.type === 'Identifier') {
        const globalScope = scope.global()
        const name = Identifier(arg, globalScope, { getName: true })
        const win = globalScope.find('window').get()
        return delete win[name]
      } else {
        throw new SyntaxError('Unexpected token')
      }
    }
  }
  const handler = unaryOps[node.operator]
  if (handler) {
    return handler()
  } else {
    throw new SyntaxError(`Unexpected token ${node.operator}`)
  }
}

export function UpdateExpression(node: estree.UpdateExpression, scope: Scope) {
  const arg = node.argument
  
  let variable: Variable
  if (arg.type === 'Identifier') {
    variable = Identifier(arg, scope, { getVar: true })
  } else if (arg.type === 'MemberExpression') {
    variable = MemberExpression(arg, scope, { getVar: true })
  } else {
    throw new SyntaxError('Unexpected token')
  }

  const value = variable.get()
  if (node.operator === '++') {
    variable.set(value + 1)
    return node.prefix ? variable.get() : value
  } else if (node.operator === '--') {
    variable.set(value - 1)
    return node.prefix ? variable.get() : value
  } else {
    throw new SyntaxError(`Unexpected token ${node.operator}`)
  }
}

export function BinaryExpression(node: estree.BinaryExpression, scope: Scope) {
  const left = evaluate(node.left, scope)
  const right = evaluate(node.right, scope)

  const binaryOps = {
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

  const handler = binaryOps[node.operator]
  if (handler) {
    return handler()
  } else {
    throw new SyntaxError(`Unexpected token ${node.operator}`)
  }
}

export function AssignmentExpression(node: estree.AssignmentExpression, scope: Scope) {
  const value = evaluate(node.right, scope)

  const left = node.left

  let variable: Variable
  if (left.type === 'Identifier') {
    variable = Identifier(left, scope, { getVar: true, throwErr: false })
    if (!variable) {
      const win = scope.global().find('window').get()
      variable = new Prop(win, left.name)
    }
  } else if (left.type === 'MemberExpression') {
    variable = MemberExpression(left, scope, { getVar: true })
  } else {
    return pattern(left, scope, { feed: value })
  }

  const assignOps = {
    '=': () => {
      variable.set(value)
      return variable.get()
    },
    '+=': () => {
      variable.set(variable.get() + value)
      return variable.get()
    },
    '-=': () => {
      variable.set(variable.get() - value)
      return variable.get()
    },
    '*=': () => {
      variable.set(variable.get() * value)
      return variable.get()
    },
    '/=': () => {
      variable.set(variable.get() / value)
      return variable.get()
    },
    '%=': () => {
      variable.set(variable.get() % value)
      return variable.get()
    },
    '**=': () => {
      variable.set(variable.get() ** value)
      return variable.get()
    },
    '<<=': () => {
      variable.set(variable.get() << value)
      return variable.get()
    },
    '>>=': () => {
      variable.set(variable.get() >> value)
      return variable.get()
    },
    '>>>=': () => {
      variable.set(variable.get() >>> value)
      return variable.get()
    },
    '|=': () => {
      variable.set(variable.get() | value)
      return variable.get()
    },
    '^=': () => {
      variable.set(variable.get() ^ value)
      return variable.get()
    },
    '&=': () => {
      variable.set(variable.get() & value)
      return variable.get()
    },
  }
  
  const handler = assignOps[node.operator]
  if (handler) {
    return handler()
  } else {
    throw new SyntaxError(`Unexpected token ${node.operator}`)
  }
}

export function LogicalExpression(node: estree.LogicalExpression, scope: Scope) {
  if (node.operator === '||') {
    return evaluate(node.left, scope) || evaluate(node.right, scope)
  } else if (node.operator === '&&') {
    return evaluate(node.left, scope) && evaluate(node.right, scope)
  } else {
    throw new SyntaxError(`Unexpected token ${node.operator}`)
  }
}

export interface MemberExpressionOptions {
  getObj?: boolean
  getVar?: boolean
}

export function MemberExpression(
  node: estree.MemberExpression,
  scope: Scope,
  options: MemberExpressionOptions = {},
) {
  const { getObj = false, getVar = false } = options

  let object: any
  if (node.object.type === 'Super') {
    object = Super(node.object, scope, { getProto: true })
  } else {
    object = evaluate(node.object, scope)
  }

  if (getObj) {
    if (node.object.type === 'Super') {
      return scope.find('this').get()
    } else {
      return object
    }
  }

  let key: string
  if (node.computed) {
    key = evaluate(node.property, scope)
  } else if (node.property.type === 'Identifier') {
    key = Identifier(node.property, scope, { getName: true })
  } else {
    throw new SyntaxError('Unexpected token')
  }

  if (getVar) {
    // left value
    const setter = getSetter(object, key)
    if (node.object.type === 'Super' && setter) {
      // transfer the setter from super to this with a private key
      const thisObject = scope.find('this').get()
      const privateKey = createSymbol(key)
      define(thisObject, privateKey, { set: setter })

      return new Prop(thisObject, privateKey)
    } else {
      return new Prop(object, key)
    }
  } else {
    // right value
    const getter = getGetter(object, key)
    if (node.object.type === 'Super' && getter) {
      const thisObject = scope.find('this').get()
      return getter.call(thisObject)
    } else {
      return object[key]
    }
  }
}

export function ConditionalExpression(node: estree.ConditionalExpression, scope: Scope) {
  return evaluate(node.test, scope)
    ? evaluate(node.consequent, scope)
    : evaluate(node.alternate, scope)
}

export function CallExpression(node: estree.CallExpression, scope: Scope) {
  const func = evaluate(node.callee, scope)
  const args = node.arguments.map(arg => evaluate(arg, scope))

  if (node.callee.type === 'MemberExpression') {
    const object = MemberExpression(node.callee, scope, { getObj: true })
    return func.apply(object, args)
  } else {
    const thisObject = scope.find('this').get()
    return func.apply(thisObject, args)
  }
}

export function NewExpression(node: estree.NewExpression, scope: Scope) {
  const constructor = evaluate(node.callee, scope)
  const args = node.arguments.map(arg => evaluate(arg, scope))
  return new constructor(...args)
}

export function SequenceExpression(node: estree.SequenceExpression, scope: Scope) {
  let result: any
  for (const expression of node.expressions) {
    result = evaluate(expression, scope)
  }
  return result
}

export function ArrowFunctionExpression(node: estree.ArrowFunctionExpression, scope: Scope) {
  return createFunc(node, scope)
}

export function YieldExpression(node: estree.YieldExpression, scope: Scope) {
  return evaluate(node.argument, scope)
}

export function TemplateLiteral(node: estree.TemplateLiteral, scope: Scope) {
  const quasis = node.quasis
  const expressions = node.expressions

  let result = ''
  let temEl: estree.TemplateElement
  let expr: estree.Expression

  while (temEl = quasis.shift()) {
    result += TemplateElement(temEl, scope)
    expr = expressions.shift()
    if (expr) {
      result += evaluate(expr, scope)
    }
  }

  return result
}

export function TaggedTemplateExpression(node: estree.TaggedTemplateExpression, scope: Scope) {
  const tagFunc = evaluate(node.tag, scope)

  const quasis = node.quasi.quasis
  const str = quasis.map(v => v.value.cooked)
  const raw = quasis.map(v => v.value.raw)

  define(str, 'raw', {
    value: freeze(raw)
  })

  const expressions = node.quasi.expressions
  const args = expressions.map(n => evaluate(n, scope)) || []

  return tagFunc(freeze(str), ...args)
}

export function TemplateElement(node: estree.TemplateElement, scope: Scope) {
  return node.value.raw
}

export function ClassExpression(node: estree.ClassExpression, scope: Scope) {
  return createClass(node, scope)
}

export interface SuperOptions {
  getProto?: boolean
}

export function Super(
  node: estree.Super,
  scope: Scope,
  options: SuperOptions = {},
) {
  const { getProto = false } = options
  const superClass = scope.find(SUPER).get()
  return getProto ? superClass.prototype: superClass
}