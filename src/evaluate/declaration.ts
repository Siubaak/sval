import * as estree from 'estree'
import Scope from '../scope'
import evaluate from '.'
import { hoist } from '../share/hoist'
import { varKind } from '../scope/variable'
import { define } from '../share/util'
import { RETURN } from '../share/const'

import { BlockStatement } from './statement'

export function FunctionDeclaration(node: estree.FunctionDeclaration, scope: Scope) {
  const params = node.params as estree.Identifier[]
  const func = function (...args: any[]) {
    const subScope = new Scope(scope, true)
    subScope.const('this', this)
    subScope.let('arguments', arguments)

    for (let i = 0; i < params.length; i++) {
      const { name } = params[i]
      subScope.let(name, args[i])
    }

    hoist(node.body, subScope)
    
    const result = BlockStatement(node.body, subScope, { invasived: true })
    
    if (result === RETURN) {
      return result.RES
    }
  }

  const name = node.id.name
  define(func, 'name', {
    value: name,
    configurable: true,
  })
  define(func, 'length', {
    value: params.length,
    configurable: true,
  })

  scope.let(name, func)
}

export interface VariableDeclarationOptions {
  hoist?: boolean
}

export function VariableDeclaration(
  node: estree.VariableDeclaration,
  scope: Scope,
  options: VariableDeclarationOptions = {},
) {
  const { hoist = false } = options
  for (const declarator of node.declarations) {
    VariableDeclarator(declarator, scope, { kind: node.kind, hoist })
  }
}

export interface VariableDeclaratorOptions {
  kind?: varKind
  hoist?: boolean
}

export function VariableDeclarator(
  node: estree.VariableDeclarator,
  scope: Scope,
  options: VariableDeclaratorOptions = {},
) {
  const { kind = 'var', hoist = false } = options
  const { name } = node.id as estree.Identifier
  
  if (hoist) {
    // hoist the var variable
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
