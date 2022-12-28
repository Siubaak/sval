import { define, freeze, getGetter, getSetter, createSymbol, assign, getDptor, WINDOW } from '../share/util'
import { SUPER, NOCTOR, AWAIT, CLSCTOR, NEWTARGET, SUPERCALL } from '../share/const'
import { pattern, createFunc, createClass } from './helper'
import { Variable, Prop } from '../scope/variable'
import { Identifier } from './identifier'
import { Literal } from './literal'
import * as estree from 'estree'
import Scope from '../scope'
import evaluate from '.'

export function ThisExpression(node: estree.ThisExpression, scope: Scope) {
  const superCall = scope.find(SUPERCALL)
  if (superCall && !superCall.get()) {
    throw new ReferenceError('Must call super constructor in derived class '
      + 'before accessing \'this\' or returning from derived constructor')
  } else {
    return scope.find('this').get()
  }
}

export function ArrayExpression(node: estree.ArrayExpression, scope: Scope) {
  let results: any[] = []
  for (let i = 0; i < node.elements.length; i++) {
    const item = node.elements[i]
    if (item.type === 'SpreadElement') {
      results = results.concat(SpreadElement(item, scope))
    } else {
      results.push(evaluate(item, scope))
    }
  }
  return results
}

export function ObjectExpression(node: estree.ObjectExpression, scope: Scope) {
  const object: { [key: string]: any } = {}
  for (let i = 0; i < node.properties.length; i++) {
    const property = node.properties[i]
    if (property.type as any === 'SpreadElement') {
      assign(object, SpreadElement(property as any, scope))
    } else if (property.type === 'Property') {
      let key: string
      const propKey = property.key
      if (property.computed) {
        key = evaluate(propKey, scope)
      } else {
        if (propKey.type === 'Identifier') {
          key = propKey.name
        } else {
          key = '' + (Literal(propKey as estree.Literal, scope))
        }
      }
  
      const value = evaluate(property.value, scope)
  
      const propKind = property.kind
      if (propKind === 'init') {
        object[key] = value
      } else if (propKind === 'get') {
        const oriDptor = getDptor(object, key)
        define(object, key, {
          get: value,
          set: oriDptor && oriDptor.set,
          enumerable: true,
          configurable: true
        })
      } else { // propKind === 'set'
        const oriDptor = getDptor(object, key)
        define(object, key, {
          get: oriDptor && oriDptor.get,
          set: value,
          enumerable: true,
          configurable: true
        })
      }
    }
  }
  return object
}

export function FunctionExpression(node: estree.FunctionExpression, scope: Scope) {
  if (node.id && node.id.name) {
    // it's for accessing function expression by its name inside
    // e.g. const a = function b() { console.log(b) }
    const tmpScope = new Scope(scope)
    const func = createFunc(node, tmpScope)
    tmpScope.const(node.id.name, func)
    return func
  } else {
    return createFunc(node, scope)
  }
}

export function UnaryExpression(node: estree.UnaryExpression, scope: Scope) {
  const arg = node.argument
  switch (node.operator) {
    case '+': return +(evaluate(arg, scope))
    case '-': return -(evaluate(arg, scope))
    case '!': return !(evaluate(arg, scope))
    case '~': return ~(evaluate(arg, scope))
    case 'void': return void (evaluate(arg, scope))
    case 'typeof':
      if (arg.type === 'Identifier') {
        return typeof (Identifier(arg, scope, { throwErr: false }))
      } else {
        return typeof (evaluate(arg, scope))
      }
    case 'delete':
      if (arg.type === 'MemberExpression') {
        const variable: Prop = MemberExpression(arg, scope, { getVar: true })
        return variable.del()
      } else if (arg.type === 'Identifier') {
        throw new SyntaxError('Delete of an unqualified identifier in strict mode')
      } else {
        evaluate(arg, scope)
        return true
      }
    /* istanbul ignore next */
    default: throw new SyntaxError(`Unexpected token ${node.operator}`)
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
    /* istanbul ignore next */
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
    /* istanbul ignore next */
    throw new SyntaxError(`Unexpected token ${node.operator}`)
  }
}

