import { parse, Options } from 'acorn'
import { Program } from 'estree'
import Scope from './scope'
import { Modules, defModules } from './share/module'
import evaluate from './evaluate'

export interface SvalOptions {
  ecmaVer?: 3 | 5 | 6 | 7 | 8 | 2015 | 2016 | 2017
  sandBox?: boolean
}

class Sval {
  private runOptions: Options = {}
  private scope = new Scope('block')

  constructor(options: SvalOptions = {}) {
    const { ecmaVer = 5, sandBox = true } = options

    this.runOptions.ecmaVersion = ecmaVer

    if (sandBox) {
      this.scope.let('window', defModules)
      this.scope.let('this', defModules)
    } else {
      this.scope.let('window', window)
      this.scope.let('this', window)
    }
  }

  addModules(modules: Modules) {
    const win = this.scope.global().find('window').get()
    const names: string[] = Object.getOwnPropertyNames(modules)
    for (const name of names) {
      win[name] = modules[name]
    }
  }

  run(input: string) {
    const ast: Program = parse(input, this.runOptions)
    evaluate(ast, this.scope)
  }
}

if (window) {
  ;(window as any).Sval = Sval
}

export default Sval