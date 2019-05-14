import compile from './compile'
import { parse } from 'acorn'
import State from './state'
import { OP } from './share/const'
import execute from './jsvm'

console.time('s')
const ast = parse('for(var i=0;i<100000;i+=1){}')
const state = new State()
compile(ast as any, state)
execute(state)
console.timeEnd('s')

for (let i = 0; i < state.opCodes.length; i++) {
  console.log(i, OP[state.opCodes[i].op], state.opCodes[i].val)
}
console.log(state.context)