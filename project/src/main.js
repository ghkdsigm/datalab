import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'
import router from './router'

// 컴포넌트들
import SelectBox from './components/common/selects/selectbox.vue'
import Select01 from './components/common/selects/select01.vue'
import Popup01 from './components/common/popups/popup01.vue'
import CardBox from './components/common/cards/cardbox.vue'
import Line01 from './components/common/charts/line01.vue'
import Line02 from './components/common/charts/line02.vue'
import Table01 from './components/common/tables/table01.vue'
import Content from './components/mdf/board/content.vue'

const pinia = createPinia()

createApp(App)
	.use(pinia)
	.use(router)
	.component('Select01', Select01)
	.component('SelectBox', SelectBox)
	.component('Popup01', Popup01)
	.component('CardBox', CardBox)
	.component('Line01', Line01)
	.component('Line02', Line02)
	.component('Table01', Table01)
	.component('Content', Content)
	.mount('#app')
