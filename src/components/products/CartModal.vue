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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="close-button"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
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

            <p class="category">
              {{ item.category }}
            </p>

            <p class="price">
              Unit Price: ${{ formatMoney(item.price) }}
            </p>

            <p class="quantity">
              Quantity: {{ item.quantity }}
            </p>

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

          <div class="cart-item-total">
            <span class="total-label">Item Total</span>
            <span class="total-price">
              ${{ getItemTotal(item) }}
            </span>
          </div>
        </div>

        <div class="cart-total">
          Cart Total: ${{ formatMoney(totalAmount) }}
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

function formatMoney(value) {
  return Number(value || 0).toFixed(2)
}

function getItemTotal(item) {
  const price = Number(item.price || 0)
  const quantity = Number(item.quantity || 0)

  return formatMoney(price * quantity)
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
  min-width: 0;
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
  font-size: 16px;
}

.quantity {
  margin: 0 0 12px;
  color: var(--pf-text);
  font-weight: 600;
}

.actions-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.cart-item-total {
  min-width: 150px;
  border-left: 1px solid var(--pf-border);
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  text-align: right;
}

.total-label {
  color: var(--pf-text-soft);
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 8px;
}

.total-price {
  color: var(--pf-accent);
  font-size: 22px;
  font-weight: 900;
}

.cart-total {
  text-align: right;
  font-size: 22px;
  font-weight: 800;
  color: var(--pf-accent);
  padding-top: 8px;
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

@media (max-width: 700px) {
  .cart-item {
    flex-direction: column;
  }

  .cart-image {
    width: 100%;
    height: 180px;
  }

  .cart-item-total {
    min-width: 100%;
    border-left: none;
    border-top: 1px solid var(--pf-border);
    padding-left: 0;
    padding-top: 14px;
    align-items: flex-start;
    text-align: left;
  }

  .cart-total {
    text-align: left;
  }
}
</style>