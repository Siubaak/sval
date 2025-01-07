import { BREAK, CONTINUE, RETURN, AWAIT } from '../share/const'
import { hoist, pattern, ForXHandler } from './helper'
import { getAsyncIterator } from '../share/util'
import * as acorn from 'acorn'
import Scope from '../scope'
import evaluate from '.'

export function* ExpressionStatement(node: acorn.ExpressionStatement, scope: Scope) {
  yield* evaluate(node.expression, scope)
}

export interface LabelOptions {
  label?: string
}

export interface BlockOptions {
  invasived?: boolean
  hoisted?: boolean
}

export function* BlockStatement(
  block: acorn.BlockStatement | acorn.StaticBlock,
  scope: Scope,
  options: BlockOptions & LabelOptions = {},
) {
  const {
    invasived = false,
    hoisted = false,
  } = options

  const subScope = invasived ? scope : new Scope(scope)

  if (!hoisted) {
    yield* hoist(block, subScope, { onlyBlock: true })
  }

  for (let i = 0; i < block.body.length; i++) {
    const result = yield* evaluate(block.body[i], subScope)
    if (result === BREAK) {
      if (result.LABEL && result.LABEL === options.label) {
        // only labeled break to current block statement doesn't bubble up the result
        break
      }
      return result
    }
    if (result === CONTINUE || result === RETURN) {
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

export function* ReturnStatement(node: acorn.ReturnStatement, scope: Scope) {
  RETURN.RES = node.argument ? (yield* evaluate(node.argument, scope)) : undefined
  return RETURN
}

export function* BreakStatement(node: acorn.BreakStatement) {
  BREAK.LABEL = node.label?.name
  return BREAK
}

export function* ContinueStatement(node: acorn.ContinueStatement) {
  CONTINUE.LABEL = node.label?.name
  return CONTINUE
}

export function* LabeledStatement(node: acorn.LabeledStatement, scope: Scope) {
  const label = node.label.name
  if (node.body.type === 'WhileStatement') {
    return yield* WhileStatement(node.body, scope, { label })
  }
  if (node.body.type === 'DoWhileStatement') {
    return yield* DoWhileStatement(node.body, scope, { label })
  }
  if (node.body.type === 'ForStatement') {
    return yield* ForStatement(node.body, scope, { label })
  }
  if (node.body.type === 'ForInStatement') {
    return yield* ForInStatement(node.body, scope, { label })
  }
  if (node.body.type === 'ForOfStatement') {
    return yield* ForOfStatement(node.body, scope, { label })
  }
  if (node.body.type === 'BlockStatement') {
    return yield* BlockStatement(node.body, scope, { label })
  }
  if (node.body.type === 'WithStatement') {
    return yield* WithStatement(node.body, scope, { label })
  }
  if (node.body.type === 'IfStatement') {
    return yield* IfStatement(node.body, scope, { label })
  }
  if (node.body.type === 'SwitchStatement') {
    return yield* SwitchStatement(node.body, scope, { label })
  }
  if (node.body.type === 'TryStatement') {
    return yield* TryStatement(node.body, scope, { label })
  }
  throw new SyntaxError(`${node.body.type} cannot be labeled`)
}

export function* WithStatement(node: acorn.WithStatement, scope: Scope, options: LabelOptions = {}) {
  const withScope = new Scope(scope)
  withScope.with(yield* evaluate(node.object, scope))
  const result = yield* evaluate(node.body, withScope)
  if (result === BREAK) {
    if (result.LABEL && result.LABEL === options.label) {
      // only labeled break to current with statement doesn't bubble up the result
      return;
    }
    return result
  }
  if (result === CONTINUE || result === RETURN) {
    return result
  }
}

export function* IfStatement(node: acorn.IfStatement, scope: Scope, options: LabelOptions = {}) {
  const result = yield* evaluate(node.test, scope)
    ? yield* evaluate(node.consequent, scope)
    : yield* evaluate(node.alternate, scope)

  if (result === BREAK) {
    if (result.LABEL && result.LABEL === options.label) {
      // only labeled break to current if statement doesn't bubble up the result
      return;
    }
    return result
  }
  if (result === CONTINUE || result === RETURN) {
    return result
  }
}

export function* SwitchStatement(node: acorn.SwitchStatement, scope: Scope, options: LabelOptions = {}) {
  const discriminant = yield* evaluate(node.discriminant, scope)
  let matched = false
  for (let i = 0; i < node.cases.length; i++) {
    const eachCase = node.cases[i]
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
      if (result === BREAK) {
        if (result.LABEL === options.label) {
          break
        }
        return result
      }
      if (result === CONTINUE || result === RETURN) {
        return result
      }
    }
  }
}

export function* SwitchCase(node: acorn.SwitchCase, scope: Scope) {
  for (let i = 0; i < node.consequent.length; i++) {
    const result = yield* evaluate(node.consequent[i], scope)
    if (result === BREAK || result === CONTINUE || result === RETURN) {
      return result
    }
  }
}

export function* ThrowStatement(node: acorn.ThrowStatement, scope: Scope) {
  throw yield* evaluate(node.argument, scope)
}

export function* TryStatement(node: acorn.TryStatement, scope: Scope, options: LabelOptions = {}) {
  let result;

  try {
    result = yield* BlockStatement(node.block, scope)
  } catch (err) {
    if (node.handler) {
      const subScope = new Scope(scope)
      const param = node.handler.param
      if (param) {
        if (param.type === 'Identifier') {
          const name = param.name
          subScope.var(name, err)
        } else {
          yield* pattern(param, scope, { feed: err })
        }
      }
      result = yield* CatchClause(node.handler, subScope)
    } else {
      throw err
    }
  } finally {
    if (node.finalizer) {
      result = yield* BlockStatement(node.finalizer, scope)
    }
  }

  if (result === BREAK) {
    if (result.LABEL && result.LABEL === options.label) {
      // only labeled break to current try statement doesn't bubble up the result
      return;
    }
    return result
  }
  if (result === CONTINUE || result === RETURN) {
    return result
  }
}

export function* CatchClause(node: acorn.CatchClause, scope: Scope) {
  return yield* BlockStatement(node.body, scope, { invasived: true })
}

export function* WhileStatement(node: acorn.WhileStatement, scope: Scope, options: LabelOptions = {}) {
  while (yield* evaluate(node.test, scope)) {
    const result = yield* evaluate(node.body, scope)
    if (result === BREAK) {
      if (result.LABEL === options.label) {
        break
      }
      return result
    } else if (result === CONTINUE) {
      if (result.LABEL === options.label) {
        continue
      }
      return result
    } else if (result === RETURN) {
      return result
    }
  }
}

export function* DoWhileStatement(node: acorn.DoWhileStatement, scope: Scope, options: LabelOptions = {}) {
  do {
    const result = yield* evaluate(node.body, scope)
    if (result === BREAK) {
      if (result.LABEL === options.label) {
        break
      }
      return result
    } else if (result === CONTINUE) {
      if (result.LABEL === options.label) {
        continue
      }
      return result
    } else if (result === RETURN) {
      return result
    }
  } while (yield* evaluate(node.test, scope))
}

export function* ForStatement(node: acorn.ForStatement, scope: Scope, options: LabelOptions = {}) {
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
      if (result.LABEL === options.label) {
        break
      }
      return result
    } else if (result === CONTINUE) {
      if (result.LABEL === options.label) {
        continue
      }
      return result
    } else if (result === RETURN) {
      return result
    }
  }
}

