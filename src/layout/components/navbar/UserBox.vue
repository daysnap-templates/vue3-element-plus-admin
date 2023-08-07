<template>
  <ElDropdown class="layout-user-box" trigger="hover">
    <div class="layout-user-content">
      <img src="@/assets/img/avatar.png" alt="头像" />
      <ElIcon>
        <CaretBottom />
      </ElIcon>
    </div>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem>安全退出</ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<script setup lang="ts">
  import { CaretBottom } from '@element-plus/icons'
</script>

<style lang="scss" scoped>
  @import '@/layout/styles/define.scss';
  .layout-user-box {
    //
  }
  .layout-user-content {
    @extend %df;
    @extend %aic;
    @extend %cp;
    padding: 0 10px;
    img {
      width: 32px;
      height: 32px;
      margin-right: 10px;
    }
  }
</style>
