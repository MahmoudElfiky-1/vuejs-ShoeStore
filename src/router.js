import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import ProductView from './views/ProductView.vue'
import CartView from './views/CartView.vue'
import AboutView from './views/AboutView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/product/:id', name: 'Product', component: ProductView },
  { path: '/cart', name: 'Cart', component: CartView },
  { path: '/about', name: 'About', component: AboutView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router