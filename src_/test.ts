import Sval from '.'

const interpreter = new Sval()
interpreter.run(`
for (const a of 'fdsa') { console.log(a) }
`)