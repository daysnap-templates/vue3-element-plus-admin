import { setScrollTop } from '@daysnap/utils'
import type { Router } from 'vue-router'

import { metadata } from '@/metadata'
import { useUserinfoStore } from '@/stores'
import { NProgress } from '@/utils'

import { isLoadAsyncRoutesFlag, loadAsyncRoutes } from './asyncRoutes'

export function setupGuards(router: Router) {
  // 鉴权
  router.beforeEach(async (to) => {
    NProgress.start()

    const { userinfo } = useUserinfoStore()
    const isLogin = !!userinfo

    // 是否需要授权，1 需要授权、-1 不需要登录、0 登录、不登录都可以
    const requiresAuth = to.meta.requiresAuth ?? 1
    // 已登录进入到不需要登录的页面，直接跳转回首页
    if (isLogin && requiresAuth === -1) {
      return { path: '/', replace: true }
    }
    // 未登录进入到需要登录的页面，直接跳转取登录
    if (!isLogin && requiresAuth === 1) {
      return { path: '/login', replace: true }
    }

    // 已登录 加载动态路由
    if (isLogin && !isLoadAsyncRoutesFlag) {
      await loadAsyncRoutes()
      // fix No match found for location with path
      if (to.redirectedFrom?.fullPath) {
        return { path: to.redirectedFrom.fullPath, query: to.redirectedFrom.query, replace: true }
      }
      return { path: to.path, query: to.query, replace: true }
    }
  })

  // 设置标题
  router.afterEach((to) => {
    NProgress.done()
    window.document.title = to.meta.title ? `${to.meta.title} - ${metadata.title}` : metadata.title
    setScrollTop()
  })
}
