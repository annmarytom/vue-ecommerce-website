<template>
    <el-card shadow="hover" class="product-card" body-style="padding: 0;">
        <img :src="product.image" alt="" class="product-image" />

        <div class="card-body">
            <h3>{{ product.name }}</h3>
            <p class="category">{{ product.category }}</p>
            <p class="rating"> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="ratings">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                {{ product.rating }} ({{ product.reviews }})</p>

            <div class="bottom-row">
                <span class="price">${{ product.price }}</span>
                <el-button type="success" round size="small">Add to cart</el-button>
            </div>
        </div>
    </el-card>
</template>

<script setup>
defineProps({
    product: {
        type: Object,
        required: true
    }
})
</script>

<style scoped>
.product-card {
    background: #1c2f57;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    overflow: hidden;
}

.product-image {
    width: 100%;
    height: 220px;
    object-fit: cover;
    display: block;
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
}

.bottom-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.price {
    color: #e71961;
    font-size: 22px;
    font-weight: 700;
}
.ratings{
    width: 20px;
    height: 20px;
}
</style>