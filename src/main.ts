import { createApp } from 'vue'
import '@/assets/css/index.css'
import '@/assets/scss/index.scss'
import App from './App.vue'
import '@/mock'

import UI from '@/components/common'

const app = createApp(App)
app.use(UI)

app.mount('#app')
