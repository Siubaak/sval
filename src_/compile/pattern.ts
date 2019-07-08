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
        state.opCodes.push({ op: OP.ALLOC, val: state.symbols.set(value.name).pointer })
      } else {
        compilePattern(value, state)
      }
    } else {
      
    }
  }
}

export function ArrayPattern(node: estree.ArrayPattern, state: State) {

}

export function AssignmentPattern(node: estree.AssignmentPattern, state: State) {

}

export function RestElement(node: estree.RestElement, state: State) {
  if (node.argument.type === 'Identifier') {
    
  }
}
