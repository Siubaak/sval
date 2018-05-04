import { Variable } from './variable'

type scopeType = 'block' | 'switch' | 'loop' | 'function'

export default class Scope {
  private context: { [key: string]: Variable }
  private parent: Scope | null

  constructor(type: any, parent?: Scope) {
    
  }
}