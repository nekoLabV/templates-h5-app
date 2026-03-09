import { createApp } from 'vue'
import '@/assets/css/index.css'
import '@/assets/scss/index.scss'
import App from './App.vue'
import '@/mock'

import UI from '@/components/common'
import loadingDirective from '@/directives/loading'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()
app.use(UI)
app.use(pinia)
app.directive('loading', loadingDirective)

app.mount('#app')
