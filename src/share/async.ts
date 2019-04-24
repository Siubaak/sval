import { AWAIT } from './const'
import { hasOwn } from './util'

export interface runAsyncOptions {
  res?: any
  err?: any
  ret?: any
  fullRet?: boolean
}

export function runAsync(
  iterator: IterableIterator<any>,
  options: runAsyncOptions = {}
): Promise<any> {
  const { res, err, ret, fullRet } = options
  return new Promise((resolve, reject) => {
    if (hasOwn(options, 'ret')) {
      return resolve(iterator.return(ret))
    }
    if (hasOwn(options, 'err')) {
      onRejected(err)
    } else {
      onFulfilled(res)
    }
    function onFulfilled(res: any) {
      let ret: any
      try {
        ret = iterator.next(res)
      } catch (e) {
        return reject(e)
      }
      next(ret)
      return null
    }
    function onRejected(err: any) {
      let ret: any
      try {
        ret = iterator.throw(err)
      } catch (e) {
        return reject(e)
      }
      next(ret)
    }
    function next(ret: any) {
      if (ret.done) return resolve(fullRet ? ret : ret.value)
      if (ret.value !== AWAIT) return resolve(ret)
      const awaitValue = ret.value.RES
      const value = awaitValue && awaitValue.then === 'function'
        ? awaitValue : Promise.resolve(awaitValue)
      return value.then(onFulfilled, onRejected)
    }
  })
}