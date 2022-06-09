
<template>
  <template v-if="computedChild">
    <ds-sidebar-link
      :to="resolvePath(computedChild.path)"
      v-if="computedChild.meta">
      <el-menu-item
        :index="resolvePath(computedChild.path)"
      >
        <el-icon><Basketball/></el-icon>
        <template #title>
          {{ computedChild.meta.title }}
        </template>
      </el-menu-item>
    </ds-sidebar-link>
  </template>
  <el-sub-menu
    v-else
    :index="resolvePath(item.path)"
    popper-append-to-body
  >
    <template #title v-if="item.meta">
        <el-icon><Basketball/></el-icon>
        <span>{{ item.meta.title }}</span>
    </template>
    <ds-sidebar-cell
      v-for="child in item.children"
      :key="child.path"
      :item="child"
      :base-path="resolvePath(child.path)"
    ></ds-sidebar-cell>
  </el-sub-menu>
</template>

<script setup lang="ts">

  import { resolve } from 'src/layout/utils/resolve'
  import { RouteRecordRaw } from 'vue-router'
  import { isExternal } from 'src/layout/utils/helper'
  import DsSidebarLink from './link.vue'

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
    return resolve(basePath, routePath)
  }

  const computedChild = computed(() => {
    const { children = [] } = item
    let child = null
    const showingChildren = children.filter(item => {
      if (item.hidden) {
        return false
      } else {
        child = item
        return true
      }
    })
    if (showingChildren.length === 0) {
      child = { ...item, path: '' }
    } else if (showingChildren.length > 1) {
      child = ''
    }

    return child
  })


</script>
