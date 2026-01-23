import Sval from './dist/index.js'

console.log('=== Test 1: Extend Set with no constructor ===')
try {
  const interpreter1 = new Sval()
  interpreter1.run(`
    class D extends Set { }
    const d = new D()
    console.log('d instanceof Set:', d instanceof Set)
    console.log('d instanceof D:', d instanceof D)
    d.add(1)
    d.add(2)
    d.add(1)
    console.log('d.size:', d.size)
    exports.size = d.size
  `)
  console.log('Result: size =', interpreter1.exports.size, '(expected: 2)\n')
} catch (e) {
  console.error('Error:', e.message, '\n')
}

console.log('=== Test 2: Extend Set with constructor ===')
try {
  const interpreter2 = new Sval()
  interpreter2.run(`
    class E extends Set {
      constructor(arr) {
        console.log('[E constructor] arr:', arr)
        super(arr)
        console.log('[E constructor] After super(), this:', this)
        console.log('[E constructor] this.size:', this.size)
        this.h = arr
        console.log('[E constructor] Set this.h =', arr)
      }
    }
    console.log('Creating new E([1, 1, 1])...')
    const e = new E([1, 1, 1])
    console.log('e.size:', e.size)
    console.log('e.h:', e.h)
    exports.size = e.size
    exports.h = e.h
  `)
  console.log('Result: size =', interpreter2.exports.size, '(expected: 1)')
  console.log('Result: h =', interpreter2.exports.h, '(expected: [1,1,1])')
} catch (e) {
  console.error('Error:', e.message)
  console.error(e.stack)
}
