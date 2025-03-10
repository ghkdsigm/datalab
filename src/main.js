import { createApp, defineAsyncComponent } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'
import router from './router'

const pinia = createPinia()

import Header from './components/layout/appbar/header.vue'
// import Content from './components/layout/appbody/content.vue'
// import SelectBox from './components/common/selects/selectbox.vue'
// import SelectBasic from './components/common/selects/selectBasic.vue'
// import Select01 from './components/common/selects/select01.vue'
import Select02 from './components/common/selects/select02.vue'
// import Popup00 from './components/common/popups/popup00.vue'
// import Popup01 from './components/common/popups/popup01.vue'
// import Popup02 from './components/common/popups/popup02.vue'
// import CardBox from './components/common/cards/cardbox.vue'
// import Line01 from './components/common/charts/line01.vue'
// import Line02 from './components/common/charts/line02.vue'
// import Line03 from './components/common/charts/line03.vue'
// import Table01 from './components/common/tables/table01.vue'
// import Table02 from './components/common/tables/table02.vue'
// import Table03 from './components/common/tables/table03.vue'
// import Chatbot from './components/common/chatbot/chatbot.vue'
// import Upload01 from './components/common/uploads/upload01.vue'
// import LoadingSpinner from './components/common/spinner/spinner.vue'
// import LoadingStatus from './components/common/spinner/loadiStatus.vue'

// createApp(App)
// 	.use(pinia)
// 	.use(router)
// 	.component('Header', Header)
// 	.component('Select01', Select01)
// 	.component('Select02', Select02)
// 	.component('SelectBox', SelectBox)
// 	.component('SelectBasic', SelectBasic)
// 	.component('Popup00', Popup00)
// 	.component('Popup01', Popup01)
// 	.component('Popup02', Popup02)
// 	.component('CardBox', CardBox)
// 	.component('Line01', Line01)
// 	.component('Line02', Line02)
// 	.component('Line03', Line03)
// 	.component('Table01', Table01)
// 	.component('Table02', Table02)
// 	.component('Table03', Table03) //데이터업데이트 메뉴 특이사항, 사업계획, SRM 테이블 형태
// 	.component('Chatbot', Chatbot)
// 	.component('Upload01', Upload01)
// 	.component('Content', Content)
// 	.component('LoadingSpinner', LoadingSpinner)
// 	.component('LoadingStatus', LoadingStatus)
// 	.mount('#app')

createApp(App)
	.use(pinia)
	.use(router)
	// .component(
	// 	'Header',
	// 	defineAsyncComponent(() => import('./components/layout/appbar/header.vue')),
	// )
	.component('Header', Header)
	.component(
		'Select01',
		defineAsyncComponent(() => import('./components/common/selects/select01.vue')),
	)
	// .component(
	// 	'Select02',
	// 	defineAsyncComponent(() => import('./components/common/selects/select02.vue')),
	// )
	.component('Select02', Select02)
	.component(
		'SelectBox',
		defineAsyncComponent(() => import('./components/common/selects/selectbox.vue')),
	)
	.component(
		'SelectBasic',
		defineAsyncComponent(() => import('./components/common/selects/selectBasic.vue')),
	)
	.component(
		'Popup00',
		defineAsyncComponent(() => import('./components/common/popups/popup00.vue')),
	)
	.component(
		'Popup01',
		defineAsyncComponent(() => import('./components/common/popups/popup01.vue')),
	)
	.component(
		'Popup02',
		defineAsyncComponent(() => import('./components/common/popups/popup02.vue')),
	)
	.component(
		'CardBox',
		defineAsyncComponent(() => import('./components/common/cards/cardbox.vue')),
	)
	.component(
		'Line01',
		defineAsyncComponent(() => import('./components/common/charts/line01.vue')),
	)
	.component(
		'Line02',
		defineAsyncComponent(() => import('./components/common/charts/line02.vue')),
	)
	.component(
		'Line03',
		defineAsyncComponent(() => import('./components/common/charts/line03.vue')),
	)
	.component(
		'Table01',
		defineAsyncComponent(() => import('./components/common/tables/table01.vue')),
	)
	.component(
		'Table02',
		defineAsyncComponent(() => import('./components/common/tables/table02.vue')),
	)
	.component(
		'Table03',
		defineAsyncComponent(() => import('./components/common/tables/table03.vue')),
	)
	.component(
		'Chatbot',
		defineAsyncComponent(() => import('./components/common/chatbot/chatbot.vue')),
	)
	.component(
		'Upload01',
		defineAsyncComponent(() => import('./components/common/uploads/upload01.vue')),
	)
	.component(
		'Content',
		defineAsyncComponent(() => import('./components/layout/appbody/content.vue')),
	)
	.component(
		'LoadingSpinner',
		defineAsyncComponent(() => import('./components/common/spinner/spinner.vue')),
	)
	.component(
		'LoadingStatus',
		defineAsyncComponent(() => import('./components/common/spinner/loadiStatus.vue')),
	)
	.component(
		'FullScreenLoader',
		defineAsyncComponent(() => import('./components/common/spinner/fullscreen.vue')),
	)
	.mount('#app')
