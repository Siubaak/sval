import * as estree from 'estree'
import Scope from '../scope'
import evaluate from '.'
import { varKind, Var } from '../scope/variable'
import { Identifier } from './identifier'

export interface PatternOptions {
  kind?: varKind
  hoist?: boolean
  feed?: any
}

export function ObjectPattern(node: estree.ObjectPattern, scope: Scope, options: PatternOptions = {}) {
  for (const property of node.properties) {
    AssignmentProperty(property, scope, options)
  }
}

export function AssignmentProperty(node: estree.AssignmentProperty, scope: Scope, options: PatternOptions = {}) {
  const { kind = 'let', hoist = false, feed = {} } = options
  const value = node.value
  if (hoist) {
    if (kind === 'var') {
      if (value.type === 'Identifier') {
        const name = Identifier(value, scope, { getName: true })
        scope.var(name, undefined)
      } else {
        Pattern(value, scope, { kind, hoist })
      }
    }
  } else {
    let key: string
    if (node.computed) {
      key = evaluate(node.key, scope)
    } else if (node.key.type === 'Identifier') {
      key = Identifier(node.key, scope, { getName: true })
    } else {
      throw new SyntaxError('Unexpected token')
    }
    
    if (value.type === 'Identifier') {
      const name = Identifier(value, scope, { getName: true })
      if (!scope[kind](name, feed[key])) {
        throw new SyntaxError(`Identifier '${name}' has already been declared`)
      }
    } else {
      Pattern(value, scope, { kind, feed: feed[key] })
    }
  }
}

export function ArrayPattern(node: estree.ArrayPattern, scope: Scope, options: PatternOptions = {}) {
  const { kind, hoist = false, feed = [] } = options
  for (let i = 0; i < node.elements.length; i++) {
    const element = node.elements[i]
    if (hoist) {
      if (kind === 'var') {
        if (element.type === 'Identifier') {
          const name = Identifier(element, scope, { getName: true })
          scope.var(name, undefined)
        } else {
          Pattern(element, scope, { kind, hoist })
        }
      }
    } else {
      if (kind && element.type === 'Identifier') {
        // If kind isn't undefined, it's a declaration
        const name = Identifier(element, scope, { getName: true })
        if (!scope[kind](name, feed[i])) {
          throw new SyntaxError(`Identifier '${name}' has already been declared`)
        }
      } else if (element.type === 'Identifier') {
        // If kind is undefined, it's a statement
        const variable: Var = Identifier(element, scope, { getVar: true })
        variable.set(feed[i])
      } else {
        Pattern(element, scope, { kind, feed: feed[i] })
      }
    }
  }
}

export function RestElement(node: estree.RestElement, scope: Scope, options: PatternOptions = {}) {
  const { kind = 'let', hoist = false, feed = [] } = options
  const arg = node.argument
  if (hoist) {
    if (kind === 'var') {
      if (arg.type === 'Identifier') {
        const name = Identifier(arg, scope, { getName: true })
        scope.var(name, undefined)
      } else {
        Pattern(arg, scope, { kind, hoist })
      }
    }
  } else {
    if (arg.type === 'Identifier') {
      const name = Identifier(arg, scope, { getName: true })
      if (!scope[kind](name, feed)) {
        throw new SyntaxError(`Identifier '${name}' has already been declared`)
      }
    } else {
      Pattern(arg, scope, { kind, feed })
    }
  }
}

export function AssignmentPattern(node: estree.AssignmentPattern, scope: Scope) {
  const feed = evaluate(node.right, scope)
  if (node.left.type === 'Identifier') {
    const name = Identifier(node.left, scope, { getName: true })
    scope.let(name, feed)
  } else {
    Pattern(node.left, scope, { feed })
  }
}

export function Pattern(node: estree.Pattern, scope: Scope, options: PatternOptions = {}) {
  switch (node.type) {
    case 'ObjectPattern':
      ObjectPattern(node, scope, options)
      break
    case 'ArrayPattern':
      ArrayPattern(node, scope, options)
      break
    case 'RestElement':
      RestElement(node, scope, options)
      break
    case 'AssignmentPattern':
      AssignmentPattern(node, scope)
      break
    default:
      throw new SyntaxError('Unexpected token')
  }
}