import Sval from '../src'

describe('testing src/index.ts', () => {
  it('should call expression run normally', () => {  
    const interpreter = new Sval()

    class A {
      a = 1
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
  it('should parse spread element normally', () => {  
    const interpreter = new Sval()

    interpreter.run(`
      const arr = [1, 2]
      exports.a = [...arr]
      exports.b = [...[1, 2, 3]]
      
      f(...arr)
      function f(m, n) {
        exports.c = m
        exports.d = n
      }
    `)

    expect(interpreter.exports.a).toEqual([1, 2])
    expect(interpreter.exports.b).toEqual([1, 2, 3])
    expect(interpreter.exports.c).toBe(1)
    expect(interpreter.exports.d).toBe(2)
  })
  it('should parse regular expression normally', () => {  
    const interpreter = new Sval()
    interpreter.import({ expect })
    interpreter.run(`
      const re = /\\/\\*<([^>]+?)>\\*\\/([\\s\\S]*?)\\/\\*<\\/([^>]+?)>\\*\\//g
      exports.a = '/*<add>*//*hello*//*</add>*/ /*<add>*//*world*//*</add>*/'
        .replace(re, (_, start, content, end) => {
          expect(start).toBe('add')
          expect(end).toBe('add')
          return content.match(/\\/\\*([\\s\\S]*)\\*\\//)[1]
        })
    `)
    expect(interpreter.exports.a).toBe('hello world')
  })
})
