import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import { uglify } from 'rollup-plugin-uglify'
import json from 'rollup-plugin-json'

import path from 'path'
import { readFileSync, writeFileSync } from 'fs'

const index = readFileSync(path.resolve(__dirname, 'src/index.ts'), 'utf-8')
const runtime = index
  .replace("import { parse, Options } from 'acorn'", "import { Options } from 'acorn'")
  .replace('const ast = parse(code, this.options)', 'const ast = code as any')

writeFileSync(path.resolve(__dirname, 'src/runtime.ts'), runtime)

export default [
  {
    input: 'src/index.ts',
    output: {
      name: 'Sval',
      format: 'umd',
      file: 'dist/index.js',
      globals: {
        acorn: 'acorn'
      }
    },
    external: ['acorn'],
    plugins: [
      json(),
      typescript({
        useTsconfigDeclarationDir: true
      })
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      name: 'Sval',
      format: 'umd',
      file: 'dist/sval.min.js'
    },
    plugins: [
      json(),
      resolve(),
      typescript({
        useTsconfigDeclarationDir: true
      }),
      uglify({
        compress: {
          drop_debugger: false
        }
      })
    ]
  },
  {
    input: 'src/runtime.ts',
    output: {
      name: 'Sval',
      format: 'umd',
      file: 'dist/runtime.js'
    },
    plugins: [
      json(),
      typescript({
        useTsconfigDeclarationDir: true
      })
    ]
  },
  {
    input: 'src/runtime.ts',
    output: {
      name: 'Sval',
      format: 'umd',
      file: 'dist/sval.runtime.min.js'
    },
    plugins: [
      json(),
      typescript({
        useTsconfigDeclarationDir: true
      }),
      uglify({
        compress: {
          drop_debugger: false
        }
      })
    ]
  }
]