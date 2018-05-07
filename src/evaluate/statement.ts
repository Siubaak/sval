import * as estree from 'estree'
import Scope from '../scope'
import evaluate from './index'
import { BREAK, CONTINUE, RETURN } from '../share/const'

// es5
export function ExpressionStatement(node: estree.ExpressionStatement, scope: Scope) {
  evaluate(node.expression, scope)
}

export function BlockStatement(block: estree.BlockStatement, scope: Scope) {
  const subScope = scope.invasived ? scope : new Scope('block', scope)
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
  const subScope = new Scope('switch', scope)
  let matched = false
  for (const eachCase of node.cases) {
    if (
      !matched
      && (
        !eachCase.test  // default
        || evaluate(eachCase.test, subScope) === discriminant
      )
    ) {
      matched = true
    }
    if (matched) {
      const result = SwitchCase(eachCase, subScope)
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
    return evaluate(node.block, scope)
  } catch (err) {
    if (node.handler) {
      const { name } = node.handler.param as estree.Identifier
      const subScope = new Scope('block', scope)
      subScope.invasive()
      subScope.const(name, err)
      return evaluate(node.handler, subScope)
    } else {
      throw err
    }
  } finally {
    if (node.finalizer) {
      return evaluate(node.finalizer, scope)
    }
  }
}

export function CatchClause(node: estree.CatchClause, scope: Scope) {
  return evaluate(node.body, scope)
}

export function WhileStatement(node: estree.WhileStatement, scope: Scope) {
  while (evaluate(node.test, scope)) {
    const subScope = new Scope('loop', scope)
    subScope.invasive()
    const result = evaluate(node.body, subScope)

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
    const subScope = new Scope('loop', scope)
    subScope.invasive()
    const result = evaluate(node.body, subScope)

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
  const subScope = new Scope('loop', scope)
  
  for (
    evaluate(node.init, subScope);
    node.test ? evaluate(node.test, subScope) : true;
    evaluate(node.update, subScope)
  ) {
    const result = evaluate(node.body, subScope)

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
    const subScope = new Scope('loop', scope)
    subScope.invasive()
    scope[left.kind](name, value)
    const result = evaluate(node.body, subScope)

    if (result === BREAK) {
      break
    } else if (result === CONTINUE) {
      continue
    } else if (result === RETURN) {
      return result
    }
  }
}

// es6
