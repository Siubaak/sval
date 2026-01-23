import Sval from './dist/index.js'

console.log('=== Test: Simple private instance field ===')
const interpreter = new Sval()
interpreter.run(`
  class A {
    #b = 2
    test() {
      console.log('this:', this)
      console.log('this.__private_b:', this.__private_b)
      console.log('this.#b:', this.#b)
      return this.#b
    }
  }

  const a = new A()
  console.log('a.__private_b:', a.__private_b)
  const result = a.test()
  console.log('result:', result)
  exports.result = result
`)

console.log('Final result:', interpreter.exports.result, '(expected: 2)')
