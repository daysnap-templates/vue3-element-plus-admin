import type { InternalAxiosRequestConfig } from 'axios'

export const log = (config: InternalAxiosRequestConfig, ...args: any[]) => {
  const { url = '', baseURL = '', method } = config
  console.log(`${url?.startsWith(`http`) ? url : baseURL + url}`, `[${method}]`, ...args)
}
