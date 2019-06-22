import Sval from '.'

const i = new Sval({ ecmaVer: 10 })
i.import('a', function a() { throw 12 })
i.run(`
try {
  a()

} catch (err) {
  console.log(err)
}
`)