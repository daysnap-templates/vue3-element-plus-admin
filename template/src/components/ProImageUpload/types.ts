import type { ExtractPropTypes, PropType } from 'vue'

export const proImageUploadProps = {
  modelValue: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  max: {
    type: Number,
    default: 1,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
}

export type ProImageUploadProps = ExtractPropTypes<typeof proImageUploadProps>
