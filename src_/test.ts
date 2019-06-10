import Sval from '.'

const i = new Sval()

i.run(`
var i = console.log
function a(b) {
  i(b)
}
a(2)
var k = 3
a(3)
`)