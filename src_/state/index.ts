import { OP } from '../share/const'

export type SymbolTable = { [name: string]: any }

export default class State {
  readonly stack: any[] = []

  readonly context: any[] = []

  readonly symbols: SymbolTable = {}

  readonly opCodes: {
    op: OP,
    val?: any
  }[] = []
}