<template>
  <ProQueryForm :metadata="metadata" @query="query = $event" />
  <ElButton @click="handleGetOptions">获取爱好选项</ElButton>
  <dl style="padding: 16px 0">
    <dt>搜索的值：</dt>
    <dd>{{ query }}</dd>
    <dt>表单项值：</dt>
    <dd>{{ metadata }}</dd>
  </dl>
</template>
<script setup lang="ts">
  import { useQueryMetadata } from '@/hooks'
  const [query, metadata] = useQueryMetadata({
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
    x5: {
      is: 'form-date-picker',
      value: '',
    },
    x6: {
      is: 'form-date-picker',
      value: '',
      props: {
        type: 'daterange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
      },
    },
    x7: {
      is: 'form-date-picker',
      value: '',
      props: {
        type: 'datetime',
      },
    },
    x8: {
      is: 'form-date-picker',
      value: '',
      props: {
        type: 'datetimerange',
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
      },
    },
  })
  const handleGetOptions = async () => {
    return (metadata.x4.options = [
      { label: '唱', value: 1 },
      { label: '跳', value: 2 },
    ])
  }
</script>
