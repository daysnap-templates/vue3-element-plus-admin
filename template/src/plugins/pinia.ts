import type { Plugin } from 'vue'
import { pinia } from '@/stores'

// pinia docs https://pinia.vuejs.org/zh/
// pinia persistedstate docs https://prazdevs.github.io/pinia-plugin-persistedstate/zh/
export default {
  install(app) {
    app.use(pinia)
  },
} as Plugin
