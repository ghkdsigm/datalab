import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/router/NotFound.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		//Empty Page
		{
			path: '/',
			name: 'emptyHome',
			component: () => import('@/pages/Index.vue'),
			title: 'emptyHome',
			icon: 'far fa-bell fa-fw text-2xl',
			meta: { isMenu: true, requireAuth: false },
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
