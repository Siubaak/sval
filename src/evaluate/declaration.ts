import * as estree from 'estree'
import Scope from '../scope'
import evaluate from '.'
import { varKind } from '../scope/variable'
import { RETURN } from '../share/const'

// es5
export function FunctionDeclaration(node: estree.FunctionDeclaration, scope: Scope) {
  scope.var(node.id.name, function (...args: any[]) {
    const subScope = new Scope('function', scope)
    subScope.invasived = true
    subScope.const('this', this)
    subScope.const('arguments', arguments)

    const params = node.params as estree.Identifier[]
    for (let i = 0; i < params.length; i++) {
      const { name } = params[i]
      subScope.let(name, args[i])
    }
    
    const result = evaluate(node.body, subScope)
    if (result === RETURN) {
      return result.RES
    }
  })
}

let curVarDeclareKind: varKind = null

export function VariableDeclaration(node: estree.VariableDeclaration, scope: Scope) {
  curVarDeclareKind = node.kind
  for (const declarator of node.declarations) {
    evaluate(declarator, scope)
  }
  curVarDeclareKind = null
}

export function VariableDeclarator(node: estree.VariableDeclarator, scope: Scope) {
  if (
    curVarDeclareKind === 'var'
    || curVarDeclareKind === 'let'
    || curVarDeclareKind === 'const'
  ) {
    const { name } = node.id as estree.Identifier
    if (!scope[curVarDeclareKind](name, evaluate(node.init, scope))) {
      throw new SyntaxError(`Identifier '${name}' has already been declared`)
    }
  } else {
    throw new SyntaxError('Unexpected identifier')
  }
}
