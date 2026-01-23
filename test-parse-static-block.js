import { parse } from 'acorn'
import util from 'util'

const code = `
class A {
  static l = []
  static {
    this.l.push(1)
  }
  static {
    this.l.push(2)
  }
}
`

const ast = parse(code, { ecmaVersion: 'latest' })
const classDecl = ast.body[0]

console.log('Class body elements:')
for (const element of classDecl.body.body) {
  console.log('\n---', element.type, '---')
  if (element.type === 'StaticBlock') {
    console.log('Body:', util.inspect(element.body, { depth: 3 }))
  }
}
