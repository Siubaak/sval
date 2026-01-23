import Sval from './dist/index.js'

console.log('=== Test: Minimal private field ===')
try {
  const interpreter = new Sval()
  interpreter.run(`
    class A {
      #b = 2
    }
    const a = new A()
    console.log('Created instance successfully')
    console.log('a.__private_b:', a.__private_b)
    exports.result = a.__private_b
  `)
  console.log('Result:', interpreter.exports.result, '(expected: 2)')
} catch (e) {
  console.error('Error:', e.message)
  console.error(e.stack)
}
