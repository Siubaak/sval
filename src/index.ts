import { getOwnNames, createSandBox, globalObj, assign } from './share/util.ts'
import { parse, Options, Node, Program } from 'acorn'
import { EXPORTS, IMPORT } from './share/const.ts'
import Scope from './scope/index.ts'
import PkgJson from '../package.json' with { type: 'json' }

import { Compiler, VM } from './bytecode/index.ts'

export interface SvalOptions {
  ecmaVer?: Options['ecmaVersion']
  sourceType?: Options['sourceType']
  sandBox?: boolean
}

const latestVer = 15

class Sval {
  static version: string = PkgJson.version

  private options: Options = { ecmaVersion: 'latest' }
  private scope = new Scope(null, true)

  exports: Record<string, any> = {}

  constructor(options: SvalOptions = {}) {
    let { ecmaVer = 'latest', sandBox = true, sourceType = 'script' } = options

    if (typeof ecmaVer === 'number') {
      ecmaVer -= ecmaVer < 2015 ? 0 : 2009 // format ecma edition
    }

    if (ecmaVer !== 'latest' && ecmaVer !== 3 && (ecmaVer < 5 || ecmaVer > latestVer)) {
      throw new Error(`unsupported ecmaVer`)
    }

    this.options.ecmaVersion = ecmaVer as Options['ecmaVersion']
    this.options.sourceType = sourceType

    if (sandBox) {
      // Shallow clone to create a sandbox
      const win = createSandBox()
      this.scope.let('globalThis', win)
      this.scope.let('window', win)
      this.scope.let('self', win)
      this.scope.let('this', win)
    } else {
      this.scope.let('globalThis', globalObj)
      this.scope.let('window', globalObj)
      this.scope.let('self', globalObj)
      this.scope.let('this', globalObj)
    }

    this.scope.const(sourceType === 'module' ? EXPORTS : 'exports', this.exports = {})
  }

  import(nameOrModules: string | Record<string, any>, mod?: any) {
    if (typeof nameOrModules === 'string') {
      nameOrModules = { [nameOrModules]: mod }
    }

    if (typeof nameOrModules !== 'object') return

    const names = getOwnNames(nameOrModules)

    for (let i = 0; i < names.length; i++) {
      const name = names[i]
      const modName = this.options.sourceType === 'module' ? IMPORT + name : name
      this.scope.var(modName, nameOrModules[name])
    }
  }

  parse(code: string, parser?: (code: string, options: Options) => Node) {
    if (typeof parser === 'function') {
      return parser(code, this.options)
    }
    return parse(code, this.options)
  }

  run(code: string | Node) {
    const ast = typeof code === 'string' ? this.parse(code) : code
    const scope = this.scope

    // Compile AST to bytecode
    const compiler = new Compiler()
    const bytecode = compiler.compile(ast, scope)

    // Check if top-level await is supported (async execution needed)
    if (this.options.sourceType === 'module' && (
      this.options.ecmaVersion === 'latest'
      || this.options.ecmaVersion >= 13
    )) {
      // Return promise for async execution
      const vm = new VM(scope, true)
      return vm.executeAsync(bytecode)
    } else {
      // Execute synchronously
      const vm = new VM(scope, false)
      return vm.execute(bytecode)
    }
  }
}

export default Sval