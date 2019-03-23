import { Variable, Var, Prop } from './variable'
import { hasOwn, getOwnNames } from '../share/util'

/**
 * Scope simulation class
 */
export default class Scope {
  /**
   * The parent scope along the scope chain
   * @private
   * @readonly
   */
  private readonly parent: Scope | null
  /**
   * To distinguish function scope and block scope
   * The value is true for function scope or false for block scope
   * @readonly
   */
  readonly isolated: boolean

  /**
   * Context simulation object
   * @private
   * @readonly
   */
  private readonly context: { [key: string]: Var } = {}

  /**
   * Create a simulated scope
   * @param parent the parent scope along the scope chain (default: null)
   * @param isolated true for function scope or false for block scope (default: false)
   */
  constructor(
    parent: Scope = null,
    isolated: boolean = false,
  ) {
    this.parent = parent
    this.isolated = isolated
  }

  /**
   * Get global scope
   */
  global(): Scope {
    let scope: Scope = this
    while(scope.parent) {
      scope = scope.parent
    }
    return scope
  }

  /**
   * Clone current scope
   */
  clone(): Scope {
    const cloneScope = new Scope(this.parent, this.isolated)
    const names = getOwnNames(this.context)
    for (const name of names) {
      const variable = this.context[name]
      cloneScope[variable.kind](name, variable.get())
    }
    return cloneScope
  }

  /**
   * Find a variable along scope chain
   * @param name variable identifier name
   */
  find(name: symbol | string): Variable {
    if (hasOwn(this.context, name)) {
      // The variable locates in the scope
      return this.context[name as string]
    } else if (this.parent) {
      // Find variable along the scope chain
      return this.parent.find(name)
    } else {
      // If enter this branch, the scope will be the global scope
      // And the global scope should have window object
      const win = this.global().find('window').get()
      if (hasOwn(win, name)) {
        // Find property in window
        return new Prop(win, name)
      } else {
        // Not found
        return null
      }
    }
  }

  /**
   * Declare a var variable
   * @param name variable identifier name
   * @param value variable value
   */
  var(name: string, value: any) {
    let scope: Scope = this

    // Find the closest function scope
    while(scope.parent && !scope.isolated) {
      scope = scope.parent
    }

    scope.context[name as string] = new Var('var', value)

    if (!scope.parent) {
      const win = scope.find('window').get()
      win[name] = value
    }
  }

  /**
   * Declare a let variable
   * @param name variable identifier name
   * @param value variable value
   */
  let(name: string, value: any) {
    const variable = this.context[name as string]
    if (!variable) {
      this.context[name as string] = new Var('let', value)
    } else {
      throw new SyntaxError(`Identifier '${name}' has already been declared`)
    }
  }

  /**
   * Declare a const variable
   * @param name variable identifier name
   * @param value variable value
   */
  const(name: string, value: any) {
    const variable = this.context[name as string]
    if (!variable) {
      this.context[name as string] = new Var('const', value)
    } else {
      throw new SyntaxError(`Identifier '${name}' has already been declared`)
    }
  }
}
