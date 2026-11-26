import { define, freeze, getGetter, getSetter, createSymbol, assign, getDptor, callSuper, getIterator, toPropertyKey, WINDOW } from '../share/util.ts'
import { SUPER, NOCTOR, AWAIT, CLSCTOR, NEWTARGET, SUPERCALL, PRIVATE, IMPORT, OPTCHAIN, STRICT, STRICT_FN, ASYNCGEN } from '../share/const.ts'
import { pattern, createFunc, createClass } from './helper.ts'
import { Variable, Prop } from '../scope/variable.ts'
import { Identifier } from './identifier.ts'
import { Literal } from './literal.ts'
import Scope from '../scope/index.ts'
import evaluate from './index.ts'
import * as acorn from 'acorn'

function isStrict(scope: Scope): boolean {
  const strict = scope.find(STRICT)
  return !!(strict && strict.get())
}

function* memberKey(
  node: acorn.MemberExpression,
  scope: Scope
): IterableIterator<any> {
  if (node.computed) {
    return [toPropertyKey(yield* evaluate(node.property, scope)), false]
  } else if (node.property.type === 'PrivateIdentifier') {
    return [node.property.name, true]
  } else {
    return [(node.property as acorn.Identifier).name, false]
  }
}

export function* ThisExpression(node: acorn.ThisExpression, scope: Scope) {
  const superCall = scope.find(SUPERCALL)
  if (superCall && superCall.get() !== true) {
    throw new ReferenceError('Must call super constructor in derived class '
      + 'before accessing \'this\' or returning from derived constructor')
  } else {
    return scope.find('this').get()
  }
}

export function* ArrayExpression(node: acorn.ArrayExpression, scope: Scope) {
  let results: any[] = []
  for (let i = 0; i < node.elements.length; i++) {
    const item = node.elements[i]
    if (item === null) {
      results.length++
    } else if (item.type === 'SpreadElement') {
      results = results.concat(yield* SpreadElement(item, scope))
    } else {
      results.push(yield* evaluate(item, scope))
    }
  }
  return results
}

