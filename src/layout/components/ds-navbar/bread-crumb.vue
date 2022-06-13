
<template>
  <el-breadcrumb
    class="ds-bread-crumb">
    <transition-group
      name="ds-bread-crumb">
      <el-breadcrumb-item
        class="ds-bread-crumb-item"
        :class="{
          'is-no-redirect': computedList.length - 1 === index
        }"
        v-for="(item, index) in computedList"
        :key="item.path + index"
        @click="handleLink(item, computedList.length - 1 === index)"
      >
        {{ item.meta?.title }}
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">

  import * as ptr from 'path-to-regexp'
  import { RouteLocationMatched, RouteLocationRaw } from 'vue-router'

  const route = useRoute()
  const computedList = computed(() => {
    return route.matched.filter(item => item.meta && item.meta.title)
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

  @import "src/layout/styles/define";

  @include b(bread-crumb) {
    background-color: #fff;

    @include e(item) {
      @extend %dib;
      font-size: 14px;
      line-height: 50px;
      margin-left: 8px;
    }

    @include e(enter-active) {
      transition: all .5s;
    }

    @include e(leave-active) {
      @extend %pa;
      transition: all .5s;
      opacity: 0;
      transform: translateX(20px);
    }

    @include e(enter-from) {
      opacity: 0;
      transform: translateX(20px);
    }

  }

</style>
