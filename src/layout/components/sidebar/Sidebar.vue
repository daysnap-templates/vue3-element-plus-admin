<template>
  <div class="layout-sidebar"></div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  @import '@/layout/styles/define.scss';
  .layout-sidebar {
    @extend %pf;
    @extend %l0;
    @extend %t0;
    @extend %b0;
    background-color: red;
  }
</style>
