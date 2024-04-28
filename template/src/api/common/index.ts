import { curl } from '../curl'

// 登录
export const doUserLogin = (data: {
  username: string
  password: string
  captchaAppId?: string
  type?: string
  ticket?: string
  randstr?: string
}) =>
  curl<{ 'login-token': string }>(`separation/login`, data, {
    method: 'POST',
    isStringify: true,
  }).then((res) => ({
    token: res['login-token'],
  }))

// 登出
export const doUserLogout = (data: { token?: string } = {}) =>
  curl(`separation/logout`, data, { method: 'POST' })

// 发送手机验证码
export const doSmsCodeSend = (data: {
  cellphone: string
  captchaAppId: string
  ticket: string
  randstr: string
  type: string
}) => curl<string[]>(`separation/sendCode`, data, { method: 'POST', isStringify: true })

// 重置密码
export const doPasswordReset = (data: {
  cellphone: string
  verificationCode: string
  username: string
  password: string
  confirmPassword: string
}) => curl(`separation/resetPassword`, data, { method: 'POST', isStringify: true })

// 修改密码
export const doPasswordChange = (data: {
  password: string
  newPassword: string
  confirmPassword: string
  token?: string
}) => curl(`separation/sc/modifyPassword`, data, { method: 'POST', isStringify: true })

// 获取资源权限
export const reqPermissionList = () =>
  curl<string[]>(`separation/sc/getPermissionList`, {}, { method: 'GET' })

export const doFileUpload = (data: { file: File }) => {
  const fd = new FormData()
  Object.entries(data).forEach(([key, item]) => {
    fd.append(key, item as any)
  })
  return curl(`common/upload`, fd, { method: 'POST' })
}
