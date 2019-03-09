import Sval from '../src'

describe('testing src/index.ts', () => {
  it('should call expression run normally', () => {  
    const interpreter = new Sval()

    class A {
      private a: number = 0
      constructor() {
        this.a++
      }
      then() {
        this.a++
        return this
      }
    }

    interpreter.import({ A })
    interpreter.run(`
      exports.inst = new A().then()
    `)

    expect(interpreter.exports.inst.a).toBe(2)
  })
})
