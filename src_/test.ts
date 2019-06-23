import Sval from '.'

const interpreter = new Sval()
interpreter.run(`
function a(a, b) {
  console.log(a, b)
}
a()
`)