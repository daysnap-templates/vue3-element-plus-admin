import type { ExtractPropTypes } from 'vue'
import type { ProQueryFormMetadata } from '../ProQueryForm'

export interface ProTableRequest<T = any> {
  (state: [number, number], query: Record<string, any>): Promise<[T[], number]>
}

export const proTableProps = {
  queryMetadata: {
    type: Object as PropType<ProQueryFormMetadata>,
    default: () => ({}),
  },
  request: {
    type: Function as PropType<ProTableRequest>,
    required: true,
  },
}

export type ProTableProps = ExtractPropTypes<typeof proTableProps>
