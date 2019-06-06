import compile from './compile'
import execute from './jsvm'
import { parse } from 'acorn'
import State from './state'
import { OP } from './share/const';

const ast: any = parse(`
for (var i = 0; i < 100; ++i) {
  var j = i
}
`)
const state = new State
compile(ast, state)
for (let i = 0; i < state.opCodes.length; i++) {
  const opCode = state.opCodes[i]
  console.log((OP as any)[opCode.op], opCode.val)
}
execute(state)
console.log(state.context)
