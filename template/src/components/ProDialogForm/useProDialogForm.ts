import banana from '@daysnap/banana'
import { type Ref } from 'vue'

import type { ProDialogFormInstance } from '.'
import type { ProDialogFormMetadata } from './types'

export interface UseProDialogFormOptions<T = any> {
  useBanana?: boolean
  instance?: Ref<ProDialogFormInstance>
  onGenerate?: (metadata: ProDialogFormMetadata, event?: T, ...args: any[]) => void
  onSuccess?: (metadata: ProDialogFormMetadata, event?: T, ...args: any[]) => void
}

export function useProDialogForm<T = any>(
  generator: () => ProDialogFormMetadata,
  task: (
    metadata: ProDialogFormMetadata,
    instance: Ref<ProDialogFormInstance>,
    event?: T,
    ...args: any[]
  ) => Promise<any>,
  options?: UseProDialogFormOptions<T>,
) {
  const { useBanana, instance, onGenerate, onSuccess } = Object.assign(
    {
      useBanana: true,
    },
    options,
  )

  const proDialogFormInstance = instance ?? (ref() as Ref<ProDialogFormInstance>)

  const metadata = ref() as Ref<ProDialogFormMetadata>
  const trigger = async (event?: T, ...args: any[]) => {
    metadata.value = generator()
    if (event && useBanana) {
      banana.assignment(event, metadata.value as any)
    }

    onGenerate?.(metadata.value, event, ...args)

    await task(metadata.value, proDialogFormInstance, event, ...args)

    onSuccess?.(metadata.value, event, ...args)
  }

  return [proDialogFormInstance, trigger, metadata] as const
}

export function createProDialogForm<T = any>(
  generator: () => ProDialogFormMetadata,
  task: (
    metadata: ProDialogFormMetadata,
    instance: Ref<ProDialogFormInstance>,
    event?: T,
    ...args: any[]
  ) => Promise<any>,
  opt?: UseProDialogFormOptions<T>,
) {
  return function (options?: UseProDialogFormOptions<T>) {
    return useProDialogForm<T>(generator, task, {
      ...opt,
      ...options,
      onGenerate: (...args) => {
        opt?.onGenerate?.(...args)
        options?.onGenerate?.(...args)
      },
    })
  }
}
