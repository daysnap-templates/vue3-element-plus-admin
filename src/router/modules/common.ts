import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/login',
    name: 'LoginView',
    component: () => import('@/views/common/LoginView.vue'),
    meta: { title: '登录', requiresAuth: -1 },
  },

  // 404
  // https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html
  { path: '/:pathMatch(.*)*', name: '404', redirect: '/' },
] as RouteRecordRaw[]
