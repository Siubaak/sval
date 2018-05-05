import * as estree from 'estree'
import Scope from '../scope'

export default function Literal(node: estree.Literal, scope: Scope) {
  return node.value
}