<template>
  <div class="navbar">
    <Collapse />
  </div>
</template>

<script lang="ts" setup>
import Collapse from '@/layout/components/Navbar/Collapse.vue'
</script>

<style lang="scss" scoped>
.navbar {
  height: 72px;
  background-color: #fff;
  box-shadow: 4px 4px 40px 0 rgb(0 0 0 / 5%);
}
</style>
