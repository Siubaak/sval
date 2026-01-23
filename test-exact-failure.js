import Sval from './dist/index.js'

console.log('=== Test: Exact scenario from failing test ===')
const interpreter = new Sval()
interpreter.run(`
  class A {
    static f = 6
    static #g = this.f + 1
    static h = () => this.#g + 1
  }

  console.log('A.f =', A.f)
  console.log('A.__private_g =', A.__private_g)
  console.log('typeof A.h =', typeof A.h)

  console.log('Calling A.h()...')
  const result = A.h()
  console.log('A.h() returned:', result)

  exports.result = result
`)

console.log('\nFinal result:', interpreter.exports.result, '(expected: 8)')
