import * as estree from 'estree'
import Scope from '../scope'
import { FunctionDeclaration, VariableDeclaration } from '../evaluate/declaration'

export function hoisting(node: estree.Program | estree.BlockStatement, scope: Scope) {
  for (let i = 0; i < node.body.length; i++) {
    const statement = node.body[i]
    if (
      statement.type === 'ImportDeclaration'
      || statement.type === 'ExportNamedDeclaration'
      || statement.type === 'ExportDefaultDeclaration'
      || statement.type === 'ExportAllDeclaration'
    ) {
      continue
    }

    if (statement.type === 'FunctionDeclaration') {
      FunctionDeclaration(statement, scope)
      // Avoid duplicate declaration
      node.body[i] = null
    } else {
      hoistingVarRecursion(statement, scope)
    }
  }
}

export function hoistingFunc(node: estree.BlockStatement, scope: Scope) {
  for (let i = 0; i < node.body.length; i++) {
    const statement = node.body[i]
    
    if (statement.type === 'FunctionDeclaration') {
      FunctionDeclaration(statement, scope)
      // Avoid duplicate declaration
      node.body[i] = null
    }
  }
}

function hoistingVarRecursion(statement: estree.Statement, scope: Scope) {
  if (statement.type === 'VariableDeclaration') {
    VariableDeclaration(statement, scope, { hoisting: true })
  } else if (
    statement.type === 'WhileStatement'
    || statement.type === 'DoWhileStatement'
    || statement.type === 'ForStatement'
    || statement.type === 'ForInStatement'
    || statement.type === 'ForOfStatement'
  ) {
    hoistingVarRecursion(statement.body, scope)
  } else if (statement.type === 'BlockStatement') {
    for (const node of statement.body) {
      hoistingVarRecursion(node, scope)
    }
  } else if (statement.type === 'SwitchStatement') {
    for (const eachCase of statement.cases) {
      for (const node of eachCase.consequent) {
        hoistingVarRecursion(node, scope)
      }
    }
  } else if (statement.type === 'TryStatement') {
    const tryBlock = statement.block.body
    for (const node of tryBlock) {
      hoistingVarRecursion(node, scope)
    }
    const catchBlock = statement.handler && statement.handler.body.body
    if (catchBlock) {
      for (const node of catchBlock) {
        hoistingVarRecursion(node, scope)
      }
    }
    const finalBlock = statement.finalizer && statement.finalizer.body
    if (finalBlock) {
      for (const node of finalBlock) {
        hoistingVarRecursion(node, scope)
      }
    }
  }
}
