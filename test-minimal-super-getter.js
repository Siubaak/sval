import Sval from './dist/index.js'

console.log('=== Test: Minimal super getter ===')
const interpreter = new Sval()
interpreter.run(`
  class A {
    get g() {
      console.log('[A.g getter] this:', this)
      console.log('[A.g getter] this.k:', this.k)
      return this.k + 1
    }
  }

  class C extends A {
    constructor() {
      super()
      console.log('[C constructor] Setting this.k = 1')
      this.k = 1
      console.log('[C constructor] this.k is now:', this.k)
      console.log('[C constructor] About to access super.g')
      const val = super.g
      console.log('[C constructor] super.g returned:', val)
      exports.g = val
    }
  }

  new C()
`)
console.log('\nResult: exports.g =', interpreter.exports.g, '(expected: 2)')
