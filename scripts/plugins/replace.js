module.exports = (origin, props) => {
  const by = (props.by || '').replace(/\^/g, '>').replace(/\\s/g, ' ')
  console.info(`\x1b[31m${origin.replace(/(\r\n|\r|\n)/g, '\\n').substring(0, 40)}\x1b[0m -> \x1b[35m${by.substring(0, 40)}\x1b[0m`)
  return by
}