
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from 'src/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    component: Layout,
    redirect: '/home',
    meta: { title: '首页', icon: '2' },
    children: [
      {
        path: 'home',
        component: () => import('src/views/home/index.vue'),
        meta: { title: '首页', icon: 'home' }
      }
    ]
  },
  {
    path: '/test1',
    component: Layout,
    children: [
      {
        path: 'test-a',
        component: () => import('src/views/test1/testa.vue'),
        meta: { title: 'TEST1-A', icon: 'home' },
      },
      {
        path: 'test-b',
        component: () => import('src/views/test1/testb.vue'),
        meta: { title: 'TEST1-B', icon: 'home' },
      },
    ]
  },
  {
    path: '/test2',
    component: Layout,
    children: [
      {
        path: 'test-a',
        component: () => import('src/views/test2/testa.vue'),
        meta: { title: 'TEST2-A', icon: 'home' },
      },
      {
        path: 'test-b',
        component: () => import('src/views/test2/testb.vue'),
        meta: { title: 'TEST2-B', icon: 'home' },
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
