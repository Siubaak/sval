import * as estree from 'estree'
import Scope from '../scope'
import evaluate from '../evaluate'
import { define } from './util'
import { RETURN } from './const'

import { BlockStatement } from '../evaluate/statement'
import { FunctionDeclaration, VariableDeclaration } from '../evaluate/declaration'
import { Identifier } from '../evaluate/identifier'
import {
  PatternOptions,
  ObjectPattern,
  ArrayPattern,
  RestElement,
  AssignmentPattern,
} from '../evaluate/pattern'

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
      // Avoid duplicate declaration
      block.body[i] = null
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
      // Avoid duplicate declaration
      block.body[i] = null
    }
  }
}

function hoistVarRecursion(statement: estree.Statement, scope: Scope) {
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

export function pattern(node: estree.Pattern, scope: Scope, options: PatternOptions = {}) {
  switch (node.type) {
    case 'ObjectPattern':
      ObjectPattern(node, scope, options)
      break
    case 'ArrayPattern':
      ArrayPattern(node, scope, options)
      break
    case 'RestElement':
      RestElement(node, scope, options)
      break
    case 'AssignmentPattern':
      AssignmentPattern(node, scope)
      break
    default:
      throw new SyntaxError('Unexpected token')
  }
}

export function createFunc(
  node: estree.FunctionDeclaration | estree.FunctionExpression | estree.ArrowFunctionExpression,
  scope: Scope
) {
  const params = node.params
  const func = function (...args: any[]) {
    let subScope: Scope
    if (node.type !== 'ArrowFunctionExpression') {
      subScope = new Scope(scope, true)
      subScope.const('this', this)
      subScope.let('arguments', arguments)
    } else {
      subScope = new Scope(scope)
    }

    for (let i = 0; i < params.length; i++) {
      const param = params[i]
      if (param.type === 'Identifier') {
        const name = Identifier(param, scope, { getName: true })
        subScope.let(name, args[i])
      } else {
        pattern(param, scope, { feed: args[i] })
      }
      subScope.let(name, args[i])
    }

    let result: any
    if (node.body.type === 'BlockStatement') {
      hoist(node.body, subScope)
      result = BlockStatement(node.body, subScope, {
        invasived: true,
        hoisted: true,
      })
    } else {
      result = evaluate(node.body, subScope)
    }

    if (result === RETURN) {
      return result.RES
    }
  }
  if (node.type !== 'ArrowFunctionExpression') {
    define(func, 'name', {
      value: node.id.name,
      configurable: true,
    })
  }
  define(func, 'length', {
    value: params.length,
    configurable: true,
  })
  return func
}
