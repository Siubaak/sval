import * as estree from 'estree'
import State from '../state'
import compile from '../compile'
import { OP } from '../share/const'

export function VariableDeclaration(node: estree.VariableDeclaration, state: State) {
  for (let i = 0; i < node.declarations.length; i++) {
    const declr = node.declarations[i]
    compile(declr.init, state)
    if (declr.id.type === 'Identifier') {
      state.opCodes.push({
        op: (OP as any)[node.kind.toUpperCase()],
        val: state.symbols.set(declr.id.name)
      })
    }
  }
}

export function FunctionDeclaration(node: estree.FunctionDeclaration, state: State) {
  const funCode = { op: OP.FUNC, val: state.symbols.set(node.id.name), begin: state.opCodes.length + 1, end: -1 }
  state.opCodes.push(funCode)

  state.symbols.pushScope()
  state.opCodes.push({ op: OP.CONST, val: state.symbols.set('this') })
  state.opCodes.push({ op: OP.LET, val: state.symbols.set('arguments') })
  for (let i = 0; i < node.params.length; i++) {
    const param = node.params[i]
    if (param.type === 'Identifier') {
      state.opCodes.push({ op: OP.LET, val: state.symbols.set(param.name) })
    } else if (param.type === 'RestElement') {
    } else {
    }
  }
  const body = node.body.type === 'BlockStatement' ? node.body.body : [node.body]
  for (let i = 0; i < body.length; i++) {
    compile(body[i], state)
  }
  state.symbols.popScope()

  funCode.end = state.opCodes.length
}