<template>
  <div class="layout-sidebar">
    <SidebarLogo :collapse="collapse" />
    <ElScrollbar class="layout-sidebar-inner">
      <ElMenu
        class="layout-sidebar-menu"
        mode="vertical"
        :collapse="collapse"
        :unique-opened="false"
        :collapse-transition="false"
        :default-active="computedActiveMenu"
        @select="handleSelect"
      >
        <SidebarCell
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </ElMenu>
    </ElScrollbar>
  </div>
</template>

<script setup lang="ts">
  import { PLATFORM, useMenuCollapse } from '@/layout/hooks'

  import SidebarCell from './SidebarCell.vue'
  import SidebarLogo from './SidebarLogo.vue'

  const routes = useRouter().options.routes
  const { collapse, toggle, platform } = useMenuCollapse()

  const route = useRoute()
  watch(
    () => ({ ...route }),
    () => {
      if (platform.value === PLATFORM.MOBILE) {
        toggle()
      }
    },
  )

  const selectPath = ref('')
  const handleSelect = (path: string) => {
    selectPath.value = path
    nextTick(() => (selectPath.value = ''))
  }

  const computedActiveMenu = computed(() => {
    const { meta, path } = route
    return selectPath.value || ((meta?.activePath ?? path) as string)
  })
</script>

<style lang="scss" scoped>
  @import '@/layout/styles/define.scss';
  .layout-sidebar {
    @extend %pf;
    @extend %l0;
    @extend %t0;
    @extend %b0;
    @extend %df;
    @extend %fdc;
    @extend %usn;
    background-color: #fff;
  }
  .layout-sidebar-inner {
    @extend %df1;
  }
  .layout-sidebar-menu {
    border-right: none;
    padding: 0 j(8);
    --el-menu-item-height: 40px;
    --el-menu-sub-item-height: 40px;

    --el-menu-base-level-padding: 8px;
    --el-menu-level-padding: 12px;
    --el-menu-text-color: #4e5969;

    --el-menu-icon-margin-right: 10px;
    --el-menu-icon-width: 20px;

    :deep {
      .el-icon {
        margin-right: var(--el-menu-icon-margin-right);
      }
      .el-sub-menu {
        margin-top: j(4);
        &.is-active {
          .el-sub-menu__title {
            font-weight: 500;
            color: $color-primary;
          }
        }
      }
      .el-menu-item {
        margin-top: j(4);
        &.is-active {
          font-weight: 500;
          background-color: var(--el-menu-hover-bg-color);
        }
      }
      .el-sub-menu {
        .el-sub-menu__title,
        .el-menu-item {
          padding-left: calc(var(--el-menu-level-padding));
        }
      }
      &.el-menu--collapse {
        width: auto;
        padding: 0;
        --el-menu-base-level-padding: 0;
        --el-menu-level-padding: 0;
        .el-icon {
          margin-right: 0;
        }
        .el-sub-menu__title,
        .el-menu-tooltip__trigger {
          padding-left: j(12);
        }
      }
    }
  }
</style>
