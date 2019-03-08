import Sval from '../src'

describe('testing src/index.ts', () => {
  it('should parse object pattern normally', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      const { a, b } = { a: 1, b: 2 }
    `)
  })
  it('should parse assign pattern normally', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      const [a, b] = [1, 2]
    `)
  })
  it('should parse array pattern normally', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      let a = 1, b = 2;
      [a, b] = [b, a]
    `)
  })
  it('should parse assign pattern normally', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      const [...b] = [1, 2]
    `)
  })
})
