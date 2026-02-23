import { ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue) {
  // Read from localStorage on init
  let stored = defaultValue
  try {
    const raw = localStorage.getItem(key)
    if (raw !== null) {
      stored = JSON.parse(raw)
    }
  } catch (err) {
    console.error('useLocalStorage read error:', err)
  }

  const data = ref(stored)

  // Watch with deep:true — auto save to localStorage on any change
  watch(
    data,
    (newValue) => {
      try {
        localStorage.setItem(key, JSON.stringify(newValue))
      } catch (err) {
        console.error('useLocalStorage write error:', err)
      }
    },
    { deep: true }
  )

  return data
}