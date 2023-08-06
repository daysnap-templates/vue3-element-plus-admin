<template>
  <div class="sidebar"></div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  @import '@/assets/scss/define.scss';
  .sidebar {
    @extend %pf;
    @extend %l0;
    @extend %t0;
    @extend %b0;
    z-index: 9;
    width: 230px;
    background-color: red;
  }
</style>
