export const freeze = Object.freeze

export const define = Object.defineProperty

export const getDptor = Object.getOwnPropertyDescriptor

const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(obj: any, key: symbol | string): boolean {
  return hasOwnProperty.call(obj, key)
}

const getOwnPropertyNames = Object.getOwnPropertyNames
export function getOwnNames(obj: any) {
  return getOwnPropertyNames(obj)
}

const getPrototypeOf = Object.getPrototypeOf
export function getProto(obj: any) {
  return getPrototypeOf ? getPrototypeOf(obj) : obj.__proto__
}

const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor
function getGetterOrSetter(method: 'get' | 'set', obj: any, key: string) {
  while (obj) {
    const descriptor = getOwnPropertyDescriptor(obj, key)
    const value = typeof descriptor !== 'undefined'
      && typeof descriptor.writable === 'undefined'
      && typeof descriptor[method] === 'function'
      && descriptor[method]
    if (value) {
      return value
    } else {
      obj = getProto(obj)
    }
  }
}
export function getGetter(obj: any, key: string) {
  return getGetterOrSetter('get', obj, key)
}
export function getSetter(obj: any, key: string) {
  return getGetterOrSetter('set', obj, key)
}

const create = Object.create
export function inherits(
  subClass: (...args: any[]) => any,
  superClass: (...args: any[]) => any,
) {
  subClass.prototype = create(superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
    }
  })
}

function assignPolyfill(...objects: any[]): any {
  if (objects.length === 0) {
    return null
  } else {
    const obj = objects[0]
    for (let i = 1; i < objects.length; ++i) {
      for (const key in objects[i]) {
        if (hasOwn(objects[i], key)) {
          obj[key] = objects[i][key]
        }
      }
    }
    return obj
  }
}
export const assign = typeof Object.assign === 'function'
  ? Object.assign
  : assignPolyfill

const win = assign({}, window)
export function createSandBox() {
  return assign({}, win)
}

export function createSymbol(key: string) {
  return Symbol ? Symbol(key) : `__${key}_${Math.random().toString(36).substring(2)}`
}

export function runGenerator(generator: (...args: any[]) => IterableIterator<any>, ...args: any[]) {
  const iterator = generator(...args)

  let result = iterator.next()
  while (!result.done) {
    result = iterator.next()
  }

  return result.value
}