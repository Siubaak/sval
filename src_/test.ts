import compile from './compile'
import execute from './jsvm'
import { parse } from 'acorn'
import State from './state'

console.time('s')
const ast: any = parse(`
for (var i = 0; i < 100000; i += 1) {
}
`)
const state = new State
compile(ast, state)
execute(state)
console.timeEnd('s')
