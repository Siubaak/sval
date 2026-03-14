import { describe, it, expect } from 'vitest'
import Sval from '../src'

describe('testing statement', () => {
  it('should for statement run normally', () => {
    const interpreter = new Sval()
    interpreter.run(`
      for (let i = 0; i < 5; i++) {
        let r = i
      }
    `)
  })

  it('should for statement without initializer run normally', () => {
    const interpreter = new Sval()
    interpreter.run(`
      let i = 0
      for (; i < 5; i++) {
        let r = i
      }
      exports.result = i
    `)
    expect(interpreter.exports.result).toBe(5)
  })

  it('should break statement in switch run normally', () => {
    const interpreter = new Sval()
    interpreter.run(`
      exports.a = 0
      while (exports.a < 10) {
        exports.a++
        switch (2) {
          case 2: break
        }
      }
    `)
    expect(interpreter.exports.a).toEqual(10)
  })

  it('should switch with default before matching case run normally', () => {
    const interpreter = new Sval()
    interpreter.run(`
      const variant = "secondary"
      switch (variant) {
        case "primary":
        default:
          exports.a = "primary"
          break
        case "secondary":
          exports.a = "secondary"
          break
      }
    `)
    expect(interpreter.exports.a).toEqual("secondary")
  })

  it('should switch fall through from default when no case matches', () => {
    const interpreter = new Sval()
    interpreter.run(`
      switch ("none") {
        case "a":
          exports.a = "a"
          break
        default:
          exports.a = "default"
        case "b":
          exports.a = "default+b"
          break
      }
    `)
    expect(interpreter.exports.a).toEqual("default+b")
  })

  it('should for-in statement run normally', () => {
    const interpreter = new Sval()
    interpreter.run(`
      exports.a = []
      for (const i in [1, 2, 3]) {
        exports.a.push(i)
      }
    `)
    expect(interpreter.exports.a).toEqual(['0', '1', '2'])
  })

  it('should for-of statement run normally', () => {
    const interpreter = new Sval()
    interpreter.run(`
      exports.a = []
      for (const i of [1, 2, 3]) {
        exports.a.push(i)
      }
    `)
    expect(interpreter.exports.a).toEqual([1, 2, 3])
  })

  it('should for-await-of statement run normally', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ getItem, expect, done })
      interpreter.run(`
        b()
        async function* a() {
          for (const i of [1, 2, 3]) {
            yield await getItem(i)
          }
        }
        async function b() {
          const res = []
          for await (const i of a()) {
            res.push(i)
          }
          expect(res).toEqual([1, 2, 3])
          done()
        }
      `)
      function getItem(n: any) {
        return new Promise(resolve => setTimeout(resolve, 5, n))
      }
    })
  })

  it('should for-await-of with manual iterator run normally', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        c()
        function makeIterator(array) {
          var nextIndex = 0
          return {
            next: function() {
              return nextIndex < array.length ?
                { value: array[nextIndex++], done: false } :
                { value: undefined, done: true }
            }
          }
        }

        async function c() {
          const res = []
          for await (const i of makeIterator([1,2,3,4])) {
            res.push(i)
          }
          expect(res).toEqual([1, 2, 3, 4])
          done()
        }
      `)
    })
  })

  it('should support for-await-of with sync iterables', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        (async function run() {
          const res = []
          for await (const i of 'xyz') {
            res.push(i)
          }

          for await (const i of ['a', 'b', 'c']) {
            res.push(i)
          }

          for await (const i of { 0: 1, 1: 2, 2: 3, length: 3 }) {
            res.push(i)
          }

          for await (const i of new Set([4, 5, 6])) {
            res.push(i)
          }

          expect(res).toEqual(['x', 'y', 'z', 'a', 'b', 'c', 1, 2, 3, 4, 5, 6])
          done()
        })()
      `)
    })
  })

  it('should support for-await-of with sync iterator', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        const iterable = {
          [Symbol.iterator]() {
            return {
              i: 0,
              next() {
                if (this.i < 3) {
                  return ({ value: this.i++, done: false })
                }
        
                return ({ done: true })
              }
            }
          }
        }; // ';' should be kept
        (async function() {
          const res = []
          for await (let num of iterable) {
            res.push(num)
          }

          expect(res).toEqual([0, 1, 2])
          done()
        })()
      `)
    })
  })

  it('should support for-await-of with async iterator', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        const asyncIterable = {
          [Symbol.asyncIterator]() {
            return {
              i: 0,
              next() {
                if (this.i < 3) {
                  return Promise.resolve({ value: this.i++, done: false })
                }
        
                return Promise.resolve({ done: true })
              }
            }
          }
        }; // ';' should be kept
        (async function() {
          const res = []
          for await (let num of asyncIterable) {
            res.push(num)
          }

          expect(res).toEqual([0, 1, 2])

          done()
        })()
      `)
    })
  })

  it('should support for-await-of with async generator', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function* asyncGenerator() {
          var i = 0
          while (i < 3) {
            yield i++
          }
        }
        
        (async function() {
          const res = []
          for await (let num of asyncGenerator()) {
            res.push(num)
          }

          expect(res).toEqual([0, 1, 2])
          done()
        })()
      `)
    })
  })

  it('should try statement run normally', () => {
    const interpreter = new Sval({ ecmaVer: 10 })
    interpreter.run(`
      try {
        throw 1
      } catch (err) {
        exports.a = err
      }
      try {
        throw 1
      } catch {
        exports.b = 2
      }
      exports.c = c()
      function c() {
        try {
          return 1
        } catch {
          return 2
        } finally {
          return 3
        }
      }
      for (const i of [4, 5, 6]) {
        try {
          exports.d = i
          continue
        } finally {
          break
        }
      }
    `)
    expect(interpreter.exports.a).toBe(1)
    expect(interpreter.exports.b).toBe(2)
    expect(interpreter.exports.c).toBe(3)
    expect(interpreter.exports.d).toBe(4)
  })

  it('should with statement run normally', () => {
    const interpreter = new Sval({ ecmaVer: 10 })
    interpreter.run(`
      let x = 0
      const a = {
        get b() { return x },
        set b(v) { x = v }
      }
      with (a) {
        exports.a = b
        b++
        exports.b = b
        exports.c = x
      }
      try {
        exports.d = b
      } catch (err) {
        if (err instanceof ReferenceError) {
          exports.d = true
        }
      }
    `)
    expect(interpreter.exports.a).toBe(0)
    expect(interpreter.exports.b).toBe(1)
    expect(interpreter.exports.c).toBe(1)
    expect(interpreter.exports.d).toBeTruthy()
  })

  it('should with statement run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval({ ecmaVer: 10 })
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let x = 0
          const a = {
            get b() { return x },
            set b(v) { x = v }
          }
          with (a) {
            exports.a = b
            b++
            exports.b = b
            exports.c = x
          }
          try {
            exports.d = b
          } catch (err) {
            if (err instanceof ReferenceError) {
              exports.d = true
            }
          }
          expect(exports.a).toBe(0)
          expect(exports.b).toBe(1)
          expect(exports.c).toBe(1)
          expect(exports.d).toBeTruthy()
          done()
        }
        run()
      `)
    })
  })

  it('should labeled loop statement and continue/break run normally', () => {
    const interpreter = new Sval({ ecmaVer: 10 })
    interpreter.run(`
      let x = 0
      a: while (x < 5) {
        if (x) {
          x++
          break
        }
        do {
          b: for (; x < 5;) {
            x++
            for (const a of [0, 1, 2, 3, 4]) {
              break b
            }
          }
          x++
          continue a
        } while (x < 5)
      }
      exports.a = x
    `)
    expect(interpreter.exports.a).toBe(3)
  })

  // it('should labeled loop statement and continue/break run normally in async function', () => {
  //   return new Promise((done) => {
  //     const interpreter = new Sval({ ecmaVer: 10 })
  //     interpreter.import({ expect, done })
  //     interpreter.run(`
  //       async function run() {
  //         let x = 0
  //         a: while (x < 5) {
  //           if (x) {
  //             x++
  //             break
  //           }
  //           do {
  //             b: for (; x < 5;) {
  //               x++
  //               for (const a of [0, 1, 2, 3, 4]) {
  //                 break b
  //               }
  //             }
  //             x++
  //             continue a
  //           } while (x < 5)
  //         }
  //         exports.a = x
  //         expect(exports.a).toBe(3)
  //         done()
  //       }
  //       run()
  //     `)
  //   })
  // })

  it('should labeled statement and break run normally', () => {
    const interpreter = new Sval({ ecmaVer: 10 })
    interpreter.run(`
      let x = 0
      a: {
        x++
        break a
        x++
      }
      exports.a = x

      b: if (true) {
        x++
        break b
        x++
      }
      exports.b = x

      c: with (window) {
        x++
        break c
        x++
      }
      exports.c = x

      d: switch (true) {
        case true:
          for (;x < 10;) {
            x++
            break d
          }
        default: x++
      }
      exports.d = x

      e: try {
        x++
        break e
        x++
      } catch {}
      exports.e = x

      f: try {
        throw false
      } catch {
        x++
        break f
        x++
      }
      exports.f = x

      g: try {} finally {
        x++
        break g
        x++
      }
      exports.g = x
    `)
    expect(interpreter.exports.a).toBe(1)
    expect(interpreter.exports.b).toBe(2)
    expect(interpreter.exports.c).toBe(3)
    expect(interpreter.exports.d).toBe(4)
    expect(interpreter.exports.e).toBe(5)
    expect(interpreter.exports.f).toBe(6)
    expect(interpreter.exports.g).toBe(7)
  })

  // it('should labeled statement and break run normally in async function', () => {
  //   const interpreter = new Sval({ ecmaVer: 10 })
  //   interpreter.import({ expect, done })
  //   interpreter.run(`
  //     async function run() {
  //       let x = 0
  //       a: {
  //         x++
  //         break a
  //         x++
  //       }
  //       exports.a = x

  //       b: if (true) {
  //         x++
  //         break b
  //         x++
  //       }
  //       exports.b = x

  //       c: with (window) {
  //         x++
  //         break c
  //         x++
  //       }
  //       exports.c = x

  //       d: switch (true) {
  //         case true:
  //           for (;x < 10;) {
  //             x++
  //             break d
  //           }
  //         default: x++
  //       }
  //       exports.d = x

  //       e: try {
  //         x++
  //         break e
  //         x++
  //       } catch {}
  //       exports.e = x

  //       f: try {
  //         throw false
  //       } catch {
  //         x++
  //         break f
  //         x++
  //       }
  //       exports.f = x

  //       g: try {} finally {
  //         x++
  //         break g
  //         x++
  //       }
  //       exports.g = x
  //       expect(exports.a).toBe(1)
  //       expect(exports.b).toBe(2)
  //       expect(exports.c).toBe(3)
  //       expect(exports.d).toBe(4)
  //       expect(exports.e).toBe(5)
  //       expect(exports.f).toBe(6)
  //       expect(exports.g).toBe(7)
  //     }
  //     run()
  //   `)
  // })

  it('should empty statement run normally', () => {
    const interpreter = new Sval()
    interpreter.run(`
      ;
      ;;;;
      exports.result = 1
    `)
    expect(interpreter.exports.result).toBe(1)
  })

  it('should debugger statement run normally', () => {
    const interpreter = new Sval()
    // debugger statement should not throw
    interpreter.run(`
      debugger
      exports.result = 1
    `)
    expect(interpreter.exports.result).toBe(1)
  })

  it('should switch case with continue statement run normally', () => {
    const interpreter = new Sval()
    interpreter.run(`
      exports.a = []
      let i = 0
      while (i < 5) {
        i++
        switch (i) {
          case 2:
            continue
          case 3:
            exports.a.push(i)
        }
      }
    `)
    expect(interpreter.exports.a).toEqual([3])
  })

  it('should switch case with return statement run normally', () => {
    const interpreter = new Sval()
    interpreter.run(`
      function test() {
        switch (1) {
          case 1:
            return 42
          default:
            return 0
        }
      }
      exports.result = test()
    `)
    expect(interpreter.exports.result).toBe(42)
  })

  it('should try statement with pattern destructuring in catch run normally', () => {
    const interpreter = new Sval({ ecmaVer: 10 })
    interpreter.run(`
      try {
        throw { code: 404, message: 'Not Found' }
      } catch ({ code, message }) {
        exports.code = code
        exports.message = message
      }
    `)
    expect(interpreter.exports.code).toBe(404)
    expect(interpreter.exports.message).toBe('Not Found')
  })

  it('should try statement with array pattern destructuring in catch run normally', () => {
    const interpreter = new Sval({ ecmaVer: 10 })
    interpreter.run(`
      try {
        throw [1, 2, 3]
      } catch (err) {
        const [a, b, c] = err
        exports.a = a
        exports.b = b
        exports.c = c
      }
    `)
    expect(interpreter.exports.a).toBe(1)
    expect(interpreter.exports.b).toBe(2)
    expect(interpreter.exports.c).toBe(3)
  })

  it('should labeled statement throw error for unsupported types', () => {
    const interpreter = new Sval({ ecmaVer: 10 })
    expect(() => {
      interpreter.run(`
        label: exports.result = 1
      `)
    }).toThrow()
  })

  it('should block statement with invasived option run normally', () => {
    const interpreter = new Sval()
    interpreter.run(`
      let x = 0
      {
        let x = 1
        exports.inner = x
      }
      exports.outer = x
    `)
    expect(interpreter.exports.inner).toBe(1)
    expect(interpreter.exports.outer).toBe(0)
  })

  it('should switch with labeled break run normally', () => {
    const interpreter = new Sval({ ecmaVer: 10 })
    interpreter.run(`
      let x = 0
      outer: switch (1) {
        case 1:
          x++
          switch (2) {
            case 2:
              x++
              break outer
          }
          x++
      }
      exports.result = x
    `)
    expect(interpreter.exports.result).toBe(2)
  })

  it('should if statement with labeled break run normally', () => {
    const interpreter = new Sval({ ecmaVer: 10 })
    interpreter.run(`
      let x = 0
      label: if (true) {
        x++
        break label
        x++
      }
      exports.result = x
    `)
    expect(interpreter.exports.result).toBe(1)
  })

  it('should while statement with labeled continue run normally', () => {
    const interpreter = new Sval({ ecmaVer: 10 })
    interpreter.run(`
      let x = 0
      outer: while (x < 5) {
        x++
        inner: while (x < 3) {
          x++
          continue outer
        }
      }
      exports.result = x
    `)
    expect(interpreter.exports.result).toBe(5)
  })

  it('should do-while statement with labeled continue run normally', () => {
    const interpreter = new Sval({ ecmaVer: 10 })
    interpreter.run(`
      let x = 0
      outer: do {
        x++
        inner: do {
          x++
          if (x >= 3) continue outer
        } while (x < 5)
      } while (x < 3)
      exports.result = x
    `)
    expect(interpreter.exports.result).toBe(3)
  })

  it('should for statement with labeled continue run normally', () => {
    const interpreter = new Sval({ ecmaVer: 10 })
    interpreter.run(`
      let x = 0
      outer: for (let i = 0; i < 3; i++) {
        x++
        inner: for (let j = 0; j < 2; j++) {
          x++
          continue outer
        }
      }
      exports.result = x
    `)
    expect(interpreter.exports.result).toBe(6)
  })

  it('should for-in statement with labeled continue run normally', () => {
    const interpreter = new Sval({ ecmaVer: 10 })
    interpreter.run(`
      let x = 0
      outer: for (const i in [1, 2, 3]) {
        x++
        inner: for (const j in [1]) {
          x++
          continue outer
        }
      }
      exports.result = x
    `)
    expect(interpreter.exports.result).toBe(6)
  })

  it('should for-of statement with labeled continue run normally', () => {
    const interpreter = new Sval({ ecmaVer: 10 })
    interpreter.run(`
      let x = 0
      outer: for (const i of [1, 2, 3]) {
        x++
        inner: for (const j of [1]) {
          x++
          continue outer
        }
      }
      exports.result = x
    `)
    expect(interpreter.exports.result).toBe(6)
  })

  it('should expression statement run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          exports.a = 1
          exports.b = 2
          expect(exports.a).toBe(1)
          expect(exports.b).toBe(2)
          done()
        }
        run()
      `)
    })
  })

  it('should return statement without argument run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          function test() {
            return
          }
          const result = test()
          expect(result).toBeUndefined()
          done()
        }
        run()
      `)
    })
  })

  it('should break statement run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let x = 0
          while (x < 5) {
            x++
            if (x === 3) {
              break
            }
          }
          expect(x).toBe(3)
          done()
        }
        run()
      `)
    })
  })

  it('should continue statement run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let x = 0
          let sum = 0
          while (x < 5) {
            x++
            if (x === 3) {
              continue
            }
            sum += x
          }
          expect(sum).toBe(12) // 1 + 2 + 4 + 5
          done()
        }
        run()
      `)
    })
  })

  it('should labeled statement with while run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let x = 0
          label: while (x < 5) {
            x++
            if (x === 3) {
              break label
            }
          }
          expect(x).toBe(3)
          done()
        }
        run()
      `)
    })
  })

  it('should labeled statement with do-while run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let x = 0
          label: do {
            x++
            if (x === 3) {
              break label
            }
          } while (x < 5)
          expect(x).toBe(3)
          done()
        }
        run()
      `)
    })
  })

  it('should labeled statement with for run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let x = 0
          label: for (let i = 0; i < 5; i++) {
            x++
            if (i === 2) {
              break label
            }
          }
          expect(x).toBe(3)
          done()
        }
        run()
      `)
    })
  })

  it('should labeled statement with for-in run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let count = 0
          label: for (const i in [1, 2, 3, 4, 5]) {
            count++
            if (count === 3) {
              break label
            }
          }
          expect(count).toBe(3)
          done()
        }
        run()
      `)
    })
  })

  it('should labeled statement with for-of run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let count = 0
          label: for (const i of [1, 2, 3, 4, 5]) {
            count++
            if (count === 3) {
              break label
            }
          }
          expect(count).toBe(3)
          done()
        }
        run()
      `)
    })
  })

  it('should labeled statement with block run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let x = 0
          label: {
            x++
            break label
            x++
          }
          expect(x).toBe(1)
          done()
        }
        run()
      `)
    })
  })

  it('should labeled statement with with run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval({ ecmaVer: 10 })
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let x = 0
          const obj = { a: 1 }
          label: with (obj) {
            x++
            break label
            x++
          }
          expect(x).toBe(1)
          done()
        }
        run()
      `)
    })
  })

  it('should labeled statement with if run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let x = 0
          label: if (true) {
            x++
            break label
            x++
          }
          expect(x).toBe(1)
          done()
        }
        run()
      `)
    })
  })

  it('should labeled statement with switch run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let x = 0
          label: switch (1) {
            case 1:
              x++
              break label
            default:
              x++
          }
          expect(x).toBe(1)
          done()
        }
        run()
      `)
    })
  })

  it('should labeled statement with try run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let x = 0
          label: try {
            x++
            break label
            x++
          } catch {}
          expect(x).toBe(1)
          done()
        }
        run()
      `)
    })
  })

  it('should switch statement run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let result = 0
          switch (2) {
            case 1:
              result = 1
              break
            case 2:
              result = 2
              break
            default:
              result = 3
          }
          expect(result).toBe(2)
          done()
        }
        run()
      `)
    })
  })

  it('should switch statement with default case run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let result = 0
          switch (5) {
            case 1:
              result = 1
              break
            case 2:
              result = 2
              break
            default:
              result = 3
          }
          expect(result).toBe(3)
          done()
        }
        run()
      `)
    })
  })

  it('should switch statement with fall-through run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let result = 0
          switch (1) {
            case 1:
              result++
            case 2:
              result++
            case 3:
              result++
              break
            default:
              result = 0
          }
          expect(result).toBe(3)
          done()
        }
        run()
      `)
    })
  })

  it('should switch case with break run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let x = 0
          while (x < 5) {
            x++
            switch (x) {
              case 2:
                break
            }
          }
          expect(x).toBe(5)
          done()
        }
        run()
      `)
    })
  })

  it('should switch case with continue run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          const arr = []
          let i = 0
          while (i < 5) {
            i++
            switch (i) {
              case 2:
                continue
              case 3:
                arr.push(i)
            }
          }
          expect(arr).toEqual([3])
          done()
        }
        run()
      `)
    })
  })

  it('should switch case with return run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          function test() {
            switch (1) {
              case 1:
                return 42
              default:
                return 0
            }
          }
          const result = test()
          expect(result).toBe(42)
          done()
        }
        run()
      `)
    })
  })

  it('should throw statement run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          try {
            throw 'error message'
          } catch (err) {
            expect(err).toBe('error message')
          }
          try {
            throw { code: 404 }
          } catch (err) {
            expect(err.code).toBe(404)
          }
          done()
        }
        run()
      `)
    })
  })

  it('should do-while statement run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let x = 0
          do {
            x++
          } while (x < 5)
          expect(x).toBe(5)
          done()
        }
        run()
      `)
    })
  })

  it('should do-while statement with break run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let x = 0
          do {
            x++
            if (x === 3) {
              break
            }
          } while (x < 5)
          expect(x).toBe(3)
          done()
        }
        run()
      `)
    })
  })

  it('should do-while statement with continue run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          const arr = []
          let i = 0
          do {
            i++
            if (i === 2) {
              continue
            }
            arr.push(i)
          } while (i < 5)
          expect(arr).toEqual([1, 3, 4, 5])
          done()
        }
        run()
      `)
    })
  })

  it('should do-while statement with return run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          function test() {
            let x = 0
            do {
              x++
              if (x === 3) {
                return x
              }
            } while (x < 5)
            return 0
          }
          const result = test()
          expect(result).toBe(3)
          done()
        }
        run()
      `)
    })
  })

  it('should for statement run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let sum = 0
          for (let i = 0; i < 5; i++) {
            sum += i
          }
          expect(sum).toBe(10)
          done()
        }
        run()
      `)
    })
  })

  it('should for statement without test run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let x = 0
          for (let i = 0; ; i++) {
            x++
            if (i === 4) {
              break
            }
          }
          expect(x).toBe(5)
          done()
        }
        run()
      `)
    })
  })

  it('should for statement without init run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let i = 0
          for (; i < 5; i++) {
            // empty
          }
          expect(i).toBe(5)
          done()
        }
        run()
      `)
    })
  })

  it('should for statement without update run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let i = 0
          for (; i < 5; ) {
            i++
          }
          expect(i).toBe(5)
          done()
        }
        run()
      `)
    })
  })

  it('should for statement with break run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let x = 0
          for (let i = 0; i < 5; i++) {
            x++
            if (i === 2) {
              break
            }
          }
          expect(x).toBe(3)
          done()
        }
        run()
      `)
    })
  })

  it('should for statement with continue run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let sum = 0
          for (let i = 0; i < 5; i++) {
            if (i === 2) {
              continue
            }
            sum += i
          }
          expect(sum).toBe(8) // 0 + 1 + 3 + 4
          done()
        }
        run()
      `)
    })
  })

  it('should for statement with return run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          function test() {
            for (let i = 0; i < 5; i++) {
              if (i === 2) {
                return i
              }
            }
            return 0
          }
          const result = test()
          expect(result).toBe(2)
          done()
        }
        run()
      `)
    })
  })

  it('should for statement with non-block body run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let x = 0
          for (let i = 0; i < 3; i++)
            x++
          expect(x).toBe(3)
          done()
        }
        run()
      `)
    })
  })

  it('should for-in statement run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          const arr = []
          for (const i in [1, 2, 3]) {
            arr.push(i)
          }
          expect(arr).toEqual(['0', '1', '2'])
          done()
        }
        run()
      `)
    })
  })

  it('should for-in statement with break run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          const arr = []
          for (const i in [1, 2, 3, 4, 5]) {
            arr.push(i)
            if (arr.length === 3) {
              break
            }
          }
          expect(arr).toEqual(['0', '1', '2'])
          done()
        }
        run()
      `)
    })
  })

  it('should for-in statement with continue run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          const arr = []
          for (const i in [1, 2, 3]) {
            if (i === '1') {
              continue
            }
            arr.push(i)
          }
          expect(arr).toEqual(['0', '2'])
          done()
        }
        run()
      `)
    })
  })

  it('should for-in statement with return run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          function test() {
            for (const i in [1, 2, 3]) {
              if (i === '1') {
                return i
              }
            }
            return null
          }
          const result = test()
          expect(result).toBe('1')
          done()
        }
        run()
      `)
    })
  })

  it('should for-of statement with break run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          const arr = []
          for (const i of [1, 2, 3, 4, 5]) {
            arr.push(i)
            if (arr.length === 3) {
              break
            }
          }
          expect(arr).toEqual([1, 2, 3])
          done()
        }
        run()
      `)
    })
  })

  it('should for-of statement with continue run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          const arr = []
          for (const i of [1, 2, 3]) {
            if (i === 2) {
              continue
            }
            arr.push(i)
          }
          expect(arr).toEqual([1, 3])
          done()
        }
        run()
      `)
    })
  })

  it('should for-of statement with return run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          function test() {
            for (const i of [1, 2, 3]) {
              if (i === 2) {
                return i
              }
            }
            return null
          }
          const result = test()
          expect(result).toBe(2)
          done()
        }
        run()
      `)
    })
  })

  it('should block statement with labeled break run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let x = 0
          label: {
            x++
            break label
            x++
          }
          expect(x).toBe(1)
          done()
        }
        run()
      `)
    })
  })

  it('should block statement with continue run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          const arr = []
          let i = 0
          while (i < 5) {
            i++
            {
              if (i === 2) {
                continue
              }
            }
            arr.push(i)
          }
          expect(arr).toEqual([1, 3, 4, 5])
          done()
        }
        run()
      `)
    })
  })

  it('should block statement with return run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          function test() {
            {
              return 42
            }
          }
          const result = test()
          expect(result).toBe(42)
          done()
        }
        run()
      `)
    })
  })

  it('should with statement with labeled break run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval({ ecmaVer: 10 })
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let x = 0
          const obj = { a: 1 }
          label: with (obj) {
            x++
            break label
            x++
          }
          expect(x).toBe(1)
          done()
        }
        run()
      `)
    })
  })

  it('should with statement with continue run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval({ ecmaVer: 10 })
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          const arr = []
          let i = 0
          const obj = { a: 1 }
          while (i < 5) {
            i++
            with (obj) {
              if (i === 2) {
                continue
              }
            }
            arr.push(i)
          }
          expect(arr).toEqual([1, 3, 4, 5])
          done()
        }
        run()
      `)
    })
  })

  it('should with statement with return run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval({ ecmaVer: 10 })
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          function test() {
            const obj = { a: 1 }
            with (obj) {
              return 42
            }
          }
          const result = test()
          expect(result).toBe(42)
          done()
        }
        run()
      `)
    })
  })

  it('should if statement with else branch run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let result = 0
          if (false) {
            result = 1
          } else {
            result = 2
          }
          expect(result).toBe(2)
          done()
        }
        run()
      `)
    })
  })

  it('should if statement with labeled break run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let x = 0
          label: if (true) {
            x++
            break label
            x++
          }
          expect(x).toBe(1)
          done()
        }
        run()
      `)
    })
  })

  it('should if statement with continue run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          const arr = []
          let i = 0
          while (i < 5) {
            i++
            label: if (i === 2) {
              continue
            }
            arr.push(i)
          }
          expect(arr).toEqual([1, 3, 4, 5])
          done()
        }
        run()
      `)
    })
  })

  it('should if statement with return run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          function test() {
            label: if (true) {
              return 42
            }
            return 0
          }
          const result = test()
          expect(result).toBe(42)
          done()
        }
        run()
      `)
    })
  })

  it('should try statement without handler run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let caught = false
          try {
            throw 'error'
          } catch {
            caught = true
          }
          expect(caught).toBe(true)
          done()
        }
        run()
      `)
    })
  })

  it('should try statement with finally run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let finallyExecuted = false
          try {
            // no error
          } finally {
            finallyExecuted = true
          }
          expect(finallyExecuted).toBe(true)
          done()
        }
        run()
      `)
    })
  })

  it('should try statement with pattern destructuring in catch run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval({ ecmaVer: 10 })
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          try {
            throw { code: 500, message: 'Server Error' }
          } catch ({ code, message }) {
            expect(code).toBe(500)
            expect(message).toBe('Server Error')
          }
          done()
        }
        run()
      `)
    })
  })

  it('should try statement with labeled break run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let x = 0
          label: try {
            x++
            break label
            x++
          } catch {}
          expect(x).toBe(1)
          done()
        }
        run()
      `)
    })
  })

  it('should try statement with continue run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          const arr = []
          let i = 0
          while (i < 5) {
            i++
            label: try {
              if (i === 2) {
                continue
              }
            } catch {}
            arr.push(i)
          }
          expect(arr).toEqual([1, 3, 4, 5])
          done()
        }
        run()
      `)
    })
  })

  it('should try statement with return run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          function test() {
            label: try {
              return 42
            } catch {}
            return 0
          }
          const result = test()
          expect(result).toBe(42)
          done()
        }
        run()
      `)
    })
  })

  it('should while statement with labeled break run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let x = 0
          label: while (x < 5) {
            x++
            if (x === 3) {
              break label
            }
          }
          expect(x).toBe(3)
          done()
        }
        run()
      `)
    })
  })

  it('should while statement with labeled continue run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          const arr = []
          let i = 0
          label: while (i < 5) {
            i++
            if (i === 2) {
              continue label
            }
            arr.push(i)
          }
          expect(arr).toEqual([1, 3, 4, 5])
          done()
        }
        run()
      `)
    })
  })

  it('should while statement with return run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          function test() {
            label: while (true) {
              return 42
            }
            return 0
          }
          const result = test()
          expect(result).toBe(42)
          done()
        }
        run()
      `)
    })
  })

  it('should for-of statement with labeled break run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let count = 0
          label: for (const i of [1, 2, 3, 4, 5]) {
            count++
            if (count === 3) {
              break label
            }
          }
          expect(count).toBe(3)
          done()
        }
        run()
      `)
    })
  })

  it('should for-of statement with labeled continue run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          const arr = []
          label: for (const i of [1, 2, 3]) {
            if (i === 2) {
              continue label
            }
            arr.push(i)
          }
          expect(arr).toEqual([1, 3])
          done()
        }
        run()
      `)
    })
  })

  it('should for-of statement with labeled return run normally in async function', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          function test() {
            label: for (const i of [1, 2, 3]) {
              if (i === 2) {
                return i
              }
            }
            return null
          }
          const result = test()
          expect(result).toBe(2)
          done()
        }
        run()
      `)
    })
  })

  it('should for-await-of statement with labeled break run normally', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          let count = 0
          async function* gen() {
            for (let i = 1; i <= 5; i++) {
              yield i
            }
          }
          label: for await (const i of gen()) {
            count++
            if (count === 3) {
              break label
            }
          }
          expect(count).toBe(3)
          done()
        }
        run()
      `)
    })
  })

  it('should for-await-of statement with labeled continue run normally', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          const arr = []
          async function* gen() {
            for (let i = 1; i <= 3; i++) {
              yield i
            }
          }
          label: for await (const i of gen()) {
            if (i === 2) {
              continue label
            }
            arr.push(i)
          }
          expect(arr).toEqual([1, 3])
          done()
        }
        run()
      `)
    })
  })

  it('should for-await-of statement with labeled return run normally', () => {
    return new Promise((done) => {
      const interpreter = new Sval()
      interpreter.import({ expect, done })
      interpreter.run(`
        async function run() {
          async function test() {
            async function* gen() {
              for (let i = 1; i <= 3; i++) {
                yield i
              }
            }
            label: for await (const i of gen()) {
              if (i === 2) {
                return i
              }
            }
            return null
          }
          const result = await test()
          expect(result).toBe(2)
          done()
        }
        run()
      `)
    })
  })
})
