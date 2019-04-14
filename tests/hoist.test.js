const Sval = require('../dist/index')

describe('testing src/index.ts', () => {
  it('should hoist function normally', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      a
      function a() {}
    `)
  })
  it('should hoist function normally in block', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      {
        a
        function a() {}
      }
    `)

    try {
      interpreter.run(`
        a
      `)
    } catch (err) {
      // ReferenceError: a is not defined
      expect(err).toBeInstanceOf(ReferenceError)
    }

    try {
      interpreter.run(`
        b
        {
          function b() {}
        }
      `)
    } catch (err) {
      // ReferenceError: b is not defined
      expect(err).toBeInstanceOf(ReferenceError)
    }
  })
  it('should hoist function normally in function', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      {
        a()
        a()
        function a() {
          function b() {}
        }
      }
    `)
  })
  it('should hoist var normally', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      a
      var a = 1
    `)
  })
  it('should hoist var normally in block', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      a
      {
        var a = 1
      }
    `)
  })
  it('should hoist var normally in while', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      a
      var i = 1
      while (i--) {
        var a = 1
      }
    `)
  })
  it('should hoist var normally in do-while', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      a
      var i = 1
      do {
        var a = 1
      } while (--i)
    `)
  })
  it('should hoist var normally in for', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      a
      for (var i = 0; i < 1; i++) {
        var a = 1
      }
    `)
  })
  it('should hoist var normally in for-in', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      a
      for (var i in [0]) {
        var a = 1
      }
    `)
  })
  it('should hoist var normally in switch', () => {  
    const interpreter = new Sval({ sandBox: false })
    interpreter.run(`
      a
      b
      c
      var i = 1
      switch (i) {
        case 1:
          var a = 1
          break
        case 2: {
          var b = 1
          break
        }
        default:
          var c = 1
      }
    `)
    expect(window.a).toBe(1)
    expect(window.b).toBeUndefined()
    expect(window.c).toBeUndefined()
    delete window.i
    delete window.a
    delete window.b
    delete window.c
  })
  it('should hoist var normally in try-catch', () => {  
    const interpreter = new Sval({ sandBox: false })
    interpreter.run(`
      a
      b
      c
      try {
        var a = 1
      } catch (e) {
        var b = 1
      } finally {
        var c = 1
      }
    `)
    expect(window.a).toBe(1)
    expect(window.b).toBeUndefined()
    expect(window.c).toBe(1)
    delete window.a
    delete window.b
    delete window.c
  })
  it('should hoist var normally in destructure', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      a
      b
      c
      d
      e
      f
      var { a } = { a: 1 }
      var { u: b } = { u: 1 }
      var [c] = [1]
      var [...d] = [1, 2]
      var { v: { w: e } } = { v: { w: 1 } }
      var { x: [e] } = { x: [1] }
      var { x: [...f] } = { x: [1, 2] }
    `)
  })
})
