<template>
  <div>
    <ProQueryForm v-if="metadata" :metadata="metadata" />

    <ProTableList>
      <template #actions>
        <slot name="actions"></slot>
      </template>
      <slot></slot>
    </ProTableList>
  </div>
</template>

<script setup lang="ts">
  import type { QueryFormMetadata } from '@/types'

  defineProps({
    metadata: {
      type: Object as PropType<QueryFormMetadata>,
    },
  })
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/define.scss';
</style>
