import Sval from '../src'

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
    expect((window as any).a).toBe(1)
    expect((window as any).b).toBeUndefined()
    expect((window as any).c).toBeUndefined()
    delete (window as any).i
    delete (window as any).a
    // delete (window as any).b
    // delete (window as any).c
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
    expect((window as any).a).toBe(1)
    expect((window as any).b).toBeUndefined()
    expect((window as any).c).toBe(1)
    delete (window as any).a
    // delete (window as any).b
    delete (window as any).c
  })
  it('should hoist var normally in patterns', () => {  
    const interpreter = new Sval()
    const code = `
      a
      b
      c
      d
      e
      f
      g
      var { a } = { a: 1 }
      var { u: b } = { u: 1 }
      var [c] = [1]
      var [...d] = [1, 2]
      var { v: { w: e } } = { v: { w: 1 } }
      var { x: [e] } = { x: [1] }
      var { x: [...f] } = { x: [1, 2] }
      var { ...g } = { a: 1, b: 2 }
    `
    interpreter.run(code)
  })
  it('should hoist const and let and simulate temporal dead zone', () => {  
    const interpreter = new Sval()
    try {
      interpreter.run(`
        const a = 1
        {
          a
          const a = 2
          a
        }
      `)
    } catch (err) {
      expect(err).toBeInstanceOf(ReferenceError)
    }
    try {
      interpreter.run(`
        let b = 1
        {
          b
          let b = 2
          b
        }
      `)
    } catch (err) {
      expect(err).toBeInstanceOf(ReferenceError)
    }
  })
})
