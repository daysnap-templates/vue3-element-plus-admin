
<template>
  <div class="ds-slidebar">
    <ds-logo/>
    <el-scrollbar>
      <el-menu
        mode="vertical"
        :unique-opened="false"
        :default-active="computedActiveMenu"
      >
        <ds-sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
    ds-slidebar
  </div>
</template>

<script setup lang="ts">
  import DsLogo from './Logo.vue'
  import DsSidebarItem from './Item.vue'
  const routes = useRouter().options.routes
  const computedActiveMenu = computed(() => {
    const route = useRoute()
    // const { mata, path } = route
    console.log('111 => ', route.path)
    return route.path
  })
</script>
