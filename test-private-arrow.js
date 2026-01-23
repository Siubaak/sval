import Sval from './dist/index.js'

console.log('=== Test: Static private field in arrow function ===')
const interpreter = new Sval()
interpreter.run(`
  class A {
    static f = 6
    static #g = this.f + 1
    static h = () => {
      console.log('[Arrow] this:', this)
      console.log('[Arrow] this.f:', this.f)
      console.log('[Arrow] this.__private_g:', this.__private_g)
      console.log('[Arrow] this.#g:', this.#g)
      console.log('[Arrow] Computing this.#g + 1')
      const result = this.#g + 1
      console.log('[Arrow] Result:', result)
      return result
    }
  }

  console.log('Before calling A.h():')
  console.log('A.f =', A.f)
  console.log('A.__private_g =', A.__private_g)
  console.log('Calling A.h()...')

  exports.result = A.h()
`)

console.log('Final result:', interpreter.exports.result, '(expected: 8)')
