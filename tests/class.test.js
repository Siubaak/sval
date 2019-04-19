const Sval = require('../dist/sval')

describe('testing src/index.ts', () => {
  it('should create class normally', () => {
    const interpreter = new Sval()
    interpreter.run(`
      class A {
        constructor() {
          this.b = 1
        }
        p() {
          this.b++
        }
        get k() {
          return this.b + 1
        }
        set g(a) {
          this.b = a
        }
      }
      exports.inst = new A()
      exports.inst.g = 3
      exports.inst.p()
    `)
    expect(interpreter.exports.inst.b).toBe(4)
    expect(interpreter.exports.inst.k).toBe(5)
  })
  it('should extend class normally', () => {
    const interpreter = new Sval()
    interpreter.run(`
      class A {
        get g() {
          return this.k + 1
        }
      }
      class B extends A { }
      class C extends B {
        constructor() {
          super()
          this.k = 1
          exports.g = super.g
        }
      }
      new C()
    `)
    expect(interpreter.exports.g).toBe(2)
  })
  it('should get base class normally', () => {
    const interpreter = new Sval()
    interpreter.run(`
      class A {
        set g(val) {
          this.k = val
        }
      }
      class B extends A { }
      class C extends B {
        constructor() {
          super()
          super.g = 1
        }
      }
      const k = new C()
      exports.k = k.k
    `)
    expect(interpreter.exports.k).toBe(1)
  })
  it('should call base class method normally', () => {
    const interpreter = new Sval()
    interpreter.run(`
      class A {
        assign() {
          exports.a = 1
        }
      }
    
      class B extends A {
        assign() {
          super.assign()
          exports.b = 2
        }
      }
    
      const a = new B()
      a.assign()
    `)
    expect(interpreter.exports.a).toBe(1)
    expect(interpreter.exports.b).toBe(2)
  })
})
