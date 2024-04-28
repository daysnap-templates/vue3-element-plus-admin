import { formatMessage } from '@daysnap/utils'
import type { AppConfig, Plugin } from 'vue'

import { __DEV__, excludeMessage, NProgress } from '@/utils'

// global error handler
const errorHandler: AppConfig['errorHandler'] = (err) => {
  NProgress.done()

  const message = formatMessage(err)
  if (message && !excludeMessage(message)) {
    ElMessage({
      message,
      type: 'warning',
    })
  }

  // development env 需要抛出异常 方便查看问题
  if (__DEV__) {
    console.error(err)
  }
}

export default {
  install(app) {
    app.config.errorHandler = errorHandler
  },
} as Plugin
