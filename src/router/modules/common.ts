import type { RouteRecordRaw } from 'vue-router'
import { LayoutView } from '@/layout'
import { listGenerator } from '@daysnap/utils'

export default [
  {
    path: '/login',
    name: 'LoginView',
    hidden: true,
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
        meta: { title: '主页', icon: 'Basketball' },
      },
    ],
  },

  ...listGenerator(5, (index) => {
    return {
      path: `/page${index}`,
      component: LayoutView,
      redirect: `/page${index}/menu1`,
      meta: { title: `菜单${index}`, icon: 'Basketball' },
      children: [
        {
          path: 'menu1',
          component: () => import('@/views/common/DashboardView.vue'),
          meta: { title: '菜单1', icon: 'Basketball' },
        },
        {
          path: 'menu2',
          component: () => import('@/views/common/DashboardView.vue'),
          meta: { title: '菜单2', icon: 'Basketball' },
        },
      ],
    }
  }),

  // 404
  // https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html
  { path: '/:pathMatch(.*)*', name: '404', redirect: '/' },
] as RouteRecordRaw[]
