import type { RouteRecordRaw } from 'vue-router'
import LayoutView from '@/layout'

export default [
  {
    path: '/login',
    name: 'LoginView',
    component: () => import('@/views/common/LoginView.vue'),
    meta: { title: '登录', requiresAuth: -1 },
  },

  {
    path: '/',
    component: LayoutView,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/common/DashboardView.vue'),
        meta: { title: '首页' },
      },
    ],
  },

  // 404
  // https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html
  { path: '/:pathMatch(.*)*', name: '404', redirect: '/' },
] as RouteRecordRaw[]
