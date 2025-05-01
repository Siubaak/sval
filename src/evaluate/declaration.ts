import { NOINIT, DEADZONE, PRIVATE, IMPORT, EXPORTS } from '../share/const.ts'
import { define, getDptor, assign, hasOwn } from '../share/util.ts'
import { pattern, createFunc, createClass } from './helper.ts'
import { BlockStatement } from './statement.ts'
import { VarKind } from '../scope/variable.ts'
import Scope from '../scope/index.ts'
import evaluate from './index.ts'
import * as acorn from 'acorn'

export function* FunctionDeclaration(
  node: acorn.FunctionDeclaration,
  scope: Scope
): IterableIterator<any> {
  scope.func(node.id.name, createFunc(node, scope))
}

export interface VariableDeclarationOptions {
  hoist?: boolean
  onlyBlock?: boolean
  feed?: any
}

export function* VariableDeclaration(
  node: acorn.VariableDeclaration,
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
  node: acorn.VariableDeclarator,
  scope: Scope,
  options: VariableDeclaratorOptions & VariableDeclarationOptions = {},
) {
  const { kind = 'var', hoist = false, onlyBlock = false, feed } = options
  if (hoist) {
    if (onlyBlock || kind === 'var') {
      if (node.id.type === 'Identifier') {
        scope[kind](node.id.name, onlyBlock ? DEADZONE : kind === 'var' ? NOINIT : undefined)
      } else {
        yield* pattern(node.id, scope, { kind, hoist, onlyBlock })
      }
    }
  } else {
    const hasFeed = 'feed' in options
    const value = hasFeed ? feed : yield* evaluate(node.init, scope)
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
  }
}

export function* ClassDeclaration(
  node: acorn.ClassDeclaration,
  scope: Scope
): IterableIterator<any> {
  scope.func(node.id.name, yield* createClass(node, scope))
}

export interface ClassOptions {
  klass?: any,
  superClass?: (...args: any[]) => void
}

export function* ClassBody(node: acorn.ClassBody, scope: Scope, options: ClassOptions = {}) {
  const { klass, superClass } = options

  for (let i = 0; i < node.body.length; i++) {
    const def = node.body[i]
    if (def.type === 'MethodDefinition') {
      yield* MethodDefinition(def, scope, { klass, superClass })
    } else if (def.type === 'PropertyDefinition' && def.static) {
      yield* PropertyDefinition(def, scope, { klass, superClass })
    } else if (def.type === 'StaticBlock') {
      yield* StaticBlock(def, scope, { klass, superClass })
    }
  }
}

