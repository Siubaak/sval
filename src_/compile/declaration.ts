import * as estree from 'estree'
import State from '../state'
import compile from '../compile'
import { OP } from '../share/const'

export function VariableDeclaration(node: estree.VariableDeclaration, state: State) {
  for (let i = 0; i < node.declarations.length; i++) {
    const declr = node.declarations[i]
    compile(declr.init, state)
    if (declr.id.type === 'Identifier') {
      const curSymbolPos = state.symbolPointer++
      state.symbols[declr.id.name] = curSymbolPos
      state.opCodes.push({
        op: (OP as any)[node.kind.toUpperCase()],
        val: curSymbolPos
      })
    }
  }
}