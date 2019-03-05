import Scope from '../scope'
import { Node } from 'estree'
import { assign } from '../share/util'

import * as declaration from './declaration'
import * as expression from './expression'
import * as identifier from './identifier'
import * as literal from './literal'
import * as pattern from './pattern'
import * as program from './program'
import * as statement from './statement'

const evaluateOps = assign(
  {},
  declaration,
  expression,
  identifier,
  literal,
  pattern,
  program,
  statement,
)

export default function* evaluate(node: Node, scope: Scope) {
  if (!node) {
    return
  }
  const handler = (evaluateOps as any)[node.type]
  if (handler) {
    yield* handler(node, scope)
  } else {
    throw new Error(`${node.type} isn't implemented`)
  }
}
