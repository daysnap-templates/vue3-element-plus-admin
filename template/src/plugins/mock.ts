import { __DEV__ } from '@/utils'

// api mock
if (__DEV__ || !__DEV__) {
  import.meta.glob('@/mocks', { eager: true })
}
