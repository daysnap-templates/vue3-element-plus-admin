<template>
  <div class="pro-query-form">
    <div class="pro-query-form-content">
      <ElForm :model="formInline" label-position="right" label-width="120px">
        <ElRow :gutter="16">
          <ElCol v-for="(item, key) in computedFields" :key="key" :span="item.span ?? 8">
            <ElFormItem :label="item.label">
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
                clearable
                :value-format="datePickerValueFormat[item.props?.type ?? 'date']"
                start-placeholder="请选择"
                end-placeholder="请选择"
                v-bind="item.props"
              />
              <ElTreeSelect
                v-else-if="item.is === 'form-tree-select'"
                v-model="item.value"
                clearable
                v-bind="item.props"
                :data="item.options"
              />
              <ElCascader
                v-else-if="item.is === 'form-cascader'"
                v-model="item.value"
                clearable
                v-bind="item.props"
                :validate-event="false"
              />
              <Component
                v-else-if="item.is"
                v-model="item.value"
                v-bind="{ ...item, ...item.props }"
                :hidden="false"
                :is="item.is"
              />
            </ElFormItem>
          </ElCol>
        </ElRow>
      </ElForm>
    </div>

    <div class="pro-query-form-actions">
      <ElButton type="primary" icon="Search" :loading="loading" @click="handleQuery">
        查询
      </ElButton>
      <ElButton icon="RefreshRight" @click="handleReset">重置</ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { banana } from '@daysnap/banana'
  import { filterEmptyValue, isArray, isObject, isUndefined } from '@daysnap/utils'

  import { proQueryFormProps } from './types'

  const formInline = reactive({
    user: '',
    region: '',
    date: '',
  })

  const emits = defineEmits(['query', 'reset'])
  const props = defineProps(proQueryFormProps)

  const computedFields = computed(() => {
    // todo 这里可以过滤需要隐藏的字段
    // 但是因为是查询 query 暂不处理
    return props.metadata
  })

  // 查询
  const handleQuery = () => {
    const value = filterEmptyValue(banana.extract(computedFields.value), true)
    emits('query', value)
  }

  // YYYY-MM-DD HH:mm:ss
  const datePickerValueFormat: Record<string, string> = {
    date: 'YYYY-MM-DD',
    daterange: 'YYYY-MM-DD',
    datetimerange: 'YYYY-MM-DD HH:mm:ss',
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
  .pro-query-form {
    @extend %df;
    @extend %pr;
    padding: j(16);
    background-color: #fff;
    &::after {
      @extend %pa;
      @extend %b0;
      right: j(16);
      left: j(16);
      height: 1px;
      content: '';
      background-color: #e5e6eb;
    }
    :deep {
      .el-date-editor {
        --el-date-editor-width: 100%;
      }
      .el-form-item__label {
        @extend %df;
        @extend %aic;
        @extend %tar;
        line-height: 1.1;
      }
      .el-form-item {
        margin-bottom: 0;
      }
      .el-col {
        margin-top: j(16);
        &:nth-child(1),
        &:nth-child(2),
        &:nth-child(3) {
          margin-top: 0;
        }
      }
      .el-cascader {
        @extend %w100;
      }
    }
  }

  .pro-query-form-content {
    @extend %df1;
    padding-right: j(16);
    border-right: 1px solid #e5e6eb;
  }

  .pro-query-form-actions {
    @extend %df;
    @extend %fdc;
    @extend %aic;
    margin-left: j(16);
    :deep {
      .el-button + .el-button {
        margin-left: 0;
        margin-top: j(10);
      }
    }
  }
</style>
