import { Node } from 'acorn'
import { assign } from '../share/util.ts'
import Scope from '../scope/index.ts'

import * as declaration from './declaration.ts'
import * as expression from './expression.ts'
import * as identifier from './identifier.ts'
import * as statement from './statement.ts'
import * as literal from './literal.ts'
import * as pattern from './pattern.ts'
import * as program from './program.ts'

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
