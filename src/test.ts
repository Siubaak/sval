import Sval from '.'

const interpreter = new Sval()
interpreter.run(`
class A {
  get g() {
    return this.k + 1
  }
}
class B extends A { }
class C extends B {
  constructor() {
    super()
    this.k = 1
    exports.g = super.g
  }
}
new C()
`)

// console.log(interprete)
