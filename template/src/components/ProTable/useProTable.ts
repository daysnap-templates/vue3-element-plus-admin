import { type Ref } from 'vue'

import type { ProQueryFormMetadata } from '../ProQueryForm'
import type { ProTableInstance } from '.'
import type { ProTableRequest } from './types'

export function useProTable(request: ProTableRequest): [Ref<ProTableInstance>, ProTableRequest]
export function useProTable(
  metadata: ProQueryFormMetadata,
  request: ProTableRequest,
): [ProQueryFormMetadata, Ref<ProTableInstance>, ProTableRequest]
export function useProTable(metadata?: any, request?: any): any[] {
  const proTableInstance = ref() as Ref<ProTableInstance>

  if (request) {
    const queryMetadata = reactive<ProQueryFormMetadata>(metadata)

    return [queryMetadata, proTableInstance, request]
  }

  request = metadata

  return [proTableInstance, request]
}
