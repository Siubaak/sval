import State from '../state'
import { Node } from 'estree'

import * as literal from './literal'
import * as identifier from './identifier'
import * as program from './program'
import * as statement from './statement'
import * as expression from './expression'
import * as declaration from './declaration'

const handlers: any = Object.assign(
  {}, literal, identifier, program, statement, expression, declaration
)

export default function compile(node: Node, state: State) {
  if (!node) return
  const handler = handlers[node.type]
  if (handler) {
    handler(node, state)
  } else {
    throw new Error(`${node.type} isn't implemented`)
  }
}