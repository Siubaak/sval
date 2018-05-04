import { parse, Options } from 'acorn'
import { Program } from 'estree'

class Sval {
  private options: Options

  constructor(options: Options) {
    this.options = options
  }

  eval(input: string) {
    const ast: Program = parse(input, this.options)
  }
}

if (window) {
  ;(window as any).Sval = Sval
}

export default Sval