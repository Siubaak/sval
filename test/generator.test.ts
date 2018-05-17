import Sval from '../src'

describe('testing src/index.ts', () => {
  it('should hoist function normally', () => {  
    const interpreter = new Sval({ ecmaVer: 6 })
    interpreter.run(`
      function* a() {
        yield console.log(1)
        yield console.log(2)
        yield console.log(3)
      }
      const j = a()
      j.next()
      console.log(4)
      j.next()
      console.log(5)
      j.next()
    `)
  })
})
