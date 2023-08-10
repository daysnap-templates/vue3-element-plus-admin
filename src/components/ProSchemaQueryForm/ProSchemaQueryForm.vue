<template>
  <div class="pro-schema-query-form">
    <div class="form-cell" v-for="(item, key) in computedFields" :key="key" :class="[item.is]">
      <span class="form-cell-label" v-if="item.label">{{ item.label }}</span>

      <ElInput
        v-if="item.is === 'form-input'"
        v-model="item.value"
        placeholder="请填写"
        clearable
        v-bind="item.props"
      />

      <ElSelect
        v-else-if="item.is === 'form-select'"
        v-model="item.value"
        placeholder="请选择"
        clearable
        v-bind="item.props"
      >
        <ElOption
          v-for="(option, index) in item.options"
          v-bind="option.props"
          :key="index"
          :label="option.label"
          :value="option.value"
        />
      </ElSelect>

      <template v-else-if="item.is === 'form-radio'">
        <ElRadioGroup v-model="item.value">
          <ElRadio
            v-for="(option, index) in item.options"
            v-bind="option.props"
            :key="index"
            :label="option.value"
          >
            {{ option.label }}
          </ElRadio>
        </ElRadioGroup>
      </template>

      <template v-else-if="item.is === 'form-checkbox'">
        <ElCheckboxGroup v-model="item.value" v-bind="item.props">
          <ElCheckbox
            v-for="(option, index) in item.options"
            v-bind="option.props"
            :key="index"
            :label="option.value"
          >
            {{ option.label }}
          </ElCheckbox>
        </ElCheckboxGroup>
      </template>

      <ElDatePicker
        v-else-if="item.is === 'form-date-picker'"
        v-model="item.value"
        type="date"
        placeholder="请选择"
        clearable
        v-bind="item.props"
      />
    </div>

    <div class="form-cell">
      <ElButton type="primary" plain icon="Search" @click="handleQuery">查询</ElButton>
      <ElButton plain icon="RefreshRight" @click="handleReset">重置</ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { QueryFormMetadata } from '@/types'
  import { banana } from '@daysnap/banana'
  import { filterEmptyValue, isArray, isObject, isUndefined } from '@daysnap/utils'
  import type { PropType } from 'vue'

  const emits = defineEmits(['query', 'reset'])
  const props = defineProps({
    metadata: {
      type: Object as PropType<QueryFormMetadata>,
      default: () => ({}),
    },
  })

  const computedFields = computed(() => {
    // todo 这里处理是否要隐藏的字段
    // query 暂不处理
    return props.metadata
  })

  // 查询
  const handleQuery = () => {
    const value = filterEmptyValue(banana.extract(computedFields.value), true)
    emits('query', value)
  }

  // 重置
  const handleReset = () => {
    const { metadata } = props
    Object.keys(metadata).forEach((key) => {
      const filed = metadata[key]
      let { value, defaultValue } = filed
      if (!isUndefined(defaultValue)) {
        value = defaultValue
      } else if (isArray(value)) {
        value = []
      } else if (isObject(value)) {
        value = {}
      } else {
        value = ''
      }
      filed.value = value
    })
    emits('reset')
    handleQuery()
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/define.scss';
  .pro-schema-query-form {
    @extend %df;
    @extend %fww;
    padding: 6px 16px 16px;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.05);
    :deep {
      .el-input {
        --el-input-width: 220px;
        --el-date-editor-width: 220px;
      }
    }
  }
  .form-cell {
    @extend %df;
    @extend %aic;
    margin-top: 10px;
    margin-right: 16px;
    &:last-child {
      margin-right: 0;
    }
    &.form-checkbox {
      padding: 0 16px;
    }
    &.form-radio {
      padding: 0 16px;
    }
  }
  .form-cell-label {
    @extend %c3;
    margin-right: 10px;
    font-size: 14px;
  }
</style>
