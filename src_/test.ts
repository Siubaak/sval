import Sval from '.'

const i = new Sval()

i.run(`
const j = function () {console.log(this)}
j.call([0,1])
`)