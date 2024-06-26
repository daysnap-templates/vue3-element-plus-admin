<template>
  <div class="login-view">
    <div class="decorator is-left"></div>
    <div class="decorator is-right"></div>
    <div class="view-content" @keyup.enter="handleSubmit">
      <h1>{{ metadata.title }}</h1>
      <p>{{ metadata.subtitle }}</p>
      <ElForm
        class="form-section"
        label-position="top"
        size="large"
        ref="formInstance"
        :model="objForm"
        :rules="objFormRules"
        @submit="handleSubmit"
      >
        <ElFormItem prop="username">
          <ElInput
            v-model="objForm.username"
            prefix-icon="User"
            :disabled="loading"
            clearable
            placeholder="请填写账号"
          />
        </ElFormItem>
        <ElFormItem>
          <ElInput
            v-model="objForm.password"
            type="password"
            prefix-icon="Lock"
            :disabled="loading"
            clearable
            placeholder="请填写密码"
            show-password
          />
        </ElFormItem>
        <ElFormItem prop="password">
          <ElCheckbox v-model="objForm.isRemember" label="记住密码" :disabled="loading" />
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
  import { useAsyncTask } from '@daysnap/vue-use'

  import { doUserLogin } from '@/api'
  import { useForm } from '@/hooks'
  import { metadata } from '@/metadata'
  import { useUserinfoStore } from '@/stores'
  import { accountInfoStorage } from '@/utils'

  const [formInstance, objForm, objFormRules] = useForm(
    {
      username: '',
      password: '',
      isRemember: false,
      ...accountInfoStorage.getItem({}),
    },
    {
      username: [{ required: true, message: '请填写账号', trigger: 'blur' }],
      password: [{ required: true, message: '请填写密码', trigger: 'blur' }],
    },
  )

  const { setUserinfo } = useUserinfoStore()
  const router = useRouter()
  const { loading, trigger: handleSubmit } = useAsyncTask(
    async () => {
      await formInstance.value.validate().throw()
      const { isRemember, username, password } = objForm
      const userinfo = await doUserLogin({ username, password })
      setUserinfo({ ...userinfo, username })
      accountInfoStorage.setItem(isRemember ? objForm : { isRemember })
      router.replace('/')
      ElMessage.success(`登录成功`)
    },
    {
      throwError: true,
    },
  )
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/define.scss';
  .login-view {
    @extend %bsb;
    width: 100%;
    min-height: 100vh;
    padding: 64px 0px 32px;
  }
  .decorator {
    @extend %pf;
    @extend %br50;
    @extend %pen;
    height: 1000px;
    width: 1000px;
    &.is-right {
      right: -600px;
      top: -50px;
      --color: rgba(3, 216, 165, 0.4);
      background: radial-gradient(closest-side circle, var(--color), rgba(255, 255, 255, 0.1));
    }
    &.is-left {
      top: -200px;
      left: -600px;
      --color: rgba(255, 0, 210, 0.15);
      background: radial-gradient(closest-side circle, var(--color), rgba(255, 255, 255, 0.05));
    }
  }
  .view-content {
    @extend %w100;
    @extend %ma;
    @extend %bsb;
    @extend %pr;
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
