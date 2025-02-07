import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'
import router from './router'

// 컴포넌트들
import Header from './components/layout/appbar/header.vue'
import SelectBox from './components/common/selects/selectbox.vue'
import SelectBasic from './components/common/selects/selectBasic.vue'
import Select01 from './components/common/selects/select01.vue'
import Select02 from './components/common/selects/select02.vue'
import Popup01 from './components/common/popups/popup01.vue'
import CardBox from './components/common/cards/cardbox.vue'
import Line01 from './components/common/charts/line01.vue'
import Line02 from './components/common/charts/line02.vue'
import Table01 from './components/common/tables/table01.vue'
import Table02 from './components/common/tables/table02.vue'
import Table03 from './components/common/tables/table03.vue'
import Chatbot from './components/common/chatbot/chatbot.vue'
import Upload01 from './components/common/uploads/upload01.vue'
import Content from './components/layout/appbody/content.vue'

const pinia = createPinia()

createApp(App)
	.use(pinia)
	.use(router)
	.component('Header', Header)
	.component('Select01', Select01)
	.component('Select02', Select02)
	.component('SelectBox', SelectBox)
	.component('SelectBasic', SelectBasic)
	.component('Popup01', Popup01)
	.component('CardBox', CardBox)
	.component('Line01', Line01)
	.component('Line02', Line02)
	.component('Table01', Table01)
	.component('Table02', Table02)
	.component('Table03', Table03) //데이터업데이트 메뉴 특이사항, 사업계획, SRM 테이블 형태
	.component('Chatbot', Chatbot)
	.component('Upload01', Upload01)
	.component('Content', Content)
	.mount('#app')
