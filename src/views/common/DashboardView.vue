<template>
  <div>
    <ProSchemaQueryForm :fields="objQuery" />
  </div>
</template>

<script setup lang="ts">
  const objQuery = reactive({
    keyword: {
      is: 'form-input',
      value: '',
      placeholder: '请输入关键词检索',
    },
  })
</script>

<style lang="scss" scoped>
  .view-wrap {
    min-height: 200vh;
  }
</style>
