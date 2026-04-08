<template>
  <div class="page">
    <AppHeader />

    <main class="content">
      <FilterSidebar
        v-model:search="search"
        v-model:selected-categories="selectedCategories"
        v-model:price-range="priceRange"
        :categories="categories"
        :suggestions="suggestions"
        :search-history="filteredHistory"
        :max-price="maxPrice"
        @select-search="handleSelectSearch"
        @save-search="saveSearch"
      />

      <section class="products-section">
        <ProductGrid
          :search="search"
          :selected-categories="selectedCategories"
          :price-range="priceRange"
          @products-loaded="handleProductsLoaded"
        />
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import FilterSidebar from '@/components/layout/FilterSideBar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import ProductGrid from '@/components/products/ProductGrid.vue'

const search = ref('')
const products = ref([])
const searchHistory = ref([])
const selectedCategories = ref([])
const priceRange = ref([0, 2000])
const maxPrice = ref(2000)

const STORAGE_KEY = 'shopsy-search-history'

onMounted(() => {
  const savedHistory = localStorage.getItem(STORAGE_KEY)

  if (savedHistory) {
    searchHistory.value = JSON.parse(savedHistory)
  }
})

function handleProductsLoaded(productList) {
  products.value = productList

  const highestPrice = Math.ceil(
    Math.max(...productList.map((item) => item.price), 0)
  )

  maxPrice.value = highestPrice || 2000
  priceRange.value = [0, maxPrice.value]
}

const categories = computed(() => {
  return [...new Set(products.value.map((item) => item.category))].sort()
})

const suggestions = computed(() => {
  const keyword = search.value.trim().toLowerCase()

  if (!keyword) {
    return []
  }

  return products.value
    .filter((item) => item.name.toLowerCase().includes(keyword))
    .slice(0, 6)
})

const filteredHistory = computed(() => {
  const keyword = search.value.trim().toLowerCase()

  if (!keyword) {
    return searchHistory.value.slice(0, 5)
  }

  return searchHistory.value
    .filter((item) => item.toLowerCase().includes(keyword))
    .slice(0, 5)
})

function saveSearch(term = search.value) {
  const cleanTerm = term.trim()

  if (!cleanTerm) {
    return
  }

  searchHistory.value = [
    cleanTerm,
    ...searchHistory.value.filter(
      (item) => item.toLowerCase() !== cleanTerm.toLowerCase()
    )
  ].slice(0, 8)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(searchHistory.value))
}

function handleSelectSearch(term) {
  search.value = term
  saveSearch(term)
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #03163b;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
}

.products-section {
  min-width: 0;
}
</style>