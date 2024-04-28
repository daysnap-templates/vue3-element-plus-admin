<template>
  <el-icon class="layout-hamburger" size="20" @click="toggle">
    <Expand v-if="collapse" />
    <Fold v-else />
  </el-icon>
</template>

<script setup lang="ts">
  import { useMenuCollapse } from '@/layout/hooks'
  const { collapse, toggle } = useMenuCollapse()
</script>

<style lang="scss" scoped>
  @import '@/layout/styles/define.scss';
  .layout-hamburger {
    @extend %cp;
    @extend %df;
    @extend %aic;
    @extend %jcc;
    @extend %h100;
    @extend %c3;
    width: var(--ly-navbar-height);
    transform: background-color 0.3s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.025);
    }
  }
</style>
