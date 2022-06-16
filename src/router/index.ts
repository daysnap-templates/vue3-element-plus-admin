
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from 'src/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('src/views/home/index.vue'),
        meta: { title: '首页', icon: 'HomeFilled' }
      }
    ]
  },
  {
    path: '/menu',
    component: Layout,
    redirect: '/menu/menu1',
    meta: { title: '菜单', icon: 'Basketball' },
    children: [
      {
        path: 'menu1',
        component: () => import('src/views/menu/menu1.vue'),
        meta: { title: '菜单1', icon: 'Basketball' },
      },
      {
        path: 'menu2',
        component: () => import('src/views/menu/menu2.vue'),
        meta: { title: '菜单2', icon: 'Basketball' },
      },
    ]
  },
  {
    path: '/menu2',
    component: Layout,
    redirect: '/menu2/menu1',
    meta: { title: '菜单2', icon: 'Basketball' },
    children: [
      {
        path: 'menu1',
        component: () => import('src/views/menu/menu1.vue'),
        meta: { title: '菜单1', icon: 'Basketball' },
      },
      {
        path: 'menu2',
        component: () => import('src/views/menu/menu2.vue'),
        meta: { title: '菜单2', icon: 'Basketball' },
      },
    ]
  },
  ...new Array(5).fill('1').map((item, index) => {
    return {
      path: `/page${index}`,
      component: Layout,
      redirect: `/page${index}/menu1`,
      meta: { title: `菜单${index}`, icon: 'Basketball' },
      children: [
        {
          path: 'menu1',
          component: () => import('src/views/menu/menu1.vue'),
          meta: { title: '菜单1', icon: 'Basketball' },
        },
        {
          path: 'menu2',
          component: () => import('src/views/menu/menu2.vue'),
          meta: { title: '菜单2', icon: 'Basketball' },
        },
      ]
    }
  }),
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
