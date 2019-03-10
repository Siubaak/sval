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

export let globalObj: any = {}
let names: string[] = []
try {
  // Browser environment
  names = getOwnNames(globalObj = window)
    .filter(n => n !== 'webkitStorageInfo')
} catch (err) {
  try {
    // Node environment
    names = getOwnNames(globalObj = global)
      .filter(n => n !== 'GLOBAL' && n !== 'root')
  } catch (err) {
    // Unknow environment
  }
}
const win: any = {}
for (const name of names) {
  try {
    win[name] = globalObj[name]
  } catch (err) {
    /* empty */
  }
}
export function createSandBox() {
  return assign({}, win)
}

export function createSymbol(key: string) {
  return key + Math.random().toString(36).substring(2)
}

export function runGenerator(
  generator: (...args: any[]) => IterableIterator<any>,
  ...args: any[]
) {
  const iterator = generator(...args)
  let result: IteratorResult<any>
  do {
    result = iterator.next()
  } while (!result.done)
  return result.value
}

export function runAsync(
  generator: (...args: any[]) => IterableIterator<any>,
  ...args: any[]
): Promise<any> {
  return new Promise((resolve, reject) => {
    const iterator = generator(...args)
    onFulfilled()
    function onFulfilled(res?: any) {
      let ret: any
      try {
        ret = iterator.next(res)
      } catch (e) {
        return reject(e)
      }
      next(ret)
      return null
    }
    function onRejected(err?: any) {
      let ret: any
      try {
        ret = iterator.throw(err)
      } catch (e) {
        return reject(e)
      }
      next(ret)
    }
    function next(ret: any) {
      if (ret.done) return resolve(ret.value)
      const value = typeof ret.value.then === 'function'
        ? ret.value
        : Promise.resolve(ret.value)
      return value.then(onFulfilled, onRejected)
    }
  })
}
