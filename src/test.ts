import Sval from '.'

const interpreter = new Sval()
interpreter.run(`
class A {
  constructor() {
    this.b = 1
  }
  p() {
    this.b++
  }
  get k() {
    return this.b + 1
  }
  set g(a) {
    this.b = a
  }
}
exports.inst = new A()
exports.inst.g = 3
exports.inst.p()
`)

console.log(interpreter.exports.inst)
