import * as estree from 'estree'
import Scope from '../scope'
import evaluate from '.'
import { RETURN } from '../share/const'

// es5
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