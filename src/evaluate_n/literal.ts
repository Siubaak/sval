import * as estree from 'estree'
import Scope from '../scope'

export function Literal(node: estree.Literal, scope: Scope) {
  return node.value
}
