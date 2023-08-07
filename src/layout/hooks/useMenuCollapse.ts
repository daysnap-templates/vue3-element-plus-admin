import type { Ref } from 'vue'

export enum PLATFORM {
  DESKTOP = 'desktop',
  MOBILE = 'mobile',
}

const collapse = ref(false)
const platform = ref<PLATFORM>(PLATFORM.DESKTOP)
const withoutAnimation = ref(false)

export const useMenuCollapse = (): {
  toggle: () => void
  collapse: Ref<boolean>
  platform: Ref<PLATFORM>
  withoutAnimation: Ref<boolean>
} => {
  // 切换menu
  const toggle = () => {
    withoutAnimation.value = false
    collapse.value = !collapse.value
  }

  const handleResize = () => {
    const react = document.body.getBoundingClientRect()
    const isMobile = react.width - 1 < 992
    if (isMobile) {
      // 手机
      withoutAnimation.value = true
      collapse.value = true
      platform.value = PLATFORM.MOBILE
    } else {
      // PC
      platform.value = PLATFORM.DESKTOP
    }
  }

  handleResize()

  // 监听
  watch([platform, collapse], (value) => {
    const [platform, collapse] = value
    if (platform === PLATFORM.MOBILE && !collapse) {
      withoutAnimation.value = false
    }
  })

  // 监听
  window.addEventListener('resize', handleResize)
  onBeforeUnmount(() => window.removeEventListener('resize', handleResize))

  return {
    withoutAnimation,
    collapse,
    platform,
    toggle,
  }
}
