import * as estree from 'estree'
import Scope from '../scope'

export interface IdentifierOptions {
  getName?: boolean
  getVar?: boolean
  throwErr?: boolean
}

export function* Identifier(node: estree.Identifier, scope: Scope, options: IdentifierOptions = {}) {
  const { getName = false, getVar = false, throwErr = true } = options

  if (getName) {
    return node.name
  }
  if (node.name === 'undefined') {
    return undefined
  }
  const variable = scope.find(node.name)
  if (variable) {
    return getVar ? variable : variable.get()
  } else if (throwErr) {
    throw new ReferenceError(`${node.name} is not defined`)
  } else {
    return undefined
  }
}

