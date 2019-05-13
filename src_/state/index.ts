import { OP } from '../share/const'

export default class State {
  opcodes: {
    op: OP,
    val: any
  }[] = []
}