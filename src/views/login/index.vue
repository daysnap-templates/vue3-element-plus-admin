
<template>
  <div class="login-wrap">

    <div class="login-content">
      <h1>xxxx登录</h1>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        size="large"
      >
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            v-model="ruleForm.username"
            autocomplete="off"
            placeholder="请输入账号"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script setup lang="ts">

  import type { FormInstance } from 'element-plus'
  import { User, Lock } from '@element-plus/icons-vue'

  const ruleFormRef = ref<FormInstance>()

  const ruleForm = reactive({
    username: '',
    password: '',
  })

  const rules = reactive({
    username: [
      { required: true, message: '请输入账号', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
    ],
  })

  const router = useRouter()
  const submitForm = () => {
    ruleFormRef.value?.validate(valid => {
      if (!valid) return
      router.replace('/')
    })
  }

</script>

<style scoped lang="scss">
  @import "src/assets/scss/define";
  .login-wrap{
    @extend %w100;
    @extend %h100;
  }
  .login-content{
    @extend %bsb;
    @extend %ma;
    margin-top: 20vh;
    border-radius: 10px;
    padding: 32px;
    max-width: 420px;
    background-color: #f2f2f2;
    h1{
      @extend %tac;
      @extend %c3;
      margin-bottom: 30px;
    }
  }
</style>
