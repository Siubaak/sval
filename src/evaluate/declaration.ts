import { define, getDptor, assign, hasOwn } from '../share/util'
import { pattern, createFunc, createClass } from './helper'
import { VarKind } from '../scope/variable'
import { NOINIT } from '../share/const'
import * as estree from 'estree'
import Scope from '../scope'
import evaluate from '.'

export function* FunctionDeclaration(
  node: estree.FunctionDeclaration,
  scope: Scope
): IterableIterator<any> {
  scope.func(node.id.name, createFunc(node, scope))
}

export interface VariableDeclarationOptions {
  hoist?: boolean
  feed?: any
}

export function* VariableDeclaration(
  node: estree.VariableDeclaration,
  scope: Scope,
  options: VariableDeclarationOptions = {},
) {
  for (let i = 0; i < node.declarations.length; i++) {
    yield* VariableDeclarator(node.declarations[i], scope, assign({ kind: node.kind }, options))
  }
}

export interface VariableDeclaratorOptions {
  kind?: VarKind
}

export function* VariableDeclarator(
  node: estree.VariableDeclarator,
  scope: Scope,
  options: VariableDeclaratorOptions & VariableDeclarationOptions = {},
) {
  const { kind = 'let', hoist = false, feed } = options
  if (hoist) {
    // hoist the var variable
    if (kind === 'var') {
      if (node.id.type === 'Identifier') {
        scope.var(node.id.name)
      } else {
        yield* pattern(node.id, scope, { kind, hoist })
      }
    }
  } else if (
    kind === 'var'
    || kind === 'let'
    || kind === 'const'
  ) {
    const hasFeed = hasOwn(options, 'feed')
    let value: any
    if (hasFeed) {
      value = feed
    } else if (
      node.init
      && (
        node.init.type === 'FunctionExpression'
        || node.init.type === 'ClassExpression'
      )
      && node.init.id
      && node.init.id.name
    ) {
      // it's for accessing function or class expression by its name inside
      // e.g. const a = function b() { console.log(b) }
      const tmpScope = new Scope(scope)
      value = yield* evaluate(node.init, tmpScope)
      tmpScope.const(node.init.id.name, value)
    } else {
      value = yield* evaluate(node.init, scope)
    }
    if (node.id.type === 'Identifier') {
      const name = node.id.name
      if (kind === 'var' && !node.init && !hasFeed) {
        scope.var(name, NOINIT)
      } else {
        scope[kind](name, value)
      }
      if (
        node.init
        && ['ClassExpression', 'FunctionExpression', 'ArrowFunctionExpression']
          .indexOf(node.init.type) !== -1
        && !value.name
      ) {
        define(value, 'name', {
          value: name,
          configurable: true
        })
      }
    } else {
      yield* pattern(node.id, scope, { kind, feed: value })
    }
  } else {
    throw new SyntaxError('Unexpected identifier')
  }
}

export function* ClassDeclaration(
  node: estree.ClassDeclaration,
  scope: Scope
): IterableIterator<any> {
  scope.func(node.id.name, yield* createClass(node, scope))
}

export interface ClassOptions {
  klass?: (...args: any[]) => void,
  superClass?: (...args: any[]) => void
}

export function* ClassBody(node: estree.ClassBody, scope: Scope, options: ClassOptions = {}) {
  const { klass, superClass } = options

  for (let i = 0; i < node.body.length; i++) {
    yield* MethodDefinition(node.body[i], scope, { klass, superClass })
  }
}

export function* MethodDefinition(node: estree.MethodDefinition, scope: Scope, options: ClassOptions = {}) {
  const { klass, superClass } = options

  let key: string
  if (node.computed) {
    key = yield* evaluate(node.key, scope)
  } else if (node.key.type === 'Identifier') {
    key = node.key.name
  } else {
    throw new SyntaxError('Unexpected token')
  }

  const obj = node.static ? klass : klass.prototype
  const value = createFunc(node.value, scope, { superClass })

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
    case 'get': {
      const oriDptor = getDptor(obj, key)
      define(obj, key, {
        get: value,
        set: oriDptor && oriDptor.set,
        configurable: true,
      })
      break
    }
    case 'set': {
      const oriDptor = getDptor(obj, key)
      define(obj, key, {
        get: oriDptor && oriDptor.get,
        set: value,
        configurable: true,
      })
      break
    }
    default:
      throw new SyntaxError('Unexpected token')
  } 
}
