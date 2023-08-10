<template>
  <ProQueryForm />

  <ProTable>
    <slot></slot>
  </ProTable>
</template>

<script setup lang="ts">
  defineProps({})
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/index.scss';
</style>
