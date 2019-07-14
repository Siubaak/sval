import * as estree from 'estree'
import State from '../state'
import compile from '.'
import { OP } from '../share/const'
import { compilePattern } from './helper';

export function ObjectPattern(node: estree.ObjectPattern, state: State) {
  for (let i = 0; i < node.properties.length; i++) {
    const property = node.properties[i]
    if (property.type === 'Property') {
      state.opCodes.push({ op: OP.COPY })
      // key
      const propKey = property.key
      if (propKey.type === 'Identifier') {
        state.opCodes.push({ op: OP.LOADK, val: propKey.name })
      } else { // property.computed === true
        compile(propKey, state)
      }
      state.opCodes.push({ op: OP.MGET })
      // value
      const value = property.value
      if (value.type === 'Identifier') {
        if (state.symbols.type) {
          state.opCodes.push({ op: OP.ALLOC, val: state.symbols.set(value.name).pointer })
        } else {
          state.opCodes.push({ op: OP.STORE, val: state.symbols.get(value.name).pointer })
        }
      } else if (value.type === 'MemberExpression') {
        compile(value.object, state)
        const property = value.property
        if (property.type === 'Identifier') {
          state.opCodes.push({ op: OP.LOADK, val: property.name })
        } else { // node.computed === true
          compile(property, state)
        }
        state.opCodes.push({ op: OP.MSET })
      } else {
        compilePattern(value, state)
      }
    } else { // property.type === 'RestElement'
      
    }
  }
}

export function ArrayPattern(node: estree.ArrayPattern, state: State) {
  for (let i = 0; i < node.elements.length; i++) {
    const element = node.elements[i]
    state.opCodes.push({ op: OP.COPY })
    if (element.type === 'Identifier') {

    } else if (element.type === 'MemberExpression') {
      
    } else if (element.type === 'RestElement') {

    } else {
      compilePattern(element, state)
    }
  }
}

export function AssignmentPattern(node: estree.AssignmentPattern, state: State) {

}

export function RestElement(node: estree.RestElement, state: State) {
  if (node.argument.type === 'Identifier') {
    
  }
}
