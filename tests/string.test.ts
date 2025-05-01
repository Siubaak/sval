import { describe, it, expect } from 'vitest'
import Sval from '../src'

describe('testing string', () => {
  it('should support unicode string', () => {
    const interpreter = new Sval()
    interpreter.import({ expect })
    interpreter.run(`
      const a = "\u0061"
      const b = "\uD842\uDFB7"
      const c = "\u{20BB7}"
      const d = "\u{41}\u{42}\u{43}"
      const e = "\u{1F680}"
      const f = "\uD83D\uDE80"
      const g = "\x7A"

      expect(a).toBe('a')
      expect(b).toBe('𠮷')
      expect(c).toBe('𠮷')
      expect(d).toBe('ABC')
      expect(e).toBe(f)
      expect(g).toBe('z')
    `)
  })

  it('should parse template element normally', () => {
    const interpreter = new Sval()
    interpreter.run('const a = 1; exports.str = `a: ${a}`')
    expect(interpreter.exports.str).toBe('a: 1')
  })

  it('should support tagged template string', () => {
    const interpreter = new Sval()
    interpreter.import({ expect })
    interpreter.run(`
      function tag(stringArr, value1, value2){
        expect(stringArr).toEqual(['hello ', ' sval ', ''])
        expect(value1).toEqual(15)
        expect(value2).toEqual(50)
      }

      let a = 5
      let b = 10

      tag\`hello \${ a + b } sval \${ a * b }\`
    `)
  })

  it('should convert string to char array', () => {
    const interpreter = new Sval()
    interpreter.import({ expect })
    interpreter.run(`
      const word = 'word'
      expect([...word]).toEqual(['w', 'o', 'r', 'd'])
      expect({...word}).toEqual({ 0: 'w', 1: 'o', 2: 'r', 3: 'd' })

      function spread(w, o, r, d) {
        expect([w, o, r, d]).toEqual(['w', 'o', 'r', 'd'])
      }
      spread(...word)
    `)
  })
})
