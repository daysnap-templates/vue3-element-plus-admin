import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// pinia docs https://pinia.vuejs.org/zh/
export const pinia = createPinia()

// 持久化
// pinia persistedstate docs https://prazdevs.github.io/pinia-plugin-persistedstate/zh/
pinia.use(piniaPluginPersistedstate)
