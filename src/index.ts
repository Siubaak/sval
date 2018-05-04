import { parse, Options } from 'acorn'
import { Program } from 'estree'

class Interpreter {
  private options: Options

  constructor(options: Options) {
    this.options = options
  }

  eval(input: string) {
    const ast: Program = parse(input, this.options)
  }
}

export default Interpreter