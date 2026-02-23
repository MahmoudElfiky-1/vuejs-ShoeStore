<script setup>
import { onMounted, onUnmounted } from 'vue'
import NavBar from './components/NavBar.vue'

onMounted(() => { console.log('App.vue mounted — root component') })
onUnmounted(() => { console.log('App.vue unmounted') })
</script>

<template>
  <div style="min-height: 100vh; display: flex; flex-direction: column; background-color: #0f1218; color: #e0e0e0; font-family: sans-serif;">
    <NavBar />

    <main style="flex: 1; width: 100%; max-width: 1100px; margin: 0 auto; padding: 2rem 1.5rem;">
      <router-view />
    </main>

    <footer style="text-align: center; padding: 2rem; background-color: #111520; color: #888; border-top: 1px solid #1e2330;">
      <p style="font-weight: bold; font-size: 1.1rem; color: white; margin-bottom: 0.3rem;">ShoeStore</p>
      <p>© 2026 — All rights reserved</p>
    </footer>
  </div>
</template>