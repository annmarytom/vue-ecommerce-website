<template>
  <el-dialog :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)" width="500px"
    :show-close="false" class="login-dialog" align-center>
    <div class="login-card">
      <div class="login-header">
        <h2>Login</h2>

        <button type="button" class="close-btn" @click="closeDialog">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="close-button">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>

        </button>
      </div>

      <el-form @submit.prevent="submitLogin" class="login-form">
        <div class="field-block">
          <label class="field-label">Username</label>

          <el-input v-model="form.username" placeholder="Enter username" class="custom-input" />
        </div>

        <div class="field-block">
          <label class="field-label">Password</label>

          <el-input v-model="form.password" type="password" show-password placeholder="Enter password"
            class="custom-input" />
        </div>

        <el-button type="success" class="login-btn" :loading="loading" @click="submitLogin">
          Login
        </el-button>
      </el-form>
    </div>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { loginUser } from '@/service/authService'

defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'login-success'])

const loading = ref(false)

const form = reactive({
  username: '',
  password: ''
})

function closeDialog() {
  emit('update:modelValue', false)
}

function resetForm() {
  form.username = ''
  form.password = ''
}

async function submitLogin() {
  const username = form.username.trim()
  const password = form.password.trim()

  if (!username || !password) {
    ElMessage.error('Please enter username and password')
    return
  }

  loading.value = true

  try {
    const userData = await loginUser({
      username,
      password,
      expiresInMins: 30
    })

    emit('login-success', userData)
    emit('update:modelValue', false)
    ElMessage.success('Login successful')
    resetForm()
  } catch (error) {
    ElMessage.error(error.message || 'Login failed')
  } finally {
    loading.value = false
  }
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

.login-btn {
  width: 100%;
  height: 56px;
  border: none;
  border-radius: 14px;
  font-size: 18px;
  font-weight: 700;
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

.close-button {
  width: 22px;
  height: 22px;
}
</style>