import { RETURN, SUPER, NOCTOR, CLSCTOR, NEWTARGET, SUPERCALL } from '../share/const'
import { VariableDeclaration, ClassBody } from './declaration'
import { runAsync, runAsyncOptions } from '../share/async'
import { define, inherits, assign } from '../share/util'
import { Identifier } from '../evaluate_n/identifier'
import { BlockStatement } from './statement'
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

export interface hoistOptions {
  onlyBlock?: boolean
}

export function hoist(
  block: estree.Program | estree.BlockStatement,
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
      VariableDeclaration(statement, scope, { hoist: true, onlyBlock: true })
    } else if (!onlyBlock) {
      hoistVarRecursion(statement as estree.Statement, scope)
    }
  }
  if (funcDclrIdxs.length) {
    for (let i = funcDclrIdxs.length - 1; i > -1; i--) {
      block.body.splice(funcDclrIdxs[i], 1)
    }
    block.body = funcDclrList.concat(block.body)
  }
}

function hoistVarRecursion(statement: estree.Statement, scope: Scope): any {
  switch (statement.type) {
    case 'VariableDeclaration':
      VariableDeclaration(statement, scope, { hoist: true })
      break
    case 'ForInStatement':
    case 'ForOfStatement':
      if (statement.left.type === 'VariableDeclaration') {
        VariableDeclaration(statement.left, scope, { hoist: true })
      }
    case 'ForStatement':
      if (statement.type === 'ForStatement' && statement.init.type === 'VariableDeclaration') {
        VariableDeclaration(statement.init, scope, { hoist: true })
      }
    case 'WhileStatement':
    case 'DoWhileStatement':
      hoistVarRecursion(statement.body, scope)
      break
    case 'IfStatement':
      hoistVarRecursion(statement.consequent, scope)
      if (statement.alternate) {
        hoistVarRecursion(statement.alternate, scope)
      }
      break
    case 'BlockStatement':
      for (let i = 0; i < statement.body.length; i++) {
        hoistVarRecursion(statement.body[i], scope)
      }
      break
    case 'SwitchStatement':
      for (let i = 0; i < statement.cases.length; i++) {
        for (let j = 0; j < statement.cases[i].consequent.length; j++) {
          hoistVarRecursion(statement.cases[i].consequent[j], scope)
        }
      }
      break
    case 'TryStatement': {
      const tryBlock = statement.block.body
      for (let i = 0; i < tryBlock.length; i++) {
        hoistVarRecursion(tryBlock[i], scope)
      }
      const catchBlock = statement.handler && statement.handler.body.body
      if (catchBlock) {
        for (let i = 0; i < catchBlock.length; i++) {
          hoistVarRecursion(catchBlock[i], scope)
        }
      }
      const finalBlock = statement.finalizer && statement.finalizer.body
      if (finalBlock) {
        for (let i = 0; i < finalBlock.length; i++) {
          hoistVarRecursion(finalBlock[i], scope)
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
      return AssignmentPattern(node, scope, options)
    default:
      throw new SyntaxError('Unexpected token')
  }
}

export interface CtorOptions {
  superClass?: (...args: any[]) => any
  isCtor?: boolean
}

import { createFunc as createAnotherFunc } from '../evaluate/helper'
export function createFunc(
  node: estree.FunctionDeclaration | estree.FunctionExpression | estree.ArrowFunctionExpression,
  scope: Scope,
  options: CtorOptions = {}
): any {
  if (node.generator || node.async) {
    return createAnotherFunc(node, scope, options)
  }

  const { superClass, isCtor } = options
  const params = node.params
  const tmpFunc = function (...args: any[]) {
    const subScope: Scope = new Scope(scope, true)
    if (node.type !== 'ArrowFunctionExpression') {
      subScope.const('this', this)
      subScope.let('arguments', arguments)
      subScope.const(NEWTARGET, new.target)
      if (superClass) {
        subScope.const(SUPER, superClass)
        if (isCtor) subScope.let(SUPERCALL, false)
      }
    }

    for (let i = 0; i < params.length; i++) {
      const param = params[i]
      if (param.type === 'Identifier') {
        subScope.var(param.name, args[i])
      } else if (param.type === 'RestElement') {
        RestElement(param, subScope, { kind: 'var', feed: args.slice(i) })
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
      if (node.type === 'ArrowFunctionExpression') {
        RETURN.RES = result
        result = RETURN
      }
    }

    if (result === RETURN) {
      return result.RES
    }
  }

  let func: any = tmpFunc
  
  
  if (node.type === 'ArrowFunctionExpression') {
    define(func, NOCTOR, { value: true })
  }
  

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

export function createClass(
  node: estree.ClassDeclaration | estree.ClassExpression,
  scope: Scope,
) {
  const superClass = evaluate(node.superClass, scope)

  let klass = function () {
    if (superClass) {
      superClass.apply(this)
    }
  }
  const methodBody = node.body.body
  for (let i = 0; i < methodBody.length; i++) {
    const method = methodBody[i]
    if (method.type === 'MethodDefinition' && method.kind === 'constructor') {
      klass = createFunc(method.value, scope, { superClass, isCtor: true })
      break
    }
  }

  if (superClass) {
    inherits(klass, superClass)
  }

  ClassBody(node.body, scope, { klass, superClass })

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

export function ForXHandler(
  node: estree.ForInStatement | estree.ForOfStatement,
  scope: Scope,
  options: ForXHandlerOptions
) {
  const { value } = options
  const left = node.left

  const subScope = new Scope(scope)
  if (left.type === 'VariableDeclaration') {
    VariableDeclaration(left, subScope, { feed: value })
  } else if (left.type === 'Identifier') {
    const variable = Identifier(left, scope, { getVar: true })
    variable.set(value)
  } else {
    pattern(left, scope, { feed: value })
  }

  let result: any
  if (node.body.type === 'BlockStatement') {
    result = BlockStatement(node.body, subScope, { invasived: true })
  } else {
    result = evaluate(node.body, subScope)
  }
  return result
}