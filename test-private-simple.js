import Sval from './dist/index.js'

console.log('=== Test: Simple private field access ===')
try {
  const interpreter = new Sval()
  interpreter.run(`
    class A {
      #x = 5
      getX() {
        console.log('this:', this)
        console.log('this.__private_x:', this.__private_x)
        return this.#x
      }
    }
    const a = new A()
    console.log('a.__private_x:', a.__private_x)
    exports.result = a.getX()
  `)
  console.log('Result:', interpreter.exports.result, '(expected: 5)')
} catch (e) {
  console.error('Error:', e.message)
  console.error(e.stack)
}

console.log('\n=== Test: Static private field ===')
try {
  const interpreter2 = new Sval()
  interpreter2.run(`
    class A {
      static #g = 7
      static getG() {
        console.log('In getG, this:', this)
        console.log('this.__private_g:', this.__private_g)
        return this.#g
      }
    }
    console.log('A.__private_g:', A.__private_g)
    exports.result = A.getG()
  `)
  console.log('Result:', interpreter2.exports.result, '(expected: 7)')
} catch (e) {
  console.error('Error:', e.message)
  console.error(e.stack)
}
