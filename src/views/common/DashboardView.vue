<template>
  <div>
    <ProQueryForm :metadata="queryMetadata" :loading="status.loading" @query="handleQuery" />

    <ProTableList v-bind="status" :data="data" @request="trigger">
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
    </ProTableList>
  </div>
</template>

<script setup lang="ts">
  import { useQueryMetadata, useTablePaging } from '@/hooks'
  import { listGenerator, sleep } from '@daysnap/utils'

  const handleQuery = (val: any) => {
    query.value = val
    trigger(1)
  }

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

  const [status, data, trigger] = useTablePaging(
    async ([current, length]) => {
      const options = Object.assign({}, query.value, { current, length })
      console.log('query 查询参数', options)
      await sleep(1000)

      if (current === 2) {
        throw '2312321'
      }
      const list = listGenerator(10, (index) => ({
        date: '2016-05-01',
        name: `Tom${index}`,
        address: 'No. 189, Grove St, Los Angeles',
      }))
      return [list, 100]
    },
    {
      immediate: true,
    },
  )
</script>

<style lang="scss" scoped>
  .view-wrap {
    //
  }
</style>
