export type PagingParams<T = unknown> = {
  PageIndex: number
  PageSize: number
} & T

export interface PagingResult<T = any> {
  Count: number
  Data: T[]
}
