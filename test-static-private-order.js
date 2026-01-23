import Sval from './dist/index.js'

console.log('=== Test: Static private field initialization order ===')
const interpreter = new Sval()
interpreter.run(`
  class A {
    static f = 6
    static #g = (() => {
      console.log('[During #g init] this:', this)
      console.log('[During #g init] this.f:', this.f)
      const val = this.f + 1
      console.log('[During #g init] Computed value:', val)
      return val
    })()
  }

  console.log('After class creation:')
  console.log('A.f =', A.f)
  console.log('A.__private_g =', A.__private_g)

  exports.f = A.f
  exports.g = A.__private_g
`)

console.log('\nExported values:')
console.log('f:', interpreter.exports.f, '(expected: 6)')
console.log('g:', interpreter.exports.g, '(expected: 7)')
