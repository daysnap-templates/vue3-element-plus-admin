import banana from '@daysnap/banana'
import type { ProDialogFormMetadata, ProDialogFormRequest } from './types'
import type { ProDialogFormInstance } from '.'

export interface UseProDialogFormOptions {
  useBanana?: boolean
}

export interface UseProDialogFormWithBanana {
  (request: ProDialogFormRequest): ProDialogFormRequest
}

export function useProDialogForm<T = any>(
  generator: () => ProDialogFormMetadata,
  task: (
    metadata: ProDialogFormMetadata,
    withBanana: UseProDialogFormWithBanana,
    event?: T,
  ) => Promise<any>,
  options?: UseProDialogFormOptions,
) {
  const { useBanana } = Object.assign(
    {
      useBanana: true,
    },
    options,
  )

  const proDialogFormInstance = ref() as Ref<ProDialogFormInstance>

  const withBanana: UseProDialogFormWithBanana = (request) => {
    return (_, metadata) => request(banana.extract(metadata as any), metadata)
  }

  const trigger = (event?: T) => {
    const metadata = generator()
    if (event && useBanana) {
      banana.assignment(event, metadata as any)
    }

    return task(metadata, withBanana, event)
  }

  return [proDialogFormInstance, trigger] as const
}
