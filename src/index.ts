import { getOwnNames, createSandBox, globalObj, assign } from './share/util'
import { version } from '../package.json'
import { parse, Options } from 'acorn'
import { Node, Program } from 'estree'
import Scope from './scope'

import { hoist } from './evaluate_n/helper'
import evaluate from './evaluate_n'

export interface SvalOptions {
  ecmaVer?: 3 | 5 | 6 | 7 | 8 | 9 | 10 | 2015 | 2016 | 2017 | 2018 | 2019
  sandBox?: boolean
}

class Sval {
  static version: string = version

  private options: Options = {
    ecmaVersion: 2019,
  }
  private scope = new Scope(null, true)

  exports: { [name: string]: any } = {}

  constructor(options: SvalOptions = {}) {
    let { ecmaVer = 9, sandBox = true } = options

    ecmaVer -= ecmaVer < 2015 ? 0 : 2009 // format ecma edition

    if ([3, 5, 6, 7, 8, 9, 10].indexOf(ecmaVer) === -1) {
      throw new Error(`unsupported ecmaVer`)
    }

    this.options.ecmaVersion = ecmaVer as Options['ecmaVersion']

    if (sandBox) {
      // Shallow clone to create a sandbox
      const win = createSandBox()
      this.scope.let('window', win)
      this.scope.let('this', win)
    } else {
      this.scope.let('window', globalObj)
      this.scope.let('this', globalObj)
    }
    
    this.scope.const('exports', this.exports = {})
  }

  import(nameOrModules: string | { [name: string]: any }, mod?: any) {
    if (typeof nameOrModules === 'string') {
      nameOrModules = { [nameOrModules]: mod }
    }

    if (typeof nameOrModules !== 'object') return

    const names = getOwnNames(nameOrModules)
    
    for (let i = 0; i < names.length; i++) {
      const name = names[i]
      this.scope.var(name, nameOrModules[name])
    }
  }

  parse(code: string, parser?: (code: string, options: Options) => Node) {
    if (typeof parser === 'function') {
      return parser(code, assign({}, this.options))
    }
    return parse(code, this.options)
  }

  run(code: string | Node) {
    const ast = typeof code === 'string' ? parse(code, this.options) as Node : code
    hoist(ast as Program, this.scope)
    evaluate(ast, this.scope)
  }
}

export default Sval