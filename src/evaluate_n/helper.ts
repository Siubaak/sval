import { FunctionDeclaration, VariableDeclaration, ClassBody } from './declaration'
import { define, inherits, runAsync } from '../share/util'
import { RETURN, SUPER, ASYNC } from '../share/const'
import { BlockStatement } from './statement'
import { Identifier } from './identifier'
import * as estree from 'estree'
import Scope from '../scope'
import evaluate from '.'
import {
  PatternOptions,
  ObjectPattern,
  ArrayPattern,
  RestElement,
  AssignmentPattern
} from './pattern'

export function hoist(block: estree.Program | estree.BlockStatement, scope: Scope) {
  for (let i = 0; i < block.body.length; i++) {
    const statement = block.body[i]
    if (
      statement.type === 'ImportDeclaration'
      || statement.type === 'ExportNamedDeclaration'
      || statement.type === 'ExportDefaultDeclaration'
      || statement.type === 'ExportAllDeclaration'
    ) {
      continue
    }

    if (statement.type === 'FunctionDeclaration') {
      FunctionDeclaration(statement, scope)
    } else {
      hoistVarRecursion(statement, scope)
    }
  }
}

export function hoistFunc(block: estree.BlockStatement, scope: Scope) {
  for (let i = 0; i < block.body.length; i++) {
    const statement = block.body[i]

    if (statement.type === 'FunctionDeclaration') {
      FunctionDeclaration(statement, scope)
    }
  }
}

function hoistVarRecursion(statement: estree.Statement, scope: Scope): any {
  switch (statement.type) {
    case 'VariableDeclaration':
      VariableDeclaration(statement, scope, { hoist: true })
      break
    case 'WhileStatement':
    case 'DoWhileStatement':
    case 'ForStatement':
    case 'ForInStatement':
    case 'ForOfStatement':
      hoistVarRecursion(statement.body, scope)
      break
    case 'BlockStatement':
      for (const node of statement.body) {
        hoistVarRecursion(node, scope)
      }
      break
    case 'SwitchStatement':
      for (const eachCase of statement.cases) {
        for (const node of eachCase.consequent) {
          hoistVarRecursion(node, scope)
        }
      }
      break
    case 'TryStatement': {
      const tryBlock = statement.block.body
      for (const node of tryBlock) {
        hoistVarRecursion(node, scope)
      }
      const catchBlock = statement.handler && statement.handler.body.body
      if (catchBlock) {
        for (const node of catchBlock) {
          hoistVarRecursion(node, scope)
        }
      }
      const finalBlock = statement.finalizer && statement.finalizer.body
      if (finalBlock) {
        for (const node of finalBlock) {
          hoistVarRecursion(node, scope)
        }
      }
      break
    }
  }
}

export function pattern(node: estree.Pattern, scope: Scope, options: PatternOptions = {}): any {
  switch (node.type) {
    case 'ObjectPattern':
      return ObjectPattern(node, scope, options)
    case 'ArrayPattern':
      return ArrayPattern(node, scope, options)
    case 'RestElement':
      return RestElement(node, scope, options)
    case 'AssignmentPattern':
      return AssignmentPattern(node, scope)
    default:
      throw new SyntaxError('Unexpected token')
  }
}

export interface CtorOptions {
  superClass?: (...args: any[]) => any
}

import { createFunc as createFuncAnother } from '../evaluate/helper'
export function createFunc(
  node: estree.FunctionDeclaration | estree.FunctionExpression | estree.ArrowFunctionExpression,
  scope: Scope,
  options: CtorOptions = {}
): any {
  if (
    node.generator||node.async
  ) return createFuncAnother(node, scope, options)

  const { superClass } = options

  const params = node.params

  const func = function (...args: any[]) {
    let subScope: Scope
    if (node.type !== 'ArrowFunctionExpression') {
      subScope = new Scope(scope, true)
      subScope.const('this', this)
      subScope.let('arguments', arguments)
      if (superClass) {
        subScope.const(SUPER, superClass)
      }
    } else {
      subScope = new Scope(scope)
    }

    for (let i = 0; i < params.length; i++) {
      const param = params[i]
      if (param.type === 'Identifier') {
        const name = Identifier(param, subScope, { getName: true })
        subScope.let(name, args[i])
      } else if (param.type === 'RestElement') {
        RestElement(param, subScope, { kind: 'let', feed: args.slice(i) })
      } else {
        pattern(param, subScope, { feed: args[i] })
      }
    }

    let result: any
    if (node.body.type === 'BlockStatement') {
      hoist(node.body, subScope)
      result = BlockStatement(node.body, subScope, {
        invasived: true,
        hoisted: true
      })
    } else {
      result = evaluate(node.body, subScope)
    }

    if (result === RETURN) {
      return result.RES
    }
  }

  

  if (node.type === 'FunctionDeclaration') {
    define(func, 'name', {
      value: node.id.name,
      configurable: true
    })
  }
  define(func, 'length', {
    value: params.length,
    configurable: true
  })

  return func
}

export function createClass(
  node: estree.ClassDeclaration | estree.ClassExpression,
  scope: Scope,
) {
  const superClass = evaluate(node.superClass, scope)

  let klass: (...args: any[]) => any = function () { }
  for (const method of node.body.body) {
    if (method.kind === 'constructor') {
      klass = createFunc(method.value, scope, { superClass })
      break
    }
  }

  if (superClass) {
    inherits(klass, superClass)
  }

  ClassBody(node.body, scope, { klass })

  define(klass, 'name', {
    value: node.id.name,
    configurable: true
  })

  return klass
}