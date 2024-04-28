import type { RouteRecordRaw } from 'vue-router'

import { __DEV__ } from '@/utils'

export const routes = ((s) =>
  Object.values(s)
    .reduce<RouteRecordRaw[]>((res, item: any) => [...res, ...(item.default || [])], [])
    .filter((item) => (__DEV__ ? true : !['TODO'].includes(item.name as string)))
    .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0)))(
  import.meta.glob(['./modules/**/*.ts'], {
    eager: true,
  }),
)
