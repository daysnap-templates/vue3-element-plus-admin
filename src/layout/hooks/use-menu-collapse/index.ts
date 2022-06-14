
export enum PLATFORM {
  DESKTOP = 'desktop',
  MOBILE = 'mobile',
}

const collapse = ref<boolean>(false)

export const useMenuCollapse = () => {

  const platform = ref<string>(PLATFORM.DESKTOP)
  const withoutAnimation = ref<boolean>(false)

  // 切换menu
  const toggle = () => collapse.value = !collapse.value

  const handleResize = () => {
    const react = document.body.getBoundingClientRect()
    const isMobile = (react.width - 1) < 992
    if (isMobile) {
      // 手机
      withoutAnimation.value = true
      platform.value = PLATFORM.MOBILE
    } else {
      // PC
      platform.value = PLATFORM.DESKTOP
    }
  }

  handleResize()

  // 监听
  watch([platform, collapse], (value, oldValue) => {
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
