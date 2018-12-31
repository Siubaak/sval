import Sval from '../src'

describe('testing src/index.ts', () => {
  it('should call expression run normally', () => {  
    const interpreter = new Sval()

    class A {
      private a: number = 0
      constructor() {
        this.a++
        console.log(this.a)
      }
      then() {
        this.a++
        console.log(this.a)
      }
    }

    interpreter.addModules({ A })
    interpreter.run(`
      new A().then()
    `)
  })
})
