import { RouterView, type RouteRecordRaw } from 'vue-router'
import { LayoutView } from '@/layout'

export default [
  {
    path: '/menus',
    component: LayoutView,
    meta: { title: '多级菜单', icon: 'Menu' },
    redirect: '/menus/menu-1',
    children: [
      {
        path: 'menu-1',
        component: () => import('@/views/common/MenuView.vue'),
        meta: { title: '菜单1' },
      },
      {
        path: 'menu-2',
        component: () => import('@/views/common/MenuView.vue'),
        meta: { title: '菜单2' },
      },
      {
        path: 'menu-3',
        component: RouterView,
        meta: { title: '菜单3' },
        redirect: '/menus/menu-3/menu-3-1',
        children: [
          {
            path: 'menu-3-1',
            component: () => import('@/views/common/MenuView.vue'),
            meta: { title: '菜单3-1' },
          },
          {
            path: 'menu-3-2',
            component: () => import('@/views/common/MenuView.vue'),
            meta: { title: '菜单-3-2' },
          },
        ],
      },
    ],
  },
] as RouteRecordRaw[]
