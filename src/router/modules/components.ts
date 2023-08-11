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
        component: () => import('@/views/common/ProQueryFormView.vue'),
        meta: { title: 'ProQueryForm' },
      },
      {
        path: 'table-list',
        component: () => import('@/views/common/ProTableListView.vue'),
        meta: { title: 'ProTableList' },
      },
      {
        path: 'table',
        component: () => import('@/views/common/ProTableView.vue'),
        meta: { title: 'ProTable' },
      },
    ],
  },
] as RouteRecordRaw[]
