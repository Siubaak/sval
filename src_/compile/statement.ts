import * as estree from 'estree'
import State from '../state'
import compile from '.'
import { OP } from '../share/const'

export function ExpressionStatement(node: estree.ExpressionStatement, state: State) {
  compile(node.expression, state)
}

export function BlockStatement(node: estree.BlockStatement, state: State) {
  state.symbols.pushScope()
  for (let i = 0; i < node.body.length; i++) compile(node.body[i], state)
  state.symbols.popScope()
}

export function EmptyStatement() { /* no operation here */ }

export function DebuggerStatement(node: estree.DebuggerStatement, state: State) {
  state.opCodes.push({ op: OP.DBG })
}

export function ReturnStatement(node: estree.ReturnStatement, state: State) {
  if (node.argument) {
    compile(node.argument, state)
  } else {
    state.opCodes.push({ op: OP.LOADK }) // load undefined into stack
  }
  state.opCodes.push({ op: OP.RET })
}

export function BreakStatement(node: estree.BreakStatement, state: State) {
  state.opCodes.push({ op: OP.BRK, val: node.label })
}

export function ContinueStatement(node: estree.ContinueStatement, state: State) {
  state.opCodes.push({ op: OP.CONTI, val: node.label })
}

export function IfStatement(node: estree.IfStatement, state: State) {
  compile(node.test, state)
  const ifnotCode = { op: OP.IFNOT, val: -1 }
  state.opCodes.push(ifnotCode)
  // if true
  compile(node.consequent, state)
  const trueEndCode = { op: OP.JMP, val: -1 }
  state.opCodes.push(trueEndCode)
  ifnotCode.val = state.opCodes.length
  // else
  compile(node.alternate, state)
  trueEndCode.val = state.opCodes.length
}

export function SwitchStatement(node: estree.SwitchStatement, state: State) {
  compile(node.discriminant, state)
  const cases = node.cases
  let jumpCode: { op: OP, val: any }
  for (let i = 0; i < cases.length; i++) {
    const eachCase = cases[i]
    // test
    compile(eachCase.test, state)
    const caseCode = { op: OP.CSNE, val: -1 }
    state.opCodes.push(caseCode)
    if (i !== 0) {
      jumpCode.val = state.opCodes.length
    }
    // switch cases
    for (let i = 0; i < eachCase.consequent.length; i++) {
      compile(eachCase.consequent[i], state)
    }
    if (i !== cases.length - 1) {
      jumpCode = { op: OP.JMP, val: -1 }
      state.opCodes.push(jumpCode)
    }
    // fill up end position
    caseCode.val = state.opCodes.length
  }
}

export function ThrowStatement(node: estree.ThrowStatement, state: State) {
  compile(node.argument, state)
  state.opCodes.push({ op: OP.THROW })
}

export function TryStatement(node: estree.TryStatement, state: State) {
}

export function CatchClause(node: estree.CatchClause, state: State) {
}

export function WhileStatement(node: estree.WhileStatement, state: State) {
  const testPc = state.opCodes.length
  compile(node.test, state)
  const ifnotCode = { op: OP.IFNOT, val: -1 }
  state.opCodes.push(ifnotCode)
  // while true, run body
  compile(node.body, state)
  // jump back to test
  state.opCodes.push({ op: OP.JMP, val: testPc })
  ifnotCode.val = state.opCodes.length
}

export function DoWhileStatement(node: estree.DoWhileStatement, state: State) {
  // do run body first
  const bodyPc = state.opCodes.length
  compile(node.body, state)
  // then test, while true, jump back to run body again
  compile(node.test, state)
  state.opCodes.push({ op: OP.IF, val: bodyPc })
}

export function ForStatement(node: estree.ForStatement, state: State) {
  // init first
  compile(node.init, state)
  // then test
  const testPc = state.opCodes.length
  compile(node.test, state)
  const ifnotCode = { op: OP.IFNOT, val: -1 }
  state.opCodes.push(ifnotCode)
  // if true, run body
  compile(node.body,  state)
  // finally update
  compile(node.update, state)
  // jump back to test
  state.opCodes.push({ op: OP.JMP, val: testPc })
  ifnotCode.val = state.opCodes.length
}

export function ForInStatement(node: estree.ForInStatement, state: State) {
}

export function ForOfStatement(node: estree.ForOfStatement, state: State) {
}