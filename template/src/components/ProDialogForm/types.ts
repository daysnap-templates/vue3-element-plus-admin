import type { Arrayable } from '@daysnap/types'
import type { FormItemRule } from 'element-plus'
import type { ExtractPropTypes, PropType, Raw } from 'vue'

type IS =
  | 'form-input'
  | 'form-select'
  | 'form-radio'
  | 'form-checkbox'
  | 'form-date-picker'
  | 'form-input-number'
  | 'form-tree-select'
  | 'form-tree'
  | 'form-cascader'
  | 'form-image-upload'
  | 'form-file-upload'
  | 'form-tags'

export interface ProDialogFormField {
  is?: IS | Raw<object>
  label?: string
  width?: string
  value?: any
  defaultValue?: any
  get?: (...args: any[]) => any
  set?: (...args: any[]) => any
  hidden?:
    | boolean
    | ((value: any, field: ProDialogFormField, metadata: ProDialogFormMetadata) => boolean)
  props?: Record<string, any>
  options?: any
  labelKey?: string
  valueKey?: string
  rules?:
    | Arrayable<FormItemRule>
    | ((
        value: any,
        field: ProDialogFormField,
        metadata: ProDialogFormMetadata,
      ) => Arrayable<FormItemRule>)
  [prop: string]: any
}

export type ProDialogFormMetadata = Record<string, ProDialogFormField>

export interface ProDialogFormRequest {
  (data: any, model: any, metadata: ProDialogFormMetadata): Promise<any>
}

export const proDialogFormProps = {
  title: String,
  style: {
    type: Object as PropType<Partial<CSSStyleDeclaration>>,
    default: () => ({}),
  },
  metadata: {
    type: Object as PropType<ProDialogFormMetadata>,
  },
  request: {
    type: Function as PropType<ProDialogFormRequest>,
  },
  labelWidth: {
    type: String,
    default: '120px',
  },
  showCancelButton: {
    type: Boolean,
    default: true,
  },
  showConfirmButton: {
    type: Boolean,
    default: true,
  },
  cancelButtonText: {
    type: String,
    default: '取消',
  },
  confirmButtonText: {
    type: String,
    default: '确认',
  },
}

export type ProDialogFormProps = ExtractPropTypes<typeof proDialogFormProps>
