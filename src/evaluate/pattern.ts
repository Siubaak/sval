import * as estree from 'estree'
import Scope from '../scope'
import { varKind, Var } from '../scope/variable'
import { Identifier } from './identifier'

export interface PatternOptions {
  feed?: any
}

export interface DeclarationOptions {
  kind?: varKind
}

export function ObjectPattern(node: estree.ObjectPattern, scope: Scope, options?: PatternOptions & DeclarationOptions) {
  const { kind = 'let', feed = {} } = options || {}

  
}

export function AssignmentProperty(node: estree.AssignmentProperty, scope: Scope, options?: PatternOptions) {
  const { feed = {} } = options || {}
  
}

export function ArrayPattern(node: estree.ArrayPattern, scope: Scope, options?: PatternOptions & DeclarationOptions) {
  const { kind = null, feed = [] } = options || {}
  for (let i = 0; i < node.elements.length; i++) {
    const element = node.elements[i]
    if (kind && element.type === 'Identifier') {
      const name = Identifier(element, scope, { getName: true })
      scope[kind](name, feed[i])
    } else if (element.type === 'Identifier') {
      const variable: Var = Identifier(element, scope, { getVar: true })
      variable.set(feed[i])
    } else {
      Pattern(element, scope, { feed: feed[i] })
    }
  }
}

export function RestElement(node: estree.RestElement, scope: Scope, options?: PatternOptions) {
  const { feed = [] } = options || {}
  const arg = node.argument

  if (arg.type === 'Identifier') {
    const name = Identifier(arg, scope, { getName: true })
    scope.let(name, feed)
  } else {
    Pattern(arg, scope, { feed })
  }
}

export function AssignmentPattern(node: estree.AssignmentPattern, scope: Scope, options?: PatternOptions) {
  const { feed = {} } = options || {}
  throw 'what?'
}

// "Identifier" | "ObjectPattern" | "ArrayPattern" | "RestElement" | "AssignmentPattern" | "MemberExpression"
export function Pattern(node: estree.Pattern, scope: Scope, options?: PatternOptions) {

}