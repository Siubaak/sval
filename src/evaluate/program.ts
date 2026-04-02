import * as acorn from 'acorn'
import Scope from '../scope/index.ts'
import { STRICT } from '../share/const.ts'
import evaluate from './index.ts'

export function* Program(program: acorn.Program, scope: Scope) {
  // Check for 'use strict' directive prologue
  for (let i = 0; i < program.body.length; i++) {
    const stmt = program.body[i]
    if (stmt.type === 'ExpressionStatement' && (stmt as any).directive) {
      if ((stmt as any).directive === 'use strict' && !scope.find(STRICT)) {
        scope.const(STRICT, true)
      }
    } else {
      break
    }
  }

  for (let i = 0; i < program.body.length; i++) {
    yield* evaluate(program.body[i], scope)
  }
}
