<template>
  <div class="layout-sidebar-logo">
    <Transition name="layout-sidebar-logo-fade">
      <RouterLink class="is-collapse" to="/" key="collapse" v-if="collapse">
        <img src="@/assets/img/logo.png" alt="logo" />
        <h1>VUEVUEVUE</h1>
      </RouterLink>
      <RouterLink class="is-expand" key="expand" v-else to="/">
        <img src="src/assets/img/logo.png" alt="logo" />
        <h1>VUEVUEVUE</h1>
      </RouterLink>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    collapse: {
      type: Boolean,
      default: false,
    },
  })
</script>

<style lang="scss" scoped>
  @import '@/layout/styles/define.scss';
  .layout-sidebar-logo {
    @extend %pr;
    @extend %oh;
    height: $navbar-height;
    background-color: #999;
    img {
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

      &.is-collapse {
        h1 {
          @extend %pa;
          @extend %oh;
          font-size: 0;
          width: 0;
          height: 0;
          text-indent: 200px;
          opacity: 0;
        }
      }

      &.is-expand {
        h1 {
          margin-left: 10px;
        }
      }
    }
  }

  .layout-sidebar-logo-fade-enter-active {
    transition: opacity 0.3s;
  }

  .layout-sidebar-logo-fade-enter-from,
  .layout-sidebar-logo-fade-leave-to {
    opacity: 0;
  }
</style>
