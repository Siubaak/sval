import { version } from '../package.json'
import { parse, Options } from 'acorn'
import State from './state'

import execute from './jsvm'
import compile from './compile'
import { createSandBox, globalObj, getOwnNames } from './share/utils'
import { OP } from './share/const'
import { hoist } from './compile/helper'

export interface SvalOptions {
  ecmaVer?: 3 | 5 | 6 | 7 | 8 | 9 | 10 | 2015 | 2016 | 2017 | 2018 | 2019
  sandBox?: boolean,
  stepLimit?: number
}

class Sval {
  static version: string = version

  private options: Options = {}
  private state = new State()
  private stepLimit: number | null

  exports: { [name: string]: any } = {}

  constructor(options: SvalOptions = {}) {
    let { ecmaVer = 9, sandBox = true, stepLimit = null } = options

    this.stepLimit = stepLimit;

    ecmaVer -= ecmaVer < 2015 ? 0 : 2009 // format ecma edition

    if ([3, 5, 6, 7, 8, 9, 10].indexOf(ecmaVer) === -1) {
      throw new Error(`unsupported ecmaVer`)
    }

    this.options.ecmaVersion = ecmaVer as Options['ecmaVersion']

    if (sandBox) {
      // Shallow clone to create a sandbox
      const win = createSandBox()
      if (win.window !== win) {
        win.window = win
      }
      this.import('this', win)
      this.import(win)
    } else {
      if (globalObj.window !== globalObj) {
        globalObj.window = globalObj
      }
      this.import('this', globalObj)
      this.import(globalObj)
    }
    this.import('exports', this.exports)
  }

  import(nameOrModules: string | { [name: string]: any }, mod?: any) {
    if (typeof nameOrModules === 'string') {
      nameOrModules = { [nameOrModules]: mod }
    }

    if (typeof nameOrModules !== 'object') return

    const names = getOwnNames(nameOrModules)
 
    for (let i = 0; i < names.length; i++) {
      const name = names[i]
      const pointer = this.state.symbols.set(name, 'var').pointer
      this.state.context[pointer] = { store: nameOrModules[name] }
    }
  }

  run(code: string) {
    const ast = parse(code, this.options) as any
    hoist(ast, this.state)
    compile(ast, this.state)
    // for (let i = 0; i < this.state.opCodes.length; i++) {
    //   const opCode = this.state.opCodes[i]
    //   console.log(i, (OP as any)[opCode.op], typeof opCode.val === 'undefined' ? '' : opCode.val)
    // }
    execute(this.state, this.stepLimit)
  }
}

export default Sval