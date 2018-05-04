export type varType = 'var' | 'let' | 'const'

export interface Variable {
  get(): any,
  set(value: any): boolean,
}

export class Var implements Variable {
  private type: varType
  private value: any

  constructor(type: varType, value: any) {
    this.type = type
    this.value = value
  }

  get(): any {
    return this.value
  }

  set(value: any): boolean {
    if (this.type === 'const') {
      return false
    } else {
      this.value = value
      return true
    }
  }
}

export class Prop implements Variable {
  private object: any
  private property: string
  private descriptor: PropertyDescriptor

  constructor(object: any, property: string) {
    this.object = object
    this.property = property
    this.descriptor = Object.getOwnPropertyDescriptor(object, property)
  }

  get(): any {
    const getter = this.descriptor && this.descriptor.get
    if (getter) {
      return getter.call(this.object)
    } else {
      return this.object[this.property]
    }
  }

  set(value: any): boolean {
    if (this.descriptor && !this.descriptor.writable) {
      return false
    }
    const setter = this.descriptor && this.descriptor.get
    if (setter) {
      setter.call(this.object, value)
    } else {
      this.object[this.property] = value
    }
    return true
  }

  del(): boolean {
    if (this.descriptor && !this.descriptor.configurable) {
      return false
    } else {
      return delete this.object[this.property]
    }
  }
}