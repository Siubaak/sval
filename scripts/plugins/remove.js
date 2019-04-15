module.exports = (origin) => {
  console.info(`\x1b[31m${origin.replace(/(\r\n|\r|\n)/g, '\\n').substring(0, 80)}\x1b[0m`)
  return ''
}