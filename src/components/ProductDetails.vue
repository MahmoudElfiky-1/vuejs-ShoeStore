<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '../stores/cartStore.js'

const props = defineProps({
  product: { type: Object, required: true }
})

const cartStore = useCartStore()

const discountedPrice = computed(() => {
  return props.product.price - (props.product.price * props.product.discount / 100)
})

function handleBuyClick() {
  cartStore.addToCart(props.product)
}

onMounted(() => { console.log(`ProductDetails mounted — ${props.product.name}`) })
onUnmounted(() => { console.log(`ProductDetails unmounted — ${props.product.name}`) })
</script>

<template>
  <div style="display: grid; grid-template-columns: 1fr 1fr; background-color: #161b26; border-radius: 16px; overflow: hidden; border: 1px solid #1e2736;">
    <div style="padding: 1.5rem;">
      <img :src="product.image" :alt="product.name" style="width: 100%; height: 420px; object-fit: cover; border-radius: 12px; display: block;" />
    </div>

    <div style="padding: 2rem; display: flex; flex-direction: column; justify-content: center;">
      <span
        v-if="product.badge"
        :style="{
          display: 'inline-block', padding: '0.3rem 0.8rem', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.8rem', color: 'white', width: 'fit-content', marginBottom: '0.8rem',
          backgroundColor: product.badge === 'NEW' ? '#22c55e' : product.badge === 'SALE' ? '#eab308' : '#ef4444'
        }"
      >{{ product.badge }}</span>

      <h1 style="font-size: 2rem; font-weight: bold; color: white; margin: 0 0 0.8rem 0;">{{ product.name }}</h1>
      <p style="color: #8892a4; font-size: 1rem; line-height: 1.6; margin: 0 0 1.2rem 0;">{{ product.description }}</p>

      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 1.2rem;">
        <span v-for="(tag, index) in product.tags" :key="index" style="padding: 0.3rem 0.7rem; border: 1px solid #6366f1; border-radius: 6px; color: #6366f1; font-size: 0.8rem; font-weight: 500;">
          #{{ tag }}
        </span>
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.2rem;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 1.8rem; font-weight: bold; color: white;">${{ discountedPrice.toFixed(2) }}</span>
          <span v-if="product.discount > 0" style="text-decoration: line-through; color: #555; font-size: 1rem;">${{ product.price.toFixed(2) }}</span>
          <span v-if="product.discount > 0" :style="{ padding: '0.15rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold', color: 'white', backgroundColor: product.discount >= 20 ? '#ef4444' : '#f97316' }">
            -{{ product.discount }}%
          </span>
        </div>

        <span :style="{ padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', color: product.stock > 0 ? '#22c55e' : '#ef4444', border: product.stock > 0 ? '1px solid #22c55e' : '1px solid #ef4444' }">
          {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock' }}
        </span>
      </div>

      <button
        @click="handleBuyClick"
        :disabled="product.stock === 0"
        :style="{
          width: '60%', padding: '0.8rem', borderRadius: '10px', border: 'none', fontSize: '1rem', fontWeight: 'bold',
          cursor: product.stock > 0 ? 'pointer' : 'not-allowed', color: 'white',
          backgroundColor: product.stock > 0 ? '#6366f1' : '#333', opacity: product.stock > 0 ? 1 : 0.5
        }"
      >
        {{ product.stock > 0 ? '🛒 Buy Now' : '❌ Out of Stock' }}
      </button>
    </div>
  </div>
</template>