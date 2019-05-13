import compile from './compile'
import { parse } from 'acorn'
import State from './state'

const ast = parse(`
1 > 2
`)

console.log(ast)

const state = new State()

compile(ast as any, state)

console.log(state)