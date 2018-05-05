import { Node } from 'estree'
import Scope from '../scope'
import { is } from '../share/util'

export default function evaluate(node: Node, scope: Scope): any {
  if (is.null(node) || is.undefined(node)) {
    return undefined
  }
}