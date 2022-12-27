import { defineConfig } from "vite";

export default defineConfig(() => ({
  build: {
    lib: {
      name: 'sval',
      entry: 'src/index.ts',
      formats:[
        'esm',
        'cjs',
        'umd',
      ]
    },
    minify: false,
  }
}))
