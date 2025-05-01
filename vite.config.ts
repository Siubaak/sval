import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      name: 'Sval',
      entry: 'src/index.ts',
    },
  },
  plugins: [
    dts(),
  ],
  test: {
    environment: 'happy-dom',
    coverage: {
      include: ['src/**/*.ts'],
    },
  },
})
