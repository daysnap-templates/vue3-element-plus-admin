<template>
  <ProQueryForm :metadata="metadata" />

  <ElButton @click="handleGetOptions">获取爱好选项</ElButton>

  <p style="padding: 16px 0">{{ metadata }}</p>
</template>

<script setup lang="ts">
  const metadata = reactive({
    x1: {
      is: 'form-input',
      value: '1',
      props: {},
    },
    x2: {
      is: 'form-select',
      value: '',
      options: [
        { label: '一年级', value: 1 },
        { label: '二年级', value: 2 },
        { label: '三年级', value: 3 },
      ],
    },
    x3: {
      is: 'form-radio',
      value: '',
      label: '性别：',
      options: [
        { label: '全部', value: '' },
        { label: '男', value: 1 },
        { label: '女', value: 2 },
      ],
    },
    x4: {
      is: 'form-checkbox',
      value: [],
      label: '爱好：',
      options: [
        { label: '唱', value: 1 },
        { label: '跳', value: 2 },
        { label: 'Rap', value: 3 },
        { label: '🏀', value: 4 },
      ],
    },
  })

  const handleGetOptions = async () => {
    return (metadata.x4.options = [
      { label: '唱', value: 1 },
      { label: '跳', value: 2 },
    ])
  }
</script>
