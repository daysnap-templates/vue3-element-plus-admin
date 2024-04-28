<template>
  <ElIcon class="pro-icon" v-bind="props">
    <component v-if="isElement" :is="name" />

    <i v-else class="iconfont" :class="[name]"></i>
  </ElIcon>
</template>

<script setup lang="ts">
  import { iconProps } from 'element-plus'
  const props = defineProps({
    name: {
      type: String,
      default: '',
    },
    ...iconProps,
  })

  const isElement = computed(() => {
    const char = props.name.substring(0, 1)
    return char >= 'A' && char <= 'Z'
  })
</script>
