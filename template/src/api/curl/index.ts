import { formatPathParams, isObject } from '@daysnap/utils'

import { useUserinfoStore } from '@/stores'

import { formatAdapter, getAdapter } from './adapter'
import { instance } from './instance'
import type { CurlOptions } from './types'

export * from './adapter'

export function curl<T = any>(url: string, data: any = {}, options: CurlOptions = {}): Promise<T> {
  const { method, adapter, headers, isStringify, ...rest } = Object.assign(
    {
      headers: {},
      method: 'get',
      adapter: 'xhr',
      // adapter: 'mock',
      isStringify: false,
    },
    options,
  )

  // 用于mock
  if (!rest.mockUrl) {
    rest.mockUrl = url
  }

  const { userinfo } = useUserinfoStore()
  let { token } = userinfo || {}
  if (data.token) {
    token = data.token
    delete data.token
  }
  if (token) {
    Object.assign(headers, { 'login-token': token })
  }

  // 转换 url path params
  if (!(data instanceof FormData) && isObject(data)) {
    ;({ path: url, rest: data } = formatPathParams(url, data))
  }

  // 有些接口是表单提交
  if (isStringify) {
    Object.assign(headers, { 'Content-Type': 'application/x-www-form-urlencoded' })
  }

  // 传值
  const adapterName = formatAdapter(adapter)
  rest.adapterName = adapterName

  return instance({
    ...rest,
    url,
    method,
    headers,
    [method.toLocaleLowerCase() === 'get' ? 'params' : 'data']: data,
    adapter: getAdapter(adapterName),
  })
}
