import Sval from '.'

const interpreter = new Sval()
interpreter.run(`
function a(b, ...c) {
    console.log(b, c)
}
a(1, 2, 3)
`)