export function* MethodDefinition(node: acorn.MethodDefinition, scope: Scope, options: ClassOptions = {}) {
  const { klass, superClass } = options

  let key: string
  let priv: boolean = false

  if (node.computed) {
    key = yield* evaluate(node.key, scope)
  } else if (node.key.type === 'Identifier') {
    key = node.key.name
  } else if (node.key.type === 'PrivateIdentifier') {
    key = node.key.name
    priv = true
  } else {
    throw new SyntaxError('Unexpected token')
  }

  let obj = node.static ? klass : klass.prototype

  if (priv) {
    if (!obj[PRIVATE]) {
      define(obj, PRIVATE, { value: {} })
    }
    obj = obj[PRIVATE]
  }

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

export function* PropertyDefinition(node: acorn.PropertyDefinition, scope: Scope, options: ClassOptions = {}) {
  const { klass, superClass } = options

  let key: string
  let priv: boolean = false

  if (node.computed) {
    key = yield* evaluate(node.key, scope)
  } else if (node.key.type === 'Identifier') {
    key = node.key.name
  } else if (node.key.type === 'PrivateIdentifier') {
    key = node.key.name
    priv = true
  } else {
    throw new SyntaxError('Unexpected token')
  }

  const subScope: Scope = new Scope(scope, true)
  subScope.const('this', klass)

  let obj = klass

  if (priv) {
    if (!obj[PRIVATE]) {
      define(obj, PRIVATE, { value: {} })
    }
    obj = obj[PRIVATE]
  }

  if (!node.value) {
    obj[key] = undefined
  } else if (node.value.type === 'FunctionExpression' || node.value.type === 'ArrowFunctionExpression') {
    obj[key] = createFunc(node.value, subScope, { superClass })
  } else {
    obj[key] = yield* evaluate(node.value, subScope)
  }
}

export function* StaticBlock(node: acorn.StaticBlock, scope: Scope, options: ClassOptions = {}) {
  const { klass } = options

  const subScope: Scope = new Scope(scope, true)
  subScope.const('this', klass)

  return yield* BlockStatement(node, subScope, { invasived: true })
}

export function* ImportDeclaration(node: acorn.ImportDeclaration, scope: Scope) {
  const globalScope = scope.global()

  const module = globalScope.find(IMPORT + node.source.value)
  let value: any
  if (module) {
    const result = module.get()
    if (result) {
      if (typeof result === 'function') {
        value = result()
      } else if (typeof result === 'object') {
        value = result
      }
    }
  }

  if (!value || typeof value !== 'object') {
    throw new TypeError(`Failed to resolve module specifier "${node.source.value}"`)
  }

  for (let i = 0; i < node.specifiers.length; i++) {
    const spec = node.specifiers[i]
    let name: string
    if (spec.type === 'ImportSpecifier') {
      name = spec.imported.type === 'Identifier'
        ? spec.imported.name : spec.imported.value as string
    } else if (spec.type === 'ImportDefaultSpecifier') {
      name = 'default'
    } else if (spec.type === 'ImportNamespaceSpecifier') {
      name = '*'
    }
    if (name !== '*' && !hasOwn(value, name)) {
      throw new SyntaxError(`The requested module "${node.source.value}" does not provide an export named "${name}"`)
    }
    scope.var(spec.local.name, name === '*' ? assign({}, value) : value[name])
  }
}

export function* ExportDefaultDeclaration(node: acorn.ExportDefaultDeclaration, scope: Scope) {
  const globalScope = scope.global()

  let value: any
  if (node.declaration.type === 'FunctionDeclaration') {
    value = createFunc(node.declaration, scope)
    scope.func(node.declaration.id.name, value)
  } else if (node.declaration.type === 'ClassDeclaration') {
    value = yield* createClass(node.declaration, scope)
    scope.func(node.declaration.id.name, value)
  } else {
    value = yield* evaluate(node.declaration, scope)
  }

  const variable = globalScope.find(EXPORTS)
  if (variable) {
    const exports = variable.get()
    if (exports && typeof exports === 'object') {
      exports.default = value
    }
  }
}

export function* ExportNamedDeclaration(node: acorn.ExportNamedDeclaration, scope: Scope) {
  const globalScope = scope.global()

  if (node.declaration) {
    if (node.declaration.type === 'FunctionDeclaration') {
      const value = createFunc(node.declaration, scope)
      scope.func(node.declaration.id.name, value)
      const variable = globalScope.find(EXPORTS)
      if (variable) {
        const exports = variable.get()
        if (exports && typeof exports === 'object') {
          exports[node.declaration.id.name] = value
        }
      }
    } else if (node.declaration.type === 'ClassDeclaration') {
      const value = yield* createClass(node.declaration, scope)
      scope.func(node.declaration.id.name, value)
      const variable = globalScope.find(EXPORTS)
      if (variable) {
        const exports = variable.get()
        if (exports && typeof exports === 'object') {
          exports[node.declaration.id.name] = value
        }
      }
    } else if (node.declaration.type === 'VariableDeclaration') {
      yield* VariableDeclaration(node.declaration, scope)
      const variable = globalScope.find(EXPORTS)
      if (variable) {
        const exports = variable.get()
        if (exports && typeof exports === 'object') {
          for (let i = 0; i < node.declaration.declarations.length; i++) {
            const name = (node.declaration.declarations[i].id as acorn.Identifier).name
            const item = scope.find(name)
            if (item) {
              exports[name] = item.get()
            }
          }
        }
      }
    }
  } else if (node.specifiers) {
    const variable = globalScope.find(EXPORTS)
    if (variable) {
      const exports = variable.get()
      if (exports && typeof exports === 'object') {
        for (let i = 0; i < node.specifiers.length; i++) {
          const spec = node.specifiers[i]
          const name = spec.local.type === 'Identifier'
            ? spec.local.name : spec.local.value as string
          const item = scope.find(name)
          if (item) {
            exports[
              spec.exported.type === 'Identifier'
                ? spec.exported.name : spec.exported.value as string
            ] = item.get()
          }
        }
      }
    }
  }
}

export function* ExportAllDeclaration(node: acorn.ExportAllDeclaration, scope: Scope) {
  const globalScope = scope.global()

  const module = globalScope.find(IMPORT + node.source.value)
  let value: any
  if (module) {
    const result = module.get()
    if (result) {
      if (typeof result === 'function') {
        value = result()
      } else if (typeof result === 'object') {
        value = result
      }
    }
  }

  if (!value || typeof value !== 'object') {
    throw new TypeError(`Failed to resolve module specifier "${node.source.value}"`)
  }

  const variable = globalScope.find(EXPORTS)
  if (variable) {
    const exports = variable.get()
    if (exports && typeof exports === 'object') {
      assign(exports, value)
    }
  }
}
