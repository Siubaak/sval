import { NOINIT, DEADZONE, STRICT } from '../share/const.ts'
import { VarKind, Variable, Prop } from '../scope/variable.ts'
import { assign, getIterator, toPropertyKey } from '../share/util.ts'
import { MemberExpression } from './expression.ts'
import { Identifier } from './identifier.ts'
import { pattern } from './helper.ts'
import Scope from '../scope/index.ts'
import evaluate from './index.ts'
import * as acorn from 'acorn'

export interface PatternOptions {
  kind?: VarKind
  hoist?: boolean
  onlyBlock?: boolean
  feed?: any
}

/**
 * Hoist the bindings of a declaration target
 */
function* hoistTarget(target: acorn.Pattern, scope: Scope, kind: VarKind, onlyBlock: boolean) {
  if (target.type === 'Identifier') {
    scope[kind](target.name, onlyBlock ? DEADZONE : kind === 'var' ? NOINIT : undefined)
  } else {
    yield* pattern(target, scope, { kind, hoist: true, onlyBlock })
  }
}

/**
 * Evaluate the reference of an assignment target ahead of its value,
 * returning null for declarations and nested patterns
 */
function* resolveTarget(target: acorn.Pattern, scope: Scope, kind?: VarKind): IterableIterator<any> {
  if (target.type === 'MemberExpression') {
    return yield* MemberExpression(target, scope, { getVar: true })
  }
  if (target.type === 'Identifier' && !kind) {
    const variable: Variable = yield* Identifier(target, scope, { getVar: true, throwErr: false })
    if (variable) return variable
    const strict = scope.find(STRICT)
    if (strict && strict.get()) {
      throw new ReferenceError(`${target.name} is not defined`)
    }
    // an unresolvable reference in non-strict mode creates a global property
    const win = scope.global().find('window').get()
    return new Prop(win, target.name, false)
  }
  return null
}

/**
 * Bind a value to a target, through its resolved reference if any
 */
function* bindTarget(
  target: acorn.Pattern,
  scope: Scope,
  kind: VarKind,
  ref: Variable,
  value: any
) {
  if (ref) {
    ref.set(value)
  } else if (target.type === 'Identifier') {
    scope[kind](target.name, value)
  } else {
    yield* pattern(target, scope, { kind, feed: value })
  }
}

export function* ObjectPattern(node: acorn.ObjectPattern, scope: Scope, options: PatternOptions = {}) {
  const { kind, hoist = false, onlyBlock = false, feed } = options
  if (hoist) {
    if (onlyBlock || kind === 'var') {
      for (let i = 0; i < node.properties.length; i++) {
        const property = node.properties[i]
        if (property.type === 'Property') {
          yield* hoistTarget(property.value as acorn.Pattern, scope, kind, onlyBlock)
        } else {
          yield* RestElement(property, scope, { kind, hoist, onlyBlock })
        }
      }
    }
    return
  }

  if (feed === null || feed === undefined) {
    throw new TypeError(`Cannot destructure '${feed}' as it is ${feed}.`)
  }

  const fedKeys: any[] = []
  for (let i = 0; i < node.properties.length; i++) {
    const property = node.properties[i]
    if (property.type === 'Property') {
      let key: any
      const propKey = property.key
      if (property.computed) {
        key = toPropertyKey(yield* evaluate(propKey, scope))
      } else if (propKey.type === 'Identifier') {
        key = propKey.name
      } else {
        key = '' + (propKey as acorn.Literal).value
      }
      fedKeys.push(key)

      let target = property.value as acorn.Pattern
      let init: acorn.Expression = null
      if (target.type === 'AssignmentPattern') {
        init = target.right
        target = target.left
      }
      const ref = yield* resolveTarget(target, scope, kind)
      let value = feed[key]
      if (init && value === undefined) {
        value = yield* evaluate(init, scope)
      }
      yield* bindTarget(target, scope, kind, ref, value)
    } else {
      const ref = yield* resolveTarget(property.argument, scope, kind)
      const rest = assign({}, feed)
      for (let j = 0; j < fedKeys.length; j++) delete rest[fedKeys[j]]
      yield* bindTarget(property.argument, scope, kind, ref, rest)
    }
  }
}

export function* ArrayPattern(node: acorn.ArrayPattern, scope: Scope, options: PatternOptions = {}) {
  const { kind, hoist = false, onlyBlock = false, feed } = options
  if (hoist) {
    if (onlyBlock || kind === 'var') {
      for (let i = 0; i < node.elements.length; i++) {
        const element = node.elements[i]
        if (!element) continue // for the case: let [ , x] = [1, 2]
        yield* hoistTarget(element, scope, kind, onlyBlock)
      }
    }
    return
  }

  // Array destructuring consumes the right-hand side through its iterator
  const iterator = getIterator(feed)
  let done = false
  const step = () => {
    if (done) return undefined
    let ret: IteratorResult<any>
    try {
      ret = iterator.next()
    } catch (err) {
      done = true // a throwing iterator is not closed
      throw err
    }
    if (ret.done) {
      done = true
      return undefined
    }
    return ret.value
  }
  try {
    for (let i = 0; i < node.elements.length; i++) {
      const element = node.elements[i]
      if (!element) {
        step() // for the case: let [ , x] = [1, 2]
      } else if (element.type === 'RestElement') {
        const target = element.argument
        const ref = yield* resolveTarget(target, scope, kind)
        const rest = []
        while (!done) {
          const value = step()
          if (!done) rest.push(value)
        }
        yield* bindTarget(target, scope, kind, ref, rest)
      } else {
        let target: acorn.Pattern = element
        let init: acorn.Expression = null
        if (target.type === 'AssignmentPattern') {
          init = target.right
          target = target.left
        }
        // the target reference is evaluated before the iterator steps
        const ref = yield* resolveTarget(target, scope, kind)
        let value = step()
        if (init && value === undefined) {
          value = yield* evaluate(init, scope)
        }
        yield* bindTarget(target, scope, kind, ref, value)
      }
    }
  } catch (err) {
    if (!done && typeof iterator.return === 'function') {
      done = true
      try { iterator.return() } catch (e) { /* the original error wins */ }
    }
    throw err
  }
  if (!done && typeof iterator.return === 'function') {
    iterator.return()
  }
}

export function* RestElement(node: acorn.RestElement, scope: Scope, options: PatternOptions = {}) {
  const { kind, hoist = false, onlyBlock = false, feed = [] } = options
  const arg = node.argument
  if (hoist) {
    if (onlyBlock || kind === 'var') {
      yield* hoistTarget(arg, scope, kind, onlyBlock)
    }
  } else {
    const ref = yield* resolveTarget(arg, scope, kind)
    yield* bindTarget(arg, scope, kind, ref, feed)
  }
}

export function* AssignmentPattern(node: acorn.AssignmentPattern, scope: Scope, options: PatternOptions = {}) {
  const { kind, hoist = false, onlyBlock = false } = options
  const left = node.left
  if (hoist) {
    // only bindings are created when hoisting, the default value is not evaluated
    if (onlyBlock || kind === 'var') {
      yield* hoistTarget(left, scope, kind, onlyBlock)
    }
  } else {
    const ref = yield* resolveTarget(left, scope, kind)
    let value = options.feed
    if (value === undefined) {
      value = yield* evaluate(node.right, scope)
    }
    yield* bindTarget(left, scope, kind, ref, value)
  }
}
