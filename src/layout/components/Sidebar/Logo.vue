<template>
  <div class="logo-box">
    <img class="logo" src="src/assets/vue.svg" />
    <span class="sys-name" v-if="!sidebar.collapse">daysnap乐园111111</span>
  </div>
</template>

<script lang="ts" setup>
import { useSidebarStore } from '@/store/sidebar'

const sidebar = useSidebarStore()
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/define';
.logo-box {
  display: flex;
  align-items: center;
  height: 72px;
  justify-content: center;
  padding: 0 24px;
  box-sizing: border-box;
  width: $sidebar-width;
  box-shadow: 0 1px 9px -3px rgb(0 0 0 / 20%);
  .logo {
    width: 36px;
    margin-right: 6px;
  }
}
</style>
