
<template>
  <div class="ds-navbar">
    <ds-hamburger/>
    <ds-bread-crumb/>
    <div class="ds-navbar-right">
      <el-tooltip content="全屏">
        <ds-screen-full/>
      </el-tooltip>
      <el-dropdown
        class="ds-user"
        trigger="hover">
        <div class="ds-user-info">
          <img src="src/assets/avatar.png" alt="头像"/>
          <el-icon><CaretBottom /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>安全退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
  import DsBreadCrumb from './bread-crumb.vue'
  import DsHamburger from './hamburger.vue'
  import DsScreenFull from './screen-full.vue'
</script>

<style lang="scss" scoped>
  @import "src/layout/styles/define";

  @include b(navbar) {
    @extend %df;
    @extend %aic;
    background-color: #aaa;
    height: 50px;

    @include e(right) {
      @extend %df;
      @extend %aic;
      margin-left: auto;
    }
  }

  @include b(user) {
    @extend %h100;
    padding: 0 15px;
    @include e(info) {
      @extend %df;
      @extend %aic;
      @extend %cp;
      img{
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
    }
  }

</style>
