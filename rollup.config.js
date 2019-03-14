import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import { uglify } from 'rollup-plugin-uglify'
import json from 'rollup-plugin-json'

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
  }
]