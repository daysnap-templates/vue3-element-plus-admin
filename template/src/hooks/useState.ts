import { isFunction } from '@daysnap/utils'
import { ref, type Ref } from 'vue'

export type SetStateAction<S> = S | ((prevState?: S) => S)

export type Dispatch<T> = (value?: SetStateAction<T>) => void

export function useState<T>(initState?: T) {
  // https://github.com/vuejs/core/issues/2136
  const state = ref(initState) as Ref<T | undefined>

  const setState: Dispatch<T> = (value) => {
    state.value = isFunction(value) ? value(state.value) : value
  }

  return [state, setState] as const
}
