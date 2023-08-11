import type { RouteRecordRaw } from 'vue-router'
import { LayoutView } from '@/layout'

export default [
  {
    path: '/pro',
    component: LayoutView,
    redirect: '/pro/query-form',
    meta: { title: 'Pro组件', icon: 'Platform' },
    children: [
      {
        path: 'query-form',
        component: () => import('@/views/pro/ProQueryFormView.vue'),
        meta: { title: 'ProQueryForm' },
      },
      {
        path: 'table-list',
        component: () => import('@/views/pro/ProTableListView.vue'),
        meta: { title: 'ProTableList' },
      },
      {
        path: 'table',
        component: () => import('@/views/pro/ProTableView.vue'),
        meta: { title: 'ProTable' },
      },
      {
        path: 'dialog-form',
        component: () => import('@/views/pro/ProDialogFormView.vue'),
        meta: { title: 'ProDialogForm' },
      },
    ],
  },
] as RouteRecordRaw[]
