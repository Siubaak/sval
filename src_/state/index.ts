import { OpCode } from '../share/const'

export type SymbolTable = { [name: string]: any }

export default class State {
  readonly stack: any[] = []

  readonly context: any[] = []

  symbols: SymbolTable = Object.create(null)
  symbolPointer: number = 0

  readonly opCodes: OpCode[] = []
}