export function BinaryExpression(node: estree.BinaryExpression, scope: Scope) {
  const left = evaluate(node.left, scope)
  const right = evaluate(node.right, scope)

  switch (node.operator) {
    case '==': return left == right
    case '!=': return left != right
    case '===': return left === right
    case '!==': return left !== right
    case '<': return left < right
    case '<=': return left <= right
    case '>': return left > right
    case '>=': return left >= right
    case '<<': return left << right
    case '>>': return left >> right
    case '>>>': return left >>> right
    case '+': return left + right
    case '-': return left - right
    case '*': return left * right
    case '**': return left ** right
    case '/': return left / right
    case '%': return left % right
    case '|': return left | right
    case '^': return left ^ right
    case '&': return left & right
    case 'in': return left in right
    case 'instanceof': return left instanceof right
    /* istanbul ignore next */
    default: throw new SyntaxError(`Unexpected token ${node.operator}`)
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

  switch (node.operator) {
    case '=': variable.set(value); return variable.get()
    case '+=': variable.set(variable.get() + value); return variable.get()
    case '-=': variable.set(variable.get() - value); return variable.get()
    case '*=': variable.set(variable.get() * value); return variable.get()
    case '/=': variable.set(variable.get() / value); return variable.get()
    case '%=': variable.set(variable.get() % value); return variable.get()
    case '**=': variable.set(variable.get() ** value); return variable.get()
    case '<<=': variable.set(variable.get() << value); return variable.get()
    case '>>=': variable.set(variable.get() >> value); return variable.get()
    case '>>>=': variable.set(variable.get() >>> value); return variable.get()
    case '|=': variable.set(variable.get() | value); return variable.get()
    case '^=': variable.set(variable.get() ^ value); return variable.get()
    case '&=': variable.set(variable.get() & value); return variable.get()
    /* istanbul ignore next */
    default: throw new SyntaxError(`Unexpected token ${node.operator}`)
  }
}

export function LogicalExpression(node: estree.LogicalExpression, scope: Scope) {
  switch (node.operator) {
    case '||':
      return (evaluate(node.left, scope)) || (evaluate(node.right, scope))
    case '&&':
      return (evaluate(node.left, scope)) && (evaluate(node.right, scope))
    default:
      /* istanbul ignore next */
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

  if (getObj) return object

  let key: string
  if (node.computed) {
    key = evaluate(node.property, scope)
  } else {
    key = (node.property as estree.Identifier).name
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
  return (evaluate(node.test, scope))
    ? (evaluate(node.consequent, scope))
    : (evaluate(node.alternate, scope))
}

export function CallExpression(node: estree.CallExpression, scope: Scope) {
  let func: any
  let object: any

  if (node.callee.type === 'MemberExpression') {
    object = MemberExpression(node.callee, scope, { getObj: true })
  
    // get key
    let key: string
    if (node.callee.computed) {
      key = evaluate(node.callee.property, scope)
    } else {
      key = (node.callee.property as estree.Identifier).name
    }

    // right value
    if (node.callee.object.type === 'Super') {
      const thisObject = scope.find('this').get()
      func = object[key].bind(thisObject)
    } else {
      func = object[key]
    }

    if (typeof func !== 'function') {
      throw new TypeError(`${key} is not a function`)
    } else if (func[CLSCTOR]) {
      throw new TypeError(`Class constructor ${key} cannot be invoked without 'new'`)
    }
  } else {
    object = scope.find('this').get()
    func = evaluate(node.callee, scope)
    if (typeof func !== 'function' || node.callee.type !== 'Super' && func[CLSCTOR]) {
      let name: string
      if (node.callee.type === 'Identifier') {
        name = node.callee.name
      } else {
        try {
          name = JSON.stringify(func)
        } catch (err) {
          name = '' + func
        }
      }
      if (typeof func !== 'function') {
        throw new TypeError(`${name} is not a function`)
      } else {
        throw new TypeError(`Class constructor ${name} cannot be invoked without 'new'`)
      }
    }
  }

  let args: any[] = []
  for (let i = 0; i < node.arguments.length; i++) {
    const arg = node.arguments[i]
    if (arg.type === 'SpreadElement') {
      args = args.concat(SpreadElement(arg, scope))
    } else {
      args.push(evaluate(arg, scope))
    }
  }

  if (node.callee.type === 'Super') {
    const superCall = scope.find(SUPERCALL)
    if (superCall.get()) {
      throw new ReferenceError('Super constructor may only be called once')
    } else {
      scope.find(SUPERCALL).set(true)
    }
  }

  if (object && object[WINDOW] && func.toString().indexOf('[native code]') !== -1) {
    // you will get "TypeError: Illegal invocation" if not binding native function with window
    return func.apply(object[WINDOW], args)
  }

  return func.apply(object, args)
}

export function NewExpression(node: estree.NewExpression, scope: Scope) {
  const constructor = evaluate(node.callee, scope)

  if (typeof constructor !== 'function') {
    let name: string
    if (node.callee.type === 'Identifier') {
      name = node.callee.name
    } else {
      try {
        name = JSON.stringify(constructor)
      } catch (err) {
        name = '' + constructor
      }
    }
    throw new TypeError(`${name} is not a constructor`)
  } else if (constructor[NOCTOR]) {
    throw new TypeError(`${constructor.name || '(intermediate value)'} is not a constructor`)
  }

  let args: any[] = []
  for (let i = 0; i < node.arguments.length; i++) {
    const arg = node.arguments[i]
    if (arg.type === 'SpreadElement') {
      args = args.concat(SpreadElement(arg, scope))
    } else {
      args.push(evaluate(arg, scope))
    }
  }

  return new constructor(...args)
}

export function MetaProperty(node: estree.MetaProperty, scope: Scope) {
  return scope.find(NEWTARGET).get()
}

export function SequenceExpression(node: estree.SequenceExpression, scope: Scope) {
  let result: any
  for (let i = 0; i < node.expressions.length; i++) {
    result = evaluate(node.expressions[i], scope)
  }
  return result
}

export function ArrowFunctionExpression(node: estree.ArrowFunctionExpression, scope: Scope) {
  return createFunc(node, scope)
}

export function TemplateLiteral(node: estree.TemplateLiteral, scope: Scope) {
  const quasis = node.quasis.slice()
  const expressions = node.expressions.slice()

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

  const args = []
  if (expressions) {
    for (let i = 0; i < expressions.length; i++) {
      args.push(evaluate(expressions[i], scope))
    }
  }

  return tagFunc(freeze(str), ...args)
}

export function TemplateElement(node: estree.TemplateElement, scope: Scope) {
  return node.value.raw
}

export function ClassExpression(node: estree.ClassExpression, scope: Scope) {
  if (node.id && node.id.name) {
    // it's for accessing class expression by its name inside
    // e.g. const a = class b { log() { console.log(b) } }
    const tmpScope = new Scope(scope)
    const klass = createClass(node, tmpScope)
    tmpScope.const(node.id.name, klass)
    return klass
  } else {
    return createClass(node, scope)
  }
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

export function SpreadElement(node: estree.SpreadElement, scope: Scope) {
  return evaluate(node.argument, scope)
}


