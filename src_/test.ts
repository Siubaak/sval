import Sval from '.'

const interpreter = new Sval()
interpreter.run(`
console.log(...[1, 2, 3])
`)