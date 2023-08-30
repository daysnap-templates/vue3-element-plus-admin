import type { ExtractPropTypes } from 'vue'

export interface ProQueryFormField {
  is?: any
  label?: string
  value?: any
  defaultValue?: any
  get?: (...args: any[]) => any
  hidden?: any
  props?: Record<string, any>
  options?: any
}

export type ProQueryFormMetadata = Record<string, ProQueryFormField>

export const proQueryFormProps = {
  metadata: {
    type: Object as PropType<ProQueryFormMetadata>,
    default: () => ({}),
  },
  loading: {
    type: Boolean,
    default: false,
  },
}

export type ProQueryFormProps = ExtractPropTypes<typeof proQueryFormProps>
