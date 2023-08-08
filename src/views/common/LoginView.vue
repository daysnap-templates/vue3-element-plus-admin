<template>
  <div class="login-view">
    <div class="view-content">
      <h1>DaySnap管理平台</h1>
      <p>欢迎使用</p>
      <ElForm
        class="form-section"
        label-position="top"
        size="large"
        ref="formInstance"
        :model="objForm"
        :rules="objFormRules"
      >
        <ElFormItem prop="account">
          <ElInput
            v-model="objForm.account"
            :prefix-icon="User"
            clearable
            placeholder="请填写账号"
          />
        </ElFormItem>
        <ElFormItem prop="password">
          <ElInput
            v-model="objForm.password"
            type="password"
            :prefix-icon="Lock"
            clearable
            placeholder="请填写密码"
            show-password
          />
        </ElFormItem>
        <ElFormItem>
          <ElButton class="form-button" type="primary" :loading="loading" @click="handleSubmit">
            登录
          </ElButton>
        </ElFormItem>
      </ElForm>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useForm, useWithLoading } from '@/hooks'
  import { Lock, User } from '@element-plus/icons-vue'

  const [formInstance, objForm, objFormRules] = useForm(
    {
      account: '',
      password: '',
    },
    {
      account: [{ required: true, message: '请填写账号', trigger: 'blur' }],
      password: [{ required: true, message: '请填写密码', trigger: 'blur' }],
    },
  )

  const [loading, handleSubmit] = useWithLoading(async () => {
    if (!formInstance.value) {
      return
    }
    const res = await formInstance.value.validate().catch(() => {
      throw ''
    })
    console.log('res => ', res)
  })
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/define.scss';
  .login-view {
    @extend %bsb;
    width: 100%;
    min-height: 100vh;
    padding: 64px 0px 32px;
  }
  .view-content {
    @extend %w100;
    @extend %ma;
    @extend %bsb;
    padding: 42px;
    max-width: 420px;
    h1 {
      @extend %tac;
      font-weight: 600;
      font-size: 32px;
      line-height: 1.6;
    }
    p {
      @extend %tac;
      margin-top: 10px;
      font-size: 14px;
      line-height: 1.6;
    }
  }
  .form-section {
    @extend %db;
    margin-top: 48px;
  }
  .form-button {
    width: 100%;
  }
</style>
