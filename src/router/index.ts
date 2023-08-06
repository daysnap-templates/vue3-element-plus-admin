import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import { setupGuards } from './guards'

const routes = ((s) =>
  Object.values(s).reduce<RouteRecordRaw[]>(
    (res, item: any) => [...res, ...(item.default || [])],
    [],
  ))(import.meta.glob('./modules/*.ts', { eager: true }))

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

// 设置路由守卫
setupGuards(router)

export default router
