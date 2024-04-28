import type { ExtractPropTypes } from 'vue'

export const proH5PreviewProps = {
  url: {
    type: String,
    default: '',
  },
}

export type ProH5PreviewProps = ExtractPropTypes<typeof proH5PreviewProps>
