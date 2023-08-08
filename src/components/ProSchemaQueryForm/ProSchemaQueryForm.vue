<template>
  <div class="pro-schema-query-form">
    <div class="form-cell" v-for="(item, key) in fields" :key="key">
      <ElInput
        v-if="item.is === 'form-input'"
        v-model="item.value"
        :placeholder="item.placeholder || '请填写'"
        clearable
      />

      <el-select
        v-else-if="item.is === 'form-select'"
        :placeholder="item.placeholder || '请选择'"
        clearable
      >
        <el-option
          v-for="(option, index) in item.options"
          :key="index"
          :label="option.label"
          :value="option.value"
        />
      </el-select>

      <template v-else-if="item.is === 'form-radio'">
        <span class="form-cell-label" v-if="item.label">{{ item.label }}</span>
        <el-radio-group>
          <el-radio v-for="(option, index) in item.options" :key="index" :label="option.value">
            {{ option.label }}
          </el-radio>
        </el-radio-group>
      </template>
    </div>
    <div class="form-cell">
      <ElButton type="primary" icon="Search">查询</ElButton>
      <ElButton icon="RefreshRight">重置</ElButton>
    </div>
    <!-- <div class="form-cell" key="actions"> -->
    <!-- <ElButton type="primary" icon="Search">导入</ElButton> -->
    <!-- <ElButton icon="RefreshRight">导出</ElButton> -->
    <!-- </div> -->
  </div>
</template>

<script setup lang="ts">
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
        --el-input-width: 200px;
      }
    }
  }
  .form-cell {
    @extend %df;
    @extend %aic;
    margin-top: 10px;
    margin-right: 16px;
    &:last-child {
      // margin-left: auto;
      margin-right: 0;
    }
  }
  .form-cell-label {
    @extend %c3;
    margin-right: 10px;
    font-size: 14px;
  }
</style>
