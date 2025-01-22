import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/router/NotFound.vue'


// 라우트 설정
const routes = [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/index.vue'),
    }
  ];
  
  // 라우터 생성
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;
