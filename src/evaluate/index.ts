import { assign } from '../share/util'
import { Node } from 'acorn'
import Scope from '../scope'

import * as declaration from './declaration'
import * as expression from './expression'
import * as identifier from './identifier'
import * as statement from './statement'
import * as literal from './literal'
import * as pattern from './pattern'
import * as program from './program'

let evaluateOps: any

export default function* evaluate(node: Node, scope: Scope) {
  if (!node) return

  // delay initalizing to remove circular reference issue for jest
  if (!evaluateOps) {
    evaluateOps = assign(
      {},
      declaration,
      expression,
      identifier,
      statement,
      literal,
      pattern,
      program
    )
  }

  const handler = evaluateOps[node.type]
  if (handler) {
    return yield* handler(node, scope)
  } else {
    throw new Error(`${node.type} isn't implemented`)
  }
}
