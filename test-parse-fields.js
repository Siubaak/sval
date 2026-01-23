import { parse } from 'acorn'

const code = `
class A {
  x = 1
  static f = 6
}
`

const ast = parse(code, { ecmaVersion: 'latest' })
const classDecl = ast.body[0]
console.log('Class body elements:')
for (const element of classDecl.body.body) {
  console.log(' -', element.type, element.static ? '(static)' : '(instance)', element.key?.name)
}
