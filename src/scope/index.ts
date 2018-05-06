import { Var, varKind } from './variable'

type scopeType = 'block' | 'switch' | 'loop' | 'function'

export default class Scope {
  readonly type: scopeType
  private parent: Scope | null
  private context: { [key: string]: Var } = {}
  invasived: boolean = false

  constructor(type: scopeType, parent: Scope = null, label?: string) {
    this.type = type
    this.parent = parent
  }

  global(): Scope {
    let scope: Scope = this
    while(scope.parent) {
      scope = scope.parent
    }
    return scope
  }

  find(name: string): Var | null {
    if (this.context.hasOwnProperty(name)) {
      // The variable locates in the scope
      return this.context[name]
    } else if (this.parent) {
      // Find variable along the scope chain
      return this.parent.find(name)
    } else {
      // Not found
      return null
    }
  }

  var(name: string, value: any) {
    let scope: Scope = this

    // Find the closest function scope
    while(scope.parent && scope.type !== 'function') {
      scope = scope.parent
    }

    scope.context[name] = new Var('var', value)
    return true
  }

  let(name: string, value: any) {
    const variable = this.context[name]
    if (!variable) {
      this.context[name] = new Var('let', value)
      return true
    } else {
      return false
    }
  }

  const(name: string, value: any) {
    const variable = this.context[name]
    if (!variable) {
      this.context[name] = new Var('const', value)
      return true
    } else {
      return false
    }
  }
}
