import * as estree from 'estree'
import Scope from '../scope'
import evaluate from '.'
import { RETURN } from '../share/const'
import Identifier from './identifier'

// es5
export function ThisExpression(node: estree.ThisExpression, scope: Scope) {
  return scope.find('this').get()
}

export function ArrayExpression(node: estree.ArrayExpression, scope: Scope) {
  return node.elements.map(item => evaluate(item, scope))
}

export function FunctionExpression(node: estree.FunctionExpression, scope: Scope) {
  return function (...args: any[]) {
    const subScope = new Scope('function', scope)
    subScope.invasived = true
    subScope.const('this', this)
    subScope.const('arguments', arguments)

    const params = node.params as estree.Identifier[]
    for (let i = 0; i < params.length; i++) {
      const { name } = params[i]
      subScope.let(name, args[i])
    }
    
    const result = evaluate(node.body, subScope)
    if (result === RETURN) {
      return result.RES
    }
  }
}

export function UnaryExpression(node: estree.UnaryExpression, scope: Scope) {
  const unaryOps = {
    '+': () => +evaluate(node.argument, scope),
    '-': () => -evaluate(node.argument, scope),
    '!': () => !evaluate(node.argument, scope),
    '~': () => ~evaluate(node.argument, scope),
    'void': () => void evaluate(node.argument, scope) as any,
    'typeof': () => {
      if (node.argument.type === 'Identifier') {
        return typeof Identifier(node.argument, scope, false)
      } else {
        return typeof evaluate(node.argument, scope)
      }
    },
    'delete': () => {
      
    }
  }
  return unaryOps[node.operator]()
}