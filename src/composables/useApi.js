import { ref } from 'vue'

export function useApi(baseUrl) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  async function getAll() {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(baseUrl)
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`)
      data.value = await response.json()
      return data.value
    } catch (err) {
      error.value = err.message
      console.error('useApi getAll error:', err.message)
      return null
    } finally {
      loading.value = false
    }
  }

  async function getOne(id) {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${baseUrl}/${id}`)
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`)
      data.value = await response.json()
      return data.value
    } catch (err) {
      error.value = err.message
      console.error('useApi getOne error:', err.message)
      return null
    } finally {
      loading.value = false
    }
  }

  async function update(id, updatedObject) {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedObject)
      })
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`)
      data.value = await response.json()
      return data.value
    } catch (err) {
      error.value = err.message
      console.error('useApi update error:', err.message)
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    error,
    loading,
    getAll,
    getOne,
    update
  }
}