import { parse } from 'acorn'
import util from 'util'

const code = `
class A {
  #x = 1
  method() {
    return this.#x
  }
}
`

const ast = parse(code, { ecmaVersion: 'latest' })
const classDecl = ast.body[0]

console.log('Class body elements:')
for (const element of classDecl.body.body) {
  console.log('\n---', element.type, '---')
  if (element.type === 'PropertyDefinition') {
    console.log('Key:', util.inspect(element.key, { depth: null }))
    console.log('Value:', util.inspect(element.value, { depth: 2 }))
  } else if (element.type === 'MethodDefinition') {
    console.log('Key:', util.inspect(element.key, { depth: null }))
    console.log('Body:', util.inspect(element.value.body, { depth: 3 }))
  }
}
