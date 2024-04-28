import { createRouter, createWebHashHistory, type RouterOptions } from 'vue-router'

import { resetLoadAsyncFlag } from './asyncRoutes'
import common from './common'
import { setupGuards } from './guards'

const createRouterOptions = (): RouterOptions => ({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [...common],
})

export const router = createRouter(createRouterOptions())
;(window as any).router = router

// 重置路由
export const resetRouter = () => {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    resetLoadAsyncFlag()
    router.options.routes = [...common]
    router.getRoutes().forEach((route) => {
      const { name } = route
      if (name && !['RootRoute'].includes(name as string)) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
    common.forEach(router.addRoute)
  } catch {
    // 报错 强制刷新浏览器
    window.location.reload()
  }
}

// 设置路由守卫
setupGuards(router)
