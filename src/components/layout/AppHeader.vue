<template>
  <header class="header">
    <div class="logo">SHOPSY</div>

    <div class="actions">
      <el-badge :value="favoriteCount" :hidden="favoriteCount === 0">
        <el-button round @click="emit('favorites-click')">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="icons">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </el-button>
      </el-badge>

      <el-badge :value="cartCount" :hidden="cartCount === 0">
        <el-button round @click="emit('cart-click')">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="icons">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
        </el-button>
      </el-badge>

      <el-button type="success" round @click="emit('auth-click')">
        {{ isLoggedIn ? 'Logout' : 'Login' }}
      </el-button>
    </div>
  </header>
</template>

<script setup>
defineProps({
  favoriteCount: {
    type: Number,
    default: 0
  },
  cartCount: {
    type: Number,
    default: 0
  },
  isLoggedIn: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'favorites-click',
  'cart-click',
  'auth-click'
])
</script>

<style scoped>
.header {
  height: 72px;
  background: #1c2f57;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

.logo {
  color: white;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 1px;
}

.actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icons {
  width: 22px;
  height: 22px;
}
</style>