import { OpCode } from '../share/const'
import SymbolTable from './symbols'

export default class State {
  readonly stack: any[] = []

  esp: number = 0

  readonly ebpList: number[] = [0]

  readonly symbols: SymbolTable = new SymbolTable()

  readonly opCodes: OpCode[] = []

  context: { store: any }[] = [] // context item must be a ref type to maintain a lexical scope

  pc: number = 0

  readonly catchPcStack: { pc: number }[] = [] // mark catch statement pc for jump of throw statement
}

export class RateLimitedState extends State {
  private _pc: number = 0
  private stepCounter: number = 0;
  private stepLimit: number;

  constructor(stepLimit: number) {
    super();
    this.stepLimit = stepLimit;
  }

  get pc(): number {
    return this._pc;
  }

  set pc(value: number) {
    this.stepCounter += 1;
    this._pc = value;

    if (this.stepCounter > this.stepLimit) {
      throw new Error('Execution limit exceeded');
    }
  }
}