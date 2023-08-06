<template>
  <div class="layout-wrap">
    <div class="layout-mask"></div>
    <Sidebar />
    <div class="layout-inner">
      <div class="layout-header">
        <Navbar />
        <Tags />
      </div>
      <div class="layout-content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Navbar, Sidebar, Tags } from './components'
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/define.scss';
  .layout-wrap {
  }
  .layout-mask {
  }
  .layout-inner {
    min-height: 100vh;
    margin-left: 230px;
  }
  .layout-header {
  }
  .layout-content {
  }
</style>
