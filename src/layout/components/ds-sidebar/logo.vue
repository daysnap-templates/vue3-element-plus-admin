
<template>
  <div class="ds-logo">
    <transition name="ds-logo-fade">
      <router-link
        class="is-collapse"
        to="/"
        key="collapse"
        v-if="collapse"
      >
        <img src="src/assets/logo.png" alt="logo"/>
        <h1>XX管理系统</h1>
      </router-link>
      <router-link
        class="is-expand"
        key="expand"
        v-else
        to="/"
      >
        <img src="src/assets/logo.png" alt="logo"/>
        <h1>XX管理系统</h1>
      </router-link>
    </transition>
  </div>
</template>

<script setup lang="ts">

  defineProps<{
    collapse: boolean
  }>()

</script>

<style lang="scss" scoped>
  @import "src/layout/styles/define";

  @include b(logo) {
    @extend %pr;
    @extend %oh;
    @extend %w100;
    height: 50px;
    img{
      width: 32px;
      height: 32px;
    }

    a {
      @extend %df;
      @extend %aic;
      @extend %jcc;
      @extend %h100;
      @extend %pr;
      @extend %w100;
      @extend %wsn;

      @include when(collapse) {
        h1{
          @extend %pa;
          font-size: 0;
          width: 0;
          height: 0;
          text-indent: 200px;
        }
      }

      @include when(expand) {
      }
    }

    @include b(logo-fade) {
      @include e(enter-active) {
        transition: opacity .3s;
      }
      @include e(enter-from) {
        opacity: 0;
      }
      @include e(leave-to) {
        opacity: 0;
      }
    }

  }
</style>
