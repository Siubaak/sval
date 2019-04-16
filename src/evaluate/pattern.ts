import { VarKind, Var } from '../scope/variable'
import { Identifier } from './identifier'
import { pattern } from './helper'
import * as estree from 'estree'
import Scope from '../scope'
import evaluate from '.'

export interface PatternOptions {
  kind?: VarKind
  hoist?: boolean
  feed?: any
}

export function* ObjectPattern(node: estree.ObjectPattern, scope: Scope, options: PatternOptions = {}) {
  const { kind = 'let', hoist = false, feed = {} } = options
  for (const index in node.properties) {
    const property = node.properties[index]
    const value = property.value
    if (hoist) {
      if (kind === 'var') {
        if (value.type === 'Identifier') {
          scope.var(value.name)
        } else {
          yield* pattern(value, scope, { kind, hoist })
        }
      }
    } else {
      let key: string
      if (property.computed) {
        key = yield* evaluate(property.key, scope)
      } else {
        key = (property.key as estree.Identifier).name
      }
      
      if (value.type === 'Identifier') {
        scope[kind](value.name, feed[key])
      } else {
        yield* pattern(value, scope, { kind, feed: feed[key] })
      }
    }
  }
}

export function* ArrayPattern(node: estree.ArrayPattern, scope: Scope, options: PatternOptions = {}) {
  const { kind, hoist = false, feed = [] } = options
  const result = []
  for (let i = 0; i < node.elements.length; i++) {
    const element = node.elements[i]
    if (hoist) {
      if (kind === 'var') {
        if (element.type === 'Identifier') {
          scope.var(element.name)
        } else {
          yield* pattern(element, scope, { kind, hoist })
        }
      }
    } else {
      if (element.type === 'Identifier') {
        if (kind) {
          // If kind isn't undefined, it's a declaration
          scope[kind](element.name, feed[i])
        } else {
          // If kind is undefined, it's a statement
          const variable: Var = yield* Identifier(element, scope, { getVar: true })
          variable.set(feed[i])
          result.push(variable.get())
        }
      } else if (element.type === 'RestElement') {
        yield* RestElement(element, scope, { kind, feed: feed.slice(i) })
      } else {
        yield* pattern(element, scope, { kind, feed: feed[i] })
      }
    }
  }
  if (result.length) {
    return result
  }
}

export function* RestElement(node: estree.RestElement, scope: Scope, options: PatternOptions = {}) {
  const { kind, hoist = false, feed = [] } = options
  const arg = node.argument
  if (hoist) {
    if (kind === 'var') {
      if (arg.type === 'Identifier') {
        scope.var(arg.name)
      } else {
        yield* pattern(arg, scope, { kind, hoist })
      }
    }
  } else {
    if (arg.type === 'Identifier') {
      if (kind) {
        // If kind isn't undefined, it's a declaration
        scope[kind](arg.name, feed)
      } else {
        // If kind is undefined, it's a statement
        const variable: Var = yield* Identifier(arg, scope, { getVar: true })
        variable.set(feed)
      }
    } else {
      yield* pattern(arg, scope, { kind, feed })
    }
  }
}

export function* AssignmentPattern(node: estree.AssignmentPattern, scope: Scope) {
  const feed = yield* evaluate(node.right, scope)
  if (node.left.type === 'Identifier') {
    scope.let(node.left.name, feed)
  } else {
    yield* pattern(node.left, scope, { feed })
  }
}
