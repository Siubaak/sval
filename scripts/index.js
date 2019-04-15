const fs = require('fs')
const path = require('path')
const plugins = {
  add: require('./plugins/add'),
  remove: require('./plugins/remove'),
  replace: require('./plugins/replace')
}

const files = fs.readdirSync(path.resolve(__dirname, '../src/evaluate'))

for (const name of files) {
  let code = fs.readFileSync(path.resolve(__dirname, '../src/evaluate', name), 'utf-8')

  code = code.replace(/function\*/g, 'function')
    .replace(/:\sIterableIterator<any>/g, ': any')
    .replace(/yield\*\s/g, '')

  code = code.replace(/\/\*<([^>]+?)>\*\/([\s\S]*?)\/\*<\/([^>]+?)>\*\//g,
    (origin, start, content, end) => {
      const params = start.split(' ')
      if (params[0] !== end) return origin
      const props = {}
      for (let i = 1; i < params.length; i++) {
        const kv = params[i].split(':=')
        props[kv[0]] = kv[1] || true
      }
      if (plugins[end]) {
        console.info(`\x1b[33m[${end.toUpperCase()}]\x1b[0m ${name}`)
        return plugins[end](content, props)
      } else {
        return origin
      }
    }
  )
  
  if (!fs.existsSync(path.resolve(__dirname, '../src/evaluate_n'))) {
    fs.mkdirSync(path.resolve(__dirname, '../src/evaluate_n'))
  }

  fs.writeFileSync(path.resolve(__dirname, '../src/evaluate_n', name), code, 'utf-8')
}