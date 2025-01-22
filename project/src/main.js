import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import './style.css'; 
import router from './router';

// 컴포넌트들

const pinia = createPinia()

createApp(App)
	.use(pinia)
	.use(router)
	.mount('#app')