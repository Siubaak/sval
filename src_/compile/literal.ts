import * as estree from 'estree'
import State from '../state'
import { OP } from '../share/const'

export function Literal(node: estree.Literal, state: State) {
  state.opCodes.push({ op: OP.LOADK, val: node.value })
}
