<template>
  <div class="pro-schema-query-form">
    <div class="form-cell" v-for="(item, key) in fields" :key="key" :class="[item.is]">
      <span class="form-cell-label" v-if="item.label">{{ item.label }}</span>

      <ElInput
        v-if="item.is === 'form-input'"
        v-model="item.value"
        :placeholder="item.placeholder || '请填写'"
        clearable
        v-bind="item.props"
      />

      <ElSelect
        v-else-if="item.is === 'form-select'"
        v-model="item.value"
        :placeholder="item.placeholder || '请选择'"
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
        :placeholder="item.placeholder"
        clearable
        v-bind="item.props"
      />
    </div>

    <div class="form-cell">
      <ElButton type="primary" plain icon="Search">查询</ElButton>
      <ElButton plain icon="RefreshRight">重置</ElButton>
    </div>

    <!-- <div class="form-cell" key="actions"> -->
    <!-- <ElButton type="primary" icon="Search">导入</ElButton> -->
    <!-- <ElButton icon="RefreshRight">导出</ElButton> -->
    <!-- </div> -->
  </div>
</template>

<script setup lang="ts">
  import { ElButtonGroup, ElCheckboxGroup } from 'element-plus'

  defineProps({
    fields: { type: Object, default: () => ({}) },
  })
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
