import State from '../state'
import * as estree from 'estree'
import { OP } from '../share/const'
import compile from '.'

type FunctionDefinition = estree.FunctionDeclaration | estree.FunctionExpression | estree.ArrowFunctionExpression

export function compileFunc(node: FunctionDefinition, state: State) {
  const arrow = node.type === 'ArrowFunctionExpression'
  const funCode = {
    op: OP.FUNC,
    val: '',
    end: -1,
    arrow,
    async: node.async,
    generator: node.generator
  }
  state.opCodes.push(funCode)

  state.symbols.pushScope()
  if (!arrow) {
    state.opCodes.push({ op: OP.ALLOC, val: state.symbols.set('const', 'this').pointer })
    state.opCodes.push({ op: OP.ALLOC, val: state.symbols.set('var', 'arguments').pointer })
  }
  for (let i = 0; i < node.params.length; i++) {
    const param = node.params[i]
    if (param.type === 'Identifier') {
      state.opCodes.push({ op: OP.ALLOC, val: state.symbols.set('var', param.name).pointer })
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

type ClassDefinition = estree.ClassDeclaration | estree.ClassExpression

export function compileCls(node: ClassDefinition, state: State) {

}