import Sval from '../src'

describe('testing src/index.ts', () => {
  it('should excute async function normally', done => {  
    const interpreter = new Sval({ ecmaVer: 8 })
    interpreter.import({ Promise })
    interpreter.run(`
      async function a() {
        const res = []
        for (const i of [1, 2, 3]) {
          res.push(await i)
        }
        return res
      }
      exports.res = a()
    `)
    interpreter.exports.res.then(res => {
      expect(res).toEqual([1, 2, 3])
      done()
    })
  })
  it('should excute async function normally', done => {  
    const interpreter = new Sval({ ecmaVer: 8 })
    interpreter.import({ Promise, getItem })
    interpreter.run(`
      async function a() {
        const res = []
        for (const i of [1, 2, 3]) {
          res.push(await getItem(i))
        }
        return res
      }
      exports.res = a()
    `)
    interpreter.exports.res.then(res => {
      expect(res).toEqual([1, 2, 3])
      done()
    })
    function getItem(n: number) {
      return new Promise(resolve => setTimeout(resolve, 5, n))
    }
  })
})
