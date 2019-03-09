import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'
import Sval from '../src'

let code: string

const codePath = resolve(__dirname, '../dist/sval.min.js')
if (existsSync(codePath)) {
  code = readFileSync(codePath, 'utf-8')
} else {
  code = "const msg = 'fisrt build'"
}

describe('testing src/index.ts', () => {
  it('should compile normally', () => {  
    const interpreter = new Sval()
    interpreter.run(code)
  })
})
