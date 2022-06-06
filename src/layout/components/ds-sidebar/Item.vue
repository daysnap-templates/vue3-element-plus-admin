
<template>
  <div class="ds-slidebar-item">
    <el-sub-menu
      popper-append-to-body
    >
      <template #title>
<!--        <span>{{ item.meta?.title ?? '123213' }}</span>-->
        <span>{{ resolvePath(item.path) }}</span>
      </template>
      <ds-sidebar-item
        v-for="child in item.children"
        :index="resolvePath(item.path)"
        :key="child.path"
        :item="child"
        :base-path="child.path"
      ></ds-sidebar-item>
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
  import { RouteRecordRaw } from 'vue-router'
  import { isExternal } from '../../utils/helper'

  defineOptions({
    name: 'ds-sidebar-item'
  })
  const {
    basePath = '',
    item
  } = defineProps<{
    item: RouteRecordRaw,
    basePath?: string,
  }>()

  console.log('item => ', item)
  const resolvePath = (routePath: string) => {
    if (isExternal(routePath)) {
      return routePath
    }
    if (isExternal(basePath)) {
      return basePath
    }
    return `${basePath}${routePath}`
  }
</script>
