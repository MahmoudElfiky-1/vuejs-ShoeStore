<script setup>
import { onMounted, onUnmounted } from 'vue'

onMounted(() => { console.log('AboutView mounted') })
onUnmounted(() => { console.log('AboutView unmounted') })
</script>

<template>
  <div style="max-width: 700px; margin: 0 auto;">
    <div style="background-color: #161b26; border-radius: 16px; border: 1px solid #1e2736; padding: 2.5rem;">
      <h1 style="font-size: 2rem; font-weight: bold; color: #6366f1; text-align: center; margin: 0 0 1.5rem 0;">About ShoeStore</h1>
      <div style="height: 1px; background-color: #1e2736; margin: 1.5rem 0;"></div>
      <p style="color: #8892a4; font-size: 1rem; line-height: 1.7;">
        Welcome to ShoeStore — your one-stop destination for premium footwear.
        We offer a curated selection of sneakers, boots, and casual shoes
        designed for comfort, style, and durability.
      </p>
      <div style="height: 1px; background-color: #1e2736; margin: 1.5rem 0;"></div>
      <h2 style="font-size: 1.5rem; font-weight: bold; color: white; margin: 0 0 1rem 0;">Project Info</h2>
      <p style="color: #8892a4; margin: 0.4rem 0;"><strong style="color: #ccc;">Student:</strong>Mahmoud Ismail</p>
      <p style="color: #8892a4; margin: 0.4rem 0;"><strong style="color: #ccc;">Course:</strong> Vue.js Development</p>
      <p style="color: #8892a4; margin: 0.4rem 0;"><strong style="color: #ccc;">Institute:</strong> ITI</p>
      <p style="color: #8892a4; margin: 0.4rem 0;"><strong style="color: #ccc;">Lab:</strong> Lab 3 — Pinia, Composables, API</p>
    </div>
  </div>
</template>