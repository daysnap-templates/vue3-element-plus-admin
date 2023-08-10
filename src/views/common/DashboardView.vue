<template>
  <div>
    <ProQueryForm :metadata="queryMetadata" @query="handleQuery" />

    <ProTable :data="tableData">
      <template #actions>
        <ElButton type="primary">新增</ElButton>
        <ElButton type="danger">删除</ElButton>
      </template>
      <el-table-column prop="date" label="Date" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="address" label="地址" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default>
          <el-button link type="primary">详情</el-button>
          <el-button link type="primary">编辑</el-button>
        </template>
      </el-table-column>
    </ProTable>
  </div>
</template>

<script setup lang="ts">
  import { useQueryMetadata, useTablePaging } from '@/hooks'

  const handleQuery = (val: any) => {
    query.value = val
    console.log('val => ', val)
  }

  const tableData = [
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ]

  const [query, queryMetadata] = useQueryMetadata({
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

  const { pagingStatus } = useTablePaging(
    async ([current, length]) => {
      console.log('current', current)
      console.log('length', length)
      return [[], 10]
    },
    {
      immediate: true,
    },
  )
</script>

<style lang="scss" scoped>
  .view-wrap {
    min-height: 200vh;
  }
</style>
