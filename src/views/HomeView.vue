<template>
  <div class="page">
    <AppHeader
      :favorite-count="favoriteCount"
      :cart-count="cartCount"
      @favorites-click="handleFavoritesClick"
    />

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
          :favorite-ids="favoriteIds"
          :cart-items="cartItems"
          @products-loaded="handleProductsLoaded"
          @toggle-favorite="toggleFavorite"
          @add-to-cart="addToCart"
        />
      </section>
    </main>

    <LoginModal
      v-model="showLoginModal"
      @login-success="handleLoginSuccess"
    />

    <FavoritesModal
      v-model="showFavoritesModal"
      :favorite-products="favoriteProducts"
      @remove-favorite="removeFavorite"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import FilterSidebar from '@/components/layout/FilterSideBar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import ProductGrid from '@/components/products/ProductGrid.vue'
import LoginModal from '@/components/auth/LoginModal.vue'
import FavoritesModal from '@/components/products/FavoritesModal.vue'

const search = ref('')
const products = ref([])
const searchHistory = ref([])
const selectedCategories = ref([])
const priceRange = ref([0, 2000])
const maxPrice = ref(2000)

const favoriteIds = ref([])
const cartItems = ref({})

const isLoggedIn = ref(false)
const showLoginModal = ref(false)
const showFavoritesModal = ref(false)

const SEARCH_HISTORY_KEY = 'shopsy-search-history'
const FAVORITES_KEY = 'shopsy-favorites'
const CART_KEY = 'shopsy-cart'
const LOGIN_KEY = 'shopsy-is-logged-in'

onMounted(() => {
  searchHistory.value = readLocalStorage(SEARCH_HISTORY_KEY, [])
  favoriteIds.value = readLocalStorage(FAVORITES_KEY, [])
  cartItems.value = readLocalStorage(CART_KEY, {})
  isLoggedIn.value = readLocalStorage(LOGIN_KEY, false)
})

function readLocalStorage(key, fallbackValue) {
  try {
    const savedValue = localStorage.getItem(key)

    if (!savedValue) {
      return fallbackValue
    }

    return JSON.parse(savedValue)
  } catch {
    return fallbackValue
  }
}

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

const favoriteCount = computed(() => favoriteIds.value.length)

const cartCount = computed(() => {
  return Object.values(cartItems.value).reduce((total, count) => total + count, 0)
})

const favoriteProducts = computed(() => {
  return products.value.filter((item) => favoriteIds.value.includes(item.id))
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

  localStorage.setItem(
    SEARCH_HISTORY_KEY,
    JSON.stringify(searchHistory.value)
  )
}

function handleSelectSearch(term) {
  search.value = term
  saveSearch(term)
}

function handleFavoritesClick() {
  if (!isLoggedIn.value) {
    showLoginModal.value = true
    return
  }

  showFavoritesModal.value = true
}

function handleLoginSuccess() {
  isLoggedIn.value = true
  localStorage.setItem(LOGIN_KEY, JSON.stringify(true))
  showFavoritesModal.value = true
}

function toggleFavorite(product) {
  const productId = product.id

  if (favoriteIds.value.includes(productId)) {
    favoriteIds.value = favoriteIds.value.filter((id) => id !== productId)
  } else {
    favoriteIds.value = [...favoriteIds.value, productId]
  }

  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(favoriteIds.value)
  )
}

function removeFavorite(product) {
  favoriteIds.value = favoriteIds.value.filter((id) => id !== product.id)

  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(favoriteIds.value)
  )

  ElMessage.success('Removed from favourites')
}

function addToCart(product) {
  const productId = product.id
  const currentCount = cartItems.value[productId] || 0

  cartItems.value = {
    ...cartItems.value,
    [productId]: currentCount + 1
  }

  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cartItems.value)
  )
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