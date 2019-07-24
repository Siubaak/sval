import Sval from '.'

const interpreter = new Sval()
interpreter.run(`
const [a, ...g] = [1]
console.log(a, g)
`)