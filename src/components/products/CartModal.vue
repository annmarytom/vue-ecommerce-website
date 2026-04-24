<template>
  <el-dialog :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)" width="800px"
    :show-close="false" class="cart-dialog" align-center>
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
        <div v-for="item in cartProducts" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.name" class="cart-image" />

          <div class="cart-content">
            <h3>{{ item.name }}</h3>
            <p class="category">{{ item.category }}</p>
            <p class="price">${{ Number(item.price).toFixed(2) }}</p>
            <p class="quantity">Quantity: {{ item.quantity }}</p>

            <div class="actions-row">
              <el-button type="success" plain size="small" @click="emit('increase-quantity', item)">
                +
              </el-button>

              <el-button type="warning" plain size="small" @click="emit('decrease-quantity', item)">
                -
              </el-button>

              <el-button type="danger" plain size="small" @click="emit('remove-cart-item', item)">
                Remove
              </el-button>
            </div>
          </div>
        </div>

        <div class="cart-total">
          Total: ${{ Number(totalAmount).toFixed(2) }}
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
    type: [Number, String],
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
  background: linear-gradient(180deg, #fffaf6 0%, #f7efe7 100%);
  color: var(--pf-text);
  padding: 20px;
  border-radius: 10px;
}

.cart-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 24px;
}

.cart-header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 800;
}

.helper-text {
  margin: 6px 0 0;
  color: var(--pf-text-soft);
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
}

.close-btn:hover {
  background: #ead8ca;
  color: var(--pf-accent-dark);
}

.empty-box {
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--pf-text-soft);
  font-size: 16px;
  border: 1px dashed var(--pf-border-strong);
  border-radius: 16px;
  background: #fffdfb;
}

.cart-grid {
  display: grid;
  gap: 18px;
}

.cart-item {
  display: flex;
  gap: 14px;
  background: #ffffff;
  border: 1px solid var(--pf-border);
  border-radius: 18px;
  padding: 14px;
  box-shadow: 0 10px 24px rgba(74, 46, 36, 0.06);
}

.cart-image {
  width: 110px;
  height: 110px;
  object-fit: cover;
  border-radius: 12px;
  flex-shrink: 0;
  border: 1px solid var(--pf-border);
}

.cart-content {
  flex: 1;
}

.cart-content h3 {
  margin: 0 0 8px;
  color: var(--pf-text);
}

.category {
  margin: 0 0 8px;
  color: var(--pf-text-soft);
}

.price {
  margin: 0 0 8px;
  color: var(--pf-accent);
  font-weight: 800;
  font-size: 18px;
}

.quantity {
  margin: 0 0 12px;
}

.actions-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.qty-btn,
.remove-btn {
  border-radius: 999px;
  font-weight: 700;
}

.plus-btn {
  color: var(--pf-accent);
  border-color: #d7b3ac;
  background: #f6eae7;
}

.minus-btn {
  color: var(--pf-text);
  border-color: var(--pf-border);
  background: #faf4ed;
}

.remove-btn {
  color: #9a4f46;
  border-color: #e5c0bb;
  background: #faecea;
}

.cart-total {
  text-align: right;
  font-size: 22px;
  font-weight: 800;
  color: var(--pf-accent);
}

:deep(.cart-dialog .el-dialog__header) {
  display: none;
}

:deep(.cart-dialog .el-dialog__body) {
  padding: 0;
}

.close-button {
  width: 22px;
  height: 22px;
}
</style>