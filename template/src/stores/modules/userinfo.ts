import { useState } from '@daysnap/vue-use'
import { defineStore } from 'pinia'

import { doUserLogout } from '@/api'
import { resetRouter, router } from '@/router'
import type { Userinfo } from '@/types'
import { createNamespace } from '@/utils'

import { withOut } from '../withOut'

export const useUserinfoStore = withOut(
  defineStore(
    createNamespace('USER_INFO'),
    () => {
      const [userinfo, setUserinfo] = useState<Userinfo>()

      const logout = () => {
        doUserLogout().null()
        setUserinfo(void 0)
        resetRouter()
        router.replace('/login')
      }

      return { userinfo, setUserinfo, logout }
    },
    {
      persist: true,
    },
  ),
)
