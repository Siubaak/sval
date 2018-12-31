import { parse, Options } from 'acorn'
import { Program } from './evaluate/program'
import Scope from './scope'
import { hoist } from './share/helper'
import { getOwnNames, createSandBox } from './share/util'

export interface SvalOptions {
  ecmaVer?: 3 | 5 | 6 | 7 | 8 | 2015 | 2016 | 2017
  sandBox?: boolean
}

class Sval {
  private options: Options = {}
  private scope = new Scope(null, true)

  constructor(options: SvalOptions = {}) {
    let { ecmaVer, sandBox = true } = options

    if (
      ecmaVer !== 5
      && ecmaVer !== 6
      && ecmaVer !== 2015
    ) {
      ecmaVer = 5
    }

    this.options.ecmaVersion = ecmaVer

    if (sandBox) {
      // Shallow clone to create a sandbox
      const win = createSandBox()
      this.scope.let('window', win)
      this.scope.let('this', win)
    } else {
      this.scope.let('window', window)
      this.scope.let('this', window)
    }
  }

  addModules(modules: { [name: string]: any }) {
    const win = this.scope.find('window').get()
    const names = getOwnNames(modules)
    for (const name of names) {
      win[name] = modules[name]
    }
  }

  run(input: string) {
    const ast = parse(input, this.options)
    hoist(ast, this.scope)
    Program(ast, this.scope)
  }
}

try {
  (window as any).Sval = Sval
} catch (err) {
  /* empty */
}

export default Sval