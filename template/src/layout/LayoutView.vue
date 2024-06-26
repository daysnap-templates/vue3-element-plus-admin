<template>
  <div class="layout-wrap" :class="classes">
    <div class="layout-sidebar-mask" @click="toggle"></div>
    <Sidebar class="layout-sidebar" />
    <div class="layout-inner">
      <div class="layout-header">
        <Navbar />
        <Tags />
      </div>
      <div class="layout-content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Navbar, Sidebar, Tags } from './components'
  import { useMenuCollapse } from './hooks'

  const { collapse, platform, toggle, withoutAnimation } = useMenuCollapse()

  const classes = computed(() => {
    return [
      `is-${platform.value}`,
      withoutAnimation.value ? `is-without-animation` : '',
      collapse.value ? 'is-hide-slidebar' : 'is-show-slidebar',
    ]
  })
</script>

<style lang="scss">
  @import '@/layout/styles/index.scss';
  .layout-wrap {
    &.is-without-animation {
      .layout-header,
      .layout-sidebar {
        transition: none !important;
      }
    }
    &.is-desktop {
      .layout-sidebar {
        transition: width 0.3s;
      }
      .layout-inner {
        transition: margin-left 0.3s;
      }
      .layout-header {
        transition: width 0.3s;
      }
      &.is-show-slidebar {
        .layout-sidebar {
          width: var(--ly-slidebar-width);
        }
        .layout-inner {
          margin-left: var(--ly-slidebar-width);
        }
        .layout-header {
          width: calc(100% - var(--ly-slidebar-width));
        }
      }
      &.is-hide-slidebar {
        .layout-sidebar {
          width: var(--ly-slidebar-collapse-width);
        }
        .layout-inner {
          margin-left: var(--ly-slidebar-collapse-width);
        }
        .layout-header {
          width: calc(100% - var(--ly-slidebar-collapse-width));
        }
      }
    }
    &.is-mobile {
      .layout-sidebar {
        @extend %pf;
        @extend %t0;
        @extend %l0;
        z-index: 9999;
        width: var(--ly-slidebar-width);
        transition: transform 0.3s;
      }
      .layout-header {
        width: 100%;
      }
      &.is-show-slidebar {
        .layout-sidebar-mask {
          @extend %db;
        }
      }
      &.is-hide-slidebar {
        .layout-sidebar-mask {
          @extend %dn;
        }
        .layout-sidebar {
          transform: translate3d(-100%, 0, 0);
        }
      }
    }
  }
  .layout-sidebar-mask {
    @extend %pf;
    @extend %t0;
    @extend %l0;
    @extend %r0;
    @extend %b0;
    @extend %dn;
    z-index: 9998;
    background-color: rgb(0, 0, 0, 0.3);
  }
  .layout-inner {
    min-height: 100vh;
  }
  .layout-header {
    @extend %pf;
    @extend %t0;
    @extend %r0;
    z-index: 9;
    background-color: #fff;
    box-shadow: 0 1px 1px 0 rgb(0, 21, 41, 0.08);
  }
  .layout-content {
    @extend %bsb;
    padding: 16px;
    padding-top: calc(var(--ly-navbar-height) + 37px + 16px);
  }
</style>
