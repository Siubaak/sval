import Sval from '.'

const i = new Sval()

i.run(`
for (var i = 0; i < 10; i++) {
  setTimeout(function (i) {
    console.log(i)
  }, 0, i)
}
`)