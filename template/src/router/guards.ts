import type { Router } from 'vue-router'
import { NProgress } from '@/utils'
import { metadata } from '@/metadata'

export function setupGuards(router: Router) {
  // 鉴权
  router.beforeEach(() => {
    NProgress.start()
  })

  // 设置标题
  router.afterEach((to) => {
    NProgress.done()
    window.document.title = to.meta.title ? `${to.meta.title} - ${metadata.title}` : metadata.title
  })
}
