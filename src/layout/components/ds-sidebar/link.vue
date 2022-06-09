
<template>
  <component
    v-bind="attrs"
    :is="attrs.is">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
  import { isExternal } from 'src/layout/utils/helper'
  const { to } = defineProps<{
    to: string
  }>()

  const attrs = computed(() => {
    return isExternal(to)
      ? { is: `a`, href: to, target: '_blank', rel: 'noopener' }
      : { is: 'router-link', to }
  })
</script>
