<template>
    <div class="page">
      <AppHeader />
  
      <main class="content">
        <FilterSidebar />
  
        <section class="products-section">
          <ProductGrid />
        </section>
      </main>
    </div>
  </template>
  
  <script setup>
  import FilterSidebar from '@/components/layout/FilterSideBar.vue';
import AppHeader from '../components/layout/AppHeader.vue'
import ProductGrid from '@/components/products/ProductGrid.vue';
  

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