import Sval from '.'

const i = new Sval()

i.run(`
var log = console.log
var i = 1
log(i)
{
  var i = 3
  var j = 2
  log(i, j)
}
`)