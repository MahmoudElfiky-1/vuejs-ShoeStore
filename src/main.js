import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router.js'
// Creating the app
const app = createApp(App);
const pinia = createPinia();
// Registering the router (or any other plugins)
app.use(router);
app.use(pinia);
// Mounting the app
app.mount('#app')
