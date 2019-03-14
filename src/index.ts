import { parse, Options } from 'acorn'
import Scope from './scope'
import { hoist } from './share/helper'
import { getOwnNames, createSandBox, runGenerator, globalObj } from './share/util'
import { version } from '../package.json'
import evaluate from './evaluate'

export interface SvalOptions {
  ecmaVer?: 3 | 5 | 6 | 7 | 8 | 2015 | 2016 | 2017
  sandBox?: boolean
}

class Sval {
  static version: string = version

  private options: Options = {}
  private scope = new Scope(null, true)

  exports: { [name: string]: any } = {}

  constructor(options: SvalOptions = {}) {
    let { ecmaVer, sandBox = true } = options

    if ([3, 5, 6, 7, 8, 2015, 2016, 2017].indexOf(ecmaVer) === -1) {
      ecmaVer = 7
    }

    this.options.ecmaVersion = ecmaVer

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
      nameOrModules = { nameOrModules: mod }
    }

    if (typeof nameOrModules !== 'object') return

    const names = getOwnNames(nameOrModules)
    for (const name of names) {
      this.scope.let(name, nameOrModules[name])
    }
  }

  run(code: string) {
    const ast = parse(code, this.options)
    runGenerator(hoist, ast, this.scope)
    runGenerator(evaluate, ast, this.scope)
  }
}

try {
  (window as any).Sval = Sval
} catch (err) {
  /* empty */
}

export default Sval