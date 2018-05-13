import * as estree from 'estree'
import Scope from '../scope'
import evaluate from './index'
import { hoistFunc } from '../share/helper'
import { BREAK, CONTINUE, RETURN } from '../share/const'

export function ExpressionStatement(node: estree.ExpressionStatement, scope: Scope) {
  evaluate(node.expression, scope)
}

export interface BlockOptions {
  invasived?: boolean
  hoisted?: boolean
}

export function BlockStatement(
  block: estree.BlockStatement,
  scope: Scope,
  options: BlockOptions = {},
) {
  const { invasived = false, hoisted = false } = options

  const subScope = invasived ? scope : new Scope(scope)

  if (!hoisted) {
    hoistFunc(block, subScope)
  }

  for (const node of block.body) {
    const result = evaluate(node, subScope)
    if (result === BREAK || result === CONTINUE || result === RETURN) {
      return result
    }
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

export function ReturnStatement(node: estree.ReturnStatement, scope: Scope) {
  RETURN.RES = node.argument ? evaluate(node.argument, scope) : undefined
  return RETURN
}

export function LabeledStatement(node: estree.LabeledStatement, scope: Scope) {

}

export function BreakStatement(node: estree.BreakStatement, scope: Scope) {
  return BREAK
}

export function ContinueStatement(node: estree.ContinueStatement, scope: Scope) {
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
      const { name } = node.handler.param as estree.Identifier
      const subScope = new Scope(scope)
      subScope.const(name, err)

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
  const left = node.left as estree.VariableDeclaration
  const { name } = left.declarations[0].id as estree.Identifier

  for (const value in evaluate(node.right, scope)) {
    const subScope = new Scope(scope)
    scope[left.kind](name, value)

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
  const left = node.left as estree.VariableDeclaration
  const { name } = left.declarations[0].id as estree.Identifier

  for (const value of evaluate(node.right, scope)) {
    const subScope = new Scope(scope)
    scope[left.kind](name, value)

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
