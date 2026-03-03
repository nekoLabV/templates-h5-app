import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@/mock'
import { API_CONFIG } from '@/config/request'

console.log('API_CONFIG', API_CONFIG)

createApp(App).mount('#app')
