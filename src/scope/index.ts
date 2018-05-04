import { Variable, varKind, Var } from './variable'

type scopeType = 'block' | 'switch' | 'loop' | 'function'

export default class Scope {
  readonly type: scopeType
  private parent: Scope | null
  private context: { [key: string]: Variable } = {}
  invasived: boolean = false

  constructor(type: scopeType, parent: Scope = null, label?: string) {
    this.type = type
    this.parent = parent
  }

  find(name: string): Variable | null {
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

  private createVar(kind: varKind, name: string, value: string, scope:Scope = this) {
    const variable = scope.context[name]
    if (!variable) {
      this.context[name] = new Var(kind, value)
      return true
    } else {
      return false
    }
  }

  var(name: string, value: any) {
    let scope: Scope = this

    // Find the closest function scope
    while(scope.parent && scope.type !== 'function') {
      scope = scope.parent
    }

    return this.createVar('var', name, value, scope)
  }

  let(name: string, value: any) {
    return this.createVar('let', name, value)
  }

  const(name: string, value: any) {
    return this.createVar('const', name, value)
  }

  declare(kind: varKind, name: string, value: any) {
    return this[kind](name, value)
  }
}
