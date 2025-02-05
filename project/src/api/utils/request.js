import axios from 'axios'
import config from '@/api/config'
import router from '@/router'

const request = axios.create({
	baseURL: config.API_BASE_URL,
	timeout: Number(config.TIMEOUT),
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json; charset=UTF-8',

		// cache setting
		'Cache-Control': 'no-cache',
		// 'Access-Control-Max-Age': 3600,

		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': '*',
		'Access-Control-Allow-Credentials': true,
		// Authorization: `Bearer ${this.accessToken}`,
	},
})

// 공통 에러 처리 및 타임아웃 처리
request.interceptors.response.use(
	response => {
		return response
	},
	error => {
		// if (error.code === 'ECONNABORTED') {
		//     // 타임아웃 에러 처리 기본5초
		//     console.log('요청 시간이 초과되었습니다. 다시 시도해주세요.');
		//     const currentUrl = window.location.href;
		//     if (currentUrl.includes('customerkiosk')) {
		//         router.push('/customerkiosk');
		//       } else if (currentUrl.includes('inoutkiosk')) {
		//         router.push('/inoutkiosk');
		//       } else if (currentUrl.includes('performancestatus')) {
		//         router.push('/performancestatus');
		//       } else {
		//         router.push('/');
		//     }
		// } else {
		//     // 기타 에러 처리
		//     console.log('오류가 발생했습니다. 다시 시도해주세요.');
		// }
		// return Promise.reject(error);
	},
)

// // 요청 인터셉터
// request.interceptors.request.use(
//     (config) => {
//         // 토큰 추가 등의 작업 수행
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // 응답 인터셉터
// request.interceptors.response.use(
//     (response) => {
//         return response.data;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export default request
