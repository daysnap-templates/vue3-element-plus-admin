import { getLocal } from '@daysnap/utils'
import { createNamespace } from './createNamespace'

export const accountInfoStorage = getLocal().generate<{
  account?: string
  password?: string
  isRemember?: boolean
}>(createNamespace(`ACCOUNT_INFO`))
