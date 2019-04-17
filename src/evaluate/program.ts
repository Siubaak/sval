import * as estree from 'estree'
import Scope from '../scope'
import evaluate from '.'

export function* Program(program: estree.Program, scope: Scope) {
  for (const index in program.body) {
    yield* evaluate(program.body[index], scope)
  }
}
