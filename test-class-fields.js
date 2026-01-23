import Sval from './dist/index.js'

console.log('=== Test 1: Simple public instance field ===')
try {
  const interpreter1 = new Sval()
  interpreter1.run(`
    class A {
      x = 1
    }
    const a = new A()
    exports.x = a.x
  `)
  console.log('a.x =', interpreter1.exports.x, '(expected: 1)')
} catch (e) {
  console.error('Error:', e.message)
}

console.log('\n=== Test 2: Simple static field ===')
try {
  const interpreter2 = new Sval()
  interpreter2.run(`
    class A {
      static f = 6
    }
    exports.f = A.f
  `)
  console.log('A.f =', interpreter2.exports.f, '(expected: 6)')
} catch (e) {
  console.error('Error:', e.message)
}

console.log('\n=== Test 3: Field with this reference ===')
try {
  const interpreter3 = new Sval()
  interpreter3.run(`
    class A {
      a = 1
      c = this.a + 2
    }
    const inst = new A()
    exports.c = inst.c
  `)
  console.log('inst.c =', interpreter3.exports.c, '(expected: 3)')
} catch (e) {
  console.error('Error:', e.message)
}
