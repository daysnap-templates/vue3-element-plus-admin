<template>
  <div class="pro-schema-query-from">
    <div class="from-cell">
      <ElInput placeholder="请填写搜索关键词" />
    </div>
    <div class="from-cell">
      <el-select placeholder="Activity zone" clearable>
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </div>
    <div class="from-cell">
      <el-select placeholder="Activity zone" clearable>
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </div>
    <div class="from-cell">
      <el-select placeholder="Activity zone" clearable>
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </div>
    <div class="from-cell">
      <el-select placeholder="Activity zone" clearable>
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </div>
    <div class="from-cell">
      <el-select placeholder="Activity zone" clearable>
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </div>
    <div class="from-cell">
      <el-select placeholder="Activity zone" clearable>
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </div>
    <div class="from-cell">
      <el-select placeholder="Activity zone" clearable>
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </div>
    <div class="from-cell">
      <el-select placeholder="Activity zone" clearable>
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </div>
    <div class="from-cell">
      <span class="form-cell-label">是否</span>
      <el-radio-group class="ml-4">
        <el-radio label="1">Option 1</el-radio>
        <el-radio label="2">Option 2</el-radio>
      </el-radio-group>
    </div>
    <div class="from-cell">
      <ElButton type="primary" icon="Search">查询</ElButton>
      <ElButton icon="RefreshRight">重置</ElButton>
    </div>
    <div class="from-cell">
      <ElButton type="primary" icon="Search">导入</ElButton>
      <ElButton icon="RefreshRight">导出</ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  //
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/define.scss';
  .pro-schema-query-from {
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
  .from-cell {
    @extend %df;
    @extend %aic;
    margin-top: 10px;
    margin-right: 16px;
    &:last-child {
      margin-left: auto;
      margin-right: 0;
    }
  }
  .form-cell-label {
    @extend %c3;
    margin-right: 10px;
    font-size: 14px;
  }
</style>
