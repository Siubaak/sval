import Sval from '.'

const interpreter = new Sval()
interpreter.run(`
class A {
  set g(v) {
    this.k = v
  }
}
class B extends A { }
class C extends B {
  constructor() {
    super()
    this.k = 1
    super.g = 3
  }

  set g(v) {
    this.k = v + 1
  }
}
console.log(new C())
`)

// console.log(interpreter.exports)
