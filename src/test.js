const Sval = require('../dist/sval')

const interpreter = new Sval()
interpreter.run(`
var start = Date.now()
for (var i = 0; i < 50000000; i++) {}
console.log((Date.now() - start) / 1000) // 3.45s now :D
`)