
<template>
  <el-container
    class="ds-layout"
    :class="classes">
    <div
      class="ds-layout-mask"
      @click="setCollapse(!collapse)"
    ></div>
    <ds-sidebar/>
    <el-container
      class="ds-layout-inner"
      direction="vertical"
    >
      <div class="ds-layout-header">
        <ds-navbar/>
        <ds-tags/>
      </div>
      <div class="ds-layout-main">
        <router-view/>
      </div>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">

  import DsSidebar from './components/ds-sidebar/index.vue'
  import DsNavbar from './components/ds-navbar/index.vue'
  import DsTags from './components/ds-tags/index.vue'
  import { usePlatform, useCollapse } from './hooks'

  const platform = usePlatform()
  const [ collapse, setCollapse ] = useCollapse()
  const classes = computed(() => {
    return [
      `is-${platform.value}`,
      collapse.value ? 'is-hide-slidebar' : 'is-show-slidebar'
    ]
  })

</script>

<style lang="scss">
  @import "src/layout/styles/define";

  @include b(layout) {
    @extend %h100;
    @extend %w100;
    @extend %df;
    @extend %pr;

    @include e(inner) {
      @extend %df1;
      @extend %pr;
      @extend %h100;
    }

    @include e(mask) {
      @extend %pa;
      @extend %w100;
      @extend %h100;
      @extend %t0;
      @extend %l0;
      @extend %dn;
      background-color: rgb(0, 0, 0, .3);
      z-index: 99;
    }

    @include e(header) {
      @extend %pa;
      @extend %t0;
      @extend %l0;
      @extend %r0;
      z-index: 9;
      box-shadow: 0 1px 4px rgb(0, 21, 41, .08);
    }

    @include e(main) {
      @extend %bsb;
      @extend %oya;
      @extend %h100;
    }

    @include when(mobile) {
      .ds-slidebar{
        @extend %pf;
        @extend %t0;
        @extend %l0;
        z-index: 99;
        @include when(collapse) {
          width: 210px;
        }
      }

      &.is-show-slidebar{
        .ds-layout-mask{
          @extend %db;
        }
      }

      &.is-hide-slidebar{
        .ds-layout-mask{
          @extend %dn;
        }
        .ds-slidebar{
          transform: translate3d(-100%, 0, 0);
        }
      }
    }
  }
</style>
