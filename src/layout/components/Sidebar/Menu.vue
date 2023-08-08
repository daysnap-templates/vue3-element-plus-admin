<template>
  <!--    text-color="#666"-->
  <el-menu
    class="sidebar-el-menu"
    :default-active="onRoutes"
    :collapse="sidebar.collapse"
    active-text-color="#1890ff"
    unique-opened
    router
  >
    <template v-for="item in items">
      <template v-if="item.children">
        <el-sub-menu :index="item.index" :key="item.index" v-permiss="item.permiss">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.title }}</span>
          </template>
          <template v-for="subItem in item.children">
            <el-sub-menu
              v-if="subItem.children"
              :index="subItem.index"
              :key="subItem.index"
              v-permiss="item.permiss"
            >
              <template #title>{{ subItem.title }}</template>
              <el-menu-item
                v-for="(threeItem, i) in subItem.children"
                :key="i"
                :index="threeItem.index"
              >
                {{ threeItem.title }}
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item
              v-else
              :index="subItem.index"
              :key="`key${subItem.index}`"
              v-permiss="item.permiss"
            >
              {{ subItem.title }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
      <template v-else>
        <el-menu-item :index="item.index" :key="item.index" v-permiss="item.permiss">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useSidebarStore } from '@/store/sidebar'
import { useRoute } from 'vue-router'

const items: Record<string, any> = [
  {
    icon: 'Odometer',
    index: '/dashboard',
    title: '系统首页',
    permiss: '1',
  },
  {
    icon: 'Calendar',
    index: '1',
    title: '表格相关',
    permiss: '2',
    children: [
      {
        index: '/table',
        title: '常用表格',
        permiss: '2',
      },
      {
        index: '/import',
        title: '导入Excel',
        permiss: '2',
      },
      {
        index: '/export',
        title: '导出Excel',
        permiss: '2',
      },
    ],
  },
  {
    icon: 'DocumentCopy',
    index: '/tabs',
    title: 'tab选项卡',
    permiss: '3',
  },
  {
    icon: 'Edit',
    index: '3',
    title: '表单相关',
    permiss: '4',
    children: [
      {
        index: '/form',
        title: '基本表单',
        permiss: '5',
      },
      {
        index: '/upload',
        title: '文件上传',
        permiss: '6',
      },
      {
        index: '4',
        title: '三级菜单',
        permiss: '7',
        children: [
          {
            index: '/editor',
            title: '富文本编辑器',
            permiss: '8',
          },
          {
            index: '/markdown',
            title: 'markdown编辑器',
            permiss: '9',
          },
        ],
      },
    ],
  },
  {
    icon: 'Setting',
    index: '/icon',
    title: '自定义图标',
    permiss: '10',
  },
  {
    icon: 'PieChart',
    index: '/charts',
    title: 'schart图表',
    permiss: '11',
  },
  {
    icon: 'Warning',
    index: '/permission',
    title: '权限管理',
    permiss: '13',
  },
  {
    icon: 'CoffeeCup',
    index: '/donate',
    title: '支持作者',
    permiss: '14',
  },
]
const route = useRoute()
const onRoutes = computed(() => {
  return route.path
})

const sidebar = useSidebarStore()
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/define';
.sidebar-el-menu {
  width: $sidebar-width;
  height: calc(100% - 72px);
  overflow-y: auto;
  box-sizing: border-box;
}
</style>
