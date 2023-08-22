<template>
  <component v-bind="attrs" :is="attrs.is">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
  import { isExternal } from '@/layout/utils'

  const props = defineProps({
    to: {
      type: String,
      default: '',
    },
  })

  const attrs = computed(() => {
    return isExternal(props.to)
      ? { is: `a`, href: props.to, target: '_blank', rel: 'noopener' }
      : { is: 'router-link', to: props.to }
  })
</script>
