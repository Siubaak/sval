import { VarKind } from '../scope/variable'
import { Identifier } from './identifier'
import { DEADZONE } from '../share/const'
import { assign } from '../share/util'
import { pattern } from './helper'
import * as estree from 'estree'
import Scope from '../scope'
import evaluate from '.'

export interface PatternOptions {
  kind?: VarKind
  hoist?: boolean
  onlyBlock?: boolean
  feed?: any
}

export function* ObjectPattern(node: estree.ObjectPattern, scope: Scope, options: PatternOptions = {}) {
  const { kind = 'let', hoist = false, onlyBlock = false, feed = {} } = options
  const fedKeys: string[] = []
  for (let i = 0; i < node.properties.length; i++) {
    const property = node.properties[i]
    if (hoist) {
      if (onlyBlock || kind === 'var') {
        if (property.type === 'Property') {
          const value = property.value
          if (value.type === 'Identifier') {
            scope[onlyBlock ? kind : 'var'](value.name, onlyBlock ? DEADZONE : undefined)
          } else {
            yield* pattern(value, scope, { kind, hoist, onlyBlock })
          }
        } else {
          yield* RestElement(property as any, scope, { kind, hoist, onlyBlock })
        }
      }
    } else if (property.type === 'Property') {
      let key: string
      if (property.computed) {
        key = yield* evaluate(property.key, scope)
      } else {
        key = (property.key as estree.Identifier).name
      }
      fedKeys.push(key)
      
      const value = property.value
      if (value.type === 'Identifier') {
        scope[kind](value.name, feed[key])
      } else {
        yield* pattern(value, scope, { kind, feed: feed[key] })
      }
    } else {
      const rest = assign({}, feed)
      for (let i = 0; i < fedKeys.length; i++) delete rest[fedKeys[i]]
      yield* RestElement(property as any, scope, { kind, feed: rest })
    }
  }
}

export function* ArrayPattern(node: estree.ArrayPattern, scope: Scope, options: PatternOptions = {}) {
  const { kind, hoist = false, onlyBlock = false, feed = [] } = options
  const result = []
  for (let i = 0; i < node.elements.length; i++) {
    const element = node.elements[i]
    if (hoist) {
      if (onlyBlock || kind === 'var') {
        if (element.type === 'Identifier') {
          scope[onlyBlock ? kind : 'var'](element.name, onlyBlock ? DEADZONE : undefined)
        } else {
          yield* pattern(element, scope, { kind, hoist, onlyBlock })
        }
      }
    } else if (element.type === 'Identifier') {
      if (kind) {
        // If kind isn't undefined, it's a declaration
        scope[kind](element.name, feed[i])
      } else {
        // If kind is undefined, it's a statement
        const variable = yield* Identifier(element, scope, { getVar: true })
        variable.set(feed[i])
        result.push(variable.get())
      }
    } else if (element.type === 'RestElement') {
      yield* RestElement(element, scope, { kind, feed: feed.slice(i) })
    } else {
      yield* pattern(element, scope, { kind, feed: feed[i] })
    }
  }
  if (result.length) {
    return result
  }
}

export function* RestElement(node: estree.RestElement, scope: Scope, options: PatternOptions = {}) {
  const { kind, hoist = false, onlyBlock = false, feed = [] } = options
  const arg = node.argument
  if (hoist) {
    if (onlyBlock || kind === 'var') {
      if (arg.type === 'Identifier') {
        scope[onlyBlock ? kind : 'var'](arg.name, onlyBlock ? DEADZONE : undefined)
      } else {
        yield* pattern(arg, scope, { kind, hoist, onlyBlock })
      }
    }
  } else if (arg.type === 'Identifier') {
    if (kind) {
      // If kind isn't undefined, it's a declaration
      scope[kind](arg.name, feed)
    } else {
      // If kind is undefined, it's a statement
      const variable = yield* Identifier(arg, scope, { getVar: true })
      variable.set(feed)
    }
  } else {
    yield* pattern(arg, scope, { kind, feed })
  }
}

export function* AssignmentPattern(node: estree.AssignmentPattern, scope: Scope, options: PatternOptions = {}) {
  const { kind = 'let', hoist = false, onlyBlock = false } = options
  const feed = yield* evaluate(node.right, scope)
  const left = node.left
  if (hoist) {
    if (onlyBlock || kind === 'var') {
      if (left.type === 'Identifier') {
        scope[onlyBlock ? kind : 'var'](left.name, onlyBlock ? DEADZONE : undefined)
      } else {
        yield* pattern(left, scope, { kind, hoist, onlyBlock })
      }
    }
  } else if (left.type === 'Identifier') {
    scope[kind](left.name, feed)
  } else {
    yield* pattern(left, scope, { kind, feed })
  }
}
