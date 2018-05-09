import * as estree from 'estree'
import Scope from '../scope'
import evaluate from '.'
import hoisting from '../share/hoisting'
import { varKind } from '../scope/variable'
import { RETURN } from '../share/const'

import { BlockStatement } from './statement'

// es5
export function FunctionDeclaration(node: estree.FunctionDeclaration, scope: Scope) {
  scope.var(node.id.name, function (...args: any[]) {
    const subScope = new Scope(scope, true)
    subScope.const('this', this)
    subScope.let('arguments', arguments)

    const params = node.params as estree.Identifier[]
    for (let i = 0; i < params.length; i++) {
      const { name } = params[i]
      subScope.let(name, args[i])
    }

    hoisting(node.body, subScope)
    
    const result = BlockStatement(node.body, subScope, { invasived: true })

    if (result === RETURN) {
      return result.RES
    }
  })
}

export interface VariableDeclarationOptions {
  hoisting?: boolean
}

export function VariableDeclaration(
  node: estree.VariableDeclaration,
  scope: Scope,
  options: VariableDeclarationOptions = {},
) {
  const { hoisting = false } = options
  for (const declarator of node.declarations) {
    VariableDeclarator(declarator, scope, { kind: node.kind, hoisting })
  }
}

export interface VariableDeclaratorOptions {
  kind?: varKind
  hoisting?: boolean
}

export function VariableDeclarator(
  node: estree.VariableDeclarator,
  scope: Scope,
  options: VariableDeclaratorOptions = {},
) {
  const { kind = 'var', hoisting = false } = options
  const { name } = node.id as estree.Identifier
  
  if (hoisting) {
    // Hoisting the var variable
    if (kind === 'var') {
      scope.var(name, undefined)
    }
  } else if (
    kind === 'var'
    || kind === 'let'
    || kind === 'const'
  ) {
    // Variable declaration
    const value = evaluate(node.init, scope)
    if (!scope[kind](name, value)) {
      throw new SyntaxError(`Identifier '${name}' has already been declared`)
    }
  } else {
    throw new SyntaxError('Unexpected identifier')
  }
}
