import Sval from '.'

const interpreter = new Sval()
interpreter.run(`
var a = 1

console.log(Object.getOwnPropertyDescriptor(window, 'a'))
console.log('a' in window)

console.log(window.a)
// let err1
// try {
//   delete window.a
// } catch (ex1) {
//   err1 = ex1
// }

// expect(err1).toBeInstanceOf(TypeError)
// expect(window.a).toBe(1)

// expect('a' in this).toBeTruthy()
// let err2
// expect(this.a).toBe(1)
// try {
//   delete this.a
// } catch (ex2) {
//   err2 = ex2
// }

// expect(err2).toBeInstanceOf(TypeError)
`)