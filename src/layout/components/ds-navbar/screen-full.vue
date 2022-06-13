
<template>
  <ds-svg-icon
    @click="handleToggle"
    icon="FullScreen"
  />
</template>

<script setup lang="ts">

  import screenfull from 'screenfull'
  import DsSvgIcon from 'src/layout/components/ds-svg-icon/index.vue'

  const isFullscreen = ref<boolean>(false)
  const changeHandle = () => {
    isFullscreen.value = screenfull.isFullscreen
  }

  const handleToggle = () => screenfull.toggle()

  onMounted(() => {
    if (screenfull.isEnabled) {
      screenfull.on('change', changeHandle)
    }
  })

  onDeactivated(() => {
    if (screenfull.isEnabled) {
      screenfull.off('change', changeHandle)
    }
  })

</script>
