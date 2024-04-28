import type { RouteRecordRaw } from 'vue-router'

import { router } from './router'
import { routes } from './routes'

export let isLoadAsyncRoutesFlag = false

export const resetLoadAsyncFlag = () => (isLoadAsyncRoutesFlag = false)

export const loadAsyncRoutes = async () => {
  const loop = (routes: RouteRecordRaw[]) => {
    return routes.filter(() => {
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
