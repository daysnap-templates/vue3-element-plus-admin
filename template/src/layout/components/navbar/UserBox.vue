<template>
  <ElDropdown class="layout-user-box" trigger="hover">
    <div class="layout-user-content">
      <ElIcon>
        <User />
      </ElIcon>
      <span>你好你好</span>
      <ElIcon>
        <CaretBottom />
      </ElIcon>
    </div>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem @click="handleExit">安全退出</ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<script setup lang="ts">
  import { CaretBottom } from '@element-plus/icons-vue'

  const router = useRouter()

  const handleExit = async () => {
    await ElMessageBox.confirm(`确认是否退出该账号？`)
    router.replace('/login')
    ElMessage.success(`退出成功`)
  }
</script>

<style lang="scss" scoped>
  @import '@/layout/styles/define.scss';
  .layout-user-content {
    @extend %df;
    @extend %aic;
    @extend %cp;
    outline: none;
    font-size: 14px;
    padding: 0 15px;
    span {
      @extend %twno;
      margin: 0 j(4);
      max-width: 60px;
    }
    img {
      width: 32px;
      height: 32px;
      margin-right: 5px;
    }
  }
</style>
