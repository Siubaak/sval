import * as estree from 'estree'
import State from '../state'
import compile from '../compile'
import { OP } from '../share/const'
import { compileFunc, compileCls } from './helper'

export function VariableDeclaration(node: estree.VariableDeclaration, state: State) {
  for (let i = 0; i < node.declarations.length; i++) {
    const declr = node.declarations[i]
    compile(declr.init, state)
    if (declr.id.type === 'Identifier') {
      state.opCodes.push({ op: OP.ALLOC, val: state.symbols.set(node.kind, declr.id.name).pointer })
    }
  }
}

export function FunctionDeclaration(node: estree.FunctionDeclaration, state: State) {
  compileFunc(node, state)
  state.opCodes.push({ op: OP.ALLOC, val: state.symbols.set('var', node.id.name).pointer })
}

export function ClassDeclaration(node: estree.ClassDeclaration, state: State) {
  compileCls(node, state)
  state.opCodes.push({ op: OP.ALLOC, val: state.symbols.set('var', node.id.name).pointer })
}
