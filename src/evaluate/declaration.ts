import * as estree from 'estree'
import Scope from '../scope'
import evaluate from '.'
import { hoist, createFunc } from '../share/helper'
import { varKind } from '../scope/variable'
import { define } from '../share/util'
import { RETURN } from '../share/const'

import { BlockStatement } from './statement'
import { Identifier } from './identifier'

export function FunctionDeclaration(node: estree.FunctionDeclaration, scope: Scope) {
  const params = node.params
  let func: (...args: any[]) => any
  if (node.generator) {
    func = function* (...args: any[]) {
      const subScope = new Scope(scope, true)
      subScope.const('this', this)
      subScope.let('arguments', arguments)
  
      for (let i = 0; i < params.length; i++) {
        const param = params[i]
        if (param.type === 'Identifier') {
          const name = Identifier(param, scope, { getName: true })
          subScope.let(name, args[i])
        } else {
          // TODO: Implement other patterns
        }
      }
  
      hoist(node.body, subScope)
      
      const generator = BlockStatement(node.body, subScope, {
        invasived: true,
        hoisted: true,
        generator: true
      })
      
      const result = yield* generator()

      if (result === RETURN) {
        return result.RES
      }
    }
    define(func, 'name', {
      value: node.id.name,
      configurable: true,
    })
    define(func, 'length', {
      value: params.length,
      configurable: true,
    })
  } else {
    func = createFunc(node, scope)
  }

  scope.let(node.id.name, func)
}

export interface VariableDeclarationOptions {
  hoist?: boolean
  feed?: any
}

export function VariableDeclaration(
  node: estree.VariableDeclaration,
  scope: Scope,
  options: VariableDeclarationOptions = {},
) {
  const { hoist = false, feed } = options
  for (const declarator of node.declarations) {
    VariableDeclarator(declarator, scope, { kind: node.kind, hoist })
  }
}

export interface VariableDeclaratorOptions {
  kind?: varKind
  hoist?: boolean
  feed?: any
}

export function VariableDeclarator(
  node: estree.VariableDeclarator,
  scope: Scope,
  options: VariableDeclaratorOptions = {},
) {
  const { kind = 'let', hoist = false, feed } = options
  if (node.id.type === 'Identifier') {
    const name = Identifier(node.id, scope, { getName: true })
  
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
      const value = typeof feed === 'undefined' ? evaluate(node.init, scope) : feed
      if (!scope[kind](name, value)) {
        throw new SyntaxError(`Identifier '${name}' has already been declared`)
      }
    } else {
      throw new SyntaxError('Unexpected identifier')
    }
  } else {

  }
}
