
<template>
  <div class="ds-slidebar-logo">
    <transition name="ds-slidebar-logo-fade">
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
