
<template>
  <div class="ds-slidebar-item">

    <ds-sidebar-link>
      <el-menu-item
        :index="resolvePath()"
      >
      </el-menu-item>
    </ds-sidebar-link>

    <el-sub-menu
      popper-append-to-body
    >
      <template #title>
<!--        <span>{{ item.meta?.title ?? '123213' }}</span>-->
        <span>{{ resolvePath(item.path) }}</span>
      </template>
      <ds-sidebar-cell
        v-for="child in item.children"
        :index="resolvePath(item.path)"
        :key="child.path"
        :item="child"
        :base-path="child.path"
      ></ds-sidebar-cell>
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
  import { RouteRecordRaw } from 'vue-router'
  import { isExternal } from 'src/layout/utils/helper'
  import DsSidebarLink from './Link.vue'

  defineOptions({
    name: 'ds-sidebar-cell'
  })

  const {
    basePath = '',
    item
  } = defineProps<{
    item: RouteRecordRaw,
    basePath?: string,
  }>()

  const resolvePath = (routePath: string) => {
    if (isExternal(routePath)) {
      return routePath
    }
    if (isExternal(basePath)) {
      return basePath
    }
    return `${basePath}${routePath}`
  }

  const hasOneShowingChild = computed(() => {
    const { children = [] } = item
    const child = null
    const showingChildren = children.filter(item => {
      if (item.hidden) {

      }
    })
    return child
  })


</script>
