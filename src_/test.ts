import Sval from '.'

const interpreter = new Sval()
interpreter.run(`
class a {
  constructor(x) {
    this.x = x
  }
}
console.log(new a(2))
`)