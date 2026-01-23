import Sval from './dist/index.js'

console.log('=== Test: Simple static field ===')
const interpreter = new Sval()
interpreter.run(`
  class A {
    static f = 6
  }
  console.log('A.f =', A.f)
  exports.f = A.f
`)
console.log('Result: exports.f =', interpreter.exports.f)
console.log('Expected: 6')
