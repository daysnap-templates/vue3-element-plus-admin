
<template>
  <transition name="sidebarLogoFade">
    <router-link
      class="ds-slidebar-logo is-collapse"
      to="/"
      key="collapse"
      v-if="collapse"
    >
      <img src="src/assets/logo.png" alt="logo"/>
      <h1>北京银行</h1>
    </router-link>
    <router-link
      class="ds-slidebar-logo is-expand"
      key="expand"
      v-else
      to="/"
    >
      <img src="src/assets/logo.png" alt="logo"/>
      <h1>北京银行11</h1>
    </router-link>
  </transition>
</template>

<script setup lang="ts">

  defineProps<{
    collapse: boolean
  }>()

</script>
