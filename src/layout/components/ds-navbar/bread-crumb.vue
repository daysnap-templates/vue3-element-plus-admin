
<template>
  <el-breadcrumb
    class="ds-bread-crumb">
    <transition-group
      name="ds-bread-crumb">
      <el-breadcrumb-item
        class="ds-bread-crumb-item"
        v-for="(item, index) in computedList"
        :key="item.path + index"
      >
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">

  const computedList = computed(() => {
    const route = useRoute()
    return route.matched.filter(item => item.meta && item.meta.title)
  })

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
