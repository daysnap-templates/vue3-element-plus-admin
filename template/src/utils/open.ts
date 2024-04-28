import { isObject } from '@daysnap/utils'
import type { RouteLocationRaw } from 'vue-router'

export function open(options: { to: RouteLocationRaw; features: string }) {
  const { to, features } = options

  let url = to as string
  if (isObject(to)) {
    const { path, query } = to
    url = `${path}?${new URLSearchParams(query as any).toString()}`
  }

  if (url) {
    window.open(url, '_blank', features)
  }
}
