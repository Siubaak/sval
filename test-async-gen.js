const Sval = require('./dist/sval.umd.cjs')

const interpreter = new Sval()

interpreter.run(`
  async function* a() {
    console.log('generator started')
    yield 1
    console.log('after first yield')
    yield 2
    console.log('after second yield')
  }

  const g = a()
  console.log('created generator:', g)
  console.log('calling next()...')
  const p1 = g.next()
  console.log('next() returned:', p1)
  p1.then(r => {
    console.log('first result:', r)
  }).catch(e => {
    console.error('error:', e)
  })
`)

setTimeout(() => {
  console.log('timeout - test did not complete')
  process.exit(1)
}, 2000)
