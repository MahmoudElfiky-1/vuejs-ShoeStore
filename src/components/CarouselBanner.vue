<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentSlide = ref(0)
const slides = [
  { title: 'New Arrivals', subtitle: 'Check out the latest sneakers collection', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { title: 'Summer Sale', subtitle: 'Up to 50% off on selected items', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { title: 'Free Shipping', subtitle: 'On all orders above \$100', gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 50%, #f5576c 100%)' }
]

function nextSlide() { currentSlide.value = (currentSlide.value + 1) % slides.length }
function prevSlide() { currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length }

onMounted(() => { console.log('CarouselBanner mounted') })
onUnmounted(() => { console.log('CarouselBanner unmounted') })
</script>

<template>
  <div style="position: relative; width: 100%; border-radius: 16px; overflow: hidden; margin-bottom: 2rem;">
    <div
      :style="{
        width: '100%',
        height: '250px',
        background: slides[currentSlide].gradient,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.5s ease'
      }"
    >
      <h2 style="font-size: 2.5rem; font-weight: bold; color: white; margin: 0;">
        {{ slides[currentSlide].title }}
      </h2>
      <p style="font-size: 1.1rem; color: rgba(255,255,255,0.8); margin-top: 0.5rem;">
        {{ slides[currentSlide].subtitle }}
      </p>
    </div>

    <button @click="prevSlide" style="position: absolute; left: 15px; top: 50%; transform: translateY(-50%); width: 40px; height: 40px; border-radius: 50%; border: none; background: rgba(0,0,0,0.5); color: white; font-size: 1.2rem; cursor: pointer; display: flex; align-items: center; justify-content: center;">❮</button>
    <button @click="nextSlide" style="position: absolute; right: 15px; top: 50%; transform: translateY(-50%); width: 40px; height: 40px; border-radius: 50%; border: none; background: rgba(0,0,0,0.5); color: white; font-size: 1.2rem; cursor: pointer; display: flex; align-items: center; justify-content: center;">❯</button>

    <div style="position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px;">
      <span
        v-for="(slide, index) in slides"
        :key="index"
        @click="currentSlide = index"
        :style="{
          width: '10px', height: '10px', borderRadius: '50%', cursor: 'pointer',
          backgroundColor: currentSlide === index ? 'white' : 'rgba(255,255,255,0.4)',
          transition: 'background-color 0.3s'
        }"
      ></span>
    </div>
  </div>
</template>