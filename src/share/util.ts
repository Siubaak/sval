function toString(val: any): string {
  return Object.prototype.toString.call(val)
}

export const is = {
  undefined: (val: any) => toString(val) === '[object Undefined]',
  null: (val: any) => toString(val) === '[object Null]',
  number: (val: any) => toString(val) === '[object Number]',
  string: (val: any) => toString(val) === '[object String]',
  boolean: (val: any) => toString(val) === '[object Boolean]',
  symbol: (val: any) => toString(val) === '[object Symbol]',
  object: (val: any) => toString(val) === '[object Object]',
  array: (val: any) => toString(val) === '[object Array]',
  function: (val: any) => toString(val) === '[object Function]',
}