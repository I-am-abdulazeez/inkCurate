import './assets/main.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { createNotivue } from 'notivue'

import 'notivue/notification.css' // Only needed if using built-in notifications
import 'notivue/animations.css' // Only needed if using built-in animations

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia);
app.use(createNotivue({
  position: 'bottom-center',
  notifications: {
    error: { duration: 2500 },
    success: { duration: 2500 }
  }
}))

app.mount('#app')
