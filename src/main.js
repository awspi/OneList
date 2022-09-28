import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'virtual:svg-icons-register' //注册svg-icons
import mLibs from './libs' //注册通用组件
import store from './store' //vuex
import router from './router' //router

createApp(App).use(mLibs).use(store).use(router).mount('#app')
