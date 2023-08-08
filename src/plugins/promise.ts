import { ElMessage } from 'element-plus'
import { formatMessage, isFunction } from '@daysnap/utils'
import { excludeMessage } from '@/utils'

type ToastCallback = ((err: unknown, message: string) => boolean | void) | boolean

declare global {
  interface Promise<T> {
    toast(cb?: ToastCallback): Promise<T>
    null(): Promise<T>
    fix(): Promise<T>
    throw(err?: any): Promise<T>
  }
}

// toast
Promise.prototype.toast = async function (cb) {
  try {
    return await this
  } catch (err) {
    const message = formatMessage(err)

    if (isFunction(cb) && !cb(err, message)) {
      return
    }

    if (cb !== false && !excludeMessage(message)) {
      ElMessage({
        message,
        type: 'warning',
      })
    }
  }
}

// null only log err
Promise.prototype.null = async function () {
  try {
    return await this
  } catch (err) {
    return console.log(err)
  }
}

// 改变错误 error 信息
Promise.prototype.throw = async function (err = '') {
  try {
    return await this
  } catch {
    throw err
  }
}
