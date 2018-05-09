const defineProperty = Object.defineProperty

export function define(
  obj: any,
  key: string,
  descriptor: PropertyDescriptor & ThisType<any>
): any {
  return defineProperty(obj, key, descriptor)
}

const hasOwnProperty = Object.prototype.hasOwnProperty

export function hasOwn(obj: any, key: string): boolean {
  return hasOwnProperty.call(obj, key)
}

const getOwnPropertyNames = Object.getOwnPropertyNames

export function getOwnNames(obj: any) {
  return getOwnPropertyNames(obj)
}