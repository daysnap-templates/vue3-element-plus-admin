
<template>
  <p @click="setCollapse(!collapse)">home</p>
</template>

<script setup lang="ts">
  import { useCollapse } from 'src/layout/hooks'

  const [ collapse, setCollapse ] = useCollapse()
</script>
