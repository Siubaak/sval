const Sval = require('../dist/sval')

describe('testing src/index.ts', () => {
  it('should for statement run normally', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      for (let i = 0; i < 5; i++) {
        let r = i
      }
    `)
  })
  it('should for-in statement run normally', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      exports.a = []
      for (const i in [1, 2, 3]) {
        exports.a.push(i)
      }
    `)
    expect(interpreter.exports.a).toEqual(['0', '1', '2'])
  })
  it('should for-of statement run normally', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      exports.a = []
      for (const i of [1, 2, 3]) {
        exports.a.push(i)
      }
    `)
    expect(interpreter.exports.a).toEqual([1, 2, 3])
  })
  it('should for-await-of statement run normally', done => {  
    const interpreter = new Sval()
    interpreter.import({ getItem, expect, done })
    interpreter.run(`
      b()
      async function* a() {
        for (const i of [1, 2, 3]) {
          yield await getItem(i)
        }
      }
      async function b() {
        const res = []
        for await (const i of a()) {
          res.push(i)
        }
        expect(res).toEqual([1, 2, 3])
        done()
      }
    `)
    function getItem(n) {
      return new Promise(resolve => setTimeout(resolve, 5, n))
    }
  })
  
  it('should try statement run normally', () => {  
    const interpreter = new Sval({ ecmaVer: 10 })
    interpreter.run(`
      try {
        throw 1
      } catch (a) {
        exports.a = a
      }
      try {
        throw 1
      } catch {
        exports.b = 2
      }
    `)
    expect(interpreter.exports.a).toBe(1)
    expect(interpreter.exports.b).toBe(2)
  })
})
