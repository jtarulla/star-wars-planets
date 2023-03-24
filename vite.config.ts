import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import sass from 'vite-plugin-sass'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sass({
      include: '**/*.scss',
      prettier: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: true,
  },
  server: {
    host: true,
    strictPort: true,
    port: 3000,
  },
})
