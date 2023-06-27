import './assets/main.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import socketIO from 'socket.io-client';
const socket = socketIO.connect('https://authar.site');

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia();
pinia.use(({ store }) => {
    store.router = markRaw(router);
})

app.use(pinia)
app.use(router)

app.mount('#app')
