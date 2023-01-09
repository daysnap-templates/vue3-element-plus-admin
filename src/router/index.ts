import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('src/views/home/index.vue') },
  { path: '/:catchAll(.*)*', name: '404', redirect: '/' },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
