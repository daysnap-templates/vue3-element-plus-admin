
<template>
  <div class="ds-navbar">
    <ds-hamburger/>
    <ds-bread-crumb/>
    <div class="ds-navbar-right">

    </div>
  </div>
</template>

<script setup lang="ts">
  import DsBreadCrumb from './bread-crumb.vue'
  import DsHamburger from './hamburger.vue'
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

</style>