export function* ObjectExpression(node: acorn.ObjectExpression, scope: Scope) {
  const object: { [key: string]: any } = {}
  for (let i = 0; i < node.properties.length; i++) {
    const property = node.properties[i]
    if (property.type === 'SpreadElement') {
      assign(object, yield* SpreadElement(property, scope, { spreadProps: true }))
    } else {
      let key: string
      const propKey = property.key
      if (property.computed) {
        key = toPropertyKey(yield* evaluate(propKey, scope))
      } else {
        if (propKey.type === 'Identifier') {
          key = propKey.name
        } else {
          key = '' + (yield* Literal(propKey as acorn.Literal, scope))
        }
      }
  
      const propKind = property.kind
      const value = (property.method || propKind !== 'init')
        && property.value.type === 'FunctionExpression'
        // methods and accessors know their home object for super property access
        ? createFunc(property.value, scope, { homeObject: object })
        : yield* evaluate(property.value, scope)

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

export function* FunctionExpression(node: acorn.FunctionExpression, scope: Scope) {
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

export function* UnaryExpression(node: acorn.UnaryExpression, scope: Scope) {
  const arg = node.argument
  switch (node.operator) {
    case '+': return +(yield* evaluate(arg, scope))
    case '-': return -(yield* evaluate(arg, scope))
    case '!': return !(yield* evaluate(arg, scope))
    case '~': return ~(yield* evaluate(arg, scope))
    case 'void': return void (yield* evaluate(arg, scope))
    case 'typeof':
      if (arg.type === 'Identifier') {
        return typeof (yield* Identifier(arg, scope, { throwErr: false }))
      } else {
        return typeof (yield* evaluate(arg, scope))
      }
    case 'delete':
      if (arg.type === 'MemberExpression') {
        const variable: Prop = yield* MemberExpression(arg, scope, { getVar: true })
        return variable.del()
      } else if (arg.type === 'Identifier') {
        throw new SyntaxError('Delete of an unqualified identifier in strict mode')
      } else {
        yield* evaluate(arg, scope)
        return true
      }
    /* istanbul ignore next */
    default: throw new SyntaxError(`Unexpected token ${node.operator}`)
  }
}

export function* UpdateExpression(node: acorn.UpdateExpression, scope: Scope) {
  const arg = node.argument
  
  let variable: Variable
  if (arg.type === 'Identifier') {
    variable = yield* Identifier(arg, scope, { getVar: true })
  } else if (arg.type === 'MemberExpression') {
    variable = yield* MemberExpression(arg, scope, { getVar: true })
  } else {
    /* istanbul ignore next */
    throw new SyntaxError('Unexpected token')
  }

  // ToNumeric: double negation coerces once and keeps BigInt as BigInt
  const oldValue = -(-variable.get())
  const one: any = typeof oldValue === 'bigint' ? BigInt(1) : 1
  let newValue: any
  if (node.operator === '++') {
    newValue = oldValue + one
  } else if (node.operator === '--') {
    newValue = oldValue - one
  } else {
    /* istanbul ignore next */
    throw new SyntaxError(`Unexpected token ${node.operator}`)
  }
  variable.set(newValue)
  return node.prefix ? newValue : oldValue
}

export function* BinaryExpression(node: acorn.BinaryExpression, scope: Scope) {
  let left: any
  let right: any

  if (node.left.type === 'PrivateIdentifier') {
    left = node.left.name
    right = yield* evaluate(node.right, scope)
    right = right[PRIVATE] || {} // compatible with checking by "#private in object"
  } else {
    left = yield* evaluate(node.left, scope)
    right = yield* evaluate(node.right, scope)
  }

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

export function* AssignmentExpression(node: acorn.AssignmentExpression, scope: Scope) {
  const left = node.left
  let variable: Variable
  if (left.type === 'Identifier') {
    variable = yield* Identifier(left, scope, { getVar: true, throwErr: false })
    if (!variable) {
      const strictMode = scope.find(STRICT)
      if (strictMode && strictMode.get()) {
        throw new ReferenceError(`${left.name} is not defined`)
      }
      const win = scope.global().find('window').get()
      variable = new Prop(win, left.name, false)
    }
  } else if (left.type === 'MemberExpression') {
    variable = yield* MemberExpression(left, scope, { getVar: true })
  } else {
    const value = yield* evaluate(node.right, scope)
    yield* pattern(left, scope, { feed: value })
    return value // a destructuring assignment evaluates to its right-hand side
  }

  const operator = node.operator
  if (operator === '=') {
    const value = yield* evaluate(node.right, scope)
    variable.set(value)
    return value
  }

  // the target is read once, before the right-hand side is evaluated
  const current = variable.get()

  if (operator === '&&=' || operator === '||=' || operator === '??=') {
    // logical assignments short-circuit without evaluating the right-hand side
    const keep = operator === '&&=' ? !current
      : operator === '||=' ? !!current
      : current !== null && current !== undefined
    if (keep) return current
    const value = yield* evaluate(node.right, scope)
    variable.set(value)
    return value
  }

  const value = yield* evaluate(node.right, scope)
  let result: any
  switch (operator) {
    case '+=': result = current + value; break
    case '-=': result = current - value; break
    case '*=': result = current * value; break
    case '/=': result = current / value; break
    case '%=': result = current % value; break
    case '**=': result = current ** value; break
    case '<<=': result = current << value; break
    case '>>=': result = current >> value; break
    case '>>>=': result = current >>> value; break
    case '|=': result = current | value; break
    case '^=': result = current ^ value; break
    case '&=': result = current & value; break
    /* istanbul ignore next */
    default: throw new SyntaxError(`Unexpected token ${operator}`)
  }
  variable.set(result)
  return result
}

export function* LogicalExpression(node: acorn.LogicalExpression, scope: Scope) {
  switch (node.operator) {
    case '||':
      return (yield* evaluate(node.left, scope)) || (yield* evaluate(node.right, scope))
    case '&&':
      return (yield* evaluate(node.left, scope)) && (yield* evaluate(node.right, scope))
    case '??':
      return (yield* evaluate(node.left, scope)) ?? (yield* evaluate(node.right, scope))
    default:
      /* istanbul ignore next */
      throw new SyntaxError(`Unexpected token ${node.operator}`)
  }
}

export interface MemberExpressionOptions {
  getObj?: boolean
  getVar?: boolean
}

export function* MemberExpression(
  node: acorn.MemberExpression,
  scope: Scope,
  options: MemberExpressionOptions = {},
) {
  const { getObj = false, getVar = false } = options

  let object: any
  if (node.object.type === 'Super') {
    object = yield* Super(node.object, scope, { getProto: true })
  } else {
    object = yield* evaluate(node.object, scope)
  }

  // propagate optional chain short-circuit
  if (object === OPTCHAIN) return OPTCHAIN

  if (getObj) return object

  const isSuper = node.object.type === 'Super'

  // if it's optional chaining, check if object is null or undefined, so use ==
  // the key is not evaluated when short-circuiting
  if (!isSuper && !getVar && node.optional && object == null) {
    return OPTCHAIN
  }

  const [key, priv] = yield* memberKey(node, scope)

  if (priv) {
    object = object[PRIVATE]
  }

  if (getVar) {
    // left value
    if (isSuper) {
      const setter = getSetter(object, key)
      if (setter) {
        // transfer the setter from super to this with a private key
        const thisObject = scope.find('this').get()
        const privateKey = createSymbol(key)
        define(thisObject, privateKey, { set: setter })
        return new Prop(thisObject, privateKey)
      }
    }
    return new Prop(object, key, isStrict(scope))
  } else if (isSuper) {
    // right value through super, where getters run against this
    const getter = getGetter(object, key)
    if (getter) {
      const thisObject = scope.find('this').get()
      // if it's optional chaining, check if this ref is null or undefined, so use ==
      if (node.optional && thisObject == null) {
        return OPTCHAIN
      }
      return getter.call(thisObject)
    }
    return object[key]
  } else {
    // right value
    return object[key]
  }
}

export function* ConditionalExpression(node: acorn.ConditionalExpression, scope: Scope) {
  return (yield* evaluate(node.test, scope))
    ? (yield* evaluate(node.consequent, scope))
    : (yield* evaluate(node.alternate, scope))
}

function getCalleeDesc(node: acorn.Expression | acorn.Super): string {
  if (node.type === 'Identifier') {
    return (node as acorn.Identifier).name
  } else if (node.type === 'MemberExpression') {
    const memberNode = node as acorn.MemberExpression
    const objDesc = getCalleeDesc(memberNode.object)
    if (!memberNode.computed) {
      if (memberNode.property.type === 'PrivateIdentifier') {
        return `${objDesc}.#${(memberNode.property as acorn.PrivateIdentifier).name}`
      }
      return `${objDesc}.${(memberNode.property as acorn.Identifier).name}`
    }
    const prop = memberNode.property as acorn.Expression
    if (prop.type === 'Literal') {
      return `${objDesc}[${(prop as acorn.Literal).raw}]`
    }
    if (prop.type === 'Identifier') {
      return `${objDesc}[${(prop as acorn.Identifier).name}]`
    }
    return objDesc
  } else if (node.type === 'Super') {
    return 'super'
  }
  return '(intermediate value)'
}

export function* CallExpression(node: acorn.CallExpression, scope: Scope) {
  let func: any
  let object: any

  if (node.callee.type === 'MemberExpression') {
    object = yield* MemberExpression(node.callee, scope, { getObj: true })

    // propagate optional chain short-circuit
    if (object === OPTCHAIN) return OPTCHAIN

    // if it's optional chaining, check if object is null or undefined, so use ==
    if (node.callee.optional && object == null) {
      return OPTCHAIN
    }

    // get key
    const [key, priv] = yield* memberKey(node.callee, scope)

    let obj = object

    if (priv) {
      obj = obj[PRIVATE]
    }

    // right value
    if (node.callee.object.type === 'Super') {
      const thisObject = scope.find('this').get()
      func = obj[key].bind(thisObject)
    } else {
      func = obj[key]
    }

    // if it's optional chaining, check if function is null or undefined, so use ==
    if (node.optional && func == null) {
      return OPTCHAIN
    }

    if (typeof func !== 'function') {
      const calleeDesc = getCalleeDesc(node.callee as acorn.MemberExpression)
      throw new TypeError(`${calleeDesc} is not a function`)
    } else if (CLSCTOR in func) {
      const calleeDesc = getCalleeDesc(node.callee as acorn.MemberExpression)
      throw new TypeError(`Class constructor ${calleeDesc} cannot be invoked without 'new'`)
    }
  } else {
    func = yield* evaluate(node.callee, scope)

    // propagate optional chain short-circuit
    if (func === OPTCHAIN) return OPTCHAIN

    // if it's optional chaining, check if function is null or undefined, so use ==
    if (node.optional && func == null) {
      return OPTCHAIN
    }

    if (typeof func !== 'function' || node.callee.type !== 'Super' && CLSCTOR in func) {
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

    // In strict mode, non-method calls pass undefined as 'this' (no global coercion)
    if (node.callee.type === 'Super') {
      object = scope.find('this').get()
    } else {
      const isStrictCall = !!(scope.find(STRICT)?.get()) || !!(func && func[STRICT_FN])
      object = isStrictCall ? undefined : scope.find('this').get()
    }
  }

  let args: any[] = []
  for (let i = 0; i < node.arguments.length; i++) {
    const arg = node.arguments[i]
    if (arg.type === 'SpreadElement') {
      args = args.concat(yield* SpreadElement(arg, scope))
    } else {
      args.push(yield* evaluate(arg, scope))
    }
  }

  if (node.callee.type === 'Super') {
    const superCall = scope.find(SUPERCALL)
    const construct = superCall.get()
    if (construct === true) {
      throw new ReferenceError('Super constructor may only be called once')
    }
    const inst = callSuper(object, func, args)
    yield* construct(inst)
    scope.find('this').set(inst)
    scope.find(SUPERCALL).set(true)
    return inst
  }

  try {
    return func.apply(object, args)
  } catch (err) {
    if (
      err instanceof TypeError && err.message === 'Illegal invocation'
      && func.toString().indexOf('[native code]') !== -1
    ) {
      // you will get "TypeError: Illegal invocation" if not binding native function with window
      const win = scope.global().find('window').get()
      if (win && win[WINDOW]) {
        return func.apply(win[WINDOW], args)
      }
    }
    throw err
  }
}

export function* NewExpression(node: acorn.NewExpression, scope: Scope) {
  const constructor = yield* evaluate(node.callee, scope)

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
      args = args.concat(yield* SpreadElement(arg, scope))
    } else {
      args.push(yield* evaluate(arg, scope))
    }
  }

  return new constructor(...args)
}

export function* MetaProperty(node: acorn.MetaProperty, scope: Scope) {
  if (node.meta.name === 'new' && node.property.name === 'target') {
    return scope.find(NEWTARGET).get()
  } else if (node.meta.name === 'import' && node.property.name === 'meta') {
    return { url: '' }
  }
}

export function* SequenceExpression(node: acorn.SequenceExpression, scope: Scope) {
  let result: any
  for (let i = 0; i < node.expressions.length; i++) {
    result = yield* evaluate(node.expressions[i], scope)
  }
  return result
}

export function* ArrowFunctionExpression(node: acorn.ArrowFunctionExpression, scope: Scope) {
  return createFunc(node, scope)
}

export function* TemplateLiteral(node: acorn.TemplateLiteral, scope: Scope) {
  const quasis = node.quasis.slice()
  const expressions = node.expressions.slice()

  let result = ''
  let temEl: acorn.TemplateElement
  let expr: acorn.Expression

  while (temEl = quasis.shift()) {
    result += yield* TemplateElement(temEl, scope)
    expr = expressions.shift()
    if (expr) {
      result += yield* evaluate(expr, scope)
    }
  }

  return result
}

export function* TaggedTemplateExpression(node: acorn.TaggedTemplateExpression, scope: Scope) {
  const tag = node.tag
  let tagFunc: any
  let thisArg: any
  if (tag.type === 'MemberExpression') {
    // a member expression tag is called as a method of its object
    const object = yield* MemberExpression(tag, scope, { getObj: true })
    const [key, priv] = yield* memberKey(tag, scope)
    tagFunc = (priv ? object[PRIVATE] : object)[key]
    thisArg = tag.object.type === 'Super' ? scope.find('this').get() : object
  } else {
    tagFunc = yield* evaluate(tag, scope)
    thisArg = isStrict(scope) || (tagFunc && tagFunc[STRICT_FN])
      ? undefined : scope.find('this').get()
  }
  if (typeof tagFunc !== 'function') {
    throw new TypeError(`${getCalleeDesc(tag)} is not a function`)
  }

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
      args.push(yield* evaluate(expressions[i], scope))
    }
  }

  return tagFunc.apply(thisArg, [freeze(str)].concat(args))
}

export function* TemplateElement(node: acorn.TemplateElement, scope: Scope) {
  return node.value.raw
}

export function* ClassExpression(node: acorn.ClassExpression, scope: Scope) {
  if (node.id && node.id.name) {
    // it's for accessing class expression by its name inside
    // e.g. const a = class b { log() { console.log(b) } }
    const tmpScope = new Scope(scope)
    const klass = yield* createClass(node, tmpScope)
    tmpScope.const(node.id.name, klass)
    return klass
  } else {
    return yield* createClass(node, scope)
  }
}

export interface SuperOptions {
  getProto?: boolean
}

export function* Super(node: acorn.Super, scope: Scope, options: SuperOptions = {}) {
  const { getProto = false } = options
  const superClass = scope.find(SUPER).get()
  return getProto ? superClass.prototype: superClass
}

export interface SpreadOptions {
  spreadProps?: boolean
}

export function* SpreadElement(node: acorn.SpreadElement, scope: Scope, options: SpreadOptions = {}) {
  const result = yield* evaluate(node.argument, scope)
  if (options.spreadProps) {
    return result
  }
  if (typeof Symbol === 'function' && typeof result[Symbol.iterator] !== 'function') {
    throw new TypeError('Spread syntax requires ...iterable[Symbol.iterator] to be a function')
  }
  return [...result]
}

export function* ChainExpression(node: acorn.ChainExpression, scope: Scope) {
  const result = yield* evaluate(node.expression, scope)
  return result === OPTCHAIN ? undefined : result
}

export function* ImportExpression(node: acorn.ImportExpression, scope: Scope) {
  const globalScope = scope.global()

  const source = yield* evaluate(node.source, scope)
  const module = globalScope.find(IMPORT + source)
  let value: any
  if (module) {
    const result = module.get()
    if (result) {
      if (typeof result === 'function') {
        value = result()
      } else if (typeof result === 'object') {
        value = result
      }
    }
  }

  if (!value || typeof value !== 'object') {
    return Promise.reject(new TypeError(`Failed to resolve module specifier "${source}"`))
  }

  return Promise.resolve(value)
}

/*<remove>*/
export function* YieldExpression(node: acorn.YieldExpression, scope: Scope): any {
  const res = yield* evaluate(node.argument, scope)
  const asyncGen = scope.find(ASYNCGEN)
  if (!asyncGen || !asyncGen.get()) {
    return node.delegate ? yield* res : yield res
  }
  if (node.delegate) {
    return yield* asyncYieldDelegate(res)
  }
  // yield in an async generator awaits its operand
  AWAIT.RES = res
  return yield (yield AWAIT)
}

function* asyncYieldDelegate(obj: any): any {
  let iterator: any
  let isSync = false
  const asyncMethod = obj != null && typeof Symbol === 'function' && Symbol.asyncIterator
    ? obj[Symbol.asyncIterator] : undefined
  if (typeof asyncMethod === 'function') {
    iterator = asyncMethod.call(obj)
  } else {
    iterator = getIterator(obj)
    isSync = true
  }
  let input: any
  let throwing = false
  while (true) {
    let ret: any
    if (throwing) {
      if (typeof iterator.throw !== 'function') {
        if (typeof iterator.return === 'function') {
          AWAIT.RES = iterator.return()
          yield AWAIT
        }
        throw new TypeError('The iterator does not provide a \'throw\' method')
      }
      ret = iterator.throw(input)
    } else {
      ret = iterator.next(input)
    }
    AWAIT.RES = ret
    ret = yield AWAIT
    if (ret === null || typeof ret !== 'object') {
      throw new TypeError(`Iterator result ${ret} is not an object`)
    }
    let value = ret.value
    if (isSync) {
      // values of a sync iterator are awaited, like an async-from-sync iterator
      AWAIT.RES = value
      value = yield AWAIT
    }
    if (ret.done) return value
    try {
      input = yield value
      throwing = false
    } catch (err) {
      input = err
      throwing = true
    }
  }
}

export function* AwaitExpression(node: acorn.AwaitExpression, scope: Scope): any {
  AWAIT.RES = yield* evaluate(node.argument, scope)
  return yield AWAIT
}
/*</remove>*/
