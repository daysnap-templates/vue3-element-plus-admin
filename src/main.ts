import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { usePermissStore } from '@/store/permiss'

const app = createApp(App)

;((s) => Object.values(s).forEach((it: any) => it.default && app.use(it.default)))(
  import.meta.glob('./plugins/*.ts', { eager: true }),
)

app.use(router).use(store).mount('#app')

const permiss = usePermissStore()
app.directive('permiss', {
  mounted(el, binding) {
    console.log(binding)
    if (!permiss.key.includes(String(binding.value))) {
      console.log(el)
      el['hidden'] = true
    }
  },
})
