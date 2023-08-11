<template>
  <ElBreadcrumb class="layout-breadcrumb">
    <TransitionGroup name="layout-breadcrumb">
      <ElBreadcrumbItem
        v-for="(item, index) in computedList"
        class="layout-breadcrumb-item"
        :class="{
          'is-no-redirect': computedList.length - 1 === index,
        }"
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
  .layout-breadcrumb-item {
    @extend %cp;
    font-weight: 500;
    :deep {
      &:hover {
        .el-breadcrumb__inner {
          color: var(--el-color-primary);
        }
      }
      &.is-no-redirect {
        cursor: default;
        .el-breadcrumb__inner {
          color: var(--el-text-color-regular);
        }
      }
    }
  }
  .layout-breadcrumb-enter-active {
    transition: all 0.5s;
  }
  .layout-breadcrumb-leave-active {
    @extend %pa;
    transition: all 0.5s;
    opacity: 0;
    transform: translateX(20px);
  }
  .layout-breadcrumb-enter-from {
    opacity: 0;
    transform: translateX(20px);
  }
</style>
