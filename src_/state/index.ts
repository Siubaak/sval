import { OpCode } from '../share/const'
import SymbolTable from './symbols'

export default class State {
  readonly stack: any[] = []

  readonly symbols: SymbolTable = new SymbolTable()

  readonly opCodes: OpCode[] = []

  context: any[] = []

  pc: number = 0
}