import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: '系统首页',
          permiss: '1',
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard/index.vue'),
      },
    ],
  },
  { path: '/', component: () => import('src/views/Dashboard/index.vue') },
  { path: '/:catchAll(.*)*', name: '404', redirect: '/' },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
