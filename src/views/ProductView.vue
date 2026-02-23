<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/productStore.js'
import ProductDetails from '../components/ProductDetails.vue'
import ProductCard from '../components/ProductCard.vue'

const route = useRoute()
const productStore = useProductStore()

const currentProduct = computed(() => {
  const id = Number(route.params.id)
  return productStore.products.find(p => p.id === id)
})

const relatedProducts = computed(() => {
  const id = Number(route.params.id)
  return productStore.products.filter(p => p.id !== id)
})

onMounted(async () => {
  if (productStore.products.length === 0) {
    await productStore.fetchProducts()
  }
  console.log(`ProductView mounted for ID: ${route.params.id}`)
})

onUnmounted(() => { console.log('ProductView unmounted') })
</script>

<template>
  <div>
    <!-- Loading -->
    <div v-if="productStore.loading" style="text-align: center; padding: 3rem;">
      <p style="color: #888; font-size: 1.1rem;">Loading product...</p>
    </div>

    <!-- Product Found -->
    <div v-else-if="currentProduct">
      <ProductDetails :product="currentProduct" />

      <div style="margin-top: 3rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <h2 style="font-size: 1.5rem; font-weight: bold; color: white; margin: 0;">Related Products</h2>
          <span style="padding: 0.3rem 0.7rem; border: 1px solid #444; border-radius: 6px; color: #aaa; font-size: 0.85rem;">
            {{ relatedProducts.length }} items
          </span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
          <ProductCard v-for="item in relatedProducts" :key="item.id" :product="item" />
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else style="text-align: center; padding: 5rem 0;">
      <h2 style="font-size: 2rem; color: #ef4444;">Product Not Found</h2>
      <p style="color: #888; margin-top: 1rem;">The product you're looking for doesn't exist.</p>
    </div>
  </div>
</template>