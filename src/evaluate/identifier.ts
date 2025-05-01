import { DEADZONE } from '../share/const.ts'
import Scope from '../scope/index.ts'
import * as acorn from 'acorn'

export interface IdentifierOptions {
  getVar?: boolean
  throwErr?: boolean
}

export function* Identifier(node: acorn.Identifier, scope: Scope, options: IdentifierOptions = {}) {
  const { getVar = false, throwErr = true } = options

  if (node.name === 'undefined') {
    return undefined
  }
  const variable = scope.find(node.name)
  if (variable) {
    if (getVar) { // left value
      return variable
    } else { // right value
      const value = variable.get()
      if (value === DEADZONE) {
        throw new ReferenceError(`${node.name} is not defined`)
      } else {
        return value
      }
    }
  } else if (throwErr) {
    throw new ReferenceError(`${node.name} is not defined`)
  } else {
    return undefined
  }
}

