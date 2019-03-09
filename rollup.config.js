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
      file: 'dist/index.js'
    },
    plugins: [
      typescript({
        useTsconfigDeclarationDir: true
      }),
      resolve(),
      json()
    ]
  },
  {
    input: 'dist/index.js',
    output: {
      name: 'Sval',
      format: 'umd',
      file: 'dist/sval.min.js'
    },
    plugins: [
      uglify({
        compress: {
          drop_debugger: false
        }
      })
    ]
  }
]