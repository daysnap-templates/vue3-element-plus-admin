import type { FormInstance, FormRules } from 'element-plus'

export function useForm<T extends Record<string, any>>(data: T, rules?: FormRules<T>) {
  const formRef = ref<FormInstance>()
  const formData = reactive(data)
  const formRules = reactive<FormRules<any>>(rules ?? {})

  return [formRef, formData, formRules] as const
}
