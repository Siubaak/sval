import { describe, it, expect } from 'vitest'
import Sval from '../src'

describe('testing pattern', () => {
  it('should parse object pattern normally', () => {
    const interpreter = new Sval()
    interpreter.run(`
      const tmp = 'd'
      const { a, b, c = 3, [tmp]: d, e = 2 } = { a: 1, b: 2, d: 4, e: 3 }
      exports.a = a
      exports.b = b
      exports.c = c
      exports.d = d
      exports.e = e
    `)
    expect(interpreter.exports.a).toBe(1)
    expect(interpreter.exports.b).toBe(2)
    expect(interpreter.exports.c).toBe(3)
    expect(interpreter.exports.d).toBe(4)
    expect(interpreter.exports.e).toBe(3)
  })
  it('should parse assign pattern normally', () => {
    const interpreter = new Sval()
    interpreter.run(`
      const [a, b] = [1, 2]
      exports.a = a
      exports.b = b
    `)
    expect(interpreter.exports.a).toBe(1)
    expect(interpreter.exports.b).toBe(2)
  })
  it('should parse array pattern normally', () => {
    const interpreter = new Sval()
    interpreter.run(`
      let a = 1, b = 2; // ';' should be kept
      [a, b] = [b, a]
      exports.a = a
      exports.b = b
    `)
    expect(interpreter.exports.a).toBe(2)
    expect(interpreter.exports.b).toBe(1)
  })
  it('should parse rest element normally', () => {
    const interpreter = new Sval()
    interpreter.run(`
      let a; // ';' should be kept
      [...a] = [1, 2]
      const [...b] = [1, 2, 3]
      const [c, ...d] = [1, 2, 3]
      exports.a = a
      exports.b = b
      exports.c = c
      exports.d = d
      const o = { a: 1, b: 2, c: 3 }
      const { ...e } = o
      const { a: f, ...g } = o
      const h = { a: 2, ...o, d: 4}
      const [i = 3, [j, ...k], ...[x, y]] = [1, [2, 3, 4], 5, 6]
      const [ , z] = [7, 8]
      exports.e = e
      exports.f = f
      exports.g = g
      exports.h = h
      exports.i = i
      exports.j = j
      exports.k = k
      exports.x = x
      exports.y = y
      exports.z = z
    `)
    expect(interpreter.exports.a).toEqual([1, 2])
    expect(interpreter.exports.b).toEqual([1, 2, 3])
    expect(interpreter.exports.c).toBe(1)
    expect(interpreter.exports.d).toEqual([2, 3])
    expect(interpreter.exports.e).toEqual({ a: 1, b: 2, c: 3 })
    expect(interpreter.exports.f).toBe(1)
    expect(interpreter.exports.g).toEqual({ b: 2, c: 3 })
    expect(interpreter.exports.h).toEqual({ a: 1, b: 2, c: 3, d: 4 })
    expect(interpreter.exports.i).toEqual(1)
    expect(interpreter.exports.j).toEqual(2)
    expect(interpreter.exports.k).toEqual([3,4])
    expect(interpreter.exports.x).toEqual(5)
    expect(interpreter.exports.y).toEqual(6)
    expect(interpreter.exports.z).toEqual(8)
  })
  it('should parse rest element of function params normally', () => {
    const interpreter = new Sval()
    interpreter.run(`
      a(1, 2)
      c(1, 2, 3)
      function a(...b) {
        exports.b = b
      }
      function c(d = 4, ...e) {
        exports.d = d
        exports.e = e
      }
    `)
    expect(interpreter.exports.b).toEqual([1, 2])
    expect(interpreter.exports.e).toEqual([2, 3])
    expect(interpreter.exports.d).toBe(1)
  })

  it('should destructure arrays through the iterator protocol (issue #157)', () => {
    const interpreter = new Sval()
    interpreter.run(`
      const [a, b] = new Set([1, 2])
      const [x, ...rest] = new Set([1, 2])
      const [[k, v]] = new Map([['key', 'val']])
      function* gen() { yield 1; yield 2; yield 3 }
      const [, second, ...others] = gen()
      const [c, d = 'dflt'] = 'c'
      let p, q
      const assigned = ([p, q] = new Set([5, 6]))
      exports.r = [a, b, x, rest, k, v, second, others, c, d, p, q, assigned instanceof Set]
    `)
    expect(interpreter.exports.r).toEqual([1, 2, 1, [2], 'key', 'val', 2, [3], 'c', 'dflt', 5, 6, true])
  })

  it('should close an unfinished iterator after array destructuring', () => {
    const interpreter = new Sval()
    interpreter.run(`
      const log = []
      function* gen() {
        try { yield 1; yield 2; yield 3 } finally { log.push('closed') }
      }
      const [a] = gen()
      const [...all] = gen()
      exports.r = [a, all, log]
    `)
    // The first is closed early; the second runs to completion (finally runs once each)
    expect(interpreter.exports.r).toEqual([1, [1, 2, 3], ['closed', 'closed']])
  })

  it('should throw when array destructuring a non-iterable', () => {
    const interpreter = new Sval()
    expect(() => interpreter.run('const [a] = {}')).toThrow(TypeError)
    expect(() => interpreter.run('const [b] = undefined')).toThrow(TypeError)
  })
})
