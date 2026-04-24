<template>
  <div class="page">
    <AppHeader
      :favorite-count="favoriteCount"
      :cart-count="cartCount"
      :is-logged-in="isLoggedIn"
      @favorites-click="handleFavoritesClick"
      @cart-click="handleCartClick"
      @auth-click="handleAuthClick"
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
      :display-name="displayName"
      @remove-favorite="removeFavorite"
    />

    <CartModal
      v-model="showCartModal"
      :cart-products="cartProducts"
       :cart-items="cartItems"
      :total-amount="formatMoney(cartTotal)"
      @increase-quantity="increaseCartQuantity"
      @decrease-quantity="decreaseCartQuantity"
      @remove-cart-item="removeCartItem"
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
import CartModal from '@/components/products/CartModal.vue'
import { getCurrentAuthUser } from '@/service/authService'

const search = ref('')
const products = ref([])
const searchHistory = ref([])
const selectedCategories = ref([])
const priceRange = ref([0, 2000])
const maxPrice = ref(2000)

const favoritesByUser = ref({})
const cartItemsByUser = ref({})

const isLoggedIn = ref(false)
const currentUser = ref({
  id: null,
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  image: ''
})

const showLoginModal = ref(false)
const showFavoritesModal = ref(false)
const showCartModal = ref(false)

const shouldOpenFavoritesAfterLogin = ref(false)
const shouldOpenCartAfterLogin = ref(false)
const pendingFavoriteProduct = ref(null)
const pendingCartProduct = ref(null)

const SEARCH_HISTORY_KEY = 'shopsy-search-history'
const FAVORITES_BY_USER_KEY = 'shopsy-favorites-by-user'
const CART_BY_USER_KEY = 'shopsy-cart-by-user'
const AUTH_USER_KEY = 'shopsy-auth-user'
const ACCESS_TOKEN_KEY = 'shopsy-access-token'
const REFRESH_TOKEN_KEY = 'shopsy-refresh-token'

onMounted(async () => {
  searchHistory.value = readLocalStorage(SEARCH_HISTORY_KEY, [])
  favoritesByUser.value = readLocalStorage(FAVORITES_BY_USER_KEY, {})
  cartItemsByUser.value = readLocalStorage(CART_BY_USER_KEY, {})

  const savedUser = readLocalStorage(AUTH_USER_KEY, null)
  const accessToken = readLocalStorage(ACCESS_TOKEN_KEY, '')

  if (savedUser && accessToken) {
    try {
      const latestUser = await getCurrentAuthUser(accessToken)
      currentUser.value = latestUser
      isLoggedIn.value = true
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(latestUser))
    } catch {
      clearAuthStorage()
    }
  }
})

function readLocalStorage(key, fallbackValue) {
  try {
    const savedValue = localStorage.getItem(key)
    return savedValue ? JSON.parse(savedValue) : fallbackValue
  } catch {
    return fallbackValue
  }
}

function writeLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function clearAuthStorage() {
  localStorage.removeItem(AUTH_USER_KEY)
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)

  isLoggedIn.value = false
  currentUser.value = {
    id: null,
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    image: ''
  }
}

const currentUserKey = computed(() => {
  if (!isLoggedIn.value || !currentUser.value.username) {
    return ''
  }

  return currentUser.value.username.toLowerCase()
})

const favoriteIds = computed(() => {
  if (!currentUserKey.value) {
    return []
  }

  return favoritesByUser.value[currentUserKey.value] || []
})

const cartItems = computed(() => {
  if (!currentUserKey.value) {
    return {}
  }

  return cartItemsByUser.value[currentUserKey.value] || {}
})

const displayName = computed(() => {
  return currentUser.value.firstName || currentUser.value.username || ''
})

const favoriteCount = computed(() => {
  return isLoggedIn.value ? favoriteIds.value.length : 0
})

const cartCount = computed(() => {
  if (!isLoggedIn.value) {
    return 0
  }

  return Object.values(cartItems.value).reduce((total, count) => total + count, 0)
})

const favoriteProducts = computed(() => {
  return products.value.filter((item) => favoriteIds.value.includes(item.id))
})

const cartProducts = computed(() => {
  return products.value
    .filter((item) => cartItems.value[item.id])
    .map((item) => ({
      ...item,
      quantity: cartItems.value[item.id]
    }))
})

const cartTotal = computed(() => {
  const total = cartProducts.value.reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)

  return Number(total.toFixed(2))
})

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

function formatMoney(value) {
  return Number(value || 0).toFixed(2)
}

function handleProductsLoaded(productList) {
  products.value = productList

  const highestPrice = Math.ceil(
    Math.max(...productList.map((item) => item.price), 0)
  )

  maxPrice.value = highestPrice || 2000
  priceRange.value = [0, maxPrice.value]
}

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

  writeLocalStorage(SEARCH_HISTORY_KEY, searchHistory.value)
}

function handleSelectSearch(term) {
  search.value = term
  saveSearch(term)
}

function handleFavoritesClick() {
  if (!isLoggedIn.value) {
    shouldOpenFavoritesAfterLogin.value = true
    showLoginModal.value = true
    return
  }

  showFavoritesModal.value = true
}

