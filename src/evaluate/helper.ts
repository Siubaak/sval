import { RETURN, SUPER, NOCTOR, CLSCTOR, NEWTARGET, SUPERCALL } from '../share/const'
import { VariableDeclaration, ClassBody, PropertyDefinition } from './declaration'
import { runAsync, runAsyncOptions } from '../share/async'
import { define, inherits, assign } from '../share/util'
import { Identifier } from '../evaluate_n/identifier'
import { BlockStatement } from './statement'
import * as acorn from 'acorn'
import Scope from '../scope'
import evaluate from '.'

import {
  PatternOptions,
  ObjectPattern,
  ArrayPattern,
  RestElement,
  AssignmentPattern
} from './pattern'

export interface hoistOptions {
  onlyBlock?: boolean
}

export function* hoist(
  block: acorn.Program | acorn.BlockStatement | acorn.StaticBlock,
  scope: Scope,
  options: hoistOptions = {}
) {
  const { onlyBlock = false } = options
  const funcDclrList: any[] = []
  const funcDclrIdxs: number[] = []
  for (let i = 0; i < block.body.length; i++) {
    const statement = block.body[i]
    if (statement.type === 'FunctionDeclaration') {
      funcDclrList.push(statement)
      funcDclrIdxs.push(i)
    } else if (
      statement.type === 'VariableDeclaration'
      && ['const', 'let'].indexOf(statement.kind) !== -1
    ) {
      yield* VariableDeclaration(statement, scope, { hoist: true, onlyBlock: true })
    } else if (!onlyBlock) {
      yield* hoistVarRecursion(statement as acorn.Statement, scope)
    }
  }
  if (funcDclrIdxs.length) {
    for (let i = funcDclrIdxs.length - 1; i > -1; i--) {
      block.body.splice(funcDclrIdxs[i], 1)
    }
    block.body = funcDclrList.concat(block.body)
  }
}

function* hoistVarRecursion(statement: acorn.Statement, scope: Scope): IterableIterator<any> {
  switch (statement.type) {
    case 'VariableDeclaration':
      yield* VariableDeclaration(statement, scope, { hoist: true })
      break
    case 'ForInStatement':
    case 'ForOfStatement':
      if (statement.left.type === 'VariableDeclaration') {
        yield* VariableDeclaration(statement.left, scope, { hoist: true })
      }
    case 'ForStatement':
      if (statement.type === 'ForStatement' && statement.init.type === 'VariableDeclaration') {
        yield* VariableDeclaration(statement.init, scope, { hoist: true })
      }
    case 'WhileStatement':
    case 'DoWhileStatement':
      yield* hoistVarRecursion(statement.body, scope)
      break
    case 'IfStatement':
      yield* hoistVarRecursion(statement.consequent, scope)
      if (statement.alternate) {
        yield* hoistVarRecursion(statement.alternate, scope)
      }
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

export function* pattern(node: acorn.Pattern, scope: Scope, options: PatternOptions = {}): IterableIterator<any> {
  switch (node.type) {
    case 'ObjectPattern':
      return yield* ObjectPattern(node, scope, options)
    case 'ArrayPattern':
      return yield* ArrayPattern(node, scope, options)
    case 'RestElement':
      return yield* RestElement(node, scope, options)
    case 'AssignmentPattern':
      return yield* AssignmentPattern(node, scope, options)
    default:
      throw new SyntaxError('Unexpected token')
  }
}

export interface CtorOptions {
  construct?: (object: any) => Generator | void
  superClass?: (...args: any[]) => any
}

import { createFunc as createAnotherFunc } from /*<replace by:='../evaluate/helper'>*/'../evaluate_n/helper'/*</replace>*/
export function createFunc(
  node: acorn.FunctionDeclaration | acorn.FunctionExpression | acorn.ArrowFunctionExpression,
  scope: Scope,
  options: CtorOptions = {}
): any {
  if (/*<replace by:=node.generator\s||\snode.async>*/!node.generator && !node.async/*</replace>*/) {
    return createAnotherFunc(node, scope, options)
  }

  const { superClass, construct } = options
  const params = node.params
  const tmpFunc = function* (...args: any[]) {
    const subScope: Scope = new Scope(scope, true)
    if (node.type !== 'ArrowFunctionExpression') {
      subScope.const('this', this)
      subScope.let('arguments', arguments)
      subScope.const(NEWTARGET, new.target)
      if (construct) {
        yield* construct(this) as Generator
      }
      if (superClass) {
        subScope.const(SUPER, superClass)
        if (construct) subScope.let(SUPERCALL, false)
      }
    }

    for (let i = 0; i < params.length; i++) {
      const param = params[i]
      if (param.type === 'Identifier') {
        subScope.var(param.name, args[i])
      } else if (param.type === 'RestElement') {
        yield* RestElement(param, subScope, { kind: 'var', feed: args.slice(i) })
      } else {
        yield* pattern(param, subScope, { kind: 'var', feed: args[i] })
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
    func = function (): AsyncIterator<any> {
      const iterator = tmpFunc.apply(this, arguments)
      let last: Promise<any> = Promise.resolve()
      let hasCatch = false
      const run = (opts: runAsyncOptions) =>
        last = last
          .then(() => runAsync(iterator, assign({ fullRet: true }, opts)))
          .catch(err => {
            if (!hasCatch) {
              hasCatch = true
              return Promise.reject(err)
            }
          })
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
    func = function () { return runAsync(tmpFunc.apply(this, arguments)) }
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
    value: (node as acorn.FunctionDeclaration).id
      && (node as acorn.FunctionDeclaration).id.name
      || '',
    configurable: true
  })
  define(func, 'length', {
    value: params.length,
    configurable: true
  })

  const source = node.loc?.source
  if (source) {
    define(func, 'toString', {
      value: () => source.substring(node.start, node.end),
      configurable: true
    })
  }

  return func
}

export function* createClass(
  node: acorn.ClassDeclaration | acorn.ClassExpression,
  scope: Scope,
) {
  const superClass = yield* evaluate(node.superClass, scope)

  const methodBody = node.body.body
  const construct = function* (object: any) {
    for (let i = 0; i < methodBody.length; i++) {
      const def = methodBody[i]
      if (def.type === 'PropertyDefinition' && !def.static) {
        yield* PropertyDefinition(def, scope, { klass: object, superClass })
      }
    }
  }

  let klass = function* () {
    yield* construct(this)
    if (superClass) {
      superClass.apply(this)
    }
  }
  for (let i = 0; i < methodBody.length; i++) {
    const method = methodBody[i]
    if (method.type === 'MethodDefinition' && method.kind === 'constructor') {
      klass = createFunc(method.value, scope, { superClass, construct })
      break
    }
  }

  if (superClass) {
    inherits(klass, superClass)
  }

  yield* ClassBody(node.body, scope, { klass, superClass })

  define(klass, CLSCTOR, { value: true })
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
  node: acorn.ForInStatement | acorn.ForOfStatement,
  scope: Scope,
  options: ForXHandlerOptions
) {
  const { value } = options
  const left = node.left

  const subScope = new Scope(scope)
  if (left.type === 'VariableDeclaration') {
    yield* VariableDeclaration(left, subScope, { feed: value })
  } else if (left.type === 'Identifier') {
    const variable = yield* Identifier(left, scope, { getVar: true })
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