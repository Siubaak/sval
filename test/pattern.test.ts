import Sval from '../src'

describe('testing src/index.ts', () => {
  it('should hoist function normally', () => {  
    const interpreter = new Sval({ ecmaVer: 6 })
    interpreter.run(`
      const { a, b } = { a: 1, b: 2 }
    `)
  })
  it('should hoist function normally', () => {  
    const interpreter = new Sval({ ecmaVer: 6 })
    interpreter.run(`
      const [a, b] = [1, 2]
    `)
  })
  it('should hoist function normally', () => {  
    const interpreter = new Sval({ ecmaVer: 6 })
    interpreter.run(`
      let a = 1, b = 2;
      [a, b] = [b, a]
    `)
  })
  it('should hoist function normally', () => {  
    const interpreter = new Sval({ ecmaVer: 6 })
    interpreter.run(`
      const [...b] = [1, 2]
    `)
  })
})
