<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useCartStore } from '../stores/cartStore.js'
import { RouterLink } from 'vue-router'

const cartStore = useCartStore()

function getDiscountedPrice(item) {
  return item.price - (item.price * item.discount / 100)
}

onMounted(() => { console.log('CartView mounted') })
onUnmounted(() => { console.log('CartView unmounted') })
</script>

<template>
  <div>
    <h1 style="font-size: 2rem; font-weight: bold; color: white; margin-bottom: 2rem;">🛒 Your Cart</h1>

    <!-- Empty Cart -->
    <div v-if="cartStore.items.length === 0" style="text-align: center; padding: 4rem; background-color: #161b26; border-radius: 16px; border: 1px solid #1e2736;">
      <p style="font-size: 3rem; margin-bottom: 1rem;">🛒</p>
      <h2 style="color: #888; font-size: 1.5rem; margin-bottom: 0.5rem;">Your cart is empty</h2>
      <p style="color: #555; margin-bottom: 1.5rem;">Start shopping to add items to your cart!</p>
      <RouterLink to="/" style="display: inline-block; padding: 0.7rem 2rem; background-color: #6366f1; color: white; border-radius: 10px; text-decoration: none; font-weight: bold;">
        Browse Products
      </RouterLink>
    </div>

    <!-- Cart Items -->
    <div v-else>
      <!-- Cart Items List -->
      <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 2rem;">
        <div
          v-for="item in cartStore.items"
          :key="item.id"
          style="display: grid; grid-template-columns: 80px 1fr auto auto auto; align-items: center; gap: 1.5rem; padding: 1rem 1.5rem; background-color: #161b26; border-radius: 12px; border: 1px solid #1e2736;"
        >
          <!-- Image -->
          <img :src="item.image" :alt="item.name" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;" />

          <!-- Name -->
          <div>
            <h3 style="color: white; font-weight: bold; font-size: 1.1rem; margin: 0;">{{ item.name }}</h3>
            <p style="color: #6366f1; font-weight: bold; margin: 0.3rem 0 0 0;">${{ getDiscountedPrice(item).toFixed(2) }}</p>
          </div>

          <!-- Quantity -->
          <div style="text-align: center;">
            <p style="color: #888; font-size: 0.75rem; margin: 0 0 0.2rem 0;">QTY</p>
            <span style="color: white; font-weight: bold; font-size: 1.2rem; background-color: #1e2736; padding: 0.3rem 1rem; border-radius: 6px;">
              {{ item.qty }}
            </span>
          </div>

          <!-- Subtotal -->
          <div style="text-align: right;">
            <p style="color: #888; font-size: 0.75rem; margin: 0 0 0.2rem 0;">Subtotal</p>
            <span style="color: white; font-weight: bold; font-size: 1.1rem;">
              ${{ (getDiscountedPrice(item) * item.qty).toFixed(2) }}
            </span>
          </div>

          <!-- Remove Button -->
          <button
            @click="cartStore.removeFromCart(item.id)"
            style="padding: 0.5rem 1rem; background-color: #ef4444; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 0.85rem;"
          >
            ✕ Remove
          </button>
        </div>
      </div>

      <!-- Cart Summary -->
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 2rem; background-color: #161b26; border-radius: 12px; border: 1px solid #1e2736;">
        <div>
          <p style="color: #888; font-size: 0.9rem; margin: 0;">Total ({{ cartStore.totalItems }} items)</p>
          <p style="color: white; font-size: 2rem; font-weight: bold; margin: 0.3rem 0 0 0;">
            ${{ cartStore.totalPrice.toFixed(2) }}
          </p>
        </div>

        <div style="display: flex; gap: 12px;">
          <button
            @click="cartStore.clearCart()"
            style="padding: 0.7rem 1.5rem; background-color: transparent; color: #ef4444; border: 1px solid #ef4444; border-radius: 10px; cursor: pointer; font-weight: bold;"
          >
            Clear Cart
          </button>
          <button style="padding: 0.7rem 2rem; background-color: #22c55e; color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: bold; font-size: 1rem;">
            ✓ Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>