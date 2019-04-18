const Sval = require('../dist/sval')

describe('testing src/index.ts', () => {
  it('should declare var normally', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      var a
      var a = 1
      var b = 2
      var b
      var c = 3
      var c = undefined
      exports.a = a
      exports.b = b
      exports.c = c
    `)
    expect(interpreter.exports.a).toBe(1)
    expect(interpreter.exports.b).toBe(2)
    expect(interpreter.exports.c).toBeUndefined()
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

  it('should declare var in global env normally', () => {  
    const interpreter = new Sval()
    interpreter.import({ expect })
    interpreter.run(`
      var a = 1

      expect(Object.getOwnPropertyDescriptor(window, 'a')).toEqual({
        value: 1,
        writable: true,
        enumerable: true,
        configurable: false
      })
      expect('a' in window).toBeTruthy()

      expect(window.a).toBe(1)
      try {
        delete window.a
      } catch (err) {
        expect(err).toBeInstanceOf(TypeError)
      }
      expect(window.a).toBe(1)
    `)
  })
})