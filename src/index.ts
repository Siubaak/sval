import { getOwnNames, createSandBox, globalObj, assign } from './share/util.ts'
import { parse, Options, Node, Program } from 'acorn'
import { EXPORTS, IMPORT, STRICT } from './share/const.ts'
import Scope from './scope/index.ts'
import PkgJson from '../package.json' with { type: 'json' }

import { runAsync } from './share/async.ts'
import { hoist as hoistAsync } from './evaluate/helper.ts'
import { hoist } from './evaluate_n/helper.ts'
import evaluateAsync from './evaluate/index.ts'
import evaluate from './evaluate_n/index.ts'

export interface SvalOptions {
  ecmaVer?: Options['ecmaVersion']
  sourceType?: Options['sourceType']
  sandBox?: boolean
}

const latestVer = 15

function improveSyntaxError(err: SyntaxError & { pos?: number }, code: string): SyntaxError {
  if (typeof err.pos !== 'number' || !err.message.startsWith('Unexpected token')) return err
  const pos = err.pos
  const ch = pos < code.length ? code[pos] : undefined

  let ident: string | null = null

  if (ch !== undefined && /[a-zA-Z_$]/.test(ch)) {
    // error position is at the start of an identifier
    const m = code.slice(pos).match(/^[a-zA-Z_$][a-zA-Z0-9_$]*/)
    if (m) ident = m[0]
  } else if (ch === undefined || ch === '(') {
    // end of input or '(' — look backwards for a preceding identifier
    let end = pos
    while (end > 0 && /\s/.test(code[end - 1])) end--
    if (end > 0 && /[a-zA-Z0-9_$]/.test(code[end - 1])) {
      let start = end
      while (start > 0 && /[a-zA-Z0-9_$]/.test(code[start - 1])) start--
      const candidate = code.slice(start, end)
      if (/^[a-zA-Z_$]/.test(candidate)) ident = candidate
    }
  }

  if (ident) return new SyntaxError(`Unexpected identifier '${ident}'`)
  return err
}

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
      // ES modules have undefined as the top-level this (strict mode)
      this.scope.let('this', sourceType === 'module' ? undefined : win)
    } else {
      this.scope.let('globalThis', globalObj)
      this.scope.let('window', globalObj)
      this.scope.let('self', globalObj)
      // ES modules have undefined as the top-level this (strict mode)
      this.scope.let('this', sourceType === 'module' ? undefined : globalObj)
    }

    this.scope.const(sourceType === 'module' ? EXPORTS : 'exports', this.exports = {})

    if (sourceType === 'module') {
      this.scope.const(STRICT, true)
    }
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
    try {
      return parse(code, this.options)
    } catch (err) {
      throw improveSyntaxError(err as SyntaxError & { pos?: number }, code)
    }
  }

  run(code: string | Node) {
    const ast = typeof code === 'string' ? this.parse(code) : code
    const scope = this.scope
    // check if top-level await supports
    if (this.options.sourceType === 'module' && (
      this.options.ecmaVersion === 'latest'
      || this.options.ecmaVersion >= 13
    )) {
      runAsync((function* () {
        yield* hoistAsync(ast as Program, scope)
        yield* evaluateAsync(ast, scope)
      })())
    } else {
      hoist(ast as Program, scope)
      evaluate(ast, scope)
    }
  }
}

export default Sval