<template>
  <div class="pro-table">
    <ProQueryForm
      v-if="metadata"
      :metadata="metadata"
      :loading="status.loading"
      @query="handleQuery"
    />

    <ProTableList v-bind="status" :data="data" @request="reqTableList">
      <template #actions>
        <ElButton type="primary" plain icon="Plus">新增</ElButton>
      </template>
      <slot></slot>
    </ProTableList>
  </div>
</template>

<script setup lang="ts">
  import { useTablePaging } from '@/hooks'
  import type { QueryFormMetadata } from '@/types'
  import type { ProTableRequest } from './types'
  import { filterEmptyValue } from '@daysnap/utils'
  import { banana } from '@daysnap/banana'

  const props = defineProps({
    metadata: {
      type: Object as PropType<QueryFormMetadata>,
      default: () => ({}),
    },
    request: {
      type: Function as PropType<ProTableRequest>,
      required: true,
    },
  })

  // eslint-disable-next-line vue/no-setup-props-destructure
  const query = ref(filterEmptyValue(banana.extract(props.metadata), true))

  const handleQuery = (val: Record<string, any>) => {
    query.value = val
    reqTableList(1)
  }

  const [status, data, reqTableList] = useTablePaging(
    (state) => {
      return props.request(state, query.value)
    },
    {
      immediate: true,
    },
  )
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/define.scss';
  .pro-table {
    @extend %df;
    @extend %fdc;
    min-height: calc(100vh - var(--ds-navbar-height) - 37px - 32px);
    :deep {
      .pro-table-list {
        @extend %df1;
        @extend %df;
        @extend %fdc;
      }
      // 解决 table 希望尽量撑满一屏
      .el-scrollbar__view {
        display: inline-flex !important;
      }
      .el-scrollbar__view,
      .el-scrollbar__wrap,
      .el-table__body-wrapper,
      .el-scrollbar,
      .pro-table-content,
      .el-table,
      .el-table__inner-wrapper {
        @extend %df1;
        @extend %df;
        @extend %fdc;
      }
      .el-table__empty-block {
        @extend %df;
        @extend %fdc;
        @extend %df1;
        @extend %aic;
        @extend %jcc;
      }
    }
  }
</style>
