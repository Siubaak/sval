import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { transformSync } from '@swc/core'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const from = 'dist/sval.umd.cjs'
const to = 'dist/sval.min.js'
const source = fs.readFileSync(path.resolve(__dirname, '..', from), 'utf-8')

const result = transformSync(source, { minify: true })
const code = `!function(){${result.code}}();`

fs.writeFileSync(path.resolve(__dirname, '..', to), code, 'utf-8')

console.info(`\n\x1b[33mLegacy file generated:\x1b[0m ${to}`)
