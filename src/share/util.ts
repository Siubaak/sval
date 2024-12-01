export const freeze = Object.freeze

export const define = Object.defineProperty

export const getDptor = Object.getOwnPropertyDescriptor

const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(obj: any, key: string): boolean {
  return hasOwnProperty.call(obj, key)
}

export const getOwnNames = Object.getOwnPropertyNames

const setPrototypeOf = Object.setPrototypeOf
export function setProto(obj: any, proto: any) {
  setPrototypeOf ? setPrototypeOf(obj, proto) : obj.__proto__ = proto
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

export const create = Object.create
export function inherits(
  subClass: (...args: any[]) => any,
  superClass: (...args: any[]) => any,
) {
  setProto(subClass, superClass) // allow to access static methods from derived class
  subClass.prototype = create(superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
    }
  })
}

export function _assign(target: any): any {
    for (let i = 1; i < arguments.length; ++i) {
      const source = arguments[i]
      for (const key in source) {
        if (hasOwn(source, key)) {
          target[key] = source[key]
        }
      }
    }
    return target
}
export const assign = Object.assign ||  _assign

declare let WebAssembly: any // Avoid typescript error
let names: string[] = []
export let globalObj = create(null)
try {
  // Browser environment
  if (!window.Object) throw 0
  names = getOwnNames(globalObj = window).filter(n => n !== 'webkitStorageInfo')
} catch (err) {
  /* istanbul ignore next */
  try {
    // Node environment
    if (!global.Object) throw 0
    names = getOwnNames(globalObj = global).filter(n => n !== 'GLOBAL' && n !== 'root')
  } catch (err) {
    // Unknow environment, simulate a global environment
    try { globalObj.Object = Object                         } catch (err) { /* empty */ }
    try { globalObj.Function = Function                     } catch (err) { /* empty */ }
    try { globalObj.Array = Array                           } catch (err) { /* empty */ }
    try { globalObj.Number = Number                         } catch (err) { /* empty */ }
    try { globalObj.parseFloat = parseFloat                 } catch (err) { /* empty */ }
    try { globalObj.parseInt = parseInt                     } catch (err) { /* empty */ }
    try { globalObj.Infinity = Infinity                     } catch (err) { /* empty */ }
    try { globalObj.NaN = NaN                               } catch (err) { /* empty */ }
    try { globalObj.undefined = undefined                   } catch (err) { /* empty */ }
    try { globalObj.Boolean = Boolean                       } catch (err) { /* empty */ }
    try { globalObj.String = String                         } catch (err) { /* empty */ }
    try { globalObj.Symbol = Symbol                         } catch (err) { /* empty */ }
    try { globalObj.Date = Date                             } catch (err) { /* empty */ }
    try { globalObj.Promise = Promise                       } catch (err) { /* empty */ }
    try { globalObj.RegExp = RegExp                         } catch (err) { /* empty */ }
    try { globalObj.Error = Error                           } catch (err) { /* empty */ }
    try { globalObj.EvalError = EvalError                   } catch (err) { /* empty */ }
    try { globalObj.RangeError = RangeError                 } catch (err) { /* empty */ }
    try { globalObj.ReferenceError = ReferenceError         } catch (err) { /* empty */ }
    try { globalObj.SyntaxError = SyntaxError               } catch (err) { /* empty */ }
    try { globalObj.TypeError = TypeError                   } catch (err) { /* empty */ }
    try { globalObj.URIError = URIError                     } catch (err) { /* empty */ }
    try { globalObj.JSON = JSON                             } catch (err) { /* empty */ }
    try { globalObj.Math = Math                             } catch (err) { /* empty */ }
    try { globalObj.console = console                       } catch (err) { /* empty */ }
    try { globalObj.Intl = Intl                             } catch (err) { /* empty */ }
    try { globalObj.ArrayBuffer = ArrayBuffer               } catch (err) { /* empty */ }
    try { globalObj.Uint8Array = Uint8Array                 } catch (err) { /* empty */ }
    try { globalObj.Int8Array = Int8Array                   } catch (err) { /* empty */ }
    try { globalObj.Uint16Array = Uint16Array               } catch (err) { /* empty */ }
    try { globalObj.Int16Array = Int16Array                 } catch (err) { /* empty */ }
    try { globalObj.Uint32Array = Uint32Array               } catch (err) { /* empty */ }
    try { globalObj.Int32Array = Int32Array                 } catch (err) { /* empty */ }
    try { globalObj.Float32Array = Float32Array             } catch (err) { /* empty */ }
    try { globalObj.Float64Array = Float64Array             } catch (err) { /* empty */ }
    try { globalObj.Uint8ClampedArray = Uint8ClampedArray   } catch (err) { /* empty */ }
    try { globalObj.DataView = DataView                     } catch (err) { /* empty */ }
    try { globalObj.Map = Map                               } catch (err) { /* empty */ }
    try { globalObj.Set = Set                               } catch (err) { /* empty */ }
    try { globalObj.WeakMap = WeakMap                       } catch (err) { /* empty */ }
    try { globalObj.WeakSet = WeakSet                       } catch (err) { /* empty */ }
    try { globalObj.Proxy = Proxy                           } catch (err) { /* empty */ }
    try { globalObj.Reflect = Reflect                       } catch (err) { /* empty */ }
    try { globalObj.BigInt = BigInt                         } catch (err) { /* empty */ }
    try { globalObj.decodeURI = decodeURI                   } catch (err) { /* empty */ }
    try { globalObj.decodeURIComponent = decodeURIComponent } catch (err) { /* empty */ }
    try { globalObj.encodeURI = encodeURI                   } catch (err) { /* empty */ }
    try { globalObj.encodeURIComponent = encodeURIComponent } catch (err) { /* empty */ }
    try { globalObj.escape = escape                         } catch (err) { /* empty */ }
    try { globalObj.unescape = unescape                     } catch (err) { /* empty */ }
    try { globalObj.eval = eval                             } catch (err) { /* empty */ }
    try { globalObj.isFinite = isFinite                     } catch (err) { /* empty */ }
    try { globalObj.isNaN = isNaN                           } catch (err) { /* empty */ }
    try { globalObj.SharedArrayBuffer = SharedArrayBuffer   } catch (err) { /* empty */ }
    try { globalObj.Atomics = Atomics                       } catch (err) { /* empty */ }
    try { globalObj.WebAssembly = WebAssembly               } catch (err) { /* empty */ }
    try { globalObj.clearInterval = clearInterval           } catch (err) { /* empty */ }
    try { globalObj.clearTimeout = clearTimeout             } catch (err) { /* empty */ }
    try { globalObj.setInterval = setInterval               } catch (err) { /* empty */ }
    try { globalObj.setTimeout = setTimeout                 } catch (err) { /* empty */ }
    try { globalObj.crypto = crypto                         } catch (err) { /* empty */ }
    try { globalObj.URL = URL                               } catch (err) { /* empty */ }
    names = getOwnNames(globalObj)
  }
}
if (globalObj.Symbol) {
  !globalObj.Symbol.iterator && (globalObj.Symbol.iterator = createSymbol('iterator'))
  !globalObj.Symbol.asyncIterator && (globalObj.Symbol.asyncIterator = createSymbol('asynciterator'))
}
const win = create({})
for (let i = 0; i < names.length; i++) {
  const name = names[i]
  try { win[name] = globalObj[name] } catch (err) { /* empty */ }
}
export const WINDOW = createSymbol('window')
export function createSandBox() {
  return assign(create({ [WINDOW]: globalObj }), win)
}

export function createSymbol(key: string) {
  return key + Math.random().toString(36).substring(2)
}

export function getAsyncIterator(obj: any) {
  let iterator: any
  if (typeof Symbol === 'function') {
    iterator = obj[Symbol.asyncIterator]
    !iterator && (iterator = obj[Symbol.iterator])
  }
  if (iterator) {
    return iterator.call(obj)
  } else if (typeof obj.next === 'function') {
    return obj
  } else {
    let i = 0
    return {
      next() {
        if (obj && i >= obj.length) obj = undefined
        return { value: obj && obj[i++], done: !obj }
      }
    }
  }
}
