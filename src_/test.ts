import Sval from '.'

const interpreter = new Sval()
interpreter.run(`
class a {
  constructor(x) {
    this.x = x
  }
  static k() {
    console.log('a')
  }
  b() {
    console.log(this.x)
  }
}
const j = new a(2)
console.log(a.k)
`)