export function* ForInStatement(node: acorn.ForInStatement, scope: Scope, options: LabelOptions = {}) {
  for (const value in yield* evaluate(node.right, scope)) {
    const result = yield* ForXHandler(node, scope, { value })
    if (result === BREAK) {
      if (result.LABEL === options.label) {
        break
      }
      return result
    } else if (result === CONTINUE) {
      if (result.LABEL === options.label) {
        continue
      }
      return result
    } else if (result === RETURN) {
      return result
    }
  }
}

export function* ForOfStatement(node: acorn.ForOfStatement, scope: Scope, options: LabelOptions = {}): any {
  const right = yield* evaluate(node.right, scope)
  /*<remove>*/
  if (node.await) {
    const iterator = getAsyncIterator(right)
    let ret: any
    for (
      AWAIT.RES = iterator.next(), ret = yield AWAIT;
      !ret.done;
      AWAIT.RES = iterator.next(), ret = yield AWAIT
    ) {
      const result = yield* ForXHandler(node, scope, { value: ret.value })
      if (result === BREAK) {
        if (result.LABEL === options.label) {
          break
        }
        return result
      } else if (result === CONTINUE) {
        if (result.LABEL === options.label) {
          continue
        }
        return result
      } else if (result === RETURN) {
        return result
      }
    }
  } else {
  /*</remove>*/
    for (const value of right) {
      const result = yield* ForXHandler(node, scope, { value })
      if (result === BREAK) {
        if (result.LABEL === options.label) {
          break
        }
        return result
      } else if (result === CONTINUE) {
        if (result.LABEL === options.label) {
          continue
        }
        return result
      } else if (result === RETURN) {
        return result
      }
    }
  /*<remove>*/
  }
  /*</remove>*/
}
