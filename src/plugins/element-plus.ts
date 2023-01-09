import { Plugin } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default {
  install(app) {
    // https://element-plus.gitee.io/zh-CN/component/icon.html
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
} as Plugin
