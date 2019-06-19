import Sval from '.'

const i = new Sval()

i.run(`
class a {}
class b extends a {}
console.log(b)
`)