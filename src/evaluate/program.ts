import * as estree from 'estree'
import Scope from '../scope'
import evaluate from './index'

export function Program(program: estree.Program, scope: Scope) {
  for (const node of program.body) {
    evaluate(node, scope)
  }
}
