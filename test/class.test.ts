import Sval from '../src'

describe('testing src/index.ts', () => {
  it('should hoist function normally', () => {
    const interpreter = new Sval({ ecmaVer: 6 })
    interpreter.run(`
      class a {
        constructor() {
            this.b = 1
        }
        con() {
          return this.b
        }
        get k() {
            return this.b + 1
        }
        set g(a) { this.b = a }
      }
      const k = new a()
      console.log(k.k)
      k.g = 3
      console.log(k.b)
      console.log(k.k)
    `)
  })
  it('should hoist function normally', () => {
    const interpreter = new Sval({ ecmaVer: 6 })
    interpreter.run(`
      class a {
        get g() {
          return this.k + 1
        }
      }
      class b extends a { }
      class c extends b {
        constructor() {
          super()
          this.k = 1
          console.log(super.g)
        }
      }
      const k = new c()
    `)
  })
  it('should hoist function normally', () => {
    const interpreter = new Sval({ ecmaVer: 6 })
    interpreter.run(`
      class a {
        set g(val) {
          this.k = val
        }
      }
      class b extends a { }
      class c extends b {
        constructor() {
          super()
          super.g = 1
        }
      }
      const k = new c()
      console.log(k.k)
    `)
  })
})
