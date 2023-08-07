<template>
  <ElBreadcrumb class="layout-breadcrumb">
    <TransitionGroup name="ds-bread-crumb">
      <ElBreadcrumbItem
        class="ds-bread-crumb-item"
        :class="{
          'is-no-redirect': computedList.length - 1 === index,
        }"
        v-for="(item, index) in computedList"
        :key="item.path + index"
        @click="handleLink(item, computedList.length - 1 === index)"
      >
        {{ item.meta?.title }}
      </ElBreadcrumbItem>
    </TransitionGroup>
  </ElBreadcrumb>
</template>

<script setup lang="ts">
  import type { ElBreadcrumb } from 'element-plus'
  import * as ptr from 'path-to-regexp'
  import type { RouteLocationMatched, RouteLocationRaw } from 'vue-router'

  const route = useRoute()
  const computedList = computed(() => {
    return route.matched.filter((item) => item.meta && item.meta.title)
  })

  const router = useRouter()
  const handleLink = (item: RouteLocationMatched, disabled: boolean) => {
    if (disabled) {
      return
    }
    const { redirect, path } = item
    if (redirect) {
      return router.push(redirect as RouteLocationRaw)
    }
    const { params } = route
    const to = ptr.compile(path)(params)
    router.push(to)
  }
</script>

<style lang="scss" scoped>
  @import '@/layout/styles/define.scss';
  .layout-breadcrumb {
    padding: 0 10px;
  }
</style>
