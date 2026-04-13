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
  background: #1b2b4a;
  color: white;
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
  color: #b7c6e3;
  font-size: 15px;
  font-weight: 600;
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

.favorites-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.favorite-item {
  display: flex;
  gap: 14px;
  background: #071738;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 14px;
}

.favorite-image {
  width: 110px;
  height: 110px;
  object-fit: cover;
  border-radius: 12px;
  flex-shrink: 0;
}

.favorite-content {
  flex: 1;
  min-width: 0;
}

.favorite-content h3 {
  margin: 0 0 8px;
  font-size: 18px;
  color: white;
}

.category {
  margin: 0 0 8px;
  color: #b7c6e3;
  font-size: 13px;
}

.price {
  margin: 0 0 14px;
  color: #08f0b0;
  font-size: 18px;
  font-weight: 700;
}

:deep(.favorites-dialog .el-dialog) {
  background: #1b2b4a;
  border-radius: 22px;
  padding: 26px;
}

:deep(.favorites-dialog .el-dialog__header) {
  display: none;
}

:deep(.favorites-dialog .el-dialog__body) {
  padding: 0;
}
.close-button{
  width:22px;
  height: 22px;
}
</style>