import Sval from './dist/index.js'

const interpreter = new Sval()
interpreter.run(`
  class Foo {
    constructor(...args) {
      console.log('Constructor called with:', args)
      this.args = args
      console.log('this.args:', this.args)
    }
    *[Symbol.iterator]() {
      console.log('Generator called, this.args:', this.args)
      for (let arg of this.args) {
        console.log('Yielding:', arg)
        yield arg
      }
    }
  }

  const params = ['hello', 'world']
  console.log('Creating Foo with params:', params)
  const foo = new Foo(...params)
  console.log('foo.args:', foo.args)

  const result = []
  console.log('Starting iteration')
  for (let x of foo) {
    console.log('Got value:', x)
    result.push(x)
  }
  console.log('Final result:', result)

  exports.target = params
  exports.actual = result
`)

console.log('target:', interpreter.exports.target)
console.log('actual:', interpreter.exports.actual)
