export type PagingParams<T = unknown> = {
  pageIndex: number
  pageSize: number
} & T

export interface PagingResult<T = any> {
  total: number
  data: T[]
}
