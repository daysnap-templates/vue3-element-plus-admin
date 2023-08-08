<template>
  <div>
    <ProSchemaQueryFrom />
  </div>
</template>

<script setup lang="ts">
  const objQuery = {
    keyword: {
      is: 'input',
    },
  }
</script>

<style lang="scss" scoped>
  .view-wrap {
    min-height: 200vh;
  }
</style>
