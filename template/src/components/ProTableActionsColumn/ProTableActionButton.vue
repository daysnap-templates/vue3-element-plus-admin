<template>
  <div class="pro-table-action-button">
    <ProActionButton v-bind="props" link type="primary" @click="$emit('click')">
      <slot> </slot>
    </ProActionButton>
  </div>
</template>

<script setup lang="ts">
  import { proActionButtonProps } from '../ProActionButton'

  defineEmits(['click'])

  const props = defineProps(proActionButtonProps)
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/define.scss';
  .pro-table-action-button {
    @extend %dib;
    :deep {
      .el-button {
        text-align: left;
        line-height: 1.3;
        white-space: normal;
      }
    }
  }
</style>
