<template>
  <section>
    <div class="top-row">
      <h2>Products</h2>

      <div class="sort-box">
        <span>Sort By</span>
        <el-select v-model="sortBy" placeholder="Name" style="width: 110px;">
          <el-option label="Name" value="name" />
          <el-option label="Price" value="price" />
        </el-select>
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

    <div v-else class="grid">
      <ProductCard
        v-for="item in sortedProducts"
        :key="item.id"
        :product="item"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
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
  }
})

const emit = defineEmits(['products-loaded'])

const products = ref([])
const loading = ref(false)
const error = ref('')
const sortBy = ref('name')

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
  align-items: center;
  margin-bottom: 18px;
}

h2 {
  color: white;
  font-size: 20px;
}

.sort-box {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.error-box,
.loader-wrapper,
.empty-box {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1c2f57;
  border-radius: 20px;
  color: white;
}
</style>