import Sval from '.'

const i = new Sval()

i.run(`
let b = 0
function a(c) {
  return function () {
    console.log(b + c)
  }
}
const j = a(2)
j()
b = 2
j()
`)