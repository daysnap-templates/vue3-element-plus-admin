<template>
  <ElDialog v-model="visible" class="pro-h5-preview">
    <iframe v-if="visible && url" class="pro-h5-preview-inner" :src="url" frameborder="0" />
  </ElDialog>
</template>

<script setup lang="ts">
  import { __DEV__ } from '@/utils'

  import { type ProH5PreviewProps, proH5PreviewProps } from './types'

  const getBaseUrl = () => {
    return __DEV__ ? `http://localhost:10086/?v=${Date.now()}#/` : `https://?v=${Date.now()}#/`
  }

  const props = defineProps(proH5PreviewProps)
  const dynamicProps = ref<Partial<ProH5PreviewProps>>()
  const computedProps = computed<ProH5PreviewProps>(() =>
    Object.assign({}, props, dynamicProps.value),
  )

  const url = computed(() => {
    let { url } = computedProps.value
    if (url.startsWith('http')) {
      return url
    }
    if (url.startsWith('/')) {
      url = url.substring(1)
    }

    url += `${url.includes('?') ? '&' : '?'}`

    return getBaseUrl() + url
  })

  const visible = ref(false)

  const show = (options?: Partial<ProH5PreviewProps>) => {
    visible.value = true
    dynamicProps.value = options
  }

  defineExpose({
    show,
  })
</script>

<style lang="scss" scope>
  @import '@/assets/scss/define';
  .pro-h5-preview {
    max-width: 415px;
    width: 100%;
    padding: 0;
  }
  .pro-h5-preview-inner {
    @extend %db;
    @extend %ma;
    width: 100%;
    max-width: 375px;
    height: calc(85vh - 140px);
    max-height: 667px;
    border: none;
    border-radius: 8px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  }
</style>
