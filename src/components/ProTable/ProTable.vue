<template>
  <div>
    <ProQueryForm
      v-if="metadata"
      :metadata="metadata"
      :loading="status.loading"
      @query="handleQuery"
    />

    <ProTableList>
      <template #actions>
        <ElButton type="primary">新增</ElButton>
        <ElButton type="danger">删除</ElButton>
      </template>
      <slot></slot>
    </ProTableList>
  </div>
</template>

<script setup lang="ts">
  import { useQueryMetadata, useTablePaging, type UseTablePagingTask } from '@/hooks'
  import type { QueryFormMetadata } from '@/types'

  const props = defineProps({
    metadata: {
      type: Object as PropType<QueryFormMetadata>,
      default: () => ({}),
    },
    request: {
      type: Function as PropType<
        (state: [number, number], query: Record<string, any>) => Promise<[any[], number]>
      >,
      required: true,
    },
  })

  const queryMetadata = ref<QueryFormMetadata>({})

  watch(
    () => props.metadata,
    () => {
      //
    },
    { immediate: true, deep: true },
  )

  const [] = useQueryMetadata(props.metadata)

  const handleQuery = (val: Record<string, any>) => {}

  const [status, data, trigger] = useTablePaging(
    async (state) => {
      return props.request(state, {})
    },
    {
      immediate: true,
    },
  )
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/define.scss';
</style>
