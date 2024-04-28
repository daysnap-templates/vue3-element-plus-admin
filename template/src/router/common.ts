import { LayoutView } from '@/layout'

import { defineRoutes } from './defineRoutes'

export default defineRoutes([
  {
    path: '/',
    component: LayoutView,
    hidden: true,
    name: 'RootRoute',
    children: [
      {
        path: '',
        name: 'DashboardView',
        component: () => import('@/views/common/DashboardView.vue'),
        meta: { title: '控制台', requiresAuth: 1, hideSlidebar: true },
      },
    ],
  },

  {
    path: '/login',
    hidden: true,
    name: 'LoginView',
    component: () => import('@/views/common/LoginView.vue'),
    meta: { title: '登录', requiresAuth: -1 },
  },

  // https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html
  { path: '/:pathMatch(.*)*', name: '404', redirect: '/', hidden: true },
])
