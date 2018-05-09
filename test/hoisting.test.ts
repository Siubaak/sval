import Sval from '../src'

describe('testing src/index.ts', () => {
  it('should hoisting function normally', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      a()
      function a() {}
    `)
  })
  it('should hoisting var normally', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      a
      var a = 1
    `)
  })
  it('should hoisting var normally in block', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      a
      {
        var a = 1
      }
    `)
  })
  it('should hoisting var normally in while', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      a
      var i = 1
      while (i--) {
        var a = 1
      }
    `)
  })
  it('should hoisting var normally in do-while', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      a
      var i = 1
      do {
        var a = 1
      } while (--i)
    `)
  })
  it('should hoisting var normally in for', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      a
      for (var i = 0; i < 1; i++) {
        var a = 1
      }
    `)
  })
  it('should hoisting var normally in for-in', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      a
      for (var i in [0]) {
        var a = 1
      }
    `)
  })
  it('should hoisting var normally in switch', () => {  
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
    delete (window as any).b
    delete (window as any).c
  })
  it('should hoisting var normally in try-catch', () => {  
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
      console.log(a)
      console.log(b)
      console.log(c)
    `)
    expect((window as any).a).toBe(1)
    expect((window as any).b).toBeUndefined()
    expect((window as any).c).toBe(1)
    delete (window as any).a
    delete (window as any).b
    delete (window as any).c
    console.log(window['e'])
  })
})