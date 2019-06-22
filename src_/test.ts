import Sval from '.'

const interpreter = new Sval()
interpreter.run(`
  var start = Date.now()
  for (var i = 0; i < 10000000; i++) {}
  console.log((Date.now() - start) / 1000)
`)