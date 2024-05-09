import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//import basicSsl from '@vitejs/plugin-basic-ssl'
import fs from 'fs'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //basicSsl()
  ],
  server: {
    host:true,
    https: {
      key: fs.readFileSync('./privatekey.pem'),
      cert: fs.readFileSync('./cert.pem')
    },
    proxy: {
    '/register': {
      target: 'http://localhost:5173/',
      changeOrigin: true,
      secure: false,
      rewrite: path => path.replace('/register/user', ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
