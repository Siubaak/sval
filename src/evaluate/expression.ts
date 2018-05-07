import * as estree from 'estree'
import Scope from '../scope'
import evaluate from '.'
import { RETURN } from '../share/const'
import { Identifier } from './identifier'
import { Literal } from './literal'
import { Variable, Prop } from '../scope/variable'

// es5
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
      Object.defineProperty(object, key, { get: value })
    } else if (propKind === 'set') {
      Object.defineProperty(object, key, { set: value })
    } else {
      throw new SyntaxError('Unexpected token')
    }
  }

  return object
}

export function FunctionExpression(node: estree.FunctionExpression, scope: Scope) {
  return function (...args: any[]) {
    const subScope = new Scope('function', scope)
    subScope.invasive()
    subScope.const('this', this)
    subScope.const('arguments', arguments)

    const params = node.params as estree.Identifier[]
    for (let i = 0; i < params.length; i++) {
      const { name } = params[i]
      subScope.let(name, args[i])
    }
    
    const result = evaluate(node.body, subScope)
    if (result === RETURN) {
      return result.RES
    }
  }
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
  const handle = unaryOps[node.operator]
  if (handle) {
    return handle()
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

  const handle = binaryOps[node.operator]
  if (handle) {
    return handle()
  } else {
    throw new SyntaxError(`Unexpected token ${node.operator}`)
  }
}

export function AssignmentExpression(node: estree.AssignmentExpression, scope: Scope) {
  const left = node.left
  let variable: Variable
  if (left.type === 'Identifier') {
    variable = Identifier(left, scope, { getVar: true })
  } else if (left.type === 'MemberExpression') {
    variable = MemberExpression(left, scope, { getVar: true })
  } else {
    throw new SyntaxError('Unexpected token')
  }

  const value = evaluate(node.right, scope)

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
  
  const handle = assignOps[node.operator]
  if (handle) {
    return handle()
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
  options?: MemberExpressionOptions,
) {
  const { getObj = false, getVar = false } = options || {}
  const object = evaluate(node.object, scope)

  if (getObj) {
    return object
  }

  let key
  if (node.computed) {
    key = evaluate(node.property, scope)
  } else if (node.property.type === 'Identifier') {
    key = Identifier(node.property, scope, { getName: true })
  } else {
    throw new SyntaxError('Unexpected token')
  }

  if (getVar) {
    return new Prop(object, key)
  } else {
    return object[key]
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
    const thisObject = scope.find('this')
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
