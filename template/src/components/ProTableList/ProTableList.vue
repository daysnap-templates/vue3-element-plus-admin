<template>
  <div class="pro-table-list">
    <div v-if="hasRefresh" class="pro-table-header">
      <div class="pro-table-title">
        <slot name="title"></slot>
      </div>
      <div class="pro-table-actions">
        <ElButton
          plain
          icon="RefreshRight"
          :loading="loading"
          v-if="hasRefresh"
          @click="$emit('request', {})"
        >
          刷新
        </ElButton>
        <slot name="actions"></slot>
      </div>
    </div>
    <div class="pro-table-content" v-loading="loading" element-loading-text="加载中">
      <slot name="table" :data="data">
        <ElTable width="100%" table-layout="fixed" :data="data" :height="height">
          <template #empty>
            <ElEmpty description="暂无数据" />
          </template>
          <slot></slot>
        </ElTable>
      </slot>
    </div>
    <ElPagination
      v-if="hasPagination"
      class="pro-table-pagination"
      layout="total, prev, pager, next, sizes, jumper"
      background
      small
      :current-page="pageIndex"
      :page-size="pageSize"
      :total="total"
      :page-sizes="[10, 20, 50, 100]"
      @update:current-page="$emit('request', { pageIndex: $event })"
      @update:page-size="$emit('request', { pageSize: $event, pageIndex: 1 })"
    />
  </div>
</template>
<script setup lang="ts">
  defineEmits(['request'])

  defineProps({
    height: [String, Number],
    hasPagination: {
      type: Boolean,
      default: true,
    },
    total: {
      type: Number,
    },
    data: {
      type: Array,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageIndex: {
      type: Number,
      default: 1,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    hasRefresh: {
      type: Boolean,
      default: true,
    },
  })
</script>
<style lang="scss" scoped>
  @import '@/assets/scss/define.scss';
  .pro-table-list {
    @extend %pr;
    @extend %w100;
    z-index: 1;
    background-color: #fff;
    padding: 16px 0;
    :deep {
      .el-table {
        width: 100%;
        --el-table-bg-color: transparent;
      }
      .el-table__header {
        --el-table-header-bg-color: #f2f3f5;
        --el-table-header-text-color: #1d2129;
      }
      .el-table__body-wrapper {
        font-size: j(12);
        .el-table__cell {
          padding: j(16) 0;
        }
        .cell {
          line-height: 1.4;
        }
        ul {
          li {
            margin-top: j(4);
            &:first-child {
              margin-top: 0;
            }
          }
        }
      }
    }
  }
  .pro-table-header {
    @extend %df;
    @extend %aic;
    @extend %fww;
    padding: 0 16px;
    margin-bottom: 16px;
    h2 {
      font-size: 16px;
    }
  }
  .pro-table-actions {
    flex-shrink: 0;
    margin-left: auto;
  }
  .pro-table-content {
    padding: 0 16px;
  }
  .pro-table-pagination {
    @extend %jce;
    margin-top: 24px;
    padding: 0 16px;
  }
</style>
