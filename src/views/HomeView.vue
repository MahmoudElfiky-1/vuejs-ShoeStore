<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useProductStore } from '../stores/productStore.js'
import CarouselBanner from '../components/CarouselBanner.vue'
import ProductCard from '../components/ProductCard.vue'

const productStore = useProductStore()

onMounted(async () => {
  await productStore.fetchProducts()
  console.log(`HomeView mounted — ${productStore.products.length} products loaded`)
})

onUnmounted(() => { console.log('HomeView unmounted') })
</script>

<template>
  <div>
    <CarouselBanner />

    <!-- Loading State -->
    <div v-if="productStore.loading" style="text-align: center; padding: 3rem;">
      <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #333; border-top-color: #6366f1; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
      <p style="color: #888; margin-top: 1rem; font-size: 1.1rem;">Loading products...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="productStore.error" style="text-align: center; padding: 3rem; background-color: #1a1520; border-radius: 12px; border: 1px solid #ef4444;">
      <p style="color: #ef4444; font-size: 1.2rem; font-weight: bold;">⚠️ Failed to load products</p>
      <p style="color: #888; margin-top: 0.5rem;">{{ productStore.error }}</p>
      <button @click="productStore.fetchProducts()" style="margin-top: 1rem; padding: 0.5rem 1.5rem; background-color: #6366f1; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
        Retry
      </button>
    </div>

    <!-- Products Grid -->
    <div v-else>
      <h2 style="font-size: 1.5rem; font-weight: bold; color: white; margin-bottom: 1.5rem;">Our Products</h2>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;">
        <ProductCard
          v-for="product in productStore.products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>