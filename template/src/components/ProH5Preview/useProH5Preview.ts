import { isString } from '@daysnap/utils'

import type { ProH5PreviewInstance } from '.'
import type { ProH5PreviewProps } from './types'

export function useProH5Preview() {
  const proH5PreviewInstance = ref() as Ref<ProH5PreviewInstance>

  const trigger = (options?: Partial<ProH5PreviewProps> | string) => {
    if (isString(options)) {
      options = { url: options }
    }
    return proH5PreviewInstance.value.show(options)
  }

  return [proH5PreviewInstance, trigger] as const
}
