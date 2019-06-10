import * as estree from 'estree'
import State from '../state'
import compile from '../compile'
import { OP } from '../share/const'

export function VariableDeclaration(node: estree.VariableDeclaration, state: State) {
  for (let i = 0; i < node.declarations.length; i++) {
    const declr = node.declarations[i]
    compile(declr.init, state)
    if (declr.id.type === 'Identifier') {
      state.opCodes.push({ op: OP.MOVE, val: state.symbols.set(node.kind, declr.id.name).pointer })
    }
  }
}

export function FunctionDeclaration(node: estree.FunctionDeclaration, state: State) {
  const funCode = { op: OP.FUNC, val: -1 }
  state.opCodes.push(funCode)

  state.symbols.pushScope()
  state.opCodes.push({ op: OP.MOVE, val: state.symbols.set('const', 'this').pointer })
  state.opCodes.push({ op: OP.MOVE, val: state.symbols.set('let', 'arguments').pointer })
  for (let i = 0; i < node.params.length; i++) {
    const param = node.params[i]
    if (param.type === 'Identifier') {
      state.opCodes.push({ op: OP.MOVE, val: state.symbols.set('let', param.name).pointer })
    } else if (param.type === 'RestElement') {
    } else {
    }
  }
  const body = node.body.type === 'BlockStatement' ? node.body.body : [node.body]
  for (let i = 0; i < body.length; i++) {
    compile(body[i], state)
  }
  state.symbols.popScope()

  funCode.val = state.opCodes.length
  state.opCodes.push({ op: OP.MOVE, val: state.symbols.set('var', node.id.name).pointer })
}