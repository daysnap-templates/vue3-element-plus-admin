import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { Plugin } from 'vue'

export default {
  install(app) {
    // https://element-plus.org/zh-CN/component/icon.html
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
} as Plugin
