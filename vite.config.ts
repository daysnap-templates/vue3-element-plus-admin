
// https://vitejs.dev/config/

import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const resolve = dir => path.join(__dirname, dir)

export default defineConfig({
  plugins: [
    vue(),
    DefineOptions(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve('src'),
      'src': resolve('src'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {}
    }
  },
})
