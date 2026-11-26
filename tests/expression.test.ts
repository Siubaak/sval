import { describe, it, expect } from 'vitest'
import Sval from '../src'

describe('testing src/expression.ts', () => {
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
    interpreter.run('exports.inst = new A().then()')

    expect(interpreter.exports.inst.a).toBe(2)
  })
  it('should unary expression run normally', () => {
    const interpreter = new Sval()

    const code = `
      exports.a = !(~(+(-1)))
      exports.b = void 0
      exports.c = typeof x // shouldn't throw err
      exports.d = 1
      exports.e = delete exports.d
      exports.f = typeof exports.e
    `
    interpreter.run(`!async function(){${code}}()`) // also test for generator env
    interpreter.run(code)

    expect(interpreter.exports.a).toBeTruthy()
    expect(interpreter.exports.b).toBeUndefined()
    expect(interpreter.exports.c).toBe('undefined')
    expect(interpreter.exports.d).toBeUndefined()
    expect(interpreter.exports.e).toBeTruthy()
    expect(interpreter.exports.f).toBe('boolean')
  })
  it('should binary expression run normally', () => {
    const interpreter = new Sval()

    const code = `
      // comparison
      exports.a = 1 == '1'
      exports.b = 1 != '1'
      exports.c = 1 === '1'
      exports.d = 1 !== '1'
      exports.e = 1 < 1
      exports.f = 1 <= 1
      exports.g = 1 > 1
      exports.h = 1 >= 1
      // bitwise offset
      exports.i = 1 << 1
      exports.j = 1 >> 1
      exports.k = 1 >>> 1
      exports.l = 1 | 2 // 01 | 10 = 11
      exports.m = 1 & 2 // 01 & 10 = 00
      exports.n = 1 ^ 1 // 01 ^ 01 = 00
      // calculate
      exports.o = 1 + 1
      exports.p = 1 - 1
      exports.q = 1 * 2
      exports.r = 2 / 2
      exports.s = 2 ** 2
      exports.t = 3 % 2
      // others
      const a = { b: 1 }
      exports.u = 'b' in a
      function b() {}
      const c = new b
      exports.v = c instanceof b
    `
    interpreter.run(`!async function(){${code}}()`) // also test for generator env
    interpreter.run(code)
    // comparison
    expect(interpreter.exports.a).toBeTruthy()
    expect(interpreter.exports.b).toBeFalsy()
    expect(interpreter.exports.c).toBeFalsy()
    expect(interpreter.exports.d).toBeTruthy()
    expect(interpreter.exports.e).toBeFalsy()
    expect(interpreter.exports.f).toBeTruthy()
    expect(interpreter.exports.g).toBeFalsy()
    expect(interpreter.exports.h).toBeTruthy()
    // bitwise offset
    expect(interpreter.exports.i).toBe(2)
    expect(interpreter.exports.j).toBe(0)
    expect(interpreter.exports.k).toBe(0)
    expect(interpreter.exports.l).toBe(3)
    expect(interpreter.exports.m).toBe(0)
    expect(interpreter.exports.n).toBe(0)
    // calculate
    expect(interpreter.exports.o).toBe(2)
    expect(interpreter.exports.p).toBe(0)
    expect(interpreter.exports.q).toBe(2)
    expect(interpreter.exports.r).toBe(1)
    expect(interpreter.exports.s).toBe(4)
    expect(interpreter.exports.t).toBe(1)
    // others
    expect(interpreter.exports.u).toBeTruthy()
    expect(interpreter.exports.v).toBeTruthy()
  })
  it('should assignment expression run normally', () => {
    const interpreter = new Sval()
    const code = `
      exports.a = 2
      expect(exports.a).toBe(2)
      exports.a -= 1
      expect(exports.a).toBe(1)
      exports.a *= 2
      expect(exports.a).toBe(2)
      exports.a **= 2
      expect(exports.a).toBe(4)
      exports.a /= 2
      expect(exports.a).toBe(2)
      exports.a %= 1
      expect(exports.a).toBe(0)
      exports.a += 1
      expect(exports.a).toBe(1)
      exports.a <<= 2
      expect(exports.a).toBe(4)
      exports.a >>= 1
      expect(exports.a).toBe(2)
      exports.a >>>= 1
      expect(exports.a).toBe(1)
      exports.a |= 1
      expect(exports.a).toBe(1)
      exports.a &= 1
      expect(exports.a).toBe(1)
      exports.a ^= 1
      expect(exports.a).toBe(0)
      exports.a ??= 1
      expect(exports.a).toBe(0)
      exports.a &&= 1
      expect(exports.a).toBe(0)
      exports.a ||= 1
      expect(exports.a).toBe(1); // ';' should be kept

      (exports.b = { c: { d: 1 } }).c.e = exports.b.c.d
      expect(exports.b.c.e).toBe(1)
    `
    interpreter.import({ expect })
    interpreter.run(`!async function(){${code}}()`) // also test for generator env
    interpreter.run(code)
  })

  it('should throw TypeError when assigning to constant', () => {
    const interpreter = new Sval()
    let error = null
    try {
      interpreter.run(`
        const x = 5
        x = 6
      `)
    } catch (ex) {
      error = ex
    }

    expect(error).toBeInstanceOf(TypeError)
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
        exports.f = [...arguments]
      }

      try {
        [...({})]
      } catch (err) {
        exports.g = err
      }
    `)

    expect(interpreter.exports.a).toEqual([1, 2])
    expect(interpreter.exports.b).toEqual([1, 2, 3])
    expect(interpreter.exports.c).toBe(1)
    expect(interpreter.exports.d).toBe(2)
    expect(interpreter.exports.f).toEqual([1, 2])
    expect(interpreter.exports.g).toBeInstanceOf(TypeError)
  })

  it('should parse sparse array literals normally', () => {
    const interpreter = new Sval()

    interpreter.run(`
      exports.a = [, 1]
      exports.b = [1, , 2]
      exports.c = [1, , , 2]
      exports.d = [,]
    `)

    expect(interpreter.exports.a).toEqual([, 1])
    expect(0 in interpreter.exports.a).toBe(false)
    expect(interpreter.exports.b).toEqual([1, , 2])
    expect(1 in interpreter.exports.b).toBe(false)
    expect(interpreter.exports.c).toEqual([1, , , 2])
    expect(interpreter.exports.d).toEqual([,])
    expect(interpreter.exports.d.length).toBe(1)
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

  it('should create new RegExp instance for regex literals in closures', () => {
    // Test for issue #118: regex literals should not be cached in closures
    // When a regex has the global flag, reusing the same RegExp object causes
    // lastIndex to persist between calls, leading to incorrect results
    const interpreter = new Sval({ sourceType: 'module' })
    interpreter.run(`
      export default () => {
        return (str) => {
          return /^[1-9]\\d*$/g.test(str)
        }
      }
    `)
    const testFn = interpreter.exports.default()
    expect(testFn('1')).toBe(true)
    expect(testFn('1')).toBe(true) // Should still be true, not false
    expect(testFn('2')).toBe(true)
    expect(testFn('2')).toBe(true) // Should still be true, not false
  })

  it('should handle regex literals with flags correctly', () => {
    const interpreter = new Sval()
    interpreter.run(`
      const re1 = /abc/gi
      const re2 = /abc/gi
      exports.test1 = re1.test('ABC')
      exports.test2 = re2.test('ABC')
      exports.flags1 = re1.flags
      exports.flags2 = re2.flags
    `)
    expect(interpreter.exports.test1).toBe(true)
    expect(interpreter.exports.test2).toBe(true)
    expect(interpreter.exports.flags1).toBe('gi')
    expect(interpreter.exports.flags2).toBe('gi')
  })

  it('should support object expression', () => {
    const interpreter = new Sval()
    interpreter.import({ expect })
    interpreter.run(`
      const name = 'y'
      const values = { a: 1, b: 2 }
      const a = {
        x: 5,
        [name]: 6,
        ...values
      }

      expect(a).toEqual(result = {
        x: 5,
        y: 6,
        a: 1,
        b: 2
      })

      // object with getter+setter
      const b = {
        _t: 1,
        get t() {
          return this._t
        },
        set t(v) {
          this._t = v
        }
      }

      b.t = 2

      exports.b = b
    `)

    const b = {
      _t: 1,
      get t() {
        return this._t
      },
      set t(v) {
        this._t = v
      }
    }

    b.t = 2

    expect(interpreter.exports.b).toEqual(b)
  })

  it('should support object expression with correct property descriptor', () => {
    const interpreter = new Sval()
    interpreter.run(`
      const a = {
        x: 5,
        get y() {
          return this.x + 1
        },
        set y(v) {
          this.x = v - 1
        }
      }

      exports.a = a
    `)

    const a = interpreter.exports.a
    expect(Object.keys(a)).toEqual(['x', 'y'])

    const xPD = Object.getOwnPropertyDescriptor(a, 'x')
    expect(xPD).toEqual({
      configurable: true,
      enumerable: true,
      value: 5,
      writable: true
    })

    const yPD = Object.getOwnPropertyDescriptor(a, 'y')!
    expect({
      configurable: yPD.configurable,
      enumerable: yPD.enumerable,
    }).toEqual({
      configurable: true,
      enumerable: true,
    })
  })

  it('should support logic expression', () => {
    const interpreter = new Sval()
    interpreter.import({ expect })
    interpreter.run(`
      const x = 0
      const y = true

      expect(x && y).toBe(0)
      expect(x || y).toBeTruthy()
      expect(x ?? y).toBe(0)
      expect(null ?? x).toBe(0)
    `)
  })

  it('should support method call with super + getter', () => {
    const interpreter = new Sval()
    interpreter.run(`
      class X {
        get say() {
          return function() { return 1}
        }
      }

      class Y extends X {
        say() {
          return super.say()
        }
      }

      exports.result = new Y().say()
    `)

    expect(interpreter.exports.result).toEqual(1)
  })

  it('should support method call with computed name', () => {
    const interpreter = new Sval()
    interpreter.run(`
      var x = {
        say() {
          return 1
        }
      }

      exports.result = x['say']()
    `)

    expect(interpreter.exports.result).toEqual(1)
  })

  it('should support method call with computed name', () => {
    const interpreter = new Sval()
    interpreter.run(`
      exports.result = 1+!!2
    `)

    expect(interpreter.exports.result).toEqual(2)
  })

  it('should support all kinds of delete actions', () => {
    const interpreter = new Sval()
    interpreter.run(`
      var x = {}

      // normal behavior for 'delete' in strict mode
      delete x.x

      // delete any literal except undefined, undefined is an identifier in js
      let result = true
      result &= delete 1
      result &= '1'
      result &= delete true
      result &= delete Symbol('xx')
      result &= delete null
      result &= delete {}
      result &= delete function () {}
      result &= delete /x/

      exports.result = result
    `)

    expect(interpreter.exports.result).toBeTruthy()

    let error = null
    try {
      interpreter.run(`
        // trying to delete a regular identifier in strict mode
        var y = {}
        delete y
      `)
    } catch (ex) {
      error = ex
    }

    expect(error).toBeInstanceOf(SyntaxError)
  })

  // https://github.com/Siubaak/sval/issues/83
  it('should support optional chaining', () => {
    const interpreter = new Sval()
    interpreter.run(`
      var x = { a: { b: 1 }, c: null, e: () => 2 }

      exports.has = x.a?.b
      exports.null = x.c?.b
      exports.none = x.d?.b
      exports.func = x.e?.()
      exports.funcnone = x.f?.()
    `)

    expect(interpreter.exports.has).toBe(1)
    expect(interpreter.exports.null).toBeUndefined()
    expect(interpreter.exports.none).toBeUndefined()
    expect(interpreter.exports.func).toBe(2)
    expect(interpreter.exports.funcnone).toBeUndefined()
  })

  // https://github.com/Siubaak/sval/issues/130
  it('should propagate optional chain short-circuit through subsequent member access', () => {
    const interpreter = new Sval()
    interpreter.run(`
      var user = undefined
      var config = null
      var obj = { foo: { bar: { baz: 42 } } }

      exports.undefinedChain = user?.profile.name
      exports.nullChain = config?.database.host
      exports.deepChain = user?.a.b.c.d
      exports.hasValue = obj.foo?.bar.baz
    `)

    expect(interpreter.exports.undefinedChain).toBeUndefined()
    expect(interpreter.exports.nullChain).toBeUndefined()
    expect(interpreter.exports.deepChain).toBeUndefined()
    expect(interpreter.exports.hasValue).toBe(42)
  })

  it('should support dynamic import', () => {
    return new Promise((done) => {
      const interpreter = new Sval({ sourceType: 'module' })
      interpreter.import('done', { default: done })
      interpreter.import('expect', { default: expect })
      interpreter.import('module', () => ({ default: 1 }))
      interpreter.run(`
        import done from 'done'
        import expect from 'expect'
        import('module').then(mod => {
          expect(mod.default).toBe(1)
          done()
        })
      `)
    })
  })

  it('should support top-level await', () => {
    return new Promise((done) => {
      const interpreter = new Sval({ sourceType: 'module' })
      interpreter.import('done', { default: done })
      interpreter.import('expect', { default: expect })
      interpreter.import('module', () => ({ default: 1 }))
      interpreter.run(`
        import done from 'done'
        import expect from 'expect'
        const { default: mod } = await import('module')
        expect(mod).toBe(1)
        done()
      `)
    })
  })

  it('should throw ReferenceError when assigning to undeclared variable in module mode', () => {
    const interpreter = new Sval({ ecmaVer: 11, sandBox: true, sourceType: 'module' })
    interpreter.run(`
      let sawAssignmentError = false;
      try {
        a = "TEST VALUE";
      } catch (e) {
        sawAssignmentError = e instanceof ReferenceError;
      }
      export { sawAssignmentError };
    `)
    expect(interpreter.exports.sawAssignmentError).toBe(true)
  })

  it('should include full property path in TypeError for non-function member calls (issue #143)', () => {
    // simple member expression: foo.bar is not a function
    const interp1 = new Sval()
    interp1.run(`
      const foo = { bar: 42 }
      try {
        foo.bar()
      } catch (e) {
        exports.err = e
      }
    `)
    expect(interp1.exports.err).toBeInstanceOf(TypeError)
    expect(interp1.exports.err.message).toBe('foo.bar is not a function')

    // nested member expression: foo.bar.baz is not a function
    const interp2 = new Sval()
    interp2.run(`
      const foo = { bar: { baz: 42 } }
      try {
        foo.bar.baz()
      } catch (e) {
        exports.err = e
      }
    `)
    expect(interp2.exports.err).toBeInstanceOf(TypeError)
    expect(interp2.exports.err.message).toBe('foo.bar.baz is not a function')

    // computed member expression: foo[0] is not a function
    const interp3 = new Sval()
    interp3.run(`
      const foo = [42]
      try {
        foo[0]()
      } catch (e) {
        exports.err = e
      }
    `)
    expect(interp3.exports.err).toBeInstanceOf(TypeError)
    expect(interp3.exports.err.message).toBe('foo[0] is not a function')
  })

  it('should include identifier name in SyntaxError for invalid async usage (issue #143)', () => {
    // async followed by identifier that is not a valid async arrow → Unexpected identifier 'name'
    const sval1 = new Sval()
    let err1: any
    try {
      sval1.run("async fetch('/url')")
    } catch (e) {
      err1 = e
    }
    expect(err1).toBeInstanceOf(SyntaxError)
    expect(err1.message).toBe("Unexpected identifier 'fetch'")

    // async followed by bare identifier (no call, just end of input)
    const sval2 = new Sval()
    let err2: any
    try {
      sval2.run('async foo')
    } catch (e) {
      err2 = e
    }
    expect(err2).toBeInstanceOf(SyntaxError)
    expect(err2.message).toBe("Unexpected identifier 'foo'")

    // two identifiers in a row (not async-specific)
    const sval3 = new Sval()
    let err3: any
    try {
      sval3.run('foo bar')
    } catch (e) {
      err3 = e
    }
    expect(err3).toBeInstanceOf(SyntaxError)
    expect(err3.message).toBe("Unexpected identifier 'bar'")
  })

  it('should read the target of a compound assignment before its right-hand side (issue #159)', () => {
    const interpreter = new Sval()
    interpreter.run(`
      let x = 1
      x += (x = 5)
      const a = [1]
      a[0] -= (a[0] = 10)
      let calls = 0
      let y = 1
      y ||= ++calls
      let z = null
      z ??= 7
      let w = 0
      w &&= ++calls
      const o = { get v() { return 3 }, set v(n) {} }
      exports.r = [x, a[0], calls, y, z, w, (o.v = 9), (x *= 2)]
    `)
    expect(interpreter.exports.r).toEqual([6, -9, 0, 1, 7, 0, 9, 12])
  })

  it('should coerce the operand of ++ and -- with ToNumeric and read it once (issue #167)', () => {
    const interpreter = new Sval()
    interpreter.run(`
      let a = '5'; a++
      let b; const oldB = b++
      let s = '5'; const oldS = s--
      let gets = 0
      const obj = { get p() { gets++; return 1 }, set p(v) {} }
      const pre = ++obj.p
      let c = 1n; c++
      let d = 1n; const oldD = d--
      exports.res = [a, oldB, oldS, s, gets, pre, c, d, oldD]
    `)
    expect(interpreter.exports.res).toEqual([6, NaN, 5, 4, 1, 2, BigInt(2), BigInt(0), BigInt(1)])
  })

  it('should access properties without walking the prototype chain (issue #163)', () => {
    const interpreter = new Sval()
    interpreter.run(`
      let n = 0
      const k = { toString() { n++; return 'a' } }
      const v1 = ({ a: 1 })[k]
      const o = { a: 1 }
      o[k] += 1
      const log = []
      const p = new Proxy({ a: 1 }, {
        get(t, k, r) { log.push('get'); return Reflect.get(t, k, r) },
        getOwnPropertyDescriptor(t, k) { log.push('gopd'); return Reflect.getOwnPropertyDescriptor(t, k) },
        getPrototypeOf(t) { log.push('getPrototypeOf'); return Reflect.getPrototypeOf(t) }
      })
      p.a
      let m = 0
      const nil = null
      nil?.[m++]
      exports.r = [v1, o.a, n, log, m]
    `)
    expect(interpreter.exports.r).toEqual([1, 2, 2, ['get'], 0])
  })

  it('should fail silently on read-only assignment and delete in non-strict mode (issue #164)', () => {
    const interpreter = new Sval()
    interpreter.run(`
      var o = Object.freeze({ p: 1 })
      o.p = 5
      'str'.x = 1
      exports.p = o.p
      exports.del = delete o.p
      exports.delOk = delete ({ q: 1 }).q
      const setterErr = { set x(v) { throw new RangeError('setter') } }
      try { setterErr.x = 1 } catch (e) { exports.setterErr = e instanceof RangeError }
    `)
    expect(interpreter.exports).toEqual({ p: 1, del: false, delOk: true, setterErr: true })

    const strict = new Sval()
    expect(() => strict.run(`'use strict'; Object.freeze({ p: 1 }).p = 5`)).toThrow(TypeError)
    expect(() => strict.run(`'use strict'; delete Object.freeze({ p: 1 }).p`)).toThrow(TypeError)
    const klass = new Sval()
    expect(() => klass.run(`new (class { constructor() { Object.freeze(this).p = 5 } })()`)).toThrow(TypeError)
  })

  it('should bind this for member expression tagged templates (issue #165)', () => {
    const interpreter = new Sval()
    interpreter.run(`
      const o = {
        x: 2,
        tag(strings, v) { return this.x + strings[0] + v }
      }
      const key = 'tag'
      exports.r = [o.tag\`hi\${1}\`, o[key]\`yo\${3}\`]
    `)
    expect(interpreter.exports.r).toEqual(['2hi1', '2yo3'])
  })

  it('should support super property access in object literal methods (issue #166)', () => {
    const interpreter = new Sval()
    interpreter.run(`
      const proto = { hi() { return 'p' + this.n }, get g() { return 'pg' } }
      const obj = {
        __proto__: proto,
        n: 1,
        hi() { return super.hi() + 'o' },
        get x() { return super.hi() + super.g },
        arrow() { return (() => super.hi())() }
      }
      exports.result = [obj.hi(), obj.x, obj.arrow()]
    `)
    expect(interpreter.exports.result).toEqual(['p1o', 'p1pg', 'p1'])
  })
})
