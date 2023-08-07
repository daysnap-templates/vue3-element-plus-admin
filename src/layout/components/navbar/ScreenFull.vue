<template>
  <ElTooltip content="全屏">
    <ElIcon class="layout-screen-full" size="20">
      <FullScreen />
    </ElIcon>
  </ElTooltip>
</template>

<script setup lang="ts">
  import { FullScreen } from '@element-plus/icons'
  import type { ElTooltip } from 'element-plus'
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
