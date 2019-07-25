import State from '../state'
import * as estree from 'estree'
import { OP } from '../share/const'
import compile from '.'
import { createSymbol } from '../share/utils'
import { ObjectPattern, ArrayPattern, AssignmentPattern } from './pattern'

type FunctionDefinition = estree.FunctionDeclaration | estree.FunctionExpression | estree.ArrowFunctionExpression

export function compileFunc(node: FunctionDefinition, state: State) {
  const arrow = node.type === 'ArrowFunctionExpression'
  const funCode = {
    op: OP.FUNC,
    val: '',
    end: -1,
    arrow,
    async: node.async,
    generator: node.generator,
    length: node.params.length
  }
  state.opCodes.push(funCode)

  state.symbols.pushScope()
  // isolate outer try catch block, call expression will give true runtime catch statement pc
  state.catchPcStack.push(null)
  if (!arrow) {
    state.opCodes.push({ op: OP.ALLOC, val: state.symbols.set('this', 'const').pointer })
    state.opCodes.push({ op: OP.ALLOC, val: state.symbols.set('arguments', 'var').pointer })
  }
  for (let i = 0; i < node.params.length; i++) {
    const param = node.params[i]
    if (param.type === 'Identifier') {
      state.opCodes.push({ op: OP.ALLOC, val: state.symbols.set(param.name, 'var').pointer })
    } else if (param.type === 'RestElement') {
      state.opCodes.push({ op: OP.REST, val: 'func' })
      const value = param.argument
      if (value.type === 'Identifier') {
        state.opCodes.push({ op: OP.ALLOC, val: state.symbols.set(value.name, 'var').pointer })
      } else if (value.type === 'MemberExpression') {
        compile(value.object, state)
        const prop = value.property
        if (prop.type === 'Identifier') {
          state.opCodes.push({ op: OP.LOADK, val: prop.name })
        } else { // node.computed === true
          compile(prop, state)
        }
        state.opCodes.push({ op: OP.MSET })
      } else {
        compilePattern(value, state)
      }
    } else {
      compilePattern(param, state)
    }
  }
  const body = node.body.type === 'BlockStatement' ? node.body.body : [node.body]
  for (let i = 0; i < body.length; i++) {
    compile(body[i], state)
  }
  state.catchPcStack.pop()
  state.symbols.popScope()

  funCode.end = state.opCodes.length
}

type ClassDefinition = estree.ClassDeclaration | estree.ClassExpression

export function compileClass(node: ClassDefinition, state: State) {
  // class constructor
  const clsCode = { op: OP.CLS, val: node.id.name, constructor: false, inherit: false }
  const methodBody = node.body.body
  for (let i = 0; i < methodBody.length; i++) {
    if (methodBody[i].kind === 'constructor') {
      compileFunc(methodBody[i].value, state)
      clsCode.constructor = true
      break
    }
  }
  if (node.superClass) {
    compile(node.superClass, state)
    clsCode.inherit = true
  }
  state.opCodes.push(clsCode)
  // class body
  const methodDefs = node.body.body
  for (let i = 0; i < methodDefs.length; i++) {
    const met = methodDefs[i]
    if (met.kind === 'constructor') continue
    // method
    compileFunc(met.value, state)
    // key
    const metKey = met.key
    if (metKey.type === 'Identifier') {
      state.opCodes.push({ op: OP.LOADK, val: metKey.name })
    } else { // met.computed === true
      compile(metKey, state)
    }
    // definition
    state.opCodes.push({ op: OP.CMET, val: met.kind, static: met.static })
  }
}

export function compilePattern(node: estree.Pattern, state: State) {
  switch (node.type) {
    case 'ObjectPattern':
      return ObjectPattern(node, state)
    case 'ArrayPattern':
      return ArrayPattern(node, state)
    case 'AssignmentPattern':
      return AssignmentPattern(node, state)
    default:
      throw new SyntaxError('Unexpected token')
  }
}

const idx = createSymbol('fi') // for in loop private index variable name
const len = createSymbol('fil') // for in loop keys or values length variable name
const kovs = createSymbol('fikv') // for in loop keys or values variable name
export function compileForXStatement(node: estree.ForInStatement | estree.ForOfStatement, state: State) {
  /**
   * compile equivalent to the code below
   * 
   * const len = { stack.pop() }
   * const kovs = { stack.pop() }
   * let idx = 0
   * while (idx < len) {
   *   { compile(node.left) } = kovs[idx++]
   * }
   */
  state.symbols.pushScope()
  const opCodes = state.opCodes
  const symbols = state.symbols

  opCodes.push({ op: OP.ALLOC, val: symbols.set(len, 'const').pointer }) // const len = { stack.pop() }
  opCodes.push({ op: OP.ALLOC, val: symbols.set(kovs, 'const').pointer }) // const kovs = { stack.pop() }
  // let idx = 0
  opCodes.push({ op: OP.LOADK, val: 0 })
  opCodes.push({ op: OP.ALLOC, val: symbols.set(idx, 'let').pointer })
  // while (idx < len) {
  const testPc = opCodes.length
  opCodes.push({ op: OP.LOADV, val: symbols.get(idx).pointer })
  opCodes.push({ op: OP.LOADV, val: symbols.get(len).pointer })
  opCodes.push({ op: OP.BIOP, val: '<' })
  const ifnotCode = { op: OP.IFNOT, val: -1 }
  opCodes.push(ifnotCode)
  // { compile(node.left) } = kovs[idx++]
  opCodes.push({ op: OP.LOADV, val: symbols.get(kovs).pointer })
  opCodes.push({ op: OP.LOADV, val: symbols.get(idx).pointer })
  opCodes.push({ op: OP.COPY })
  opCodes.push({ op: OP.LOADK, val: 1 })
  opCodes.push({ op: OP.BIOP, val: '+' })
  opCodes.push({ op: OP.STORE, val: symbols.get(idx).pointer })
  opCodes.push({ op: OP.MGET })

  const left = node.left
  if (left.type === 'Identifier') {
    const symbol = symbols.get(left.name)
    if (symbol.type === 'const') {
      throw new TypeError('Assignment to constant variable')
    }
    opCodes.push({ op: OP.STORE, val: symbol.pointer })
  } else if (left.type === 'MemberExpression') {
    compile(left.object, state)
    const property = left.property
    if (property.type === 'Identifier') {
      opCodes.push({ op: OP.LOADK, val: property.name })
    } else { // node.computed === true
      compile(property, state)
    }
    opCodes.push({ op: OP.MSET })
  } else {
    compile(left, state)
  }

  compile(node.body, state)

  opCodes.push({ op: OP.JMP, val: testPc })
  ifnotCode.val = opCodes.length

  symbols.popScope()
}