import State from '../state'
import * as estree from 'estree'
import { OP } from '../share/const'
import compile from '.'

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
    state.opCodes.push({ op: OP.ALLOC, val: state.symbols.set('const', 'this').pointer })
    state.opCodes.push({ op: OP.ALLOC, val: state.symbols.set('var', 'arguments').pointer })
  }
  for (let i = 0; i < node.params.length; i++) {
    const param = node.params[i]
    if (param.type === 'Identifier') {
      state.opCodes.push({ op: OP.ALLOC, val: state.symbols.set('var', param.name).pointer })
    } else if (param.type === 'RestElement') {
      
    } else {
      
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

export function compileCls(node: ClassDefinition, state: State) {
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
    } else if (metKey.type === 'Literal') {
      state.opCodes.push({ op: OP.LOADK, val: metKey.value })
    } else { // met.computed === true
      compile(metKey, state)
    }
    // definition
    state.opCodes.push({ op: OP.CMET, val: met.kind, static: met.static })
  }
}