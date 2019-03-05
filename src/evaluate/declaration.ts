import * as estree from 'estree'
import Scope from '../scope'
import evaluate from '.'
import { createFunc, pattern, createClass, createFakeGenerator } from '../share/helper'
import { VarKind } from '../scope/variable'
import { define } from '../share/util'

import { Identifier } from './identifier'

export function FunctionDeclaration(node: estree.FunctionDeclaration, scope: Scope) {
  const func = node.generator ? createFakeGenerator(node, scope) : createFunc(node, scope)
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
  for (const declarator of node.declarations) {
    VariableDeclarator(declarator, scope, { kind: node.kind, ...options })
  }
}

export interface VariableDeclaratorOptions {
  kind?: VarKind
}

export function VariableDeclarator(
  node: estree.VariableDeclarator,
  scope: Scope,
  options: VariableDeclaratorOptions & VariableDeclarationOptions = {},
) {
  const { kind = 'let', hoist = false, feed } = options
  if (hoist) {
    // hoist the var variable
    if (kind === 'var') {
      if (node.id.type === 'Identifier') {
        const name = Identifier(node.id, scope, { getName: true })
        scope.var(name, undefined)
      } else {
        pattern(node.id, scope, { kind, hoist })
      }
    }
  } else if (
    kind === 'var'
    || kind === 'let'
    || kind === 'const'
  ) {
    const value = typeof feed === 'undefined' ? evaluate(node.init, scope) : feed
    if (node.id.type === 'Identifier') {
      const name = Identifier(node.id, scope, { getName: true })
      if (!scope[kind](name, value)) {
        throw new SyntaxError(`Identifier '${name}' has already been declared`)
      }
    } else {
      pattern(node.id, scope, { kind, feed: value })
    }
  } else {
    throw new SyntaxError('Unexpected identifier')
  }
}

export function ClassDeclaration(node: estree.ClassDeclaration, scope: Scope) {
  scope.let(node.id.name, createClass(node, scope))
}

export interface ClassOptions {
  klass?: (...args: any[]) => any
}

export function ClassBody(node: estree.ClassBody, scope: Scope, options: ClassOptions = {}) {
  const { klass = function () { } } = options

  for (const method of node.body) {
    MethodDefinition(method, scope, { klass })
  }
}

export function MethodDefinition(node: estree.MethodDefinition, scope: Scope, options: ClassOptions = {}) {
  const { klass = function () { } } = options

  let key: string
  if (node.computed) {
    key = evaluate(node.key, scope)
  } else if (node.key.type === 'Identifier') {
    key = Identifier(node.key, scope, { getName: true })
  } else {
    throw new SyntaxError('Unexpected token')
  }

  const obj = node.static ? klass : klass.prototype
  const value = createFunc(node.value, scope)

  switch (node.kind) {
    case 'constructor':
      break
    case 'method':
      define(obj, key, {
        value,
        writable: true,
        configurable: true,
      })
      break
    case 'get':
      define(obj, key, {
        get: value,
        configurable: true,
      })
      break
    case 'set':
      define(obj, key, {
        set: value,
        configurable: true,
      })
      break
    default:
      throw new SyntaxError('Unexpected token')
  } 
}
