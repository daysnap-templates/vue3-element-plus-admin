
<template>
  <div class="ds-slidebar" :class="{
    'is-collapse': collapse
  }">
    <ds-logo
      @click="toggle"
      :collapse="collapse"
    />
    <el-scrollbar class="ds-slidebar-scrollbar">
      <el-menu
        class="ds-slidebar-menu"
        mode="vertical"
        :collapse="collapse"
        :unique-opened="false"
        :default-active="computedActiveMenu"
      >
        <ds-sidebar-cell
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">

  import { useMenuCollapse } from 'src/layout/hooks'
  import DsLogo from './logo.vue'
  import DsSidebarCell from './cell.vue'

  const routes = useRouter().options.routes
  const { collapse, toggle } = useMenuCollapse()

  const computedActiveMenu = computed(() => {
    const route = useRoute()
    const { meta, path } = route
    return meta?.activeMenu?? path
  })

</script>

<style lang="scss" scoped>
  @import "src/layout/styles/define";

  @include b(slidebar) {
    @extend %df;
    @extend %fdc;
    @extend %h100;
    width: $slider-bar-width;
    background-color: $slider-bar-background-color;
    transition: width .3s;

    @include when(collapse) {
      width: $slider-bar-collapse-width;
    }

    @include e(scrollbar) {
      @extend %df1;
    }

    @include e(menu) {
      width: 100% !important;
    }

    :deep {
      .el-sub-menu__title{
        @extend %oh;
      }
    }

  }
</style>
