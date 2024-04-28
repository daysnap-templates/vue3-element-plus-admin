import type { RouteRecordRaw } from 'vue-router'

import { usePermissionStore } from '@/stores/modules/permission'

import { router } from './router'
import { routes } from './routes'

export let isLoadAsyncRoutesFlag = false

export const resetLoadAsyncFlag = () => (isLoadAsyncRoutesFlag = false)

export const loadAsyncRoutes = async () => {
  const { has, updatePermissions } = usePermissionStore(true)
  await updatePermissions()

  const loop = (routes: RouteRecordRaw[]) => {
    return routes.filter((route) => {
      const { meta = {}, children } = route

      if (children) {
        route.children = loop(children)
        if (!route.children.length) {
          return false
        }
        route.redirect = route.children[0].path
      }

      const { pd } = meta
      if (pd) {
        return has(pd)
      }
      return true
    })
  }

  const data = loop(routes)
  if (data.length) {
    router.removeRoute('RootRoute')
    data.push({
      path: '/',
      hidden: true,
      name: 'RootRoute',
      redirect: data[0].path,
    })
    router.options.routes = router.options.routes.filter((item) => item.path !== '/')
  }
  data.forEach((item) => router.addRoute(item))
  router.options.routes = [...router.options.routes, ...data]
  isLoadAsyncRoutesFlag = true
}