function handleCartClick() {
  if (!isLoggedIn.value) {
    shouldOpenCartAfterLogin.value = true
    showLoginModal.value = true
    ElMessage.warning('Please login to view your cart')
    return
  }

  showCartModal.value = true
}

function handleAuthClick() {
  if (isLoggedIn.value) {
    logoutUser()
    return
  }

  showLoginModal.value = true
}

function handleLoginSuccess(userData) {
  currentUser.value = {
    id: userData.id,
    username: userData.username,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    image: userData.image
  }

  isLoggedIn.value = true

  writeLocalStorage(AUTH_USER_KEY, currentUser.value)
  writeLocalStorage(ACCESS_TOKEN_KEY, userData.accessToken)
  writeLocalStorage(REFRESH_TOKEN_KEY, userData.refreshToken)

  if (pendingFavoriteProduct.value) {
    toggleFavoriteForCurrentUser(pendingFavoriteProduct.value)
    pendingFavoriteProduct.value = null
  }

  if (pendingCartProduct.value) {
    addToCartForCurrentUser(pendingCartProduct.value)
    pendingCartProduct.value = null
  }

  if (shouldOpenFavoritesAfterLogin.value) {
    showFavoritesModal.value = true
    shouldOpenFavoritesAfterLogin.value = false
  }

  if (shouldOpenCartAfterLogin.value) {
    showCartModal.value = true
    shouldOpenCartAfterLogin.value = false
  }
}

function logoutUser() {
  clearAuthStorage()
  showFavoritesModal.value = false
  showCartModal.value = false
  shouldOpenFavoritesAfterLogin.value = false
  shouldOpenCartAfterLogin.value = false
  pendingFavoriteProduct.value = null
  pendingCartProduct.value = null
  ElMessage.success('Logged out successfully')
}

function toggleFavorite(product) {
  if (!isLoggedIn.value) {
    pendingFavoriteProduct.value = product
    showLoginModal.value = true
    ElMessage.warning('Please login to manage favourites')
    return
  }

  toggleFavoriteForCurrentUser(product)
}

function toggleFavoriteForCurrentUser(product) {
  const userKey = currentUserKey.value

  if (!userKey) {
    return
  }

  const currentFavorites = favoritesByUser.value[userKey] || []
  const alreadyAdded = currentFavorites.includes(product.id)

  favoritesByUser.value = {
    ...favoritesByUser.value,
    [userKey]: alreadyAdded
      ? currentFavorites.filter((id) => id !== product.id)
      : [...currentFavorites, product.id]
  }

  writeLocalStorage(FAVORITES_BY_USER_KEY, favoritesByUser.value)

  ElMessage.success(
    alreadyAdded ? 'Removed from favourites' : 'Added to favourites'
  )
}

function removeFavorite(product) {
  const userKey = currentUserKey.value

  if (!userKey) {
    return
  }

  const currentFavorites = favoritesByUser.value[userKey] || []

  favoritesByUser.value = {
    ...favoritesByUser.value,
    [userKey]: currentFavorites.filter((id) => id !== product.id)
  }

  writeLocalStorage(FAVORITES_BY_USER_KEY, favoritesByUser.value)
  ElMessage.success('Removed from favourites')
}

function addToCart(product) {
  if (!isLoggedIn.value) {
    pendingCartProduct.value = product
    showLoginModal.value = true
    ElMessage.warning('Please login to add items to cart')
    return
  }

  addToCartForCurrentUser(product)
}

function addToCartForCurrentUser(product) {
  const userKey = currentUserKey.value

  if (!userKey) {
    return
  }

  const userCart = cartItemsByUser.value[userKey] || {}
  const currentCount = userCart[product.id] || 0

  cartItemsByUser.value = {
    ...cartItemsByUser.value,
    [userKey]: {
      ...userCart,
      [product.id]: currentCount + 1
    }
  }

  writeLocalStorage(CART_BY_USER_KEY, cartItemsByUser.value)
  ElMessage.success('Added to cart')
}

function increaseCartQuantity(product) {
  addToCartForCurrentUser(product)
}

function decreaseCartQuantity(product) {
  const userKey = currentUserKey.value

  if (!userKey) {
    return
  }

  const userCart = cartItemsByUser.value[userKey] || {}
  const currentCount = userCart[product.id] || 0

  if (currentCount <= 1) {
    removeCartItem(product)
    return
  }

  cartItemsByUser.value = {
    ...cartItemsByUser.value,
    [userKey]: {
      ...userCart,
      [product.id]: currentCount - 1
    }
  }

  writeLocalStorage(CART_BY_USER_KEY, cartItemsByUser.value)
}

function removeCartItem(product) {
  const userKey = currentUserKey.value

  if (!userKey) {
    return
  }

  const userCart = { ...(cartItemsByUser.value[userKey] || {}) }
  delete userCart[product.id]

  cartItemsByUser.value = {
    ...cartItemsByUser.value,
    [userKey]: userCart
  }

  writeLocalStorage(CART_BY_USER_KEY, cartItemsByUser.value)
  ElMessage.success('Removed from cart')
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background:oklch(0.88 0.03 307.67);

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