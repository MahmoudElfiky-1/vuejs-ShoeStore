import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useApi } from '../composables/useApi.js'

export const useProductStore = defineStore('products', () => {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

  const api = useApi('http://localhost:3000/products')

  // Action: fetch all products from json-server
  async function fetchProducts() {
    loading.value = true
    error.value = null
    const result = await api.getAll()
    if (result) {
      products.value = result
    }
    if (api.error.value) {
      error.value = api.error.value
    }
    loading.value = api.loading.value
  }

  // Getter: find product by ID
  function getProductById(id) {
    return computed(() => {
      return products.value.find(p => p.id === Number(id))
    })
  }

  // Action: decrease stock and PUT to json-server
  async function decreaseStock(productId) {
    const product = products.value.find(p => p.id === productId)
    if (product && product.stock > 0) {
      product.stock--
      // PUT full updated product to json-server
      const updatedProduct = { ...product }
      await api.update(productId, updatedProduct)
      console.log(`productStore — Stock decreased for ID: ${productId}. Stock now: ${product.stock}`)
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProductById,
    decreaseStock
  }
})