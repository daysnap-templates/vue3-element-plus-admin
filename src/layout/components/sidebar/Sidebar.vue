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
  import SidebarLogo from './SidebarLogo.vue'
  import SidebarCell from './SidebarCell.vue'

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

  const computedActiveMenu = computed(() => {
    const route = useRoute()
    const { meta, path } = route
    return (meta?.activeMenu ?? path) as string
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
  }
  .layout-sidebar-inner {
    @extend %df1;
  }
</style>
