<template>
  <div>
    <ProSchemaQueryForm :schema="querySchema" />
  </div>
</template>

<script setup lang="ts">
  const querySchema = [
    {
      key: 'x1',
      is: 'form-input',
      initialValue: '1',
      placeholder: '请输入关键词检索',
      props: {},
    },
    {
      key: 'x2',
      is: 'form-select',
      initialValue: '',
      placeholder: '请选择年级',
      options: [
        { label: '一年级', value: 1 },
        { label: '二年级', value: 2 },
        { label: '三年级', value: 3 },
      ],
    },
    {
      key: 'x3',
      is: 'form-radio',
      initialValue: '',
      label: '性别：',
      options: [
        { label: '男', value: 1 },
        { label: '女', value: 2 },
      ],
    },
    {
      key: 'x4',
      is: 'form-checkbox',
      initialValue: [],
      label: '爱好：',
      options: [
        { label: '唱', value: 1 },
        { label: '跳', value: 2 },
        { label: 'Rap', value: 3 },
        { label: '🏀', value: 4 },
      ],
    },
    {
      key: 'x5',
      is: 'form-date-picker',
      initialValue: '',
      placeholder: '请选择日期',
    },
    {
      key: 'x6',
      is: 'form-date-picker',
      initialValue: '',
      props: {
        type: 'daterange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
      },
    },
    {
      key: 'x7',
      is: 'form-date-picker',
      initialValue: '',
      placeholder: '请选择日期时间',
      props: {
        type: 'datetime',
      },
    },
    {
      key: 'x8',
      is: 'form-date-picker',
      initialValue: '',
      props: {
        type: 'datetimerange',
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
      },
    },
  ]
</script>

<style lang="scss" scoped>
  .view-wrap {
    min-height: 200vh;
  }
</style>
