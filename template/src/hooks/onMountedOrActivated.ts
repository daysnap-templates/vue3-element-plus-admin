import { nextTick, onActivated, onMounted } from 'vue'

export function onMountedOrActivated(hook: () => any) {
  let mounted = false
  onMounted(() => {
    hook()
    nextTick(() => (mounted = true))
  })
  onActivated(() => {
    if (mounted) {
      hook()
    }
  })
}
