import { assign } from '../share/util'
import { Node } from 'estree'
import Scope from '../scope'

import * as declaration from './declaration'
import * as expression from './expression'
import * as identifier from './identifier'
import * as literal from './literal'
import * as pattern from './pattern'
import * as program from './program'
import * as statement from './statement'

let evaluateOps: any

function createEvaluateOps() {
  evaluateOps = assign(
    {},
    declaration,
    expression,
    identifier,
    literal,
    pattern,
    program,
    statement,
  )
}

export default function* evaluate(node: Node, scope: Scope) {
  if (!node) return

  // delay initalizing to remove circular reference issue for jest
  if (!evaluateOps) {
    createEvaluateOps()
  }

  const handler = evaluateOps[node.type]
  if (handler) {
    return yield* handler(node, scope)
  } else {
    throw new Error(`${node.type} isn't implemented`)
  }
}
