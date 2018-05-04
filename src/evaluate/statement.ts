import * as estree from 'estree'
import Scope from '../scope'
import evaluate from './index'

export function ExpressionStatement(node: estree.ExpressionStatement, scope: Scope) {
  evaluate(node.expression, scope)
}

export function BlockStatement(block: estree.BlockStatement, scope: Scope) {
  const subScope = scope.invasived ? scope : new Scope('block', scope)
  for (const node of block.body) {
    const result = evaluate(node, subScope)
    // Handle break, return and continue
  }
}

export function EmptyStatement(node: estree.EmptyStatement, scope: Scope) {
  // No operation here
}

export function DebuggerStatement(node: estree.DebuggerStatement, scope: Scope) {
  debugger
}

export function WithStatement(node: estree.WithStatement, scope: Scope) {
  
}
