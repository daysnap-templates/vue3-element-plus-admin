import { isBoolean } from '@daysnap/utils'
import { pinia } from './pinia'

export function withOut<T extends (...args: any[]) => any>(fn: T) {
  return (...args: Parameters<T>): ReturnType<T> => {
    // fix 修正 与 withToRefs 嵌套使用的问题
    let index = args.findIndex((item) => isBoolean(item))
    return fn(args[++index] ?? pinia, ...args.slice(++index))
  }
}
