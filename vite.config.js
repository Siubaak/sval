import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

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
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
}))

/*
FIXME slow
build: 20 sec
types: 40 sec
*/
