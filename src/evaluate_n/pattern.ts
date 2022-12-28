import { NOINIT, DEADZONE } from '../share/const'
import { VarKind } from '../scope/variable'
import { Identifier } from './identifier'
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

export function ObjectPattern(node: estree.ObjectPattern, scope: Scope, options: PatternOptions = {}) {
  const { kind = 'var', hoist = false, onlyBlock = false, feed = {} } = options
  const fedKeys: string[] = []
  for (let i = 0; i < node.properties.length; i++) {
    const property = node.properties[i]
    if (hoist) {
      if (onlyBlock || kind === 'var') {
        if (property.type === 'Property') {
          const value = property.value
          if (value.type === 'Identifier') {
            scope[kind](value.name, onlyBlock ? DEADZONE : kind === 'var' ? NOINIT : undefined)
          } else {
            pattern(value, scope, { kind, hoist, onlyBlock })
          }
        } else {
          RestElement(property as any, scope, { kind, hoist, onlyBlock })
        }
      }
    } else if (property.type === 'Property') {
      let key: string
      if (property.computed) {
        key = evaluate(property.key, scope)
      } else {
        key = (property.key as estree.Identifier).name
      }
      fedKeys.push(key)
      
      const value = property.value
      if (value.type === 'Identifier') {
        scope[kind](value.name, feed[key])
      } else {
        pattern(value, scope, { kind, feed: feed[key] })
      }
    } else {
      const rest = assign({}, feed)
      for (let i = 0; i < fedKeys.length; i++) delete rest[fedKeys[i]]
      RestElement(property as any, scope, { kind, feed: rest })
    }
  }
}

export function ArrayPattern(node: estree.ArrayPattern, scope: Scope, options: PatternOptions = {}) {
  const { kind, hoist = false, onlyBlock = false, feed = [] } = options
  const result = []
  for (let i = 0; i < node.elements.length; i++) {
    const element = node.elements[i]
    if (!element) continue // for the case: let [ , x] = [1, 2]
    if (hoist) {
      if (onlyBlock || kind === 'var') {
        if (element.type === 'Identifier') {
          scope[kind](element.name, onlyBlock ? DEADZONE : kind === 'var' ? NOINIT : undefined)
        } else {
          pattern(element, scope, { kind, hoist, onlyBlock })
        }
      }
    } else if (element.type === 'Identifier') {
      if (kind) {
        // If kind isn't undefined, it's a declaration
        scope[kind](element.name, feed[i])
      } else {
        // If kind is undefined, it's a statement
        const variable = Identifier(element, scope, { getVar: true })
        variable.set(feed[i])
        result.push(variable.get())
      }
    } else if (element.type === 'RestElement') {
      RestElement(element, scope, { kind, feed: feed.slice(i) })
    } else {
      pattern(element, scope, { kind, feed: feed[i] })
    }
  }
  if (result.length) {
    return result
  }
}

export function RestElement(node: estree.RestElement, scope: Scope, options: PatternOptions = {}) {
  const { kind, hoist = false, onlyBlock = false, feed = [] } = options
  const arg = node.argument
  if (hoist) {
    if (onlyBlock || kind === 'var') {
      if (arg.type === 'Identifier') {
        scope[kind](arg.name, onlyBlock ? DEADZONE : kind === 'var' ? NOINIT : undefined)
      } else {
        pattern(arg, scope, { kind, hoist, onlyBlock })
      }
    }
  } else if (arg.type === 'Identifier') {
    if (kind) {
      // If kind isn't undefined, it's a declaration
      scope[kind](arg.name, feed)
    } else {
      // If kind is undefined, it's a statement
      const variable = Identifier(arg, scope, { getVar: true })
      variable.set(feed)
    }
  } else {
    pattern(arg, scope, { kind, feed })
  }
}

export function AssignmentPattern(node: estree.AssignmentPattern, scope: Scope, options: PatternOptions = {}) {
  const { kind = 'var', hoist = false, onlyBlock = false, feed = evaluate(node.right, scope) } = options
  const left = node.left
  if (hoist) {
    if (onlyBlock || kind === 'var') {
      if (left.type === 'Identifier') {
        scope[kind](left.name, onlyBlock ? DEADZONE : kind === 'var' ? NOINIT : undefined)
      } else {
        pattern(left, scope, { kind, hoist, onlyBlock })
      }
    }
  } else if (left.type === 'Identifier') {
    scope[kind](left.name, feed)
  } else {
    pattern(left, scope, { kind, feed })
  }
}
