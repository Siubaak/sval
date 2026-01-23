import { parse } from 'acorn'
import util from 'util'

const code = `
class A {
  #b = 2
  test() {
    return #b in this
  }
}
`

const ast = parse(code, { ecmaVersion: 'latest' })
const classDecl = ast.body[0]
const method = classDecl.body.body.find(el => el.key.name === 'test')
const returnStmt = method.value.body.body[0]

console.log('Return statement argument (# b in this):')
console.log(util.inspect(returnStmt.argument, { depth: 5 }))
