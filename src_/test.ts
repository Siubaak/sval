import Sval from '.'

const interpreter = new Sval()
interpreter.run(`
let a,b,c
console.log([a,b,c] = [1,2,3,4])
`)