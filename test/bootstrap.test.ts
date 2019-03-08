import { readFileSync } from 'fs'
import { resolve } from 'path'
import Sval from '../src'

const code = readFileSync(resolve(__dirname, '../dist/min/sval.min.js'), 'utf-8')

describe('testing src/index.ts', () => {
  it('should compile normally', () => {  
    const interpreter = new Sval()
    interpreter.import({ Object, RegExp, Array, Symbol })
    interpreter.run(code)
  })
})
