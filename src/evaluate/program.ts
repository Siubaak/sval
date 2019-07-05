import * as estree from 'estree'
import Scope from '../scope'
import evaluate from '.'

export function* Program(program: estree.Program, scope: Scope) {
  let ret:any;
  for (let i = 0; i < program.body.length; i++) {
    ret = yield* evaluate(program.body[i], scope)
  }
  return ret;
}
