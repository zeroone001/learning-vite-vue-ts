import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import alias from '@rollup/plugin-alias'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    alias(),
    vue()
  ],
  server: {
    port: 8088,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
