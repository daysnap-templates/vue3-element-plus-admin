/// <reference types="vite/client" />
import 'vue-router'

// router
declare module 'vue-router' {
  // extend route meta
  interface RouteMeta {
    title?: string // 标题
    requiresAuth?: 1 | 0 | -1 | 2 // 是否需要授权，1 需要授权、-1 不需要登录、0 登录、不登陆都可以 // 2 用户需要 openId

    // tabbar icon
    icon?: string

    // 希望响应激活哪个菜单
    activePath?: string
  }

  interface _RouteRecordBase {
    // 是否隐藏
    hidden?: boolean
  }
}
