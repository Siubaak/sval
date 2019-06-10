import { OpCode } from '../share/const'
import SymbolTable from './symbols'

export default class State {
  readonly stack: any[] = []

  readonly context: any[] = []

  readonly symbols: SymbolTable = new SymbolTable()

  readonly opCodes: OpCode[] = []
}