<template>
  <template v-if="!item.hidden">
    <template v-if="computedOneShowChild">
      <SidebarLink :to="resolvePath(computedOneShowChild.path)" v-if="computedOneShowChild.meta">
        <ElMenuItem :index="resolvePath(computedOneShowChild.path)">
          <SidebarIcon
            v-if="computedOneShowChild.meta.icon || item?.meta?.icon"
            :icon="computedOneShowChild.meta.icon || item?.meta?.icon"
          />
          <template #title>
            {{ computedOneShowChild.meta.title }}
          </template>
        </ElMenuItem>
      </SidebarLink>
    </template>
    <ElSubMenu v-else :index="resolvePath(item.path)">
      <template #title v-if="item.meta">
        <SidebarIcon v-if="item.meta.icon" :icon="item.meta.icon" />
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
</template>

<script setup lang="ts">
  import type { RouteRecordRaw } from 'vue-router'

  import { isExternal, resolve } from '@/layout/utils'

  import SidebarIcon from './SidebarIcon.vue'
  import SidebarLink from './SidebarLink.vue'

  const props = defineProps<{
    item: RouteRecordRaw
    basePath: string
  }>()

  const resolvePath = (routePath: string) => {
    const { basePath } = props
    if (isExternal(routePath)) {
      return routePath
    }
    if (isExternal(basePath)) {
      return basePath
    }
    return resolve(basePath, routePath)
  }

  const computedOneShowChild = computed(() => {
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
      child = null
    }

    return child
  })
</script>
