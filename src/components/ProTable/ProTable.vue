<template>
  <div>
    <ProQueryForm
      v-if="metadata"
      :metadata="metadata"
      :loading="status.loading"
      @query="handleQuery"
    />

    <ProTableList v-bind="status" :data="data" @request="reqTableList">
      <template #actions>
        <ElButton type="primary" plain icon="Plus">新增</ElButton>
      </template>
      <slot></slot>
    </ProTableList>
  </div>
</template>

<script setup lang="ts">
  import { useTablePaging } from '@/hooks'
  import type { QueryFormMetadata } from '@/types'
  import type { ProTableRequest } from './types'
  import { filterEmptyValue } from '@daysnap/utils'
  import { banana } from '@daysnap/banana'

  const props = defineProps({
    metadata: {
      type: Object as PropType<QueryFormMetadata>,
      default: () => ({}),
    },
    request: {
      type: Function as PropType<ProTableRequest>,
      required: true,
    },
  })

  // eslint-disable-next-line vue/no-setup-props-destructure
  const query = ref(filterEmptyValue(banana.extract(props.metadata), true))

  const handleQuery = (val: Record<string, any>) => {
    query.value = val
    reqTableList(1)
  }

  const [status, data, reqTableList] = useTablePaging(
    (state) => {
      return props.request(state, query.value)
    },
    {
      immediate: true,
    },
  )
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/define.scss';
</style>
