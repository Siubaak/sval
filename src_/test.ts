import Sval from '.'

const interpreter = new Sval()
interpreter.run(`
const i = { a: 1 }
const j = { ...i, b: 2 }
console.log(j)
`)