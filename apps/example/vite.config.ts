import path from 'node:path'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 80,
    strictPort: true,
  },
  preview: {
    host: true,
    port: 80,
    strictPort: true,
  },
  resolve: {
    alias: [
      {
        find: '~',
        replacement: path.resolve(__dirname),
      },
    ],
  },
})
