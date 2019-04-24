import Sval from '../src'

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

      function d() {
        return 'd1'
      }
      function d() {
        return 'd2'
      }

      var e = function() {
        return 'e'
      }

      var f = () => {
        return 'f'
      }

      {
        var h1 = 1
        var h1

        var h2
        var h2 = 2

        var h3 = function() {
          return 'h3'
        }

        var h4 = function() {
          return 'h4'
        }
      }

      exports.a = a
      exports.b = b
      exports.c = c
      exports.d = d
      exports.e = e
      exports.f = f
      exports.h1 = h1
      exports.h2 = h2
      exports.h3 = h3
      exports.h4 = h4
    `)
    expect(interpreter.exports.a).toBe(1)
    expect(interpreter.exports.b).toBe(2)
    expect(interpreter.exports.c).toBeUndefined()
    expect(interpreter.exports.d()).toBe('d2')
    expect(interpreter.exports.e()).toBe('e')
    expect(interpreter.exports.f()).toBe('f')
    expect(interpreter.exports.h1).toBe(1)
    expect(interpreter.exports.h2).toBe(2)
    expect(interpreter.exports.h3()).toBe('h3')
    expect(interpreter.exports.h4()).toBe('h4')
  })

  it('should declare let normally', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      let a = 1
      let b
      let c = function() {
        return 'c'
      }
      let d = () => {
        return 'd'
      }
      exports.a = a
      exports.b = b
      exports.c = c
      exports.d = d
    `)
    expect(interpreter.exports.a).toBe(1)
    expect(interpreter.exports.b).toBeUndefined()
    expect(interpreter.exports.c()).toBe('c')
    expect(interpreter.exports.d()).toBe('d')
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
      let err1
      try {
        delete window.a
      } catch (ex1) {
        err1 = ex1
      }

      expect(err1).toBeInstanceOf(TypeError)
      expect(window.a).toBe(1)

      expect('a' in this).toBeTruthy()
      let err2
      expect(this.a).toBe(1)
      try {
        delete this.a
      } catch (ex2) {
        err2 = ex2
      }

      expect(err2).toBeInstanceOf(TypeError)
    `)
  })

  it('should throw SyntaxError when declaring multiple times with `let`', () => {  
    const interpreter = new Sval()

    let err
    try {
      interpreter.run(`
        let a = 1
        let a = 2
      `)
    } catch (ex) {
      err = ex
    }

    expect(err).toBeInstanceOf(SyntaxError)
  })

  it('should throw SyntaxError when declaring multiple times with `const`', () => {  
    const interpreter = new Sval()

    let err
    try {
      interpreter.run(`
        const a = 1
        const a = 2
      `)
    } catch (ex) {
      err = ex
    }

    expect(err).toBeInstanceOf(SyntaxError)
  })

  it('should throw SyntaxError when declaring `const` without initializer', () => {  
    const interpreter = new Sval()

    let err
    try {
      interpreter.run(`
        const a
      `)
    } catch (ex) {
      err = ex
    }

    expect(err).toBeInstanceOf(SyntaxError)
  })

  it('should support declare variable with sequence', () => {  
    const interpreter = new Sval()

    interpreter.run(`
      var a = 1, b, c = function() { return 3 }
      let la = 1, lb, lc = function() { return 3 }
      const ca = 1, cb = function() { return 3 }

      exports.a = a
      exports.b = b
      exports.c = c
      exports.la = la
      exports.lb = lb
      exports.lc = lc
      exports.ca = ca
      exports.cb = cb
    `)

    expect(interpreter.exports.a).toBe(1)
    expect(interpreter.exports.b).toBeUndefined()
    expect(interpreter.exports.c()).toBe(3)

    expect(interpreter.exports.la).toBe(1)
    expect(interpreter.exports.lb).toBeUndefined()
    expect(interpreter.exports.lc()).toBe(3)

    expect(interpreter.exports.ca).toBe(1)
    expect(interpreter.exports.cb()).toBe(3)
  })

  it('should throw SyntaxError when const does not have initializer in sequence', () => {  
    const interpreter = new Sval()

    let err
    try {
      interpreter.run(`
        const ca = 1, cb, cc = function() { return 3 }

        exports.ca = ca
        exports.cb = cb
        exports.cc = cc
      `)
    } catch(ex) {
      err = ex
    }

    expect(err).toBeInstanceOf(SyntaxError)
  })

  it('should support nested variable definition within global + block', () => {  
    const interpreter = new Sval()

    interpreter.run(`
      let a = 5
      const b = 5
      var c = 5
      {
        let a = 6
        const b = 6
        var c = 6
        exports.innerA = a
        exports.innerB = b
        exports.innerC = c
      }
      
      exports.outerA = a
      exports.outerB = b
      exports.outerC = c
    `)

    expect(interpreter.exports.innerA).toBe(6)
    expect(interpreter.exports.outerA).toBe(5)
    expect(interpreter.exports.innerB).toBe(6)
    expect(interpreter.exports.outerB).toBe(5)
    expect(interpreter.exports.innerC).toBe(6)
    expect(interpreter.exports.outerC).toBe(6)
  })

  it('should support nested variable definition within global + function', () => {  
    const interpreter = new Sval()

    interpreter.run(`
      let a = 5
      const b = 5
      var c = 5; // ';' should be kept
      
      (function () {
        let a = 6
        const b = 6
        var c = 6
        exports.innerA = a
        exports.innerB = b
        exports.innerC = c
      })()

      exports.outerA = a
      exports.outerB = b
      exports.outerC = c
    `)

    expect(interpreter.exports.innerA).toBe(6)
    expect(interpreter.exports.outerA).toBe(5)
    expect(interpreter.exports.innerB).toBe(6)
    expect(interpreter.exports.outerB).toBe(5)
    expect(interpreter.exports.innerC).toBe(6)
    expect(interpreter.exports.outerC).toBe(5)
  })

  it('should support self executing function', () => {  
    const interpreter = new Sval()

    interpreter.run(`
      (function x() {
        exports.func = x
      })()

      exports.exist = typeof x === 'undefined'
    `)

    // does't exist outside
    expect(interpreter.exports.exist).toBeTruthy()

    // can be visited in function itself
    expect(typeof interpreter.exports.func).toBe('function')
  })
})