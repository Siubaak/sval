import * as estree from 'estree'
import Scope from '../scope'
import evaluate from '../evaluate'
import { define, inherits, runGenerator } from './util'
import { RETURN, SUPER } from './const'

import { BlockStatement } from '../evaluate/statement'
import { FunctionDeclaration, VariableDeclaration, ClassBody } from '../evaluate/declaration'
import { Identifier } from '../evaluate/identifier'
import {
  PatternOptions,
  ObjectPattern,
  ArrayPattern,
  RestElement,
  AssignmentPattern,
} from '../evaluate/pattern'

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
      // Avoid duplicate declaration
      block.body[i] = null
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
      // Avoid duplicate declaration
      block.body[i] = null
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
      for (const node of statement.body) {
        yield* hoistVarRecursion(node, scope)
      }
      break
    case 'SwitchStatement':
      for (const eachCase of statement.cases) {
        for (const node of eachCase.consequent) {
          yield* hoistVarRecursion(node, scope)
        }
      }
      break
    case 'TryStatement': {
      const tryBlock = statement.block.body
      for (const node of tryBlock) {
        yield* hoistVarRecursion(node, scope)
      }
      const catchBlock = statement.handler && statement.handler.body.body
      if (catchBlock) {
        for (const node of catchBlock) {
          yield* hoistVarRecursion(node, scope)
        }
      }
      const finalBlock = statement.finalizer && statement.finalizer.body
      if (finalBlock) {
        for (const node of finalBlock) {
          yield* hoistVarRecursion(node, scope)
        }
      }
      break
    }
  }
}

export function* pattern(node: estree.Pattern, scope: Scope, options: PatternOptions = {}): IterableIterator<any> {
  switch (node.type) {
    case 'ObjectPattern':
      yield* ObjectPattern(node, scope, options)
      break
    case 'ArrayPattern':
      yield* ArrayPattern(node, scope, options)
      break
    case 'RestElement':
      yield* RestElement(node, scope, options)
      break
    case 'AssignmentPattern':
      yield* AssignmentPattern(node, scope)
      break
    default:
      throw new SyntaxError('Unexpected token')
  }
}

export interface CtorOptions {
  superClass?: (...args: any[]) => any
}

export function* createFunc(
  node: estree.FunctionDeclaration | estree.FunctionExpression | estree.ArrowFunctionExpression,
  scope: Scope,
  options: CtorOptions = {}
) {
  const { superClass } = options

  const params = node.params

  const tmpGenerator = function* (...args: any[]) {
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
        const name = yield* Identifier(param, scope, { getName: true })
        subScope.let(name, args[i])
      } else {
        yield* pattern(param, scope, { feed: args[i] })
      }
    }

    let result: any
    if (node.body.type === 'BlockStatement') {
      yield* hoist(node.body, subScope)
      result = yield* BlockStatement(node.body, subScope, {
        invasived: true,
        hoisted: true,
      })
    } else {
      result = yield* evaluate(node.body, subScope)
    }

    if (result === RETURN) {
      return result.RES
    }
  }

  let func: any
  if (node.generator) {
    func = tmpGenerator
  } else {
    func = (...args: any[])=> runGenerator(tmpGenerator, ...args)
  }

  if (node.type === 'FunctionDeclaration') {
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

export function* createClass(
  node: estree.ClassDeclaration | estree.ClassExpression,
  scope: Scope,
) {
  const superClass = yield* evaluate(node.superClass, scope)

  let klass: (...args: any[]) => any = function () { }
  for (const method of node.body.body) {
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
    configurable: true,
  })

  return klass
}