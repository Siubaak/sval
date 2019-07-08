import Sval from '.'

const interpreter = new Sval()
interpreter.run(`
let { a, b, c: { d } } = { a: 1, b: 2, c: { d: 3 } }
console.log(a, b, d)
`)