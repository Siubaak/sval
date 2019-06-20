import * as estree from 'estree'
import State from '../state'
import compile from '../compile'
import { OP } from '../share/const'
import { compileFunc } from './helper'

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
  const clsCode = { op: OP.CLS, val: node.id.name, constructor: false, inherit: false }

  const methodBody = node.body.body
  for (let i = 0; i < methodBody.length; i++) {
    if (methodBody[i].kind === 'constructor') {
      compileFunc(methodBody[i].value, state)
      clsCode.constructor = true
      break
    }
  }

  if (node.superClass) {
    compile(node.superClass, state)
    clsCode.inherit = true
  }

  state.opCodes.push(clsCode)
  state.opCodes.push({ op: OP.ALLOC, val: state.symbols.set('var', node.id.name).pointer })
}

export function ClassBody(node: estree.ClassBody, state: State) {
}

export function MethodDefinition(node: estree.MethodDefinition, state: State) {
}
