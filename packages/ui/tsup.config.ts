import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/button.tsx', 'src/card.tsx', 'src/code.tsx'],
  format: ['esm', 'cjs'],
  dts: true,
  external: ['react'],
})
