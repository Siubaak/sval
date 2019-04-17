import { BREAK, CONTINUE, RETURN, AWAIT } from '../share/const'
import { hoistFunc, pattern, ForXHandler } from './helper'
import { getIterator } from '../share/util'
import * as estree from 'estree'
import Scope from '../scope'
import evaluate from '.'

export function* ExpressionStatement(node: estree.ExpressionStatement, scope: Scope) {
  yield* evaluate(node.expression, scope)
}

export interface BlockOptions {
  invasived?: boolean
  hoisted?: boolean
}

export function* BlockStatement(
  block: estree.BlockStatement,
  scope: Scope,
  options: BlockOptions = {},
) {
  const {
    invasived = false,
    hoisted = false,
  } = options

  const subScope = invasived ? scope : new Scope(scope)

  if (!hoisted) {
    yield* hoistFunc(block, subScope)
  }

  for (const index in block.body) {
    const result = yield* evaluate(block.body[index], subScope)
    if (result === BREAK || result === CONTINUE || result === RETURN) {
      return result
    }
  }
}

export function* EmptyStatement(): IterableIterator<any> {
  // No operation here
}

export function* DebuggerStatement(): IterableIterator<any> {
  debugger
}

export function* ReturnStatement(node: estree.ReturnStatement, scope: Scope) {
  RETURN.RES = node.argument ? (yield* evaluate(node.argument, scope)) : undefined
  return RETURN
}

export function* BreakStatement() {
  return BREAK
}

export function* ContinueStatement() {
  return CONTINUE
}

export function* IfStatement(node: estree.IfStatement, scope: Scope) {
  if (yield* evaluate(node.test, scope)) {
    return yield* evaluate(node.consequent, scope)
  } else {
    return yield* evaluate(node.alternate, scope)
  }
}

export function* SwitchStatement(node: estree.SwitchStatement, scope: Scope) {
  const discriminant = yield* evaluate(node.discriminant, scope)
  let matched = false
  for (const index in node.cases) {
    const eachCase = node.cases[index]
    if (
      !matched
      && (
        !eachCase.test  // default
        || (yield* evaluate(eachCase.test, scope)) === discriminant
      )
    ) {
      matched = true
    }
    if (matched) {
      const result = yield* SwitchCase(eachCase, scope)
      if (result === BREAK || result === CONTINUE || result === RETURN) {
        return result
      }
    }
  }
}

export function* SwitchCase(node: estree.SwitchCase, scope: Scope) {
  for (const index in node.consequent) {
    const result = yield* evaluate(node.consequent[index], scope)
    if (result === BREAK || result === CONTINUE || result === RETURN) {
      return result
    }
  }
}

export function* ThrowStatement(node: estree.ThrowStatement, scope: Scope) {
  throw yield* evaluate(node.argument, scope)
}

export function* TryStatement(node: estree.TryStatement, scope: Scope) {
  try {
    return yield* BlockStatement(node.block, scope)
  } catch (err) {
    if (node.handler) {
      const subScope = new Scope(scope)
      const param = node.handler.param
      if (param) {
        if (param.type === 'Identifier') {
          const name = param.name
          subScope.let(name, err)
        } else {
          yield* pattern(param, scope, { feed: err })
        }
      }
      return yield* CatchClause(node.handler, subScope)
    } else {
      throw err
    }
  } finally {
    if (node.finalizer) {
      return yield* BlockStatement(node.finalizer, scope)
    }
  }
}

export function* CatchClause(node: estree.CatchClause, scope: Scope) {
  return yield* BlockStatement(node.body, scope, { invasived: true })
}

export function* WhileStatement(node: estree.WhileStatement, scope: Scope) {
  while (yield* evaluate(node.test, scope)) {
    const result = yield* evaluate(node.body, scope)

    if (result === BREAK) {
      break
    } else if (result === CONTINUE) {
      continue
    } else if (result === RETURN) {
      return result
    }
  }
}

export function* DoWhileStatement(node: estree.DoWhileStatement, scope: Scope) {
  do {
    const result = yield* evaluate(node.body, scope)

    if (result === BREAK) {
      break
    } else if (result === CONTINUE) {
      continue
    } else if (result === RETURN) {
      return result
    }
  } while (yield* evaluate(node.test, scope))
}

export function* ForStatement(node: estree.ForStatement, scope: Scope) {
  const forScope = new Scope(scope)
  
  for (
    yield* evaluate(node.init, forScope);
    node.test ? (yield* evaluate(node.test, forScope)) : true;
    yield* evaluate(node.update, forScope)
  ) {
    const subScope = new Scope(forScope)
    let result: any
    if (node.body.type === 'BlockStatement') {
      result = yield* BlockStatement(node.body, subScope, { invasived: true })
    } else {
      result = yield* evaluate(node.body, subScope)
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

export function* ForInStatement(node: estree.ForInStatement, scope: Scope) {
  for (const value in yield* evaluate(node.right, scope)) {
    const result = yield* ForXHandler(node, scope, { value })
    if (result === BREAK) {
      break
    } else if (result === CONTINUE) {
      continue
    } else if (result === RETURN) {
      return result
    }
  }
}

export function* ForOfStatement(node: estree.ForOfStatement, scope: Scope) {
  const right = yield* evaluate(node.right, scope)
  /*<remove>*/
  if ((node as any).await) {
    const iterator = getIterator(right)
    let ret: any
    for (
      AWAIT.RES = iterator.next(), ret = yield AWAIT;
      !ret.done;
      AWAIT.RES = iterator.next(), ret = yield AWAIT
    ) {
      const result = yield* ForXHandler(node, scope, { value: ret.value })
      if (result === BREAK) {
        break
      } else if (result === CONTINUE) {
        continue
      } else if (result === RETURN) {
        return result
      }
    }
  } else {
  /*</remove>*/
    for (const value of right) {
      const result = yield* ForXHandler(node, scope, { value })
      if (result === BREAK) {
        break
      } else if (result === CONTINUE) {
        continue
      } else if (result === RETURN) {
        return result
      }
    }
  /*<remove>*/
  }
  /*</remove>*/
}
