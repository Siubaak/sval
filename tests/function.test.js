const Sval = require('../dist/sval')

describe('testing src/index.ts', () => {
  it('should excute function normally', () => {  
    const interpreter = new Sval()
    interpreter.run('!function(){exports.a=1}()')
    expect(interpreter.exports.a).toBe(1)
  })

  it('should yield generator normally', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      function* a() {
        for (const i of [1, 2, 3]) {
          yield i
        }
      }
      const f = a()
      let result = f.next()
      exports.res = []
      while (!result.done) {
        exports.res.push(result.value)
        result = f.next()
      }
    `)
    expect(interpreter.exports.res).toEqual([1, 2, 3])
  })
  it('should proxy generator normally', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      function* a() {
        yield* [1, 2, 3]
      }
      const f = a()
      let result = f.next()
      exports.res = []
      while (!result.done) {
        exports.res.push(result.value)
        result = f.next()
      }
    `)
    expect(interpreter.exports.res).toEqual([1, 2, 3])
  })

  it('should excute async function normally', done => {  
    const interpreter = new Sval()
    interpreter.import({ expect, done })
    interpreter.run(`
      a()
      async function a() {
        const res = []
        for (const i of [1, 2, 3]) {
          res.push(await i)
        }
        expect(res).toEqual([1, 2, 3])
        done()
      }
    `)
  })
  it('should excute async function normally', done => {  
    const interpreter = new Sval()
    interpreter.import({ getItem, expect, done })
    interpreter.run(`
      a()
      async function a() {
        const res = []
        for (const i of [1, 2, 3]) {
          res.push(await getItem(i))
        }
        expect(res).toEqual([1, 2, 3])
        done()
      }
    `)
    function getItem(n) {
      return new Promise(resolve => setTimeout(resolve, 5, n))
    }
  })

  it('should excute async generator normally', done => {  
    const interpreter = new Sval()
    interpreter.import({ getItem, expect, done })
    interpreter.run(`
      const res = []
      async function* a() {
        for (const i of [1, 2, 3]) {
          res.push(yield await getItem(i))
        }
      }
      const g = a()
      g.next()
      g.next(2)
      g.next(4)
      g.next(6).then(() => {
        expect(res).toEqual([2, 4, 6])
        done()
      })
    `)
    function getItem(n) {
      return new Promise(resolve => setTimeout(resolve, 5, n))
    }
  })
})
