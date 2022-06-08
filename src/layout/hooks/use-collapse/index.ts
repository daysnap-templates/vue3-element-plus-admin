
import { Ref } from "vue"

const collapse = ref<boolean>(false)

const setCollapse = (value: boolean) => collapse.value = value

export const useCollapse = (value?: boolean): [Ref<boolean>, typeof setCollapse] => {
  if (typeof value !== 'undefined') {
    setCollapse(value)
  }
  return [ readonly(collapse), setCollapse ]
}
