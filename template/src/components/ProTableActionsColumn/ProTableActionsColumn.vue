<template>
  <ElTableColumn v-if="!slots.length" v-bind="attrs" fixed="left" label="操作" width="220px">
    <template #default="scope">
      <div class="pro-table-actions">
        <slot :row="scope.row"> </slot>
      </div>
    </template>
  </ElTableColumn>
</template>

<script setup lang="ts">
  const attrs = useAttrs()
  const slots = useSlots()
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/define.scss';
  .pro-table-actions {
    :deep {
      .el-button {
        line-height: 1.6;
      }
      .el-button + .el-button {
        margin-left: 0;
      }
      .pro-table-action-button {
        min-width: 50%;
      }
    }
  }
</style>
