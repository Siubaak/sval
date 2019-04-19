import * as estree from 'estree'
import Scope from '../scope'
import evaluate from '.'

export function* Program(program: estree.Program, scope: Scope) {
  for (let i = 0; i < program.body.length; i++) {
    yield* evaluate(program.body[i], scope)
  }
}
