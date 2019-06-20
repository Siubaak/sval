import Sval from '.'

const i = new Sval({ ecmaVer: 10 })

i.run(`
try {
  try {
    const a = 1
    throw a
    console.log(2)
  } catch (a) {
    console.log(a + 10)
    throw a
  }
} catch {
  console.log(20)
}
throw 2
`)