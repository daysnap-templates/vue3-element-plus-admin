<template>
  <div class="sidebar">
    <Logo />
    <Menu />
  </div>
</template>

<script lang="ts" setup>
import Logo from './Logo.vue'
import Menu from './Menu.vue'
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/define';

.sidebar {
  position: fixed;
  height: 100%;
  left: 0;
  top: 0;
  background-color: #fff;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
</style>
