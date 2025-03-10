import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/router/NotFound.vue'

// 로그인 상태 확인 함수 (여기선 `localStorage`에 사용자 정보를 저장한다고 가정)
const isLoggedIn = () => {
	return localStorage.getItem('user') !== null
}

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			redirect: '/mdf',
			meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: true },
		},
		{
			path: '/login',
			name: 'Login',
			component: () => import('@/pages/login.vue'),
			title: '로그인',
			icon: 'far fa-bell fa-fw text-2xl',
			meta: { isMenu: true, layout: 'LoginLayout', requireAuth: false },
		},
		{
			path: '/mdf',
			name: 'MDF',
			component: () => import('@/pages/mdf.vue'),
			title: 'MDF',
			icon: 'far fa-bell fa-fw text-2xl',
			meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: true },
		},
		{
			path: '/pb',
			name: 'PB',
			component: () => import('@/pages/pb.vue'),
			title: 'PB',
			icon: 'far fa-bell fa-fw text-2xl',
			meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: true },
		},
		{
			path: '/dw',
			name: 'DW',
			component: () => import('@/pages/dw.vue'),
			title: '건장재(시판)',
			icon: 'far fa-bell fa-fw text-2xl',
			meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: true },
		},
		{
			path: '/apt',
			name: 'APTCOMP',
			component: () => import('@/pages/apt.vue'),
			title: '준공실적',
			icon: 'far fa-bell fa-fw text-2xl',
			meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: false },
		},
		{
			path: '/trend',
			name: 'Trend',
			component: () => import('@/pages/trend.vue'),
			title: '경기지표트렌드',
			icon: 'far fa-bell fa-fw text-2xl',
			meta: { isMenu: true, layout: 'SecondLayout', requireAuth: false },
		},
		{
			path: '/update',
			name: 'Update',
			component: () => import('@/pages/update.vue'),
			title: '데이터업데이트',
			icon: 'far fa-bell fa-fw text-2xl',
			meta: { isMenu: true, layout: 'SecondLayout', requireAuth: false },
		},
		{
			path: '/simulation',
			name: 'Simulation',
			component: () => import('@/pages/simulation.vue'),
			title: '예측시뮬레이션',
			icon: 'far fa-bell fa-fw text-2xl',
			meta: { isMenu: true, layout: 'SecondLayout', requireAuth: false },
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'notFound',
			component: NotFound,
			meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: false },
		},
	],
})

// 네비게이션 가드
router.beforeEach((to, from, next) => {
	if (to.meta.requireAuth && !isLoggedIn()) {
		next('/login')
	} else {
		if (isLoggedIn() && to.path === '/login') {
			alert('이미 로그인 되어있습니다.')
			next('/')
		} else {
			next()
		}
	}
})

export default router
