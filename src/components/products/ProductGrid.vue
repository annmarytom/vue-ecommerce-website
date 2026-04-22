<template>
  <section>
    <div class="top-row">
      <div>
        <h2>Products</h2>
        <p class="result-text">
          Showing {{ startItem }} - {{ endItem }} of {{ totalProducts }} products
        </p>
      </div>

      <div class="toolbar">
        <div class="page-size-box">
          <span>Show</span>

          <el-select v-model="pageSize" style="width: 110px">
            <el-option
              v-for="size in pageSizeOptions"
              :key="size"
              :label="`${size}`"
              :value="size"
            />
          </el-select>
        </div>

        <div class="sort-box">
          <span>Sort By</span>

          <el-select v-model="sortBy" placeholder="Name" style="width: 120px">
            <el-option label="Name" value="name" />
            <el-option label="Price" value="price" />
          </el-select>
        </div>
      </div>
    </div>

    <div v-if="loading" class="loader-wrapper">
      <el-icon class="is-loading" size="40">
        <Loading />
      </el-icon>
    </div>

    <div v-else-if="error" class="error-box">
      {{ error }}
    </div>

    <div v-else-if="sortedProducts.length === 0" class="empty-box">
      No products found
    </div>

    <template v-else>
      <div class="grid">
        <ProductCard
          v-for="item in paginatedProducts"
          :key="item.id"
          :product="item"
          :is-favorite="favoriteIds.includes(item.id)"
          :cart-count="cartItems[item.id] || 0"
          @toggle-favorite="emit('toggle-favorite', $event)"
          @add-to-cart="emit('add-to-cart', $event)"
        />
      </div>

      <div class="pagination-wrapper" v-if="totalProducts > pageSize">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="totalProducts"
          background
        />
      </div>
    </template>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import ProductCard from './ProductCard.vue'
import { fetchProducts } from '@/service/productService'
import { Loading } from '@element-plus/icons-vue'

const props = defineProps({
  search: {
    type: String,
    default: ''
  },
  selectedCategories: {
    type: Array,
    default: () => []
  },
  priceRange: {
    type: Array,
    default: () => [0, Infinity]
  },
  favoriteIds: {
    type: Array,
    default: () => []
  },
  cartItems: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits([
  'products-loaded',
  'toggle-favorite',
  'add-to-cart'
])

const products = ref([])
const loading = ref(false)
const error = ref('')
const sortBy = ref('name')

const currentPage = ref(1)
const pageSize = ref(10)
const pageSizeOptions = [10, 20, 30, 50]

const filteredProducts = computed(() => {
  const keyword = props.search.trim().toLowerCase()
  const minPrice = props.priceRange[0]
  const maxPrice = props.priceRange[1]

  return products.value.filter((item) => {
    const matchesSearch =
      !keyword ||
      item.name.toLowerCase().includes(keyword) ||
      item.category.toLowerCase().includes(keyword)

    const matchesCategory =
      props.selectedCategories.length === 0 ||
      props.selectedCategories.includes(item.category)

    const matchesPrice =
      item.price >= minPrice && item.price <= maxPrice

    return matchesSearch && matchesCategory && matchesPrice
  })
})

const sortedProducts = computed(() => {
  const copied = [...filteredProducts.value]

  if (sortBy.value === 'price') {
    return copied.sort((a, b) => a.price - b.price)
  }

  return copied.sort((a, b) => a.name.localeCompare(b.name))
})

const totalProducts = computed(() => sortedProducts.value.length)

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return sortedProducts.value.slice(start, end)
})

const startItem = computed(() => {
  if (totalProducts.value === 0) {
    return 0
  }

  return (currentPage.value - 1) * pageSize.value + 1
})

const endItem = computed(() => {
  if (totalProducts.value === 0) {
    return 0
  }

  return Math.min(currentPage.value * pageSize.value, totalProducts.value)
})

watch([filteredProducts, sortBy, pageSize], () => {
  currentPage.value = 1
})

async function loadProducts() {
  loading.value = true
  error.value = ''

  try {
    const result = await fetchProducts()
    products.value = result
    emit('products-loaded', result)
  } catch (err) {
    error.value = err.message || 'Something went wrong'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProducts()
})
</script>

<style scoped>
.top-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}

h2 {
  color: var(--pf-text);
  font-size: 28px;
  margin: 0 0 6px;
}

.result-text {
  margin: 0;
  color: var(--pf-text-soft);
  font-size: 14px;
  font-weight: 500;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.page-size-box,
.sort-box {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--pf-text);
  font-weight: 600;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.pagination-wrapper {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

.error-box,
.loader-wrapper,
.empty-box {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 250, 245, 0.95);
  border-radius: 22px;
  color: var(--pf-text);
  border: 1px solid var(--pf-border);
  box-shadow: var(--pf-shadow);
}

@media (max-width: 1100px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>