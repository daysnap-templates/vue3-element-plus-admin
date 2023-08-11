<template>
  <ProTable :request="handleRequest" :metadata="metadata">
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="address" label="地址" />
    <el-table-column fixed="right" label="操作" width="120">
      <template #default>
        <el-button link type="primary">详情</el-button>
        <el-button link type="primary">编辑</el-button>
      </template>
    </el-table-column>
  </ProTable>
</template>

<script setup lang="ts">
  import type { ProTableRequest } from '@/components/ProTable'
  import { listGenerator, sleep } from '@daysnap/utils'

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
  })

  const handleRequest: ProTableRequest = async ([current, length], query) => {
    const options = Object.assign({}, query, { current, length })
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
  }
</script>
