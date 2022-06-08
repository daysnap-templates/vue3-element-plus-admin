
<template>
  <el-icon></el-icon>
  <span slot="title">{{ title }}</span>
</template>

<script setup lang="ts">
  defineProps<{
    icon?: string,
    title?: string,
  }>()
</script>
