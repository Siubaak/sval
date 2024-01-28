import Sval from '../src'

describe('testing src/index.ts', () => {
  it('should excute function normally', () => {  
    const interpreter = new Sval()
    interpreter.run('!function(){exports.a=1}()')
    expect(interpreter.exports.a).toBe(1)
  })
  it('should get function inside by its name', () => {
    const interpreter = new Sval()
    interpreter.run(`
      const a = function b() { exports.x = a === b }
      a()
    `)

    expect(interpreter.exports.x).toBeTruthy()
  })
  it('should redeclare param inside function by var', () => {
    const interpreter = new Sval()
    interpreter.run(`
      a(1)
      function a(b) {
        var b = b + 1
        exports.b = b
      }
    `)

    expect(interpreter.exports.b).toBe(2)
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
  it('should excute async function normally 2', done => {  
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
    function getItem(n: any) {
      return new Promise(resolve => setTimeout(resolve, 5, n))
    }
  })

  it('should excute async function with params', done => {  
    const interpreter = new Sval()
    interpreter.import({ getItem, expect, done })
    interpreter.run(`
      a([1, 2, 3], [1, 2, 3])
      async function a(input, expected) {
        const res = []
        for (const i of input) {
          res.push(await getItem(i))
        }
        expect(res).toEqual(expected)
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
    function getItem(n: any) {
      return new Promise(resolve => setTimeout(resolve, 5, n))
    }
  })

  it('should support async generator with throwing error', (done) => {  
    const interpreter = new Sval()
    interpreter.import({ getItem, expect, done })
    interpreter.run(`
      const res = []
      async function* a() {
        for (const i of [1, 2, 3, 4]) {
          res.push(yield await getItem(i))
        }
      }
      const g = a()
      g.next()
      g.next(2)
      g.return(4)
      g.next(6)
      g.throw(8).catch((e) => {
        expect(res).toEqual([2])
        expect(e).toEqual(8)
        done()
      })
    `)
    function getItem(n: any) {
      return new Promise(resolve => setTimeout(resolve, 5, n))
    }
  })

  it('should support async generator with throwing error in generator', (done) => {  
    const interpreter = new Sval()
    interpreter.import({ getItem, expect, done })
    interpreter.run(`
      const res = []
      let visited = false
      async function* a() {
        for (const i of [1, 2, 3, 4]) {
          res.push(yield await getItem(i))
        }
      }
      const g = a()
      g.next()
      g.next(2)
      g.next(4)
      g.next(6).catch((e) => {
        visited = true

        expect(res).toEqual([2, 4, 6])
        expect(e).toEqual(4) // here the return value is 4, from generator it self
      })
      g.next(8).catch((e) => {
        // should never come here
        expect(false).toBeTruthy()
      })

      // simulate done action
      setTimeout(() => {
        expect(visited).toBeTruthy()
        done()
      }, 60)
    `)
    function getItem(n: any) {
      if (n === 4) throw 4 // throw error when doing next
      return new Promise(resolve => setTimeout(resolve, 5, n))
    }
  })

  it('should throw Error when using arrow function as constructor', () => {
    const interpreter = new Sval()
    try {
      interpreter.run(`
        const ArrowFunc = () => {}

        new ArrowFunc()
      `)
    } catch (ex) {
      expect(ex).toBeInstanceOf(TypeError)
    }
  })

  it('should throw TypeError when using arrow function as constructor', () => {
    const interpreter = new Sval()
    let error = null
    try {
      interpreter.run(`
        const ArrowFunc = () => {}

        new ArrowFunc()
      `)
    } catch (ex) {
      error = ex
    }

    expect(error).toBeInstanceOf(TypeError)
  })

  it('should throw TypeError when using non-function as constructor', () => {
    const interpreter = new Sval()
    let error = null
    try {
      interpreter.run(`
        const NonFunc = {}

        new NonFunc()
      `)
    } catch (ex) {
      error = ex
    }

    expect(error).toBeInstanceOf(TypeError)
    error = null

    try {
      // to raise coverage
      interpreter.run(`
        const obj = {}
        obj.x = { o: obj }
        new {a: obj}
      `)
    } catch (ex) {
      error = ex
    }

    expect(error).toBeInstanceOf(TypeError)
  })

  it('should throw TypeError when calling non-function', () => {
    const interpreter = new Sval()
    let error = null
    try {
      interpreter.run(`
        const nonFunc = {}

        nonFunc()
      `)
    } catch (ex) {
      error = ex
    }
    expect(error).toBeInstanceOf(TypeError)

    error = null
    try {
      interpreter.run(`
        const nonFunc2 = {}
        const x = {
          func: nonFunc2
        }

        x.func()
      `)
    } catch (ex) {
      error = ex
    }
    expect(error).toBeInstanceOf(TypeError)

    error = null
    try {
      interpreter.run(`
        const nonFunc3 = {}
        nonFunc3.self = nonFunc3
        const getFunc = () => nonFunc3

        getFunc()()
      `)
    } catch (ex) {
      error = ex
    }
    expect(error).toBeInstanceOf(TypeError)
  })
  // https://github.com/Siubaak/sval/issues/94
  it('should accept function destructured parameters', () => {  
    const interpreter = new Sval()
    interpreter.import({ expect })
    interpreter.run(`
    expect((([a, b, c]) => a + b + c)([1, 2, 3])).toEqual(6)
    expect((([a, [b, { c }]]) => a + b + c)([1, [2, { c: 3 }]])).toEqual(6)
    expect((({ b, c: [, e] }) => b + e)({ a: 1, b: 2, c: [3, 4] })).toEqual(6)
    `)
  })
})
