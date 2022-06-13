
export enum PLATFORM {
  DESKTOP = 'desktop',
  MOBILE = 'mobile',
}

const platform = ref<string>(PLATFORM.DESKTOP)

export const usePlatform = () => {

  const handleResize = () => {
    const react = document.body.getBoundingClientRect()
    platform.value = (react.width - 1) < 992 ? PLATFORM.MOBILE : PLATFORM.DESKTOP
  }

  window.addEventListener('resize', handleResize)

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })

  return platform
}
