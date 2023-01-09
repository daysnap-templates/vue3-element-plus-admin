import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

// import Home from '@/views/Home/index.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('src/views/Home/index.vue') },
  { path: '/:catchAll(.*)*', name: '404', redirect: '/' },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
