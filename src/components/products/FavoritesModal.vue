<template>
  <el-dialog
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    width="800px"
    :show-close="false"
    class="favorites-dialog"
    align-center
  >
    <div class="favorites-card">
      <div class="favorites-header">
        <div>
          <h2>{{ displayName ? `${displayName}'s Favourites` : 'My Favourites' }}</h2>
          <p v-if="displayName" class="welcome-text">
            Logged in as {{ displayName }}
          </p>
        </div>

        <button type="button" class="close-btn" @click="closeDialog">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="close-button">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div v-if="favoriteProducts.length === 0" class="empty-box">
        No favourite items added yet
      </div>

      <div v-else class="favorites-grid">
        <div
          v-for="item in favoriteProducts"
          :key="item.id"
          class="favorite-item"
        >
          <img :src="item.image" :alt="item.name" class="favorite-image" />

          <div class="favorite-content">
            <h3>{{ item.name }}</h3>
            <p class="category">{{ item.category }}</p>
            <p class="price">${{ item.price }}</p>

            <el-button
              type="danger"
              plain
              size="small"
              @click="emit('remove-favorite', item)"
            >
              Remove
            </el-button>
          </div>
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
  favoriteProducts: {
    type: Array,
    default: () => []
  },
  displayName: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'remove-favorite'])

function closeDialog() {
  emit('update:modelValue', false)
}
</script>

<style scoped>
.favorites-card {
  background: linear-gradient(180deg, #fffaf6 0%, #f7efe7 100%);
  color: var(--pf-text);
  padding: 20px;
  border-radius: 10px;
}

.favorites-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 24px;
}

.favorites-header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 800;
}

.welcome-text {
  margin: 6px 0 0;
  color: var(--pf-text-soft);
  font-size: 15px;
  font-weight: 600;
}

.close-btn {
  border: none;
  background: #f3e7dc;
  color: var(--pf-accent);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  line-height: 1;
  cursor: pointer;
  font-size: 28px;
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

.favorites-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.favorite-item {
  display: flex;
  gap: 14px;
  background: #ffffff;
  border: 1px solid var(--pf-border);
  border-radius: 18px;
  padding: 14px;
  box-shadow: 0 10px 24px rgba(74, 46, 36, 0.06);
}

.favorite-image {
  width: 110px;
  height: 110px;
  object-fit: cover;
  border-radius: 12px;
  flex-shrink: 0;
  border: 1px solid var(--pf-border);
}

.favorite-content {
  flex: 1;
  min-width: 0;
}

.favorite-content h3 {
  margin: 0 0 8px;
  font-size: 18px;
  color: var(--pf-text);
}

.category {
  margin: 0 0 8px;
  color: var(--pf-text-soft);
  font-size: 13px;
}

.price {
  margin: 0 0 14px;
  color: var(--pf-accent);
  font-size: 18px;
  font-weight: 800;
}

.remove-btn {
  border-radius: 999px;
  color: #9a4f46;
  border-color: #e5c0bb;
  background: #faecea;
  font-weight: 700;
}

:deep(.favorites-dialog .el-dialog__header) {
  display: none;
}

:deep(.favorites-dialog .el-dialog__body) {
  padding: 0;
}
</style>