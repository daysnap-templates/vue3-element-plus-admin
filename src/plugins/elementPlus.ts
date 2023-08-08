import type { Plugin } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// import 'element-plus/es/components/message/style/css'
// import 'element-plus/es/components/message-box/style/css'
// import 'element-plus/es/components/notification/style/css'

export default {
  install(app) {
    // https://element-plus.org/zh-CN/component/icon.html
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
} as Plugin
