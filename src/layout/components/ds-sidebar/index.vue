
<template>
  <div class="ds-slidebar">
    <ds-logo
      @click="setCollapse(!collapse)"
      :collapse="collapse"
    />
    <el-scrollbar>
      <p @click="setCollapse(!collapse)">ddsadad</p>
      <el-menu
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

  import { useCollapse } from 'src/layout/hooks'
  import DsLogo from './Logo.vue'
  import DsSidebarCell from './Cell.vue'

  const routes = useRouter().options.routes
  const [ collapse, setCollapse ] = useCollapse()

  const computedActiveMenu = computed(() => {
    const route = useRoute()
    const { meta, path } = route
    return meta?.activeMenu?? path
  })

</script>
