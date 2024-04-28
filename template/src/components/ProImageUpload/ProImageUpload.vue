<template>
  <div class="pro-image-upload">
    <VueDraggable
      class="pro-image-upload-content"
      :disabled="max <= 1"
      :animation="150"
      :model-value="computeValue"
      filter=".pro-image-upload-btn"
      @update:model-value="handleUpdate"
    >
      <div class="pro-image-upload-item" v-for="(item, index) in computeValue" :key="item">
        <ElImage
          class="pro-image-upload-image"
          :src="item"
          :preview-src-list="computeValue"
          :initial-index="index"
          fit="cover"
          preview-teleported
        />
        <ElIcon v-if="!disabled" class="pro-image-upload-clear" @click="handleDelete(index)">
          <CircleCloseFilled />
        </ElIcon>
      </div>
      <div
        v-if="computeValue.length < max && !disabled"
        v-loading="loading"
        class="pro-image-upload-item pro-image-upload-btn"
      >
        <ElIcon class="pro-image-upload-add"><Plus /></ElIcon>
        <input type="file" accept="image/*" :multiple="max > 1" @change="handleUpload" />
      </div>
    </VueDraggable>
    <ElCheckbox v-model="compress" v-if="!disabled">是否压缩</ElCheckbox>
  </div>
</template>

<script setup lang="ts">
  import { isArray } from '@daysnap/utils'
  import { useAsyncTask } from '@daysnap/vue-use'
  import { VueDraggable } from 'vue-draggable-plus'

  import { doFileUpload } from '@/api'

  import { proImageUploadProps } from './types'

  const emits = defineEmits(['update:modelValue'])
  const props = defineProps(proImageUploadProps)

  const compress = ref(true)

  const computeValue = computed(() => {
    const { modelValue } = props
    return isArray(modelValue) ? modelValue : modelValue ? [modelValue] : []
  })

  const handleUpdate = (value: string[]) => {
    if (isArray(props.modelValue)) {
      emits('update:modelValue', value)
    }
  }

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
      const files = Array.from(target.files ?? [])

      target.value = ''
      if (!files?.length) {
        return
      }

      const { modelValue, max } = props
      const upload = async (file: File) => {
        if (!/\/(?:jpeg|jpg|png)/i.test(file.type)) {
          throw '图片格式不支持'
        }
        if (file.size >= 1024 * 1024 * 20) {
          throw '图片不能超过20M'
        }

        return doFileUpload({
          file,
        })
      }

      const res = await Promise.all(
        files.slice(0, max - modelValue.length).map((file) => upload(file)),
      )

      let value: string | string[] = res[0]
      if (isArray(modelValue)) {
        value = [...modelValue, ...res]
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
  .pro-image-upload-content {
    @extend %df;
    @extend %fww;
  }
  .pro-image-upload-item {
    @extend %cp;
    @extend %pr;
    @extend %bsb;
    @extend %df;
    @extend %aic;
    @extend %jcc;
    margin-bottom: 10px;
    margin-right: 10px;
    font-size: 24px;
    border-radius: 4px;
    width: 100px;
    height: 100px;
    border: 1px #ccc dashed;
    .pro-image-upload-image,
    img {
      @extend %pa;
      @extend %w100;
      @extend %h100;
      @extend %t0;
      @extend %l0;
      object-position: center;
      object-fit: cover;
      border-radius: 4px;
    }
    input {
      @extend %cp;
      @extend %pa;
      @extend %t0;
      @extend %l0;
      @extend %w100;
      @extend %h100;
      border-radius: 4px;
      opacity: 0;
    }
  }
  .pro-image-upload-clear {
    @extend %pa;
    @extend %cfff;
    @extend %br50;
    @extend %cp;
    font-size: j(20);
    right: -6px;
    top: -6px;
    background: red;
  }
</style>
