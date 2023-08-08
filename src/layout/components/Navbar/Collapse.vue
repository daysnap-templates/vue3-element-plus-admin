<template>
  <div class="collapse" @click="collapseChange">
    <el-icon v-if="sidebar.collapse"><Expand /></el-icon>
    <el-icon v-else><Fold /></el-icon>
  </div>
</template>

<script lang="ts" setup>
import { useSidebarStore } from '@/store/sidebar'

const sidebar = useSidebarStore()
// 侧边栏折叠
const collapseChange = () => {
  sidebar.handleCollapse()
  const root: HTMLHtmlElement = document.querySelector(':root') as HTMLHtmlElement
  root.style.setProperty('--layout-sidebar-width', sidebar.collapse ? '80px' : '200px')
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/define';
</style>
