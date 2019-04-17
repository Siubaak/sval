import { FunctionDeclaration, VariableDeclaration, ClassBody } from './declaration'
import { define, inherits, runAsync} from '../share/util'
import { RETURN, SUPER, ARROW } from '../share/const'
import { Identifier } from '../evaluate_n/identifier'
import { BlockStatement } from './statement'
import { Var } from '../scope/variable'
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

export function* hoist(block: estree.Program | estree.BlockStatement, scope: Scope) {
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
      yield* FunctionDeclaration(statement, scope)
    } else {
      yield* hoistVarRecursion(statement, scope)
    }
  }
}

export function* hoistFunc(block: estree.BlockStatement, scope: Scope) {
  for (let i = 0; i < block.body.length; i++) {
    const statement = block.body[i]

    if (statement.type === 'FunctionDeclaration') {
      yield* FunctionDeclaration(statement, scope)
    }
  }
}

function* hoistVarRecursion(statement: estree.Statement, scope: Scope): IterableIterator<any> {
  switch (statement.type) {
    case 'VariableDeclaration':
      yield* VariableDeclaration(statement, scope, { hoist: true })
      break
    case 'WhileStatement':
    case 'DoWhileStatement':
    case 'ForStatement':
    case 'ForInStatement':
    case 'ForOfStatement':
      yield* hoistVarRecursion(statement.body, scope)
      break
    case 'BlockStatement':
      for (const index in statement.body) {
        yield* hoistVarRecursion(statement.body[index], scope)
      }
      break
    case 'SwitchStatement':
      for (const index in statement.cases) {
        for (const idx in statement.cases[index].consequent) {
          yield* hoistVarRecursion(statement.cases[index].consequent[idx], scope)
        }
      }
      break
    case 'TryStatement': {
      const tryBlock = statement.block.body
      for (const index in tryBlock) {
        yield* hoistVarRecursion(tryBlock[index], scope)
      }
      const catchBlock = statement.handler && statement.handler.body.body
      if (catchBlock) {
        for (const index in catchBlock) {
          yield* hoistVarRecursion(catchBlock[index], scope)
        }
      }
      const finalBlock = statement.finalizer && statement.finalizer.body
      if (finalBlock) {
        for (const index in finalBlock) {
          yield* hoistVarRecursion(finalBlock[index], scope)
        }
      }
      break
    }
  }
}

export function* pattern(node: estree.Pattern, scope: Scope, options: PatternOptions = {}): IterableIterator<any> {
  switch (node.type) {
    case 'ObjectPattern':
      return yield* ObjectPattern(node, scope, options)
    case 'ArrayPattern':
      return yield* ArrayPattern(node, scope, options)
    case 'RestElement':
      return yield* RestElement(node, scope, options)
    case 'AssignmentPattern':
      return yield* AssignmentPattern(node, scope)
    default:
      throw new SyntaxError('Unexpected token')
  }
}

export interface CtorOptions {
  superClass?: (...args: any[]) => any
}

import { createFunc as createAnotherFunc } from /*<replace by:='../evaluate/helper'>*/'../evaluate_n/helper'/*</replace>*/
export function createFunc(
  node: estree.FunctionDeclaration | estree.FunctionExpression | estree.ArrowFunctionExpression,
  scope: Scope,
  options: CtorOptions = {}
): any {
  if (/*<replace by:=node.generator\s||\snode.async>*/!node.generator && !node.async/*</replace>*/) {
    return createAnotherFunc(node, scope, options)
  }

  const { superClass } = options
  const params = node.params
  const tmpFunc = function* (...args: any[]) {
    const subScope: Scope = new Scope(scope, true)
    if (node.type !== 'ArrowFunctionExpression') {
      subScope.const('this', this)
      subScope.let('arguments', arguments)
      if (superClass) {
        subScope.const(SUPER, superClass)
      }
    }

    for (let i = 0; i < params.length; i++) {
      const param = params[i]
      if (param.type === 'Identifier') {
        subScope.let(param.name, args[i])
      } else if (param.type === 'RestElement') {
        yield* RestElement(param, subScope, { kind: 'let', feed: args.slice(i) })
      } else {
        yield* pattern(param, subScope, { feed: args[i] })
      }
    }

    let result: any
    if (node.body.type === 'BlockStatement') {
      yield* hoist(node.body, subScope)
      result = yield* BlockStatement(node.body, subScope, {
        invasived: true,
        hoisted: true
      })
    } else {
      result = yield* evaluate(node.body, subScope)
    }

    if (result === RETURN) {
      return result.RES
    }
  }

  let func: any /*<add>*//*= tmpFunc*//*</add>*/
  /*<remove>*/
  if (node.async && node.generator) {
  } else if (node.async) {
    func = function (...args: any[]) {
      return runAsync(tmpFunc(args))
    }
  /*</remove>*/
    if (node.type === 'ArrowFunctionExpression') {
      define(func, ARROW, { value: true })
    }
  /*<remove>*/
  } else {
    func = tmpFunc
  }
  /*</remove>*/

  define(func, 'name', {
    value: (node as estree.FunctionDeclaration).id
      && (node as estree.FunctionDeclaration).id.name
      || '',
    configurable: true
  })
  define(func, 'length', {
    value: params.length,
    configurable: true
  })

  return func
}

export function* createClass(
  node: estree.ClassDeclaration | estree.ClassExpression,
  scope: Scope,
) {
  const superClass = yield* evaluate(node.superClass, scope)

  let klass: (...args: any[]) => any = function () { }
  const methodBody = node.body.body
  for (const index in methodBody) {
    const method = methodBody[index]
    if (method.kind === 'constructor') {
      klass = yield* createFunc(method.value, scope, { superClass })
      break
    }
  }

  if (superClass) {
    inherits(klass, superClass)
  }

  yield* ClassBody(node.body, scope, { klass })

  define(klass, 'name', {
    value: node.id.name,
    configurable: true
  })

  return klass
}

export interface ForXHandlerOptions {
  value: any
}

export function* ForXHandler(
  node: estree.ForInStatement | estree.ForOfStatement,
  scope: Scope,
  options: ForXHandlerOptions
) {
  const { value } = options
  const left = node.left

  const subScope = new Scope(scope)
  if (left.type === 'VariableDeclaration') {
    yield* VariableDeclaration(left, subScope, { feed: value })
  } else if (left.type === 'Identifier') {
    const variable: Var = yield* Identifier(left, scope, { getVar: true })
    variable.set(value)
  } else {
    yield* pattern(left, scope, { feed: value })
  }

  let result: any
  if (node.body.type === 'BlockStatement') {
    result = yield* BlockStatement(node.body, subScope, { invasived: true })
  } else {
    result = yield* evaluate(node.body, subScope)
  }
  return result
}