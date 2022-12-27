import typescript from 'rollup-plugin-typescript2'
/*
import resolve from '@rollup/plugin-node-resolve'
import { uglify } from 'rollup-plugin-uglify'
*/
import json from '@rollup/plugin-json'

export default [
  {
    input: 'src/index.ts',
    output: {
      name: 'Sval',
      format: 'cjs',
      file: 'dist/sval.cjs',
      globals: {
        acorn: 'acorn'
      }
    },
    external: ['acorn'],
    plugins: [
      json(),
      typescript({
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          compilerOptions: {
            //target: 'esnext'
          }
        }
      })
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      name: 'Sval',
      format: 'esm',
      file: 'dist/sval.mjs',
      globals: {
        acorn: 'acorn'
      }
    },
    external: ['acorn'],
    plugins: [
      json(),
      typescript({
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          compilerOptions: {
            //target: 'esnext'
          }
        }
      })
    ]
  },
/*
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
*/
]
