<template>
  <div class="pro-file-upload">
    <ElButton
      v-if="computeValue.length < max && !disabled"
      class="pro-file-upload-btn"
      :loading="loading"
      :disabled="disabled"
      type="primary"
      icon="upload"
    >
      上传文件
      <input type="file" :accept="computedAccept" @change="handleUpload" />
    </ElButton>
    <ul class="pro-file-upload-content">
      <li class="pro-file-upload-item" v-for="(item, index) in computeValue" :key="index">
        <a :href="item" target="_blank">{{ item }}</a>
        <ElIcon v-if="!disabled" @click="handleDelete(index)">
          <CircleCloseFilled />
        </ElIcon>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { isArray } from '@daysnap/utils'
  import { useAsyncTask } from '@daysnap/vue-use'

  import { doFileUpload } from '@/api'

  import { proFileUploadProps } from './types'

  const emits = defineEmits(['update:modelValue'])
  const props = defineProps(proFileUploadProps)

  const computedAccept = computed(() => {
    const acceptMap = {
      video: 'video/*',
      file: '*',
    }
    const { accept, type } = props
    return accept || acceptMap[type]
  })

  const computeValue = computed(() => {
    const { modelValue } = props
    return isArray(modelValue) ? modelValue : modelValue ? [modelValue] : []
  })

  const handleDelete = (index: number) => {
    let value: string | string[] = ''
    if (isArray(props.modelValue)) {
      value = [...props.modelValue]
      value.splice(index, 1)
    }
    emits('update:modelValue', value)
  }

  const { loading, trigger: handleUpload } = useAsyncTask(
    async (event: Event) => {
      const target = event.target as HTMLInputElement
      const file = target.files?.[0]
      target.value = ''
      if (!file) {
        return
      }
      if (file.size >= 1024 * 1024 * 200) {
        return ElMessage.warning('文件不能超过200M')
      }
      const { modelValue } = props

      let value: any = await doFileUpload({ file })
      if (isArray(modelValue)) {
        value = [...modelValue, value]
      }

      emits('update:modelValue', value)
    },
    {
      throwError: true,
    },
  )
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/define.scss';
  .pro-file-upload-btn {
    @extend %pr;
    input {
      @extend %pa;
      @extend %w100;
      @extend %h100;
      @extend %t0;
      @extend %l0;
      @extend %cp;
      opacity: 0;
    }
  }
  .pro-file-upload-item {
    @extend %pr;
    @extend %bsb;
    @extend %df;
    @extend %aic;
    margin-top: 4px;
    a {
      @extend %tdu;
      color: #007bee;
      margin-right: j(10);
    }
    i {
      @extend %cp;
      margin-right: j(10);
      color: #ee0000;
      background-color: #f2f2f2;
    }
  }
</style>
