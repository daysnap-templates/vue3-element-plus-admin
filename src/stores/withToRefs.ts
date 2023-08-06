import { storeToRefs } from 'pinia'

export function withToRefs<T extends (...args: any[]) => any>(fn: T, isTrans: boolean = true) {
  return (isTransform: boolean = isTrans, ...args: Parameters<T>): ReturnType<T> => {
    const result = fn(...args)

    if (isTransform) {
      return Object.assign({}, result, storeToRefs(result))
    }

    return result
  }
}
