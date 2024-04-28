import type { AxiosAdapter } from 'axios'

import { __DEV__ } from '@/utils'

// 适配器集合
export const adapters: Record<string, AxiosAdapter> = {}

// 注册适配器
export function registerAdapter(name: string, adapter: AxiosAdapter) {
  adapters[name] = adapter
}

// 获取外部设置适配器 方便开发调试代码
const devAdapter = (() => {
  const urlSearchParams = new URLSearchParams(window.location.search)
  const adapter = urlSearchParams.get('adapter') || sessionStorage.getItem('adapter')
  if (adapter) {
    sessionStorage.setItem('adapter', adapter)
    console.warn(`警告⚠️：已启用 ${adapter} 适配器`)
  }
  return adapter
})()

// 获取适配器
export function getAdapter(name: string) {
  return adapters[name]
}

// 获取适配器
// 这里需要根据环境进行判断
export function formatAdapter(adapter: string) {
  if (__DEV__) {
    if (devAdapter) {
      adapter = devAdapter
    }
  }

  if (!__DEV__) {
    adapter = 'xhr'
  }

  return adapter
}
