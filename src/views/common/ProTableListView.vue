<template>
  <ProTableList v-bind="status" :data="data" title="地址列表" @request="reqTableList">
    <template #actions>
      <ElButton plain type="primary" icon="Plus">新增</ElButton>
      <ElButton plain type="primary" icon="Download">导出</ElButton>
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
  <dl style="padding: 16px 0">
    <dt>请求参数：</dt>
    <dd>{{ options }}</dd>
  </dl>
</template>

<script setup lang="ts">
  import { useTablePaging } from '@/hooks'
  import { listGenerator, sleep } from '@daysnap/utils'

  const options = ref()

  const [status, data, reqTableList] = useTablePaging(
    async ([current, length]) => {
      options.value = { current, length }

      await sleep(1000)

      if (current === 2) {
        throw '请求第二页，测试报错'
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
