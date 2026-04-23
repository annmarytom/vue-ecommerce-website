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
  background: linear-gradient(180deg, #fffaf6 0%, #f7efe7 100%);
  color: var(--pf-text);
  padding: 20px;
  border-radius: 10px;
}

.login-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.login-header h2 {
  margin: 0;
  font-size: 26px;
  font-weight: 800;
  color: var(--pf-text);
}

.subtext {
  margin: 0 0 24px;
  color: var(--pf-text-soft);
  line-height: 1.6;
}

.close-btn {
  border: none;
  background: #f3e7dc;
  color: var(--pf-accent);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #ead8ca;
  color: var(--pf-accent-dark);
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
  font-weight: 700;
  color: var(--pf-text);
}

:deep(.custom-input .el-input__wrapper) {
  background: #ffffff;
  border: 1px solid var(--pf-border);
  border-radius: 14px;
  min-height: 56px;
}

:deep(.custom-input .el-input__inner) {
  color: var(--pf-text);
  font-size: 16px;
}

:deep(.custom-input .el-input__inner::placeholder) {
  color: #aa8c7b;
}

.login-btn {
  width: 100%;
  height: 54px;
  border-radius: 14px;
  font-size: 18px;
  font-weight: 700;
  margin-top: 4px;
}

:deep(.login-dialog .el-dialog__header) {
  display: none;
}

:deep(.login-dialog .el-dialog__body) {
  padding: 0;
}

.close-button {
  width: 20px;
  height: 20px;
}
</style>