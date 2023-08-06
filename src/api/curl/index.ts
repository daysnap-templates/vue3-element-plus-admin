import axios from 'axios'
import { log } from './log'

export const baseURL = ''

const instance = axios.create({
  baseURL,
  timeout: 60 * 1000,
  responseType: 'json',
})

instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const { data, params } = config
    log(config, `请求参数 =>`, data || params)

    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const { data: respData, config } = response
    log(config, '请求返回 => ', respData)

    if (!respData) {
      return Promise.reject(`网络繁忙，请稍后再试(1)`)
    }

    const { msg, code, data } = respData
    if (code !== 0) {
      return Promise.reject(msg || `网络繁忙，请稍后再试(2)`)
    }

    return data
  },
  (error) => {
    log(error.config, '请求错误 => ', error)

    if (error && error.response) {
      const { status, data: respData } = error.response
      error = status ? `网络繁忙，请稍后再试[${status}]` : `网络繁忙，请稍后再试(3)`
      if (status === 401) {
        error = `网络繁忙，请稍后再试[${status}]`
        if (respData) {
          if (respData.code === 4001) {
            error = 'token无效，请重新授权'
            // todo
            // const { setUserinfo } = useUserinfoStore()
            // setUserinfo()
            // router.replace('/login')
          } else {
            error = respData.msg
          }
        }
      } else if (respData && respData.msg) {
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
