<template>
  <ElDialog v-model="visible" :title="computedProps.title" destroy-on-close>
    <ElForm
      ref="formInstance"
      :model="computedSources.formModel"
      :rules="computedSources.formRules"
    >
      <ElFormItem
        v-for="(item, key) in computedSources.metadata"
        :key="key"
        :label="item.label"
        :prop="key"
      >
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
      </ElFormItem>
    </ElForm>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="hide('cancel')">取消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="loading">确认</el-button>
      </span>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
  import { useVisible } from '@daysnap/horn-use'
  import { isFunction } from '@daysnap/utils'
  import type { FormInstance } from 'element-plus'
  import { useWithLoading } from '@/hooks'
  import { proDialogFormProps, type ProDialogFormProps, type ProDialogFormMetadata } from './types'

  const dynamicProps = ref<Partial<ProDialogFormProps>>()
  const props = defineProps(proDialogFormProps)

  const computedProps = computed<ProDialogFormProps>(() =>
    Object.assign({}, props, dynamicProps.value),
  )

  const computedSources = computed(() => {
    const formModel: Record<string, any> = {}
    const formRules: Record<string, any> = {}
    const metadata: ProDialogFormMetadata = {}
    const sourceMetadata = computedProps.value.metadata ?? {}
    Object.entries(sourceMetadata).forEach(([key, item]) => {
      let { hidden, value, rules } = item
      if (isFunction(hidden)) {
        hidden = hidden(value, item, sourceMetadata)
      }
      if (!hidden) {
        if (isFunction(rules)) {
          rules = rules(value, item, sourceMetadata)
        }
        formModel[key] = value
        formRules[key] = rules
        metadata[key] = item
      }
    })
    return { formModel, formRules, metadata }
  })

  const { show, hide, confirm, visible } = useVisible<
    Partial<ProDialogFormProps>,
    Record<string, any>
  >({
    showCallback: (options) => {
      dynamicProps.value = options
    },
  })

  const formInstance = ref<FormInstance>()
  const [loading, handleSubmit] = useWithLoading(async () => {
    if (!formInstance.value) {
      return
    }
    await formInstance.value.validate().throw()
    const { formModel, metadata } = computedSources.value
    await computedProps.value.request?.(formModel, metadata)
    confirm(formModel)
  })

  defineExpose({
    show,
    hide,
  })
</script>
