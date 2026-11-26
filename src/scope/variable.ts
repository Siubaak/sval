export type VarKind = 'var' | 'let' | 'const'

export interface Variable {
  get(): any,
  set(value: any): boolean,
}

export class Var implements Variable {
  readonly kind: VarKind
  private value: any

  constructor(kind: VarKind, value: any) {
    this.kind = kind
    this.value = value
  }

  get(): any {
    return this.value
  }

  set(value: any) {
    if (this.kind === 'const') {
      throw new TypeError('Assignment to constant variable')
    } else {
      return this.value = value
    }
  }
}

const hasReflect = typeof Reflect === 'object' && Reflect !== null

export class Prop implements Variable {
  private readonly object: any
  private readonly property: string
  private readonly strict: boolean

  /**
   * @param strict whether the reference comes from strict mode code,
   * where failed assignments and deletions throw instead of failing silently
   */
  constructor(object: any, property: string, strict: boolean = true) {
    this.object = object
    this.property = property
    this.strict = strict
  }

  get() {
    return this.object[this.property]
  }

  set(value: any) {
    const object = this.object
    if (this.strict || object === null || object === undefined || !hasReflect) {
      object[this.property] = value
    } else {
      // non-strict [[Set]] failures are silent; setter errors still propagate
      Reflect.set(Object(object), this.property, value, object)
    }
    return true
  }

  del() {
    const object = this.object
    if (this.strict || object === null || object === undefined || !hasReflect) {
      return delete object[this.property]
    }
    // non-strict delete of a non-configurable property evaluates to false
    return Reflect.deleteProperty(Object(object), this.property)
  }
}
