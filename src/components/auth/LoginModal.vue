<template>
    <el-dialog
      :model-value="modelValue"
      @update:model-value="emit('update:modelValue', $event)"
      width="500px"
      :show-close="false"
      class="login-dialog"
      align-center
    >
      <div class="login-card">
        <div class="login-header">
          <h2>Login</h2>
  
          <button type="button" class="close-btn" @click="closeDialog">
            ×
          </button>
        </div>
  
        <el-form @submit.prevent="submitLogin" class="login-form">
          <div class="field-block">
            <label class="field-label">Email Address</label>
  
            <el-input
              v-model="form.email"
              placeholder="your.email@example.com"
              class="custom-input"
            />
          </div>
  
          <div class="field-block">
            <label class="field-label">Password</label>
  
            <el-input
              v-model="form.password"
              type="password"
              show-password
              placeholder="••••••••"
              class="custom-input"
            />
          </div>
  
          <div class="options-row">
            <label class="remember-me">
              <input v-model="form.rememberMe" type="checkbox" />
              <span>Remember me</span>
            </label>
  
            <button type="button" class="link-btn">
              Forgot Password?
            </button>
          </div>
  
          <el-button
            type="success"
            class="login-btn"
            @click="submitLogin"
          >
            Login
          </el-button>
  
          <div class="divider">
            <span>Or continue with</span>
          </div>
  
          <div class="social-buttons">
            <button type="button" class="social-btn">
              <span class="social-icon">G</span>
              <span>Google</span>
            </button>
  
            <button type="button" class="social-btn">
              <span class="social-icon">◔</span>
              <span>GitHub</span>
            </button>
          </div>
  
          <p class="signup-text">
            Don't have an account?
            <button type="button" class="signup-btn">Sign Up</button>
          </p>
        </el-form>
      </div>
    </el-dialog>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  import { ElMessage } from 'element-plus'
  
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    }
  })
  
  const emit = defineEmits(['update:modelValue', 'login-success'])
  
  const form = reactive({
    email: '',
    password: '',
    rememberMe: false
  })
  
  function closeDialog() {
    emit('update:modelValue', false)
  }
  
  function resetForm() {
    form.email = ''
    form.password = ''
    form.rememberMe = false
  }
  
  function submitLogin() {
    const email = form.email.trim()
    const password = form.password.trim()
  
    if (!email || !password) {
      ElMessage.error('Please enter email and password')
      return
    }
  
    emit('login-success', {
      email,
      rememberMe: form.rememberMe
    })
  
    emit('update:modelValue', false)
    ElMessage.success('Login successful')
    resetForm()
  }
  </script>
  
  <style scoped>
  .login-card {
    background: #1b2b4a;
    color: white;
    padding: 8px 6px 6px;
  }
  
  .login-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
  }
  
  .login-header h2 {
    margin: 0;
    font-size: 22px;
    font-weight: 800;
    color: #ffffff;
  }
  
  .close-btn {
    border: none;
    background: transparent;
    color: #9fb3d9;
    font-size: 32px;
    line-height: 1;
    cursor: pointer;
  }
  
  .close-btn:hover {
    color: #ffffff;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .field-block {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .field-label {
    font-size: 15px;
    font-weight: 600;
    color: #e7edf8;
  }
  
  :deep(.custom-input .el-input__wrapper) {
    background: #071738;
    box-shadow: none;
    border: 1px solid #35507d;
    border-radius: 14px;
    min-height: 56px;
  }
  
  :deep(.custom-input .el-input__inner) {
    color: #ffffff;
    font-size: 16px;
  }
  
  :deep(.custom-input .el-input__inner::placeholder) {
    color: #93a7c7;
  }
  
  .options-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  
  .remember-me {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #d8e2f2;
    font-size: 15px;
    cursor: pointer;
  }
  
  .remember-me input {
    width: 18px;
    height: 18px;
    accent-color: #08d79f;
  }
  
  .link-btn {
    border: none;
    background: transparent;
    color: #08f0b0;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
  }
  
  .login-btn {
    width: 100%;
    height: 56px;
    border: none;
    border-radius: 14px;
    font-size: 18px;
    font-weight: 700;
  }
  
  .divider {
    display: flex;
    align-items: center;
    gap: 14px;
    color: #b0bfd8;
    font-size: 14px;
  }
  
  .divider::before,
  .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(159, 179, 217, 0.25);
  }
  
  .social-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  
  .social-btn {
    height: 56px;
    border-radius: 14px;
    border: 1px solid #35507d;
    background: #071738;
    color: white;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
  }
  
  .social-icon {
    font-size: 24px;
    font-weight: 800;
    margin-right: 8px;
  }
  
  .signup-text {
    text-align: center;
    color: #b8c7de;
    font-size: 15px;
    margin: 6px 0 0;
  }
  
  .signup-btn {
    border: none;
    background: transparent;
    color: #08f0b0;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
  }
  
  :deep(.login-dialog .el-dialog) {
    background: #1b2b4a;
    border-radius: 22px;
    padding: 26px;
  }
  
  :deep(.login-dialog .el-dialog__header) {
    display: none;
  }
  
  :deep(.login-dialog .el-dialog__body) {
    padding: 0;
  }
  </style>