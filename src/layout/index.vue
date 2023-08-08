<template>
  <div class="content-box">
    <Sidebar />
    <div class="content">
      <Navbar />
      <TagsView />
      <div class="inner">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navbar from './components/Navbar/index.vue'
import Sidebar from './components/Sidebar/index.vue'
import TagsView from './components/TagsView/index.vue'
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/define';

.content-box {
  // display: flex;
  // flex-direction: row;
  background: #f0f2f5;
}
.content {
  padding-left: $sidebar-width;
  box-sizing: border-box;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}
.inner {
  flex: 1;
  overflow-y: scroll;
  padding: 15px;
}
</style>
