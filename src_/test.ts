import Sval from '.'

const i = new Sval()

i.run(`
let a = 0
switch (2) {
  case 1: a++
  case 2: a++
  case 3: a++
  default: console.log(a)
}
`)