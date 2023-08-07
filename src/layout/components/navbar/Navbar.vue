<template>
  <div class="layout-navbar">
    <Hamburger />

    <BreadCrumb class="layout-breadcrumb" />

    <ScreenFull />

    <UserBox />
  </div>
</template>

<script setup lang="ts">
  import Hamburger from './Hamburger.vue'
  import BreadCrumb from './BreadCrumb.vue'
  import ScreenFull from './ScreenFull.vue'
  import UserBox from './UserBox.vue'
</script>

<style lang="scss" scoped>
  @import '@/layout/styles/define.scss';
  .layout-navbar {
    @extend %df;
    @extend %aic;
    height: $navbar-height;
    background-color: #ddd;
  }
  .layout-breadcrumb {
    margin-right: auto;
  }
</style>
