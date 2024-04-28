import type { PagingParams, PagingResult, Todo } from '@/types'

import { curl } from './curl'

// 列表
export const reqTodoList = (
  data: PagingParams<Partial<{ keyword: string; status: string | number }>>,
) => curl<PagingResult<Todo>>('api/todo', data, { adapter: 'mock' })

// 创建
export const doTodoCreate = (data: Partial<Todo>) =>
  curl('api/todo', data, { method: 'post', adapter: 'mock' })

// 更新
export const doTodoUpdate = (data: Partial<Todo>) =>
  curl('api/todo', data, { method: 'put', adapter: 'mock' })

// 删除
export const doTodoDelete = (data: Pick<Todo, 'id'>) =>
  curl('api/todo/{id}', data, { method: 'delete', adapter: 'mock' })
