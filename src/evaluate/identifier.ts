import * as estree from 'estree'
import Scope from '../scope'

export default function Identifier(node: estree.Identifier, scope: Scope) {
  const name = node.name
  if (name === 'undefined') {
    return undefined
  }
  const variable = scope.find(name)
  if (variable) {
    return variable.get()
  } else {
    throw new ReferenceError(`${name} is not defined`)
  }
}