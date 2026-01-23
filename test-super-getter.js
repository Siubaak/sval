import Sval from './dist/index.js'

console.log('=== Test: Super property access ===')
const interpreter = new Sval()
interpreter.run(`
  class A {
    get g() {
      console.log('[getter] this:', this)
      console.log('[getter] this.k:', this.k)
      const result = this.k + 1
      console.log('[getter] returning:', result)
      return result
    }
  }
  class B extends A { }
  class C extends B {
    constructor() {
      console.log('[C constructor] Before super()')
      super()
      console.log('[C constructor] After super()')
      this.k = 1
      console.log('[C constructor] Set this.k = 1')
      console.log('[C constructor] Accessing super.g...')
      const val = super.g
      console.log('[C constructor] super.g returned:', val)
      exports.g = val
    }
  }
  console.log('Creating new C()...')
  new C()
  console.log('Done')
`)
console.log('\nResult: exports.g =', interpreter.exports.g, '(expected: 2)')
