<template>
  <ProTable :request="handleRequest" :query-metadata="queryMetadata">
    <ElTableColumn prop="name" label="姓名" />
    <ElTableColumn prop="address" label="地址" />
    <ElTableColumn fixed="right" label="操作" width="120">
      <template #default>
        <ElButton link type="primary">详情</ElButton>
        <ElButton link type="primary">编辑</ElButton>
      </template>
    </ElTableColumn>
  </ProTable>
</template>

<script setup lang="ts">
  import type { ProTableRequest } from '@/components/ProTable'
  import { listGenerator, sleep } from '@daysnap/utils'

  const queryMetadata = reactive({
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
