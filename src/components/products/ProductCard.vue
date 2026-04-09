<template>
    <el-card shadow="hover" class="product-card" body-style="padding: 0;">
      <div class="image-wrapper">
        <img :src="product.image" :alt="product.name" class="product-image" />
  
        <button
          type="button"
          class="favorite-btn"
          :class="{ active: isFavorite }"
          @click="emit('toggle-favorite', product)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="favorite-icon"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </button>
      </div>
  
      <div class="card-body">
        <h3>{{ product.name }}</h3>
        <p class="category">{{ product.category }}</p>
  
        <p class="rating">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="ratings"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
          {{ product.rating }} ({{ product.reviews }})
        </p>
  
        <div class="bottom-row">
          <span class="price">${{ product.price }}</span>
  
          <el-button
            type="success"
            round
            size="small"
            @click="emit('add-to-cart', product)"
          >
            {{ cartCount > 0 ? `Add to cart (${cartCount})` : 'Add to cart' }}
          </el-button>
        </div>
      </div>
    </el-card>
  </template>
  
  <script setup>
  defineProps({
    product: {
      type: Object,
      required: true
    },
    isFavorite: {
      type: Boolean,
      default: false
    },
    cartCount: {
      type: Number,
      default: 0
    }
  })
  
  const emit = defineEmits(['toggle-favorite', 'add-to-cart'])
  </script>
  
  <style scoped>
  .product-card {
    background: #1c2f57;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    overflow: hidden;
  }
  
  .image-wrapper {
    position: relative;
  }
  
  .product-image {
    width: 100%;
    height: 220px;
    object-fit: cover;
    display: block;
  }
  
  .favorite-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 42px;
    height: 42px;
    border: none;
    border-radius: 50%;
    background: rgba(3, 22, 59, 0.75);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .favorite-btn:hover {
    transform: scale(1.05);
  }
  
  .favorite-btn.active {
    background: #ffffff;
    color: #e71961;
  }
  
  .favorite-icon {
    width: 20px;
    height: 20px;
  }
  
  .card-body {
    padding: 16px;
  }
  
  h3 {
    color: #eaeef5;
    font-size: 20px;
    margin-bottom: 6px;
  }
  
  .category {
    color: #cbd5e1;
    font-size: 12px;
    margin-bottom: 8px;
  }
  
  .rating {
    color: #ffd166;
    font-size: 14px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  
  .bottom-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }
  
  .price {
    color: #e71961;
    font-size: 22px;
    font-weight: 700;
  }
  
  .ratings {
    width: 20px;
    height: 20px;
  }
  </style>