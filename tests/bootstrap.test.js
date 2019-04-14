const { readFileSync, existsSync } = require('fs')
const { resolve } = require('path')
const Sval = require('../dist/index')

let code

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
