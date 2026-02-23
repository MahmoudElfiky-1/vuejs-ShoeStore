<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cartStore.js'

const props = defineProps({
  product: { type: Object, required: true }
})

const cartStore = useCartStore()

const discountedPrice = computed(() => {
  return props.product.price - (props.product.price * props.product.discount / 100)
})

function handleAddToCart() {
  cartStore.addToCart(props.product)
}

onMounted(() => { console.log(`ProductCard mounted — ${props.product.name}`) })
onUnmounted(() => { console.log(`ProductCard unmounted — ${props.product.name}`) })
</script>

<template>
  <div style="background-color: #161b26; border-radius: 12px; overflow: hidden; border: 1px solid #1e2736; display: flex; flex-direction: column;">
    <img :src="product.image" :alt="product.name" style="width: 100%; height: 180px; object-fit: cover; display: block;" />

    <div style="padding: 1rem; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h3 style="color: white; font-weight: bold; font-size: 1rem; margin: 0;">{{ product.name }}</h3>
        <span
          v-if="product.badge"
          :style="{
            padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 'bold', color: 'white',
            backgroundColor: product.badge === 'NEW' ? '#22c55e' : product.badge === 'SALE' ? '#eab308' : '#ef4444'
          }"
        >{{ product.badge }}</span>
      </div>

      <div style="display: flex; align-items: center; gap: 8px; margin-top: 0.8rem; flex-wrap: wrap;">
        <span style="color: #6366f1; font-weight: bold; font-size: 1.15rem;">${{ discountedPrice.toFixed(2) }}</span>
        <span v-if="product.discount > 0" style="text-decoration: line-through; color: #666; font-size: 0.85rem;">${{ product.price.toFixed(2) }}</span>
        <span v-if="product.discount > 0" :style="{ padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', color: 'white', backgroundColor: product.discount >= 20 ? '#ef4444' : '#f97316' }">
          -{{ product.discount }}%
        </span>
      </div>

      <p :style="{ fontSize: '0.8rem', marginTop: '0.4rem', color: product.stock > 0 ? '#22c55e' : '#ef4444' }">
        {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock' }}
      </p>

      <div style="display: flex; gap: 8px; margin-top: 0.8rem;">
        <button
          @click="handleAddToCart"
          :disabled="product.stock === 0"
          :style="{
            flex: 1, padding: '0.5rem', borderRadius: '8px', border: 'none', fontSize: '0.8rem', fontWeight: 'bold', cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
            color: 'white', backgroundColor: product.stock > 0 ? '#22c55e' : '#333', opacity: product.stock > 0 ? 1 : 0.5
          }"
        >
          {{ product.stock > 0 ? '🛒 Add' : '❌ Out' }}
        </button>

        <RouterLink
          :to="`/product/${product.id}`"
          style="flex: 1; padding: 0.5rem; background-color: #6366f1; color: white; border-radius: 8px; text-decoration: none; text-align: center; font-size: 0.8rem; font-weight: bold;"
        >
          View
        </RouterLink>
      </div>
    </div>
  </div>
</template>