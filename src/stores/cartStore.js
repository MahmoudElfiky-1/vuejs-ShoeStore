import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from '../composables/useLocalStorage.js'
import { useProductStore } from './productStore.js'

export const useCartStore = defineStore('cart', () => {
  // Items persisted via useLocalStorage composable
  const items = useLocalStorage('cart', [])

  // Getter: total number of items in cart
  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.qty, 0)
  })

  // Getter: total price
  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => {
      const discounted = item.price - (item.price * item.discount / 100)
      return sum + (discounted * item.qty)
    }, 0)
  })

  // Action: add to cart + decrease stock
  function addToCart(product) {
    const existing = items.value.find(item => item.id === product.id)

    if (existing) {
      existing.qty++
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        discount: product.discount,
        image: product.image,
        qty: 1
      })
    }

    // Decrease stock in product store + json-server
    const productStore = useProductStore()
    productStore.decreaseStock(product.id)

    console.log(`cartStore — Added ${product.name} to cart`)
  }

  // Action: remove from cart
  function removeFromCart(id) {
    const index = items.value.findIndex(item => item.id === id)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
    console.log(`cartStore — Removed item ID: ${id} from cart`)
  }

  // Action: clear entire cart
  function clearCart() {
    items.value = []
    console.log('cartStore — Cart cleared')
  }

  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    clearCart
  }
})