<template>
  <div class="pro-table-list">
    <div class="pro-table-header">
      <h2>{{ title }}</h2>
      <div class="pro-table-actions">
        <ElButton plain icon="RefreshRight" :loading="loading" @click="$emit('request', {})">
          刷新
        </ElButton>
        <slot name="actions"></slot>
      </div>
    </div>
    <div class="pro-table-content" v-loading="loading" element-loading-text="加载中">
      <ElTable width="100%" stripe table-layout="fixed" :data="data">
        <slot></slot>
      </ElTable>
    </div>
    <ElPagination
      class="pro-table-pagination"
      layout="total, sizes, prev, pager, next, jumper"
      background
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
    title: {
      type: String,
      default: '列表',
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
  })
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/define.scss';
  .pro-table-list {
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.05);
    padding: 16px 0;
    :deep {
      .el-table {
        --el-table-bg-color: transparent;
      }
    }
  }
  .pro-table-header {
    @extend %df;
    @extend %aic;
    @extend %fww;
    padding: 0 16px;
    h2 {
      font-size: 16px;
    }
  }
  .pro-table-actions {
    flex-shrink: 0;
    margin-left: auto;
  }
  .pro-table-content {
    margin-top: 10px;
    padding: 0 16px;
  }
  .pro-table-pagination {
    @extend %jcc;
    margin-top: 24px;
    padding: 0 16px;
  }
</style>
