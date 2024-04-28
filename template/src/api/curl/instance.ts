import axios from 'axios'

import { useUserinfoStore } from '@/stores'

import { DEFAULT_CONFIG } from './config'
import { log } from './log'

export const instance = axios.create(DEFAULT_CONFIG)

// 请求拦截器 设置公共参数
instance.interceptors.request.use(
  async (config) => {
    const { data, params } = config

    log(config, `请求参数 =>`, data || params)

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const { data: respData, config } = response
    log(config, '请求返回 => ', respData)

    if (respData instanceof Blob) {
      return respData
    }
    if (!respData) {
      return Promise.reject(`网络繁忙，请稍后再试(1)`)
    }

    // eslint-disable-next-line prefer-const
    let { code, msg, data, success } = respData

    // token 过期
    if (['30001'].includes(code)) {
      const { logout } = useUserinfoStore()
      if (!config.url?.includes('logout')) {
        logout()
      }
      return Promise.reject(msg || `登录已失效，请重新登录`)
    }
    if (!success) {
      return Promise.reject(respData || `网络繁忙，请稍后再试(2)`)
    }

    return data
  },
  (error) => {
    log(error.config, '请求错误 => ', error)

    if (error && error.response) {
      const { status, data: respData } = error.response
      error = status ? `网络繁忙，请稍后再试[${status}]` : `网络繁忙，请稍后再试(3)`
      if (respData && respData.msg) {
        error = respData.msg
      }
    } else if (error && error.message) {
      error = error.message
    } else {
      error = `网络繁忙，请稍后再试(4)`
    }
    return Promise.reject(error)
  },
)
