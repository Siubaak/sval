import Sval from '../src'

describe('testing src/index.ts', () => {
  it('should hoist function normally', () => {  
    const interpreter = new Sval({ ecmaVer: 6 })
    interpreter.run('const a = 1; console.log(`a: ${a}`)')
  })
})
