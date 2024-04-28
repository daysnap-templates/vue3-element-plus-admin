<template>
  <ProTable :request="handleRequest" :query-metadata="queryMetadata" ref="proTableInstance">
    <template #actions>
      <ProActionButton type="primary" plain icon="Plus" @click="handleAddedOrUpdate()">
        新增
      </ProActionButton>
    </template>

    <ProTableActionsColumn>
      <template #default="scope">
        <ProTableActionButton @click="handleDelete"> 删除 </ProTableActionButton>
        <ProTableActionButton @click="handleAddedOrUpdate(scope.row)">编辑</ProTableActionButton>
        <ProTableActionButton url="#/syp">详情</ProTableActionButton>
        <ProTableActionButton>线下已售</ProTableActionButton>
        <ProTableActionButton>修改存放地</ProTableActionButton>
        <ProTableActionButton>登记费用</ProTableActionButton>
        <ProTableActionButton>关联拍卖车辆</ProTableActionButton>
        <ProTableActionButton>计提金额登记</ProTableActionButton>
        <ProTableActionButton>第三方平台报价登记</ProTableActionButton>
        <ProTableActionButton>非常规编辑</ProTableActionButton>
        <ProTableActionButton>操作记录</ProTableActionButton>
      </template>
    </ProTableActionsColumn>

    <ElTableColumn prop="id" label="id" />
    <ElTableColumn prop="name" label="姓名" />
    <ElTableColumn prop="content" label="内容" />
    <ElTableColumn label="内容">
      <template #default>
        <ul>
          <li>起亚 智跑 2012款 2.0 手动 GLS 两驱</li>
          <li>VIN码 : LJDJAA146C0118503</li>
          <li>原车牌：浙BZ928C</li>
          <li>过户后车牌：</li>
          <li>过户后车主：</li>
        </ul>
      </template>
    </ElTableColumn>
    <ElTableColumn prop="done" label="是否完成" />
  </ProTable>

  <ProDialogForm ref="proDialogFormInstance" />
</template>

<script setup lang="ts">
  import { doTodoDelete } from '@/api'
  import type { Todo } from '@/types'

  import { useTodoAddedOrUpdate } from './useTodoAddedOrUpdate'
  import { useTodoListTable } from './useTodoListTable'

  // 列表
  const [queryMetadata, proTableInstance, handleRequest] = useTodoListTable()

  // 编辑 or 新增
  const [proDialogFormInstance, handleAddedOrUpdate] = useTodoAddedOrUpdate({
    onSuccess: () => {
      proTableInstance.value.reload()
    },
  })

  // 删除
  const handleDelete = async (item: Todo) => {
    await ElMessageBox.confirm(`确认删除该数据？`)
    const { id } = item
    await doTodoDelete({ id })
    proTableInstance.value.reload()
    ElMessage.success('操作成功')
  }
</script>
