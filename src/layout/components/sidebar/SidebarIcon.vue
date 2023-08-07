<template>
  <el-icon v-if="isElement" class="layout-icon" :size="size">
    <component :is="icon" />
  </el-icon>
  <svg v-else class="layout-icon" aria-hidden="true" :style="{ width: size, height: size }">
    <use :xlink:href="icon" />
  </svg>
</template>

<script setup lang="ts">
  const props = defineProps({
    icon: {
      type: String,
      default: '',
    },
    size: {
      type: [Number, String],
      default: 20,
    },
  })

  const isElement = computed(() => {
    const char = props.icon.substring(0, 1)
    return char >= 'A' && char <= 'Z'
  })
</script>

<style lang="scss" scoped>
  @import 'src/layout/styles/index';
  .layout-icon {
    // width: 20px;
    // height: 20px;
  }
</style>
