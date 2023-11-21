import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import apiPlugin from './features/APIService/apiPlugin'
import './assets/CSS/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(apiPlugin)

app.mount('#app')
