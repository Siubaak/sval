import * as estree from 'estree'
import State from '../state'
import { OP } from '../share/const'

export function Identifier(node: estree.Identifier, state: State) {
  state.opCodes.push({ op: OP.LOADV, val: state.symbols[node.name] })
}
