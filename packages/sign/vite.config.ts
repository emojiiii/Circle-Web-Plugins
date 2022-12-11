import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import prismjsPlugin from 'vite-plugin-prismjs'

const env = loadEnv('', process.cwd())

const proxy: Record<string, any> = {}
if (env.VITE_PROXY_HOST) {
  proxy['/api'] = {
    target: env.VITE_PROXY_HOST,
    changeOrigin: true
  }
}



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), prismjsPlugin({
    languages: ['typescript'],
    theme: 'dark',
    css: true
  })],
  server: {
    port: 5174,
    proxy
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
