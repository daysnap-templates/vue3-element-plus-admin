<template>
  <div class="pro-tags">
    <ElTag
      v-for="(item, index) in modelValue"
      :key="index"
      class="pro-tag"
      size="large"
      :closable="!disabled"
      :disable-transitions="false"
      @close="handleClose(index)"
    >
      {{ item }}
    </ElTag>
    <ElInput
      v-if="inputVisible"
      v-model="inputValue"
      ref="InputRef"
      class="pro-tag-input"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <ElButton v-else-if="!disabled" class="pro-tag-btn" @click="showInput" icon="plus"
      >新增</ElButton
    >
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  })

  const emits = defineEmits(['update:modelValue'])

  import { ElInput } from 'element-plus'
  import { nextTick, ref } from 'vue'

  const inputValue = ref('')
  const inputVisible = ref(false)
  const InputRef = ref<InstanceType<typeof ElInput>>()

  const handleClose = (index: number) => {
    const value = props.modelValue
    value.splice(index, 1)
    emits('update:modelValue', value)
  }

  const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
      InputRef.value!.input!.focus()
    })
  }

  const handleInputConfirm = () => {
    const value = [...props.modelValue]
    if (inputValue.value) {
      value.push(inputValue.value)
    }
    emits('update:modelValue', value)
    inputVisible.value = false
    inputValue.value = ''
  }
</script>

<style lang="scss" scope>
  @import '@/assets/scss/define';
  .pro-tags {
    @extend %df;
    @extend %fww;
    margin-top: -10px;
  }
  .pro-tag {
    margin-right: 10px;
    margin-top: 10px;
  }
  .pro-tag-input {
    display: inline-block;
    margin-top: 10px;
    width: 150px;
  }
  .pro-tag-btn {
    margin-top: 10px;
  }
</style>
