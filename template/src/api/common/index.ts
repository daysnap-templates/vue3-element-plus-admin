import type { Userinfo } from '@/types'

import { curl } from '../curl'

// 登录
export const doUserLogin = (data: { username: string; password: string }) =>
  curl<Userinfo>(`api/user/login`, data, {
    method: 'POST',
    adapter: 'mock',
  })

// 登出
export const doUserLogout = (data: { token?: string } = {}) =>
  curl(`api/user/logout`, data, { method: 'POST', adapter: 'mock' })

// 修改密码
export const doPasswordChange = (data: {
  password: string
  newPassword: string
  confirmPassword: string
}) => curl(`api/user/password-change`, data, { method: 'POST', adapter: 'mock' })

export const doFileUpload = (data: { file: File }) => {
  const fd = new FormData()
  Object.entries(data).forEach(([key, item]) => {
    fd.append(key, item as any)
  })
  return curl(`common/upload`, fd, { method: 'POST', adapter: 'mock' })
}

// 获取资源权限
export const reqPermissionList = () =>
  curl<string[]>(
    `api/user/permission`,
    {},
    {
      adapter: 'mock',
    },
  )
