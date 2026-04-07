<template>
  <aside class="sidebar">
    <el-card shadow="never" class="sidebar-card">
      <div ref="searchBoxRef" class="search-wrapper">
        <el-input
          :model-value="search"
          @update:model-value="updateSearch"
          @focus="showDropdown = true"
          @keyup.enter="submitSearch"
          placeholder="Search products"
          clearable
        />

        <div
          v-if="showDropdown && (visibleSuggestions.length || visibleHistory.length)"
          class="search-dropdown"
        >
          <template v-if="search.trim() && visibleSuggestions.length">
            <p class="dropdown-title">Products</p>

            <button
              v-for="item in visibleSuggestions"
              :key="item.id"
              type="button"
              class="dropdown-item product-item"
              @mousedown.prevent="selectSearch(item.name)"
            >
              <img :src="item.image" :alt="item.name" class="dropdown-image" />

              <div class="dropdown-text">
                <span class="product-name">{{ item.name }}</span>
                <span class="product-meta">
                  {{ item.category }} • ${{ item.price }}
                </span>
              </div>
            </button>
          </template>

          <template v-if="visibleHistory.length">
            <p class="dropdown-title">Recent Searches</p>

            <button
              v-for="item in visibleHistory"
              :key="item"
              type="button"
              class="dropdown-item history-item"
              @mousedown.prevent="selectSearch(item)"
            >
              <span class="history-icon">↺</span>
              <span>{{ item }}</span>
            </button>
          </template>
        </div>
      </div>

      <div class="section">
        <h3>CATEGORIES</h3>

        <el-checkbox-group
          :model-value="selectedCategories"
          @update:model-value="updateSelectedCategories"
        >
          <div class="checkbox-list">
            <el-checkbox
              v-for="category in categories"
              :key="category"
              :label="category"
            >
              {{ category }}
            </el-checkbox>
          </div>
        </el-checkbox-group>
      </div>

      <div class="section">
        <h3>PRICE RANGE</h3>
        <el-slider range />
        <div class="price-box">
          <span>$0</span>
          <span>-</span>
          <span>$2000</span>
        </div>
      </div>
    </el-card>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  search: {
    type: String,
    default: ''
  },
  suggestions: {
    type: Array,
    default: () => []
  },
  searchHistory: {
    type: Array,
    default: () => []
  },
  categories: {
    type: Array,
    default: () => []
  },
  selectedCategories: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits([
  'update:search',
  'update:selected-categories',
  'select-search',
  'save-search'
])

const showDropdown = ref(false)
const searchBoxRef = ref(null)

const visibleSuggestions = computed(() => props.suggestions.slice(0, 6))
const visibleHistory = computed(() => props.searchHistory.slice(0, 5))

function updateSearch(value) {
  emit('update:search', value)
  showDropdown.value = true
}

function updateSelectedCategories(value) {
  emit('update:selected-categories', value)
}

function selectSearch(value) {
  emit('select-search', value)
  showDropdown.value = false
}

function submitSearch() {
  const value = props.search.trim()

  if (!value) {
    return
  }

  emit('save-search', value)
  showDropdown.value = false
}

function handleClickOutside(event) {
  if (searchBoxRef.value && !searchBoxRef.value.contains(event.target)) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.sidebar-card {
  background: #1c2f57;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
}

.search-wrapper {
  position: relative;
}

.search-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: #0f234e;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 10px;
  z-index: 20;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.dropdown-title {
  color: #9fb3d9;
  font-size: 12px;
  font-weight: 700;
  margin: 8px 6px;
  text-transform: uppercase;
}

.dropdown-item {
  width: 100%;
  border: none;
  background: transparent;
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  text-align: left;
}

.dropdown-item:hover {
  background: rgba(255,255,255,0.08);
}

.product-item {
  align-items: center;
}

.dropdown-image {
  width: 42px;
  height: 42px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.dropdown-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.product-name {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
}

.product-meta {
  font-size: 12px;
  color: #b7c6e3;
}

.history-item {
  font-size: 14px;
}

.history-icon {
  font-size: 14px;
  color: #9fb3d9;
}

.section {
  margin-top: 24px;
}

h3 {
  color: white;
  font-size: 14px;
  margin-bottom: 16px;
}

.checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.price-box {
  margin-top: 16px;
  background: #071a44;
  color: white;
  padding: 12px 16px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
}
</style>