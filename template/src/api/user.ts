import curl from './curl'

// 登录
export const doUserLogin = (data: any) => {
  return curl('api/users/login', data)
}
