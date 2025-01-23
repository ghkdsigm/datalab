import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/router/NotFound.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/mdf',
			name: 'MDF',
			component: () => import('@/pages/mdf.vue'),
			title: 'MDF',
			icon: 'far fa-bell fa-fw text-2xl',
			meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: false },
		},
		{
			path: '/pb',
			name: 'PB',
			component: () => import('@/pages/pb.vue'),
			title: 'PB',
			icon: 'far fa-bell fa-fw text-2xl',
			meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: false },
		},
		{
			path: '/dw',
			name: 'DW',
			component: () => import('@/pages/dw.vue'),
			title: '건장재(시판)',
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
			path: '/login',
			name: 'Login',
			component: () => import('@/pages/login.vue'),
			title: '로그인',
			icon: 'far fa-bell fa-fw text-2xl',
			meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: false },
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'notFound',
			component: NotFound,
			meta: { isMenu: true },
		},
	],
})

router.beforeEach((to, from, next) => {
	next()
})

export default router
