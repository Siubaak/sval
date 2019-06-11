import Sval from '.'

const i = new Sval()

i.run(`
var a = { get b() { return 1 } }
console.log(a.b)
`)