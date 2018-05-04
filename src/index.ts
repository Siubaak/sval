import { parse, Options } from 'acorn'
import { Program } from 'estree'
import Scope from './scope'
import { Modules, defModules } from './module'
import evaluate from './evaluate';

class Sval {
  private options: Options
  private scope = new Scope('block')

  constructor(options: Options) {
    this.options = options
    const names: string[] = Object.getOwnPropertyNames(defModules)
    for (const name of names) {
      this.scope.const(name, defModules[name])
    }
  }

  addModules(modules: Modules) {
    const names: string[] = Object.getOwnPropertyNames(modules)
    for (const name of names) {
      this.scope.const(name, modules[name])
    }
  }

  run(input: string) {
    const ast: Program = parse(input, this.options)
    evaluate(ast, this.scope)
  }
}

if (window) {
  ;(window as any).Sval = Sval
}

export default Sval