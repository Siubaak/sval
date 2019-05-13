import * as estree from 'estree'
import State from '../state'
import compile from '../compile'

export function ExpressionStatement(node: estree.ExpressionStatement, state: State) {
  compile(node.expression, state)
}