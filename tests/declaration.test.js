const Sval = require('../dist/index')

describe('testing src/index.ts', () => {
  it('should declare var normally', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      var a
      var a = 1
      var b = 2
      var b
      var c = 3
      var c
      var d = 3
      var d = undefined
      exports.a = a
      exports.b = b
      exports.c = c
      exports.d = d
    `)
    expect(interpreter.exports.a).toBe(1)
    expect(interpreter.exports.b).toBe(2)
    expect(interpreter.exports.c).toBe(3)
    expect(interpreter.exports.d).toBeUndefined()
  })
  it('should declare let normally', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      let a = 1
      exports.a = a
    `)
    expect(interpreter.exports.a).toBe(1)
  })
  it('should declare const normally', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      const a = 1
      exports.a = a
    `)
    expect(interpreter.exports.a).toBe(1)
  })
})