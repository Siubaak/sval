import * as estree from 'estree'
import State from '../state'
import compile from '.'
import { OP } from '../share/const'
import { compilePattern } from './helper';

export function ObjectPattern(node: estree.ObjectPattern, state: State) {
  for (let i = 0; i < node.properties.length; i++) {
    const property = node.properties[i]
    let value: estree.Pattern = (property as estree.AssignmentProperty).value
    state.opCodes.push({ op: OP.COPY })
    if (property.type === 'Property') {
      const propKey = property.key
      if (propKey.type === 'Identifier') {
        state.opCodes.push({ op: OP.LOADK, val: propKey.name })
      } else { // property.computed === true
        compile(propKey, state)
      }
      state.opCodes.push({ op: OP.MGET })
    } else { // property.type === 'RestElement'
      for (let j = 0; j < i; j++) {
        const propKey = node.properties[j].key
        if (propKey.type === 'Identifier') {
          state.opCodes.push({ op: OP.LOADK, val: propKey.name })
        } else {
          compile(propKey, state)
        }
      }
      state.opCodes.push({ op: OP.REST, val: 'obj', remove: i })
      value = (property as any).argument
    }
    if (value.type === 'Identifier') {
      if (state.symbols.type) {
        state.opCodes.push({ op: OP.ALLOC, val: state.symbols.set(value.name).pointer })
      } else {
        state.opCodes.push({ op: OP.STORE, val: state.symbols.get(value.name).pointer })
      }
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
  }
  state.opCodes.push({ op: OP.POP })
}

export function ArrayPattern(node: estree.ArrayPattern, state: State) {
  for (let i = 0; i < node.elements.length; i++) {
    const element = node.elements[i]
    if (!element) continue // for the case: let [ , x] = [1, 2]
    let value: estree.Pattern = element
    state.opCodes.push({ op: OP.COPY })
    if (element.type === 'RestElement') {
      state.opCodes.push({ op: OP.REST, val: 'arr', remove: i })
      value = element.argument
    } else {
      state.opCodes.push({ op: OP.LOADK, val: i })
      state.opCodes.push({ op: OP.MGET })
    }
    if (value.type === 'Identifier') {
      if (state.symbols.type) {
        state.opCodes.push({ op: OP.ALLOC, val: state.symbols.set(value.name).pointer })
      } else {
        state.opCodes.push({ op: OP.STORE, val: state.symbols.get(value.name).pointer })
      }
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
  }
  state.opCodes.push({ op: OP.POP })
}

export function AssignmentPattern(node: estree.AssignmentPattern, state: State) {
  state.opCodes.push({ op: OP.COPY })
  state.opCodes.push({ op: OP.LOADK })
  state.opCodes.push({ op: OP.BIOP, val: '===' })
  const ifnotCode = { op: OP.IFNOT, val: -1 }
  state.opCodes.push(ifnotCode)
  // if undefined, assign the right value
  state.opCodes.push({ op: OP.POP })
  compile(node.right, state)
  ifnotCode.val = state.opCodes.length
  if (node.left.type === 'Identifier') {
    if (state.symbols.type) {
      state.opCodes.push({ op: OP.ALLOC, val: state.symbols.set(node.left.name).pointer })
    } else {
      state.opCodes.push({ op: OP.STORE, val: state.symbols.get(node.left.name).pointer })
    }
  } else {
    compilePattern(node.left, state)
  }
}