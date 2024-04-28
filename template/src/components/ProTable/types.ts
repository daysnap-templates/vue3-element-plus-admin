import type { ExtractPropTypes } from 'vue'

import type { ProQueryFormMetadata } from '../ProQueryForm'

export interface ProTableRequest<T = any> {
  (state: [number, number], query: any): Promise<[T[], number]>
}

export const proTableProps = {
  height: [String, Number],
  pd: {
    type: String,
    default: '',
  },
  hasPagination: {
    type: Boolean,
    default: true,
  },
  queryMetadata: {
    type: Object as PropType<ProQueryFormMetadata>,
    default: () => ({}),
  },
  request: {
    type: Function as PropType<ProTableRequest>,
    required: true,
  },
  immediate: {
    type: Boolean,
    default: true,
  },
}

export type ProTableProps = ExtractPropTypes<typeof proTableProps>
