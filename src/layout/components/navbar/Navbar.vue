<template>
  <div class="layout-navbar">
    <Hamburger />

    <BreadCrumb />

    <div class="layout-navbar-actions">
      <ScreenFull />
    </div>
  </div>
</template>

<script setup lang="ts">
  import Hamburger from './Hamburger.vue'
  import BreadCrumb from './BreadCrumb.vue'
  import ScreenFull from './ScreenFull.vue'
</script>

<style lang="scss" scoped>
  @import '@/layout/styles/define.scss';
  .layout-navbar {
    @extend %df;
    @extend %aic;
    height: $navbar-height;
    background-color: #ddd;
  }
  .layout-navbar-actions {
    @extend %df;
    @extend %aic;
    margin-left: auto;
  }
</style>
