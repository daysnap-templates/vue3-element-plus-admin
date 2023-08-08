import type { Plugin, AppConfig } from 'vue'
import { __DEV__, excludeMessage } from '@/utils'
import { formatMessage } from '@daysnap/utils'

// global error handler
const errorHandler: AppConfig['errorHandler'] = (err) => {
  const message = formatMessage(err)
  if (message && !excludeMessage(message)) {
    ElMessage({
      message,
      type: 'warning',
    })
  }

  // development env 需要抛出异常 方便查看问题
  if (__DEV__) {
    throw err
  }
}

export default {
  install(app) {
    app.config.errorHandler = errorHandler
  },
} as Plugin
