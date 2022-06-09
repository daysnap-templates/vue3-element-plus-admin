
<template>
  <el-icon
    size="20"
    @click="handleToggle"
  >
    <FullScreen />
  </el-icon>
</template>

<script setup lang="ts">

  import screenfull from 'screenfull'

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

<style lang="scss" scoped>
  @import "src/layout/styles/index";
</style>
