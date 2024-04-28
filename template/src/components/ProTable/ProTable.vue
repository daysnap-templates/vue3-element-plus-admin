<template>
  <div class="pro-table">
    <ProQueryForm
      v-if="hasQuery"
      :metadata="queryMetadata"
      :loading="status.loading"
      @query="handleQuery"
    />

    <ProTableList
      v-bind="status"
      :data="data"
      :has-pagination="hasPagination"
      :height="height"
      @request="reqTableList"
    >
      <template #actions>
        <slot name="actions" :data="data"> </slot>
      </template>
      <template #table="scope">
        <slot name="table" :data="scope.data"></slot>
      </template>

      <slot :data="data"></slot>
    </ProTableList>
  </div>
</template>

<script setup lang="ts">
  import { banana } from '@daysnap/banana'
  import { filterEmptyValue } from '@daysnap/utils'

  import { usePermissionStore } from '@/stores'

  import { proTableProps } from './types'
  import { useProTablePaging, type UseProTablePagingParams } from './useProTablePaging'

  const props = defineProps(proTableProps)
  const { has } = usePermissionStore()

  const hasQuery = computed(() => {
    const { pd } = props

    const permission = pd ? has(pd) : true

    return permission && !!Object.keys(props.queryMetadata).length
  })

  // eslint-disable-next-line vue/no-setup-props-destructure
  const query = ref(filterEmptyValue(banana.extract(props.queryMetadata), true))

  const handleQuery = (val: Record<string, any>) => {
    query.value = val
    reqTableList(1)
  }

  const [status, data, reqTableList] = useProTablePaging(
    (state) => {
      return props.request!(state, query.value)
    },
    {
      immediate: props.immediate,
    },
  )

  defineExpose({
    reload: (options: UseProTablePagingParams = {}) => reqTableList(options),
  })
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/define.scss';
  .pro-table {
    @extend %df;
    @extend %fdc;
    @extend %w100;
    min-height: calc(100vh - var(--ly-topbar-height) - var(--ly-navbar-height) - 16px - 16px);
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
    }
    &.is-fullscreen {
      :deep {
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
  }
</style>
