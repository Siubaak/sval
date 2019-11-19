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
    state.opCodes.push({ op: OP.STORE, val: state.symbols.set('this', 'const').pointer , alloc: true })
    state.opCodes.push({ op: OP.STORE, val: state.symbols.set('arguments', 'var').pointer , alloc: true })
  }
  for (let i = 0; i < node.params.length; i++) {
    const param = node.params[i]
    if (param.type === 'Identifier') {
      state.opCodes.push({ op: OP.STORE, val: state.symbols.set(param.name, 'var').pointer , alloc: true })
    } else if (param.type === 'RestElement') {
      state.opCodes.push({ op: OP.REST, val: 'func' })
      const value = param.argument
      if (value.type === 'Identifier') {
        state.opCodes.push({ op: OP.STORE, val: state.symbols.set(value.name, 'var').pointer , alloc: true })
      } else if (value.type === 'MemberExpression') {
        compile(value.object, state)
        if (value.object.type === 'Super') {
          state.opCodes.push({ op: OP.LOADV, val: state.symbols.get('this').pointer })
        }
        const prop = value.property
        if (value.computed) {
          compile(prop, state)
        } else {
          state.opCodes.push({ op: OP.LOADK, val: (prop as estree.Identifier).name })
        }
        state.opCodes.push({ op: OP.MSET, val: value.object.type === 'Super' })
      } else {
        compilePattern(value, state)
      }
    } else {
      compilePattern(param, state)
    }
  }

  if (node.body.type === 'BlockStatement') {
    const block = node.body
    state.symbols.pushScope()
    hoist(block, state)
    for (let i = 0; i < block.body.length; i++) {
      compile(block.body[i], state)
      state.opCodes.push({ op: OP.GC })
    }
    state.symbols.popScope()
  } else {
    compile(node.body, state)
    state.opCodes.push({ op: OP.RET })
    state.opCodes.push({ op: OP.GC })
  }

  state.catchPcStack.pop()
  state.symbols.popScope()

  funCode.end = state.opCodes.length
}

type ClassDefinition = estree.ClassDeclaration | estree.ClassExpression

export function compileClass(node: ClassDefinition, state: State) {
  // class constructor
  const clsCode = { op: OP.CLS, val: node.id && node.id.name, constructor: false, inherit: false }
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
    if (met.computed) {
      compile(metKey, state)
    } else {
      state.opCodes.push({ op: OP.LOADK, val: (metKey as estree.Identifier).name })
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

  opCodes.push({ op: OP.STORE, val: symbols.set(len, 'const').pointer , alloc: true }) // const len = { stack.pop() }
  opCodes.push({ op: OP.STORE, val: symbols.set(kovs, 'const').pointer , alloc: true }) // const kovs = { stack.pop() }
  // let idx = 0
  opCodes.push({ op: OP.LOADK, val: 0 })
  opCodes.push({ op: OP.STORE, val: symbols.set(idx, 'let').pointer , alloc: true })
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
  } else if (left.type === 'VariableDeclaration') {
    state.symbols.type = left.kind
    for (let i = 0; i < left.declarations.length; i++) {
      const declr = left.declarations[i]
      if (declr.id.type === 'Identifier') {
        state.opCodes.push({ op: OP.STORE, val: state.symbols.set(declr.id.name).pointer , alloc: true })
      } else { // declr.id.type === 'Pattern'
        compilePattern(declr.id, state)
      }
    }
    state.symbols.type = null
  } else if (left.type === 'MemberExpression') {
    compile(left.object, state)
    if (left.object.type === 'Super') {
      state.opCodes.push({ op: OP.LOADV, val: state.symbols.get('this').pointer })
    }
    const property = left.property
    if (left.computed) {
      compile(property, state)
    } else {
      opCodes.push({ op: OP.LOADK, val: (property as estree.Identifier).name })
    }
    state.opCodes.push({ op: OP.MSET, val: left.object.type === 'Super' })
  } else {
    compilePattern(left, state)
  }

  compile(node.body, state)

  opCodes.push({ op: OP.JMP, val: testPc })
  ifnotCode.val = opCodes.length

  symbols.popScope()
}

export function hoist(block: estree.Program | estree.BlockStatement, state: State, onlyBlock: boolean = false) {
  state.symbols.hoist = true
  const funcDclrList: any[] = []
  const funcDclrIdxs: number[] = []
  for (let i = 0; i < block.body.length; i++) {
    const statement = block.body[i]
    if (statement.type === 'FunctionDeclaration') {
      state.symbols.set(statement.id.name, 'var')
      funcDclrList.push(statement)
      funcDclrIdxs.push(i)
    } else if (
      statement.type === 'VariableDeclaration'
      && ['const', 'let'].indexOf(statement.kind) !== -1
    ) {
      hoistVarDclr(statement, state)
    } else if (!onlyBlock) {
      hoistVar(statement as estree.Statement, state)
    }
  }
  if (funcDclrIdxs.length) {
    for (let i = funcDclrIdxs.length - 1; i > -1; i--) {
      block.body.splice(funcDclrIdxs[i], 1)
    }
    block.body = funcDclrList.concat(block.body)
  }
  state.symbols.hoist = false
}

function hoistVar(statement: estree.Statement, state: State) {
  switch (statement.type) {
    case 'VariableDeclaration':
      if (statement.kind === 'var') {
        hoistVarDclr(statement, state)
      }
      break
    case 'ForInStatement':
    case 'ForOfStatement':
      if (statement.left.type === 'VariableDeclaration') {
        hoistVar(statement.left, state)
      }
    case 'ForStatement':
      if (statement.type === 'ForStatement' && statement.init.type === 'VariableDeclaration') {
        hoistVar(statement.init, state)
      }
    case 'WhileStatement':
    case 'DoWhileStatement':
      hoistVar(statement.body, state)
      break
    case 'IfStatement':
      hoistVar(statement.consequent, state)
      hoistVar(statement.alternate, state)
      break
    case 'BlockStatement':
      for (let i = 0; i < statement.body.length; i++) {
        hoistVar(statement.body[i], state)
      }
      break
    case 'SwitchStatement':
      for (let i = 0; i < statement.cases.length; i++) {
        for (let j = 0; j < statement.cases[i].consequent.length; j++) {
          hoistVar(statement.cases[i].consequent[j], state)
        }
      }
      break
    case 'TryStatement': {
      const tryBlock = statement.block.body
      for (let i = 0; i < tryBlock.length; i++) {
        hoistVar(tryBlock[i], state)
      }
      const catchBlock = statement.handler && statement.handler.body.body
      if (catchBlock) {
        for (let i = 0; i < catchBlock.length; i++) {
          hoistVar(catchBlock[i], state)
        }
      }
      const finalBlock = statement.finalizer && statement.finalizer.body
      if (finalBlock) {
        for (let i = 0; i < finalBlock.length; i++) {
          hoistVar(finalBlock[i], state)
        }
      }
      break
    }
  }
}

function hoistVarDclr(node: estree.VariableDeclaration, state: State) {
  state.symbols.type = node.kind
  for (let i = 0; i < node.declarations.length; i++) {
    const declr = node.declarations[i]
    if (declr.id.type === 'Identifier') {
      state.symbols.set(declr.id.name)
    } else {
      // hoistVar(declr.id, state)
    }
  }
  state.symbols.type = null
}