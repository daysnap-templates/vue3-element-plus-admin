import type { AxiosRequestConfig } from 'axios'

export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data: T
  extras?: T
  msg?: T
}

export type CurlOptions = Omit<AxiosRequestConfig, 'adapter' | 'params' | 'data' | 'url'> & {
  adapterName?: string
  adapter?: 'mock' | 'xhr'
  mockUrl?: string
  isStringify?: boolean
}

// 扩展类型
declare module 'axios' {
  interface InternalAxiosRequestConfig {
    adapterName?: string
    adapter?: string
    mockUrl?: string
  }
}
