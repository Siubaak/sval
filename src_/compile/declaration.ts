import * as estree from 'estree'
import State from '../state'
import compile from '../compile'
import { OP } from '../share/const'
import { compileFunc, compileClass, compilePattern } from './helper'

export function VariableDeclaration(node: estree.VariableDeclaration, state: State) {
  state.symbols.type = node.kind
  for (let i = 0; i < node.declarations.length; i++) {
    const declr = node.declarations[i]
    compile(declr.init, state)
    if (declr.id.type === 'Identifier') {
      state.opCodes.push({ op: OP.ALLOC, val: state.symbols.set(declr.id.name).pointer })
    } else { // declr.id.type === 'Pattern'
      compilePattern(declr.id, state)
    }
  }
  state.symbols.type = null
}

export function FunctionDeclaration(node: estree.FunctionDeclaration, state: State) {
  compileFunc(node, state)
  state.opCodes.push({ op: OP.ALLOC, val: state.symbols.set(node.id.name, 'var').pointer })
}

export function ClassDeclaration(node: estree.ClassDeclaration, state: State) {
  compileClass(node, state)
  state.opCodes.push({ op: OP.ALLOC, val: state.symbols.set(node.id.name, 'var').pointer })
}
