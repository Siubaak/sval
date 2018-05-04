export type varKind = 'var' | 'let' | 'const'

export interface Variable {
  get(): any,
  set(value: any): boolean,
}

export class Var implements Variable {
  private readonly kind: varKind
  private value: any

  constructor(kind: varKind, value: any) {
    this.kind = kind
    this.value = value
  }

  get(): any {
    return this.value
  }

  set(value: any) {
    if (this.kind === 'const') {
      return false
    } else {
      this.value = value
      return true
    }
  }
}

export class Prop implements Variable {
  private readonly object: any
  private readonly property: string

  constructor(object: any, property: string) {
    this.object = object
    this.property = property
  }

  get() {
    return this.object[this.property]
  }

  set(value: any) {
    this.object[this.property] = value
    return true
  }

  del() {
    return delete this.object[this.property]
  }
}
