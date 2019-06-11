import * as estree from 'estree'
import State from '../state'
import compile from '../compile'
import { OP, OpCode } from '../share/const'

export function ExpressionStatement(node: estree.ExpressionStatement, state: State) {
  compile(node.expression, state)
}

export function BlockStatement(node: estree.BlockStatement, state: State) {
  state.symbols.pushScope()
  for (let i = 0; i < node.body.length; i++) {
    compile(node.body[i], state)
  }
  state.symbols.popScope()
}

export function EmptyStatement() { /* No operation here */ }

export function DebuggerStatement() {
}

export function ReturnStatement(node: estree.ReturnStatement, state: State) {
  compile(node.argument, state)
  state.opCodes.push({ op: OP.RET })
}

export function BreakStatement() {
}

export function ContinueStatement() {
}

export function IfStatement(node: estree.IfStatement, state: State) {
  compile(node.test, state)
  const ifCode: OpCode = { op: OP.IFJMP, val: -1 }
  state.opCodes.push(ifCode)
  compile(node.alternate, state)
  const elseCode: OpCode = { op: OP.JMP, val: -1 }
  state.opCodes.push(elseCode)
  ifCode.val = state.opCodes.length // if true, jump to consequent
  compile(node.consequent, state)
  elseCode.val = state.opCodes.length // if false, jump to alternate
}

export function SwitchStatement(node: estree.SwitchStatement, state: State) {
}

export function SwitchCase(node: estree.SwitchCase, state: State) {
}

export function ThrowStatement(node: estree.ThrowStatement, state: State) {
}

export function TryStatement(node: estree.TryStatement, state: State) {
}

export function CatchClause(node: estree.CatchClause, state: State) {
}

export function WhileStatement(node: estree.WhileStatement, state: State) {
}

export function DoWhileStatement(node: estree.DoWhileStatement, state: State) {
}

export function ForStatement(node: estree.ForStatement, state: State) {
  compile(node.init, state)
  const testPc = state.opCodes.length
  compile(node.test, state)
  state.opCodes.push({ op: OP.IFJMP, val: state.opCodes.length + 2 })
  const breakCode: OpCode = { op: OP.JMP, val: -1 }
  state.opCodes.push(breakCode)

  compile(node.body, state)
  compile(node.update, state)
  state.opCodes.push({ op: OP.JMP, val: testPc })
  breakCode.val = state.opCodes.length // if false, break
}

export function ForInStatement(node: estree.ForInStatement, state: State) {
}

export function ForOfStatement(node: estree.ForOfStatement, state: State) {
}