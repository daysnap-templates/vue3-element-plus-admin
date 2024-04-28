import { buttonProps } from 'element-plus'
import type { RouteLocationRaw } from 'vue-router'

export const proActionButtonProps = {
  ...buttonProps,
  pd: {
    type: String,
    default: '',
  },
  to: {
    type: [String, Object] as PropType<RouteLocationRaw>,
    default: '',
  },
  features: {
    type: String,
    default: '',
  },
}
