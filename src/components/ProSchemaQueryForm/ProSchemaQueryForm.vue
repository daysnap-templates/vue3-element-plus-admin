<template>
  <div class="pro-schema-query-form">
    <div class="form-cell" v-for="item in fields" :key="item.key" :class="[item.is]">
      <span class="form-cell-label" v-if="item.label">{{ item.label }}</span>

      <ElInput
        v-if="item.is === 'form-input'"
        v-model="query[item.key]"
        placeholder="请填写"
        clearable
        v-bind="item.props"
      />

      <ElSelect
        v-else-if="item.is === 'form-select'"
        v-model="query[item.key]"
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
        <ElRadioGroup v-model="query[item.key]">
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
        <ElCheckboxGroup v-model="query[item.key]" v-bind="item.props">
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
        v-model="query[item.key]"
        type="date"
        placeholder="请选择"
        clearable
        v-bind="item.props"
      />
    </div>

    <div class="form-cell">
      <ElButton type="primary" plain icon="Search" @click="handleConfirm">查询</ElButton>
      <ElButton plain icon="RefreshRight" @click="handleReset">重置</ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { QueryFormField } from '@/types'
  import {
    isFunction,
    isUndefined,
    pick,
    cloneSimple,
    filterEmptyValue,
    isEmptyObject,
  } from '@daysnap/utils'
  import type { PropType } from 'vue'

  const emits = defineEmits(['confirm', 'change'])
  const props = defineProps({
    schema: { type: Array as PropType<QueryFormField[]>, default: () => [] },
  })

  const query = ref<Record<string, any>>({})

  // 初始化数据
  const fields = ref<QueryFormField[]>([])
  let initialValues: Record<string, any>

  watch(
    () => query.value,
    (nv, ov) => {
      if (!isEmptyObject(ov)) {
        emits('change', nv, ov)
      }
    },
    {
      immediate: false,
      deep: true,
    },
  )

  watch(
    () => props.schema,
    (schema) => {
      const queryFormFields: QueryFormField[] = []
      initialValues = {}
      schema.forEach((item) => {
        if (isFunction(item)) {
          queryFormFields.push(...item(query.value))
        } else {
          queryFormFields.push(item)
        }
      })
      const keys = queryFormFields.map((item) => {
        const { key, initialValue } = item
        if (!isUndefined(initialValue)) {
          initialValues[key] = initialValue
        }
        return item.key
      })
      query.value = pick({ ...initialValues, ...filterEmptyValue(query.value) }, keys)
      fields.value = queryFormFields
    },
    {
      immediate: true,
      deep: true,
    },
  )

  // 查询
  const handleConfirm = () => {
    const value = cloneSimple(filterEmptyValue(query.value))
    console.log('query => ', value)
    emits('confirm', value)
  }

  // 重置
  const handleReset = () => {
    query.value = cloneSimple(initialValues)
    handleConfirm()
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
