<template>
  <ElTooltip :content="isFullscreen ? '退出全屏' : '开启全屏'">
    <ElIcon class="layout-screen-full" size="20" @click="screenfull.toggle()">
      <FullScreen />
    </ElIcon>
  </ElTooltip>
</template>

<script setup lang="ts">
  import { FullScreen } from '@element-plus/icons-vue'
  import screenfull from 'screenfull'

  const isFullscreen = ref(false)

  const handleChange = () => {
    isFullscreen.value = screenfull.isFullscreen
  }

  onMounted(() => {
    if (screenfull.isEnabled) {
      screenfull.on('change', handleChange)
    }
  })

  onBeforeMount(() => {
    if (screenfull.isEnabled) {
      screenfull.off('change', handleChange)
    }
  })
</script>

<style lang="scss" scoped>
  @import '@/layout/styles/define.scss';
  .layout-screen-full {
    @extend %h100;
    @extend %cp;
    padding: 0 10px;
    transform: background-color 0.3s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.025);
    }
  }
</style>
