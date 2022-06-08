
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from 'src/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
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
    path: '/menu',
    component: Layout,
    redirect: '/menu/menu1',
    meta: { title: '菜单', icon: 'home' },
    children: [
      {
        path: 'menu1',
        component: () => import('src/views/menu/menu1.vue'),
        meta: { title: '菜单1', icon: 'home' },
      },
      {
        path: 'menu2',
        component: () => import('src/views/menu/menu2.vue'),
        meta: { title: '菜单2', icon: 'home' },
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
