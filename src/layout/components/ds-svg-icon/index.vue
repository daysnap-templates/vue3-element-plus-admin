
<template>
  <el-icon
    v-if="isElement"
    class="ds-svg-icon"
    :size="size">
    <component :is="icon"/>
  </el-icon>
  <svg
    v-else
    class="ds-svg-icon"
    aria-hidden="true"
    :style="{ width: size, height: size }">
    <use :xlink:href="icon" />
  </svg>

</template>

<script setup lang="ts">
  const {
    size = 20,
    icon = '',
  } = defineProps<{
    icon?: string,
    size?: number,
  }>()

  const isElement = computed(() => {
    const char = icon.substring(0, 1)
    return char >= 'A' && char <= 'Z'
  })
</script>

<style lang="scss" scoped>
  @import "src/layout/styles/index";

  @include b(svg-icon) {
    width: 20px;
    height: 20px;
  }
</style>
