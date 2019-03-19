import Sval from '../src'

describe('testing src/index.ts', () => {
  it('should for statement run normally', () => {  
    const interpreter = new Sval()
    interpreter.run(`
      for (let i = 0; i < 5; i++) {
        let r = i
      }
    `)
  })
})
