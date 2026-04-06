<template>
    <section>
      <div class="top-row">
        <h2>Products</h2>
  
        <div class="sort-box">
          <span>Sort By</span>
          <el-select placeholder="Name" style="width: 110px;">
            <el-option label="Name" value="name" />
          </el-select>
        </div>
      </div>
  
      <div class="grid">
        <ProductCard
          v-for="item in products"
          :key="item.id"
          :product="item"
        />
      </div>
    </section>
  </template>
  
  <script setup>
  import ProductCard from './ProductCard.vue'
  
  const products = [
    { id: 1, name: 'Backpack', category: 'ACCESSORIES', price: 69, rating: 4.6, reviews: 78, image: 'https://picsum.photos/300/220?1' },
    { id: 2, name: 'Camera Lens', category: 'ELECTRONICS', price: 899, rating: 4.9, reviews: 432, image: 'https://picsum.photos/300/220?2' },
    { id: 3, name: 'Clock', category: 'ACCESSORIES', price: 50, rating: 5.0, reviews: 211, image: 'https://picsum.photos/300/220?3' },
    { id: 4, name: 'Coffee Maker', category: 'HOME', price: 89, rating: 4.4, reviews: 94, image: 'https://picsum.photos/300/220?4' },
    { id: 5, name: 'Desk Lamp', category: 'HOME', price: 45, rating: 4.5, reviews: 123, image: 'https://picsum.photos/300/220?5' },
    { id: 6, name: 'Running Shoes', category: 'SPORTS', price: 110, rating: 4.8, reviews: 356, image: 'https://picsum.photos/300/220?6' }
  ]
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
  </style>