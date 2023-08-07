<template>
  <template v-if="computedChild">
    <SidebarLink :to="resolvePath(computedChild.path)" v-if="computedChild.meta">
      <ElMenuItem :index="resolvePath(computedChild.path)">
        <SidebarIcon :icon="computedChild.meta.icon" />
        <template #title>
          {{ computedChild.meta.title }}
        </template>
      </ElMenuItem>
    </SidebarLink>
  </template>
  <ElSubMenu v-else :index="resolvePath(item.path)" popper-append-to-body>
    <template #title v-if="item.meta">
      <SidebarIcon :icon="item.meta.icon" />
      <span>{{ item.meta.title }}</span>
    </template>
    <SidebarCell
      v-for="child in item.children"
      :key="child.path"
      :item="child"
      :base-path="resolvePath(child.path)"
    />
  </ElSubMenu>
</template>

<script setup lang="ts">
  import type { RouteRecordRaw } from 'vue-router'
  import { isExternal, resolve } from '@/layout/utils'
  import SidebarLink from './SidebarLink.vue'
  import SidebarIcon from './SidebarIcon.vue'

  const props = defineProps<{
    item: RouteRecordRaw
    basePath: string
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
    const { item } = props
    const { children = [] } = item

    let child = null

    const showingChildren = children.filter((item) => {
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
