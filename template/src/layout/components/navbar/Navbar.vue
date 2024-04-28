<template>
  <div class="layout-navbar">
    <Hamburger />

    <BreadCrumb class="layout-breadcrumb" />

    <ScreenFull />

    <UserBox />
  </div>
</template>

<script setup lang="ts">
  import BreadCrumb from './Breadcrumb.vue'
  import Hamburger from './Hamburger.vue'
  import ScreenFull from './ScreenFull.vue'
  import UserBox from './UserBox.vue'
</script>

<style lang="scss" scoped>
  @import '@/layout/styles/define.scss';
  .layout-navbar {
    @extend %df;
    @extend %aic;
    height: var(--ly-navbar-height);
  }
  .layout-breadcrumb {
    margin-right: auto;
  }
</style>
