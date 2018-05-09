import Sval from '../src'

const interpreter = new Sval()

describe('testing src/index.ts', () => {
  it('should true', () => {
    interpreter.run(`
      b()
      function b() {

      }
      
      k
      {
        var k = 1
      }

      j
      for (var l = 0; l < 1; l++) {
        var j = 1
      }
    `)
  })
})