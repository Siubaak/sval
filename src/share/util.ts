export const freeze = Object.freeze

export const define = Object.defineProperty

const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(obj: any, key: string): boolean {
  return hasOwnProperty.call(obj, key)
}

const getOwnPropertyNames = Object.getOwnPropertyNames
export function getOwnNames(obj: any) {
  return getOwnPropertyNames(obj)
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

declare function require(module: string): any
export const walk = require('acorn/dist/walk').simple
