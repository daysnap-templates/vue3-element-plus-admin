<template>
  <ElDialog
    class="pro-dialog-form"
    v-model="visible"
    :title="computedProps.title"
    destroy-on-close
    :close-on-click-modal="false"
    :style="computedProps.style"
  >
    <ElForm
      ref="formInstance"
      inline
      label-position="top"
      :label-width="computedProps.labelWidth"
      :model="computedSources.formModel"
      :rules="rules"
    >
      <ElFormItem
        v-for="(item, key) in computedSources.metadata"
        :style="{
          display: 'block',
          width: item.width || componentStyle[item.is as string] || `48%`,
        }"
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
          filterable
          v-bind="item.props"
          @change="$emit('change-field', { key, item })"
        >
          <ElOption
            v-for="(option, index) in item.options"
            v-bind="option.props"
            :key="index"
            :label="option[item.labelKey || 'label'] || option"
            :value="option[item.valueKey || 'value'] ?? option"
          />
        </ElSelect>
        <ElRadioGroup v-else-if="item.is === 'form-radio'" v-model="item.value">
          <ElRadio
            v-for="(option, index) in item.options"
            v-bind="option.props"
            :key="index"
            :value="option[item.valueKey || 'value'] ?? option"
          >
            {{ option[item.labelKey || 'label'] || option }}
          </ElRadio>
        </ElRadioGroup>
        <ElCheckboxGroup
          v-else-if="item.is === 'form-checkbox'"
          v-model="item.value"
          v-bind="item.props"
        >
          <ElCheckbox
            v-for="(option, index) in item.options"
            v-bind="option.props"
            :key="index"
            :value="option[item.valueKey || 'value'] ?? option"
          >
            {{ option[item.labelKey || 'label'] || option }}
          </ElCheckbox>
        </ElCheckboxGroup>
        <ElDatePicker
          v-else-if="item.is === 'form-date-picker'"
          v-model="item.value"
          type="date"
          placeholder="请选择"
          start-placeholder="请选择"
          end-placeholder="请选择"
          clearable
          :value-format="datePickerValueFormat[item.props?.type ?? 'date']"
          v-bind="item.props"
        />
        <ElInputNumber
          v-else-if="item.is === 'form-input-number'"
          v-model="item.value"
          v-bind="item.props"
        />
        <ElTreeSelect
          v-else-if="item.is === 'form-tree-select'"
          v-model="item.value"
          clearable
          v-bind="item.props"
          :data="item.options"
        />
        <ProTree
          v-else-if="item.is === 'form-tree'"
          v-model="item.value"
          v-bind="item.props"
          :options="item.options"
          style="width: 100%"
        />
        <ElCascader
          v-else-if="item.is === 'form-cascader'"
          v-model="item.value"
          clearable
          v-bind="item.props"
          :validate-event="false"
        />
        <ProImageUpload
          v-else-if="item.is === 'form-image-upload'"
          v-model="item.value"
          v-bind="item.props"
        />
        <ProFileUpload
          v-else-if="item.is === 'form-file-upload'"
          v-model="item.value"
          v-bind="item.props"
        />
        <ProTags v-else-if="item.is === 'form-tags'" v-model="item.value" v-bind="item.props" />
        <Component
          v-else-if="item.is"
          v-model="item.value"
          v-bind="{ ...item, ...item.props }"
          :hidden="false"
          :is="item.is"
        />
      </ElFormItem>
    </ElForm>
    <slot></slot>
    <template v-if="computedProps.showCancelButton || computedProps.showConfirmButton" #footer>
      <span class="dialog-footer">
        <ElButton v-if="computedProps.showCancelButton" @click="hide('cancel')">
          {{ computedProps.cancelButtonText }}
        </ElButton>
        <ElButton
          v-if="computedProps.showConfirmButton"
          type="primary"
          @click="handleSubmit"
          :loading="loading"
        >
          {{ computedProps.confirmButtonText }}
        </ElButton>
      </span>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
  import banana from '@daysnap/banana'
  import { isFunction } from '@daysnap/utils'
  import { useAsyncTask, useVisible } from '@daysnap/vue-use'
  import type { FormInstance } from 'element-plus'

  import { type ProDialogFormMetadata, type ProDialogFormProps, proDialogFormProps } from './types'

  defineEmits(['change-field'])

  const dynamicProps = ref<Partial<ProDialogFormProps>>()
  const props = defineProps(proDialogFormProps)

  const computedProps = computed<ProDialogFormProps>(() =>
    Object.assign({}, props, dynamicProps.value),
  )

  const rules = ref<Record<string, any>>({})

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
        formModel[key] = value
        metadata[key] = item
      }
      if (isFunction(rules)) {
        rules = rules(value, item, sourceMetadata)
      }
      formRules[key] = rules
    })

    if (JSON.stringify(rules.value) !== JSON.stringify(formRules)) {
      rules.value = formRules
    }

    return { formModel, metadata }
  })

  const { show, hide, confirm, visible } = useVisible<
    Partial<ProDialogFormProps>,
    Record<string, any>
  >({
    showCallback: (options) => {
      rules.value = {}
      dynamicProps.value = options
    },
  })

  watch(visible, (v) => {
    if (v) {
      nextTick(() => {
        const els = document.querySelectorAll('.el-overlay-dialog')
        if (els.length) {
          els.forEach((el) => (el.scrollTop = 0))
        }
      })
    }
  })

  const formInstance = ref<FormInstance>()
  const { loading, trigger: handleSubmit } = useAsyncTask(
    async () => {
      if (!formInstance.value) {
        return
      }
      await formInstance.value.validate().throw()
      const { formModel, metadata } = computedSources.value
      const data = banana.extract(metadata as any)
      const result = await computedProps.value.request?.(data, formModel, metadata)
      confirm(result)
    },
    {
      throwError: true,
    },
  )

  const componentStyle: Record<string, string> = {
    'form-image-upload': '100%',
    'form-file-upload': '100%',
    'form-tags': '100%',
    'form-tree': '100%',
    'form-tinymce': '100%',
  }

  // YYYY-MM-DD HH:mm:ss
  const datePickerValueFormat: Record<string, string> = {
    date: 'YYYY-MM-DD',
    daterange: 'YYYY-MM-DD',
    datetimerange: 'YYYY-MM-DD HH:mm:ss',
    datetime: 'YYYY-MM-DD HH:mm:ss',
  }

  defineExpose({
    show,
    hide,
  })
</script>

<style lang="scss">
  @import '@/assets/scss/define';
  .pro-dialog-form {
    width: 96%;
    max-width: 800px;
    margin-bottom: 15vh;
    .el-form-item__content {
      @extend %w100;
    }
    .el-select {
      @extend %w100;
    }
    .el-input-number {
      width: 240px;
      min-width: 200px;
    }
    .el-form--inline {
      @extend %jcs;
      .el-form-item {
        margin-right: 0;
      }
    }
    .el-cascader,
    .el-date-editor.el-input {
      width: 100%;
    }
    .pro-table {
      min-height: 0 !important;
    }
    .pro-table-list,
    .pro-table-content {
      padding: 0 !important;
    }
  }
  @media (max-width: 500px) {
    .el-form--inline {
      .el-form-item {
        width: 100% !important;
      }
    }
  }
</style>
