module.exports = (origin) => {
  const content = origin.match(/\/\*([\s\S]*)\*\//)
  if (content) {
    console.info(`\x1b[35m${content[1].substring(0, 80)}\x1b[0m`)
    return content[1]
  } else {
    return ''
  }
}