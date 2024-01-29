import * as acorn from 'acorn'
import Scope from '../scope'
import evaluate from '.'

export function* Program(program: acorn.Program, scope: Scope) {
  for (let i = 0; i < program.body.length; i++) {
    yield* evaluate(program.body[i], scope)
  }
}
