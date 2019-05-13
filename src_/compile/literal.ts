import * as estree from 'estree'
import State from '../state'
import { OP } from '../share/const'

export function Literal(node: estree.Literal, state: State) {
  state.opcodes.push({
    op: OP.LOADK,
    val: node.value
  })
}
