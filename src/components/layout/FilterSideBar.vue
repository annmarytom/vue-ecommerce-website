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

        <el-slider
          :model-value="priceRange"
          @update:model-value="updatePriceRange"
          range
          :min="0"
          :max="maxPrice"
        />

        <div class="price-box">
          <span>${{ priceRange[0] }}</span>
          <span>-</span>
          <span>${{ priceRange[1] }}</span>
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
  },
  priceRange: {
    type: Array,
    default: () => [0, 2000]
  },
  maxPrice: {
    type: Number,
    default: 2000
  }
})

const emit = defineEmits([
  'update:search',
  'update:selected-categories',
  'update:price-range',
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

function updatePriceRange(value) {
  emit('update:price-range', value)
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
  background: rgba(255, 250, 245, 0.92);
  border: 1px solid var(--pf-border);
  border-radius: 24px;
  box-shadow: var(--pf-shadow);
}

.panel-title {
  margin-bottom: 16px;
}

.eyebrow {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--pf-gold);
  margin-bottom: 6px;
}

.panel-title h2 {
  margin: 0;
  color: var(--pf-text);
  font-size: 22px;
}

.search-wrapper {
  position: relative;
}

:deep(.sidebar-input .el-input__wrapper) {
  min-height: 48px;
  background: #ffffff;
  border-radius: 14px;
}

.search-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: #fffaf5;
  border: 1px solid var(--pf-border);
  border-radius: 16px;
  padding: 10px;
  z-index: 20;
  box-shadow: 0 18px 36px rgba(74, 46, 36, 0.12);
}

.dropdown-title {
  color: var(--pf-text-soft);
  font-size: 12px;
  font-weight: 700;
  margin: 8px 6px;
  text-transform: uppercase;
}

.dropdown-item {
  width: 100%;
  border: none;
  background: transparent;
  color: var(--pf-text);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  text-align: left;
}

.dropdown-item:hover {
  background: #f4e9df;
}

.product-item {
  align-items: center;
}

.dropdown-image {
  width: 42px;
  height: 42px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
  border: 1px solid var(--pf-border);
}

.dropdown-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.product-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--pf-text);
}

.product-meta {
  font-size: 12px;
  color: var(--pf-text-soft);
}

.history-item {
  font-size: 14px;
}

.history-icon {
  font-size: 14px;
  color: var(--pf-accent);
}

.section {
  margin-top: 28px;
  padding-top: 22px;
  border-top: 1px solid #efe1d2;
}

h3 {
  color: var(--pf-text);
  font-size: 13px;
  letter-spacing: 0.08em;
  margin-bottom: 16px;
}

.checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

:deep(.el-checkbox) {
  color: var(--pf-text);
}

.price-box {
  margin-top: 16px;
  background: #f7ece2;
  color: var(--pf-text);
  padding: 12px 16px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  font-weight: 700;
}
</style>