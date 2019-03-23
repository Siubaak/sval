import Sval from '../src'

describe('testing src/index.ts', () => {
  it('should parse object pattern normally', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      const { a, b } = { a: 1, b: 2 }
      exports.a = a
      exports.b = b
    `)
    expect(interpreter.exports.a).toEqual(1)
    expect(interpreter.exports.b).toEqual(2)
  })
  it('should parse assign pattern normally', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      const [a, b] = [1, 2]
      exports.a = a
      exports.b = b
    `)
    expect(interpreter.exports.a).toEqual(1)
    expect(interpreter.exports.b).toEqual(2)
  })
  it('should parse array pattern normally', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      let a = 1, b = 2;
      [a, b] = [b, a]
      exports.a = a
      exports.b = b
    `)
    expect(interpreter.exports.a).toEqual(2)
    expect(interpreter.exports.b).toEqual(1)
  })
  it('should parse rest element normally', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      const [...b] = [1, 2]
      exports.b = b
    `)
    expect(interpreter.exports.b).toEqual([1, 2])
  })
  it('should parse rest element of function params normally', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      a(1, 2)
      c(1, 2, 3)
      function a(...b) {
        exports.b = b
      }
      function c(d, ...e) {
        exports.e = e
      }
    `)
    expect(interpreter.exports.b).toEqual([1, 2])
    expect(interpreter.exports.e).toEqual([2, 3])
  })
})
