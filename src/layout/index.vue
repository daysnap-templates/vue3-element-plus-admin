
<template>
  <el-container
    class="ds-layout">
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
</script>

<style lang="scss" src="./styles/index.scss"></style>
