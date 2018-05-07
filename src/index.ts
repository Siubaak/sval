import { parse, Options } from 'acorn'
import { Program } from 'estree'
import Scope from './scope'
import { Modules, defModules } from './module'
import evaluate from './evaluate'
import defOptions, { GlobalOptions } from './share/option'

class Sval {
  private runOptions: Options = {}
  private scope = new Scope('block')

  constructor(options: GlobalOptions) {
    const { ecmaVer = 6, sandBox = true } = options

    defOptions.ecmaVer = ecmaVer
    defOptions.sandBox = sandBox

    this.runOptions.ecmaVersion = ecmaVer

    if (sandBox) {
      this.scope.let('window', defModules)
      this.scope.let('this', defModules)
    } else {
      this.scope.let('window', window)
      this.scope.let('this', window)
    }

    const names: string[] = Object.getOwnPropertyNames(defModules)
    for (const name of names) {
      this.scope.let(name, defModules[name])
    }
  }

  addModules(modules: Modules) {
    const names: string[] = Object.getOwnPropertyNames(modules)
    for (const name of names) {
      this.scope.let(name, modules[name])
    }
  }

  run(input: string) {
    const ast: Program = parse(input, this.runOptions)
    evaluate(ast, this.scope)
  }
}

export default Sval