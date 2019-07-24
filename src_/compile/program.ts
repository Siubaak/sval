import * as estree from 'estree'
import State from '../state'
import compile from '../compile'
import { OP } from '../share/const'

export function Program(program: estree.Program, state: State) {
  for (let i = 0; i < program.body.length; i++) {
    compile(program.body[i], state)
    state.opCodes.push({ op: OP.GC })
  }
}
