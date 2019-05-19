import * as estree from 'estree'
import State from '../state'
import compile from '../compile'
import { OP } from '../share/const'

export function ExpressionStatement(node: estree.ExpressionStatement, state: State) {
  compile(node.expression, state)
}

export function BlockStatement(node: estree.BlockStatement, state: State) {
  for (let i = 0; i < node.body.length; i++) {
    compile(node.body[i], state)
  }
}

export function IfStatement(node: estree.IfStatement, state: State) {
  compile(node.test, state)
  const ifCode: any = { op: OP.IFJMP }
  state.opCodes.push(ifCode)
  compile(node.alternate, state)
  const elseCode: any = { op: OP.JMP }
  state.opCodes.push(elseCode)
  ifCode.val = state.opCodes.length // if true, jump to consequent
  compile(node.consequent, state)
  elseCode.val = state.opCodes.length // if false, jump to alternate
}

export function ForStatement(node: estree.ForStatement, state: State) {
  compile(node.init, state)
  const testPc = state.opCodes.length
  compile(node.test, state)
  state.opCodes.push({ op: OP.IFJMP, val: state.opCodes.length + 2 })
  const breakCode: any = { op: OP.JMP }
  state.opCodes.push(breakCode)

  compile(node.body, state)
  compile(node.update, state)
  state.opCodes.push({ op: OP.JMP, val: testPc })
  breakCode.val = state.opCodes.length // if false, break
}