import Sval from '.'

const interpreter = new Sval()
interpreter.run(`
const { a = 1, b } = { b: 2 }
console.log(a, b)
`)