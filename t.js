const Sval = require('./dist/lib').default

const interpreter = new Sval({ ecmaVer: 5 })

const window = {}

interpreter.run(`
  function a() {
    console.log(1)
  }
  a()
`)

