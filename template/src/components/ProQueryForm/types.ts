import type { ExtractPropTypes, Raw } from 'vue'

type IS =
  | 'form-input'
  | 'form-select'
  | 'form-radio'
  | 'form-checkbox'
  | 'form-date-picker'
  | 'form-tree-select'
  | 'form-cascader'

export interface ProQueryFormField {
  is?: IS | Raw<object>
  label?: string
  value?: any
  defaultValue?: any
  get?: (...args: any[]) => any
  hidden?: any
  props?: Record<string, any>
  options?: any
  labelKey?: string
  valueKey?: string
  span?: number
  [key: string]: any
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
