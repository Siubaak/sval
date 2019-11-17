import * as estree from 'estree'
import State from '../state'
import compile from '.'
import { OP } from '../share/const'
import { compileFunc, compileClass, compilePattern } from './helper'

export function VariableDeclaration(node: estree.VariableDeclaration, state: State) {
  state.symbols.type = node.kind
  for (let i = 0; i < node.declarations.length; i++) {
    const declr = node.declarations[i]
    if (declr.init) {
      compile(declr.init, state)
    } else if (node.kind === 'var') {
      continue
    } else {
      state.opCodes.push({ op: OP.LOADK })
    }
    if (declr.id.type === 'Identifier') {
      state.opCodes.push({ op: OP.STORE, val: state.symbols.set(declr.id.name).pointer , alloc: true })
    } else { // declr.id.type === 'Pattern'
      compilePattern(declr.id, state)
    }
  }
  state.symbols.type = null
}

export function FunctionDeclaration(node: estree.FunctionDeclaration, state: State) {
  compileFunc(node, state)
  state.opCodes.push({ op: OP.STORE, val: state.symbols.set(node.id.name, 'var').pointer , alloc: true })
}

export function ClassDeclaration(node: estree.ClassDeclaration, state: State) {
  const pointer = state.symbols.set(node.id.name, 'var').pointer
  state.opCodes.push({ op: OP.LOADK })
  state.opCodes.push({ op: OP.STORE, val: pointer , alloc: true })
  compileClass(node, state)
  state.opCodes.push({ op: OP.STORE, val: pointer })
}
