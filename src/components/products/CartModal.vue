<template>
    <el-dialog
      :model-value="modelValue"
      @update:model-value="emit('update:modelValue', $event)"
      width="800px"
      :show-close="false"
      class="cart-dialog"
      align-center
    >
      <div class="cart-card">
        <div class="cart-header">
          <h2>My Cart</h2>
  
          <button type="button" class="close-btn" @click="closeDialog">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="close-button">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
          </button>
        </div>
  
        <div v-if="cartProducts.length === 0" class="empty-box">
          No cart items added yet
        </div>
  
        <div v-else class="cart-grid">
          <div
            v-for="item in cartProducts"
            :key="item.id"
            class="cart-item"
          >
            <img :src="item.image" :alt="item.name" class="cart-image" />
  
            <div class="cart-content">
              <h3>{{ item.name }}</h3>
              <p class="category">{{ item.category }}</p>
              <p class="price">${{ item.price }}</p>
              <p class="quantity">Quantity: {{ item.quantity }}</p>
  
              <div class="actions-row">
                <el-button
                  type="success"
                  plain
                  size="small"
                  @click="emit('increase-quantity', item)"
                >
                  +
                </el-button>
  
                <el-button
                  type="warning"
                  plain
                  size="small"
                  @click="emit('decrease-quantity', item)"
                >
                  -
                </el-button>
  
                <el-button
                  type="danger"
                  plain
                  size="small"
                  @click="emit('remove-cart-item', item)"
                >
                  Remove
                </el-button>
              </div>
            </div>
          </div>
  
          <div class="cart-total">
            Total: ${{ totalAmount }}
          </div>
        </div>
      </div>
    </el-dialog>
  </template>
  
  <script setup>
  defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    cartProducts: {
      type: Array,
      default: () => []
    },
    totalAmount: {
      type: Number,
      default: 0
    }
  })
  
  const emit = defineEmits([
    'update:modelValue',
    'increase-quantity',
    'decrease-quantity',
    'remove-cart-item'
  ])
  
  function closeDialog() {
    emit('update:modelValue', false)
  }
  </script>
  


 
  <style scoped>
  .cart-card {
    background: #1b2b4a;
    color: white;
  }
  
  .cart-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  
  .cart-header h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 800;
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
    color: white;
  }
  
  .empty-box {
    min-height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #c7d3e9;
    font-size: 16px;
    border: 1px dashed rgba(255, 255, 255, 0.15);
    border-radius: 16px;
  }
  
  .cart-grid {
    display: grid;
    gap: 18px;
  }
  
  .cart-item {
    display: flex;
    gap: 14px;
    background: #071738;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 14px;
  }
  
  .cart-image {
    width: 110px;
    height: 110px;
    object-fit: cover;
    border-radius: 12px;
    flex-shrink: 0;
  }
  
  .cart-content {
    flex: 1;
  }
  
  .cart-content h3 {
    margin: 0 0 8px;
    color: white;
  }
  
  .category {
    margin: 0 0 8px;
    color: #b7c6e3;
  }
  
  .price {
    margin: 0 0 8px;
    color: #08f0b0;
    font-weight: 700;
  }
  
  .quantity {
    margin: 0 0 12px;
  }
  
  .actions-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  
  .cart-total {
    text-align: right;
    font-size: 22px;
    font-weight: 800;
    color: #08f0b0;
  }
  
  :deep(.cart-dialog .el-dialog) {
    background: #1b2b4a;
    border-radius: 22px;
    padding: 26px;
  }
  
  :deep(.cart-dialog .el-dialog__header) {
    display: none;
  }
  
  :deep(.cart-dialog .el-dialog__body) {
    padding: 0;
  }
  .close-button{
    width:22px;
    height: 22px;
  }
  </style>