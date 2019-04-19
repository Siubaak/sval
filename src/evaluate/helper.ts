import { FunctionDeclaration, VariableDeclaration, ClassBody } from './declaration'
import { define, inherits, runAsync, runAsyncOptions, assign } from '../share/util'
import { RETURN, SUPER, NOCTOR } from '../share/const'
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
      for (let i = 0; i < statement.body.length; i++) {
        yield* hoistVarRecursion(statement.body[i], scope)
      }
      break
    case 'SwitchStatement':
      for (let i = 0; i < statement.cases.length; i++) {
        for (let j = 0; j < statement.cases[i].consequent.length; j++) {
          yield* hoistVarRecursion(statement.cases[i].consequent[j], scope)
        }
      }
      break
    case 'TryStatement': {
      const tryBlock = statement.block.body
      for (let i = 0; i < tryBlock.length; i++) {
        yield* hoistVarRecursion(tryBlock[i], scope)
      }
      const catchBlock = statement.handler && statement.handler.body.body
      if (catchBlock) {
        for (let i = 0; i < catchBlock.length; i++) {
          yield* hoistVarRecursion(catchBlock[i], scope)
        }
      }
      const finalBlock = statement.finalizer && statement.finalizer.body
      if (finalBlock) {
        for (let i = 0; i < finalBlock.length; i++) {
          yield* hoistVarRecursion(finalBlock[i], scope)
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
      if (node.type === 'ArrowFunctionExpression') {
        RETURN.RES = result
        result = RETURN
      }
    }

    if (result === RETURN) {
      return result.RES
    }
  }

  let func: any /*<add>*//*= tmpFunc*//*</add>*/
  /*<remove>*/
  if (node.async && node.generator) {
    func = function (...args: any[]): AsyncIterator<any> {
      const iterator = tmpFunc(args)
      let last: Promise<any> = Promise.resolve()
      const run = (opts: runAsyncOptions) =>
        last = last.then(() => runAsync(iterator, assign({ fullRet: true }, opts)))
      const asyncIterator: AsyncIterator<any> = {
        next: (res?: any) => run({ res }),
        throw: (err?: any) => run({ err }),
        return: (ret?: any) => run({ ret })
      }
      if (typeof Symbol === 'function') {
        (asyncIterator as any)[Symbol.iterator] = function () { return this }
      }
      return asyncIterator
    }
  } else if (node.async) {
    func = (...args: any[]) => runAsync(tmpFunc(args))
  } else {
    func = tmpFunc
  }
  define(func, NOCTOR, { value: true })
  /*</remove>*/
  /*<add>*//*
  if (node.type === 'ArrowFunctionExpression') {
    define(func, NOCTOR, { value: true })
  }
  *//*</add>*/

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

  let klass = function () { }
  const methodBody = node.body.body
  for (let i = 0; i < methodBody.length; i++) {
    const method = methodBody[i]
    if (method.kind === 'constructor') {
      klass = createFunc(method.value, scope, { superClass })
      break
    }
  }

  if (superClass) {
    inherits(klass, superClass)
  }

  yield* ClassBody(node.body, scope, { klass, superClass })

  define(klass, 'name', {
    value: node.id && node.id.name || '',
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