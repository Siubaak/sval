import Sval from '.'

const interpreter = new Sval()
interpreter.run(`
const i = [1, 2, 3]
console.log(i)
const g = [1, 2, ...i, 3, ...i]
console.log(g)
`)