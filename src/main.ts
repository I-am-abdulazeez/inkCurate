import './assets/main.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(Vue3Toastify, {
  autoClose: 3000,
  position: 'bottom-center',
  toastStyle: {
    fontFamily: "Parkinsans, Inter, sans-serif",
    borderRadius: "10px",
    fontWeight: 500,
    backgroundColor: "#1f2937",
    color: "#f3f4f6",
  },
} as ToastContainerOptions,)
app.use(router)

app.mount('#app')
