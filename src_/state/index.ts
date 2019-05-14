import { OP } from '../share/const'

export default class State {
  stack: any[] = []
  context: {
    [name: string]: any
  } = {}
  opCodes: {
    op: OP,
    val?: any
  }[] = []
}