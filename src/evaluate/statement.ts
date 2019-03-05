import * as estree from 'estree'
import Scope from '../scope'
import evaluate from './index'
import { Var } from '../scope/variable'
import { hoistFunc, pattern } from '../share/helper'
import { BREAK, CONTINUE, RETURN } from '../share/const'
import { walk } from '../share/util'
import { Identifier } from './identifier'
import { VariableDeclaration } from './declaration'

export function ExpressionStatement(node: estree.ExpressionStatement, scope: Scope) {
  evaluate(node.expression, scope)
}

export interface BlockOptions {
  invasived?: boolean
  hoisted?: boolean
  generator?: boolean
}

export function BlockStatement(
  block: estree.BlockStatement,
  scope: Scope,
  options: BlockOptions = {},
) {
  const {
    invasived = false,
    hoisted = false,
    generator = false,
  } = options

  const subScope = invasived ? scope : new Scope(scope)

  if (!hoisted) {
    hoistFunc(block, subScope)
  }

  if (generator) {
    return function* () {
      for (const node of block.body) {
        let isExistYield = false
        walk(node, {
          YieldExpression(node: estree.YieldExpression) {
            isExistYield = true
          }
        })
        let result
        if (isExistYield) {
          result = yield evaluate(node, subScope)
        } else {
          result = evaluate(node, subScope)
        }
        if (result === BREAK || result === CONTINUE || result === RETURN) {
          return result
        }
      }
    }
  } else {
    for (const node of block.body) {
      const result = evaluate(node, subScope)
      if (result === BREAK || result === CONTINUE || result === RETURN) {
        return result
      }
    }
  }
}

export function EmptyStatement() {
  // No operation here
}

export function DebuggerStatement() {
  debugger
}

export function ReturnStatement(node: estree.ReturnStatement, scope: Scope) {
  RETURN.RES = node.argument ? evaluate(node.argument, scope) : undefined
  return RETURN
}

export function BreakStatement() {
  return BREAK
}

export function ContinueStatement() {
  return CONTINUE
}

export function IfStatement(node: estree.IfStatement, scope: Scope) {
  if (evaluate(node.test, scope)) {
    return evaluate(node.consequent, scope)
  } else {
    return evaluate(node.alternate, scope)
  }
}

export function SwitchStatement(node: estree.SwitchStatement, scope: Scope) {
  const discriminant = evaluate(node.discriminant, scope)
  let matched = false
  for (const eachCase of node.cases) {
    if (
      !matched
      && (
        !eachCase.test  // default
        || evaluate(eachCase.test, scope) === discriminant
      )
    ) {
      matched = true
    }
    if (matched) {
      const result = SwitchCase(eachCase, scope)
      if (result === BREAK || result === CONTINUE || result === RETURN) {
        return result
      }
    }
  }
}

export function SwitchCase(node: estree.SwitchCase, scope: Scope) {
  for (const statement of node.consequent) {
    const result = evaluate(statement, scope)
    if (result === BREAK || result === CONTINUE || result === RETURN) {
      return result
    }
  }
}

export function ThrowStatement(node: estree.ThrowStatement, scope: Scope) {
  throw evaluate(node.argument, scope)
}

export function TryStatement(node: estree.TryStatement, scope: Scope) {
  try {
    return BlockStatement(node.block, scope)
  } catch (err) {
    if (node.handler) {
      const subScope = new Scope(scope)
      const param = node.handler.param
      if (param.type === 'Identifier') {
        const name = Identifier(param, scope, { getName: true })
        subScope.let(name, err)
      } else {
        pattern(param, scope, { feed: err })
      }
      return CatchClause(node.handler, subScope)
    } else {
      throw err
    }
  } finally {
    if (node.finalizer) {
      return BlockStatement(node.finalizer, scope)
    }
  }
}

export function CatchClause(node: estree.CatchClause, scope: Scope) {
  return BlockStatement(node.body, scope, { invasived: true })
}

export function WhileStatement(node: estree.WhileStatement, scope: Scope) {
  while (evaluate(node.test, scope)) {
    const result = evaluate(node.body, scope)

    if (result === BREAK) {
      break
    } else if (result === CONTINUE) {
      continue
    } else if (result === RETURN) {
      return result
    }
  }
}

export function DoWhileStatement(node: estree.DoWhileStatement, scope: Scope) {
  do {
    const result = evaluate(node.body, scope)

    if (result === BREAK) {
      break
    } else if (result === CONTINUE) {
      continue
    } else if (result === RETURN) {
      return result
    }
  } while (evaluate(node.test, scope))
}

export function ForStatement(node: estree.ForStatement, scope: Scope) {
  let subScope = new Scope(scope)
  
  for (
    evaluate(node.init, subScope);
    node.test ? evaluate(node.test, subScope) : true;
    evaluate(node.update, subScope = subScope.clone())
  ) {    
    let result: any
    if (node.body.type === 'BlockStatement') {
      result = BlockStatement(node.body, subScope, { invasived: true })
    } else {
      result = evaluate(node.body, subScope)
    }

    if (result === BREAK) {
      break
    } else if (result === CONTINUE) {
      continue
    } else if (result === RETURN) {
      return result
    }
  }

}

export function ForInStatement(node: estree.ForInStatement, scope: Scope) {
  const left = node.left
  for (const value in evaluate(node.right, scope)) {
    const subScope = new Scope(scope)
    if (left.type === 'VariableDeclaration') {
      VariableDeclaration(left, scope, { feed: value })
    } else if (left.type === 'Identifier') {
      const variable: Var = Identifier(left, scope, { getVar: true })
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

    if (result === BREAK) {
      break
    } else if (result === CONTINUE) {
      continue
    } else if (result === RETURN) {
      return result
    }
  }
}

export function ForOfStatement(node: estree.ForOfStatement, scope: Scope) {
  const left = node.left
  for (const value of evaluate(node.right, scope)) {
    const subScope = new Scope(scope)
    if (left.type === 'VariableDeclaration') {
      VariableDeclaration(left, scope, { feed: value })
    } else if (left.type === 'Identifier') {
      const variable: Var = Identifier(left, scope, { getVar: true })
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

    if (result === BREAK) {
      break
    } else if (result === CONTINUE) {
      continue
    } else if (result === RETURN) {
      return result
    }
  }
}
