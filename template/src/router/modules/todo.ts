import { RouterView } from 'vue-router'

import { LayoutView } from '@/layout'
import { PD } from '@/stores'

import { defineRoutes } from '../defineRoutes'

export default defineRoutes([
  {
    path: '/todo',
    redirect: '/todo/list',
    component: LayoutView,
    name: 'TODO',
    meta: { title: 'TODO', icon: 'HelpFilled' },
    sort: -1,
    children: [
      {
        path: '/todo/list',
        name: 'TodoListView',
        component: () => import('@/views/todo/todo-list/TodoListView.vue'),
        meta: { title: 'TODO列表', icon: 'HelpFilled', pd: PD.todo.list },
      },
      {
        path: '/todo/list/2',
        component: RouterView,
        meta: { title: '一级菜单', icon: 'HelpFilled' },
        children: [
          {
            path: '/todo/list/2',
            component: () => import('@/views/todo/todo-list/TodoListView.vue'),
            meta: { title: '二级菜单-1' },
          },
          {
            path: '/todo/list/3',
            component: () => import('@/views/todo/todo-list/TodoListView.vue'),
            meta: { title: '二级菜单-2' },
          },
        ],
      },
    ],
  },
])
