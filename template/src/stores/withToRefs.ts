import {
  type PiniaCustomStateProperties,
  type StoreGeneric,
  type StoreGetters,
  type StoreState,
  storeToRefs,
} from 'pinia'
import type { ComputedRef, Ref, ToRef, ToRefs } from 'vue'

type WithToRefsResult<T, P> = Omit<T, keyof P> & P

type StoreToRefs<SS extends StoreGeneric> = ToRefs<
  StoreState<SS> & PiniaCustomStateProperties<StoreState<SS>>
> &
  ToComputedRefs<StoreGetters<SS>>

type ToComputedRefs<T> = {
  [K in keyof T]: ToRef<T[K]> extends Ref<infer U> ? ComputedRef<U> : ToRef<T[K]>
}

export function withToRefs<T extends (...args: any[]) => any>(fn: T) {
  function withToRefsCore(isTransform?: false, ...args: Parameters<T>): ReturnType<T>
  function withToRefsCore(
    isTransform: true,
    ...args: Parameters<T>
  ): WithToRefsResult<ReturnType<T>, StoreToRefs<ReturnType<T>>>
  function withToRefsCore(isTransform?: boolean, ...args: Parameters<T>) {
    const result = fn(...args)

    if (isTransform) {
      return Object.assign({}, result, storeToRefs(result))
    }

    return result
  }

  return withToRefsCore
}
