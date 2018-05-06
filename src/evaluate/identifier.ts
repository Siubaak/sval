import * as estree from 'estree'
import Scope from '../scope'

interface IdentifierOptions {
  getName?: boolean
  getVar?: boolean
  throwErr?: boolean
}

export default function Identifier(node: estree.Identifier, scope: Scope, options?: IdentifierOptions) {
  const { getName = false, getVar = false, throwErr = true } = options
  const name = node.name

  if (getName) {
    return name
  }
  if (name === 'undefined') {
    return undefined
  }
  const variable = scope.find(name)
  if (variable) {
    return getVar ? variable : variable.get()
  } else if (throwErr) {
    throw new ReferenceError(`${name} is not defined`)
  } else {
    return undefined
  }
}
