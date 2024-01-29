import * as acorn from 'acorn'
import Scope from '../scope'

export function* Literal(node: acorn.Literal, scope: Scope) {
  return node.value
}
