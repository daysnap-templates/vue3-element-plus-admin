<template>
  <ElDropdown class="layout-user-box" trigger="hover">
    <div class="layout-user-content">
      <img src="@/assets/img/avatar.png" alt="头像" />
      <span>你好你好</span>
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
  }
  .layout-user-content {
    @extend %df;
    @extend %aic;
    @extend %cp;
    outline: none;
    font-size: 14px;
    padding: 0 15px;
    span {
      @extend %twno;
      max-width: 60px;
      margin-right: 5px;
    }
    img {
      width: 32px;
      height: 32px;
      margin-right: 5px;
    }
  }
</style>
