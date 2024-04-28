<template>
  <ElTree
    v-bind="attrs"
    class="pro-tree"
    :data="options"
    :default-checked-keys="checkedKeys"
    @check="handleCheck"
  />
</template>

<script setup lang="ts">
  const attrs = useAttrs()
  const emits = defineEmits(['update:modelValue'])
  const props = defineProps({
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    options: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
  })

  const checkedKeys = computed(() => {
    const { modelValue, options } = props
    const { childIds } = parseNodeIds(options)
    return childIds.filter((id) => modelValue.includes(id))
  })

  const handleCheck = (_: any, data: any) => {
    const { checkedKeys, halfCheckedKeys } = data
    emits('update:modelValue', [...halfCheckedKeys, ...checkedKeys])
  }

  interface TreeItem {
    id: string
    children?: TreeItem[]
  }
  function parseNodeIds(data: TreeItem[]) {
    const childIds: string[] = []
    const parentIds: string[] = []
    data.forEach((item) => {
      if (item.children && item.children.length > 0) {
        parentIds.push(item.id)
        const res = parseNodeIds(item.children ?? [])
        parentIds.push(...res.parentIds)
        childIds.push(...res.childIds)
      } else {
        childIds.push(item.id)
      }
    })
    return { childIds, parentIds }
  }
</script>

<style lang="scss" scope>
  @import '@/assets/scss/define';
  .pro-tree {
    @extend %usn;
  }
</style>
