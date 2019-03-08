import { parse, Options } from 'acorn'
import { Program } from './evaluate/program'
import Scope from './scope'
import { hoist } from './share/helper'
import { getOwnNames, createSandBox, runGenerator } from './share/util'

export interface SvalOptions {
  ecmaVer?: 3 | 5 | 6 | 7 | 8 | 2015 | 2016 | 2017
  sandBox?: boolean
}

class Sval {
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
      this.scope.let('window', window)
      this.scope.let('this', window)
    }
  }

  // Compatible
  addModules(modules: { [name: string]: any }) {
    console.warn('Use import instead. addModules is deprecated and will be removed soon.')
    this.import(modules)
  }

  import(nameOrModules: string | { [name: string]: any }, mod?: any) {
    const win = this.scope.find('window').get()

    if (typeof nameOrModules === 'string') {
      nameOrModules = { nameOrModules: mod }
    }

    if (typeof nameOrModules !== 'object') return

    const names = getOwnNames(nameOrModules)
    for (const name of names) {
      win[name] = nameOrModules[name]
    }
  }

  run(input: string) {
    this.scope.let('exports', this.exports = {})
    const ast = parse(input, this.options)
    runGenerator(hoist, ast, this.scope)
    runGenerator(Program, ast, this.scope)
  }
}

try {
  (window as any).Sval = Sval
} catch (err) {
  /* empty */
}

export default Sval