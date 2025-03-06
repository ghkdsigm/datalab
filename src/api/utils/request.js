import axios from 'axios'
import config from '@/api/config'

const request = axios.create({
	baseURL: config.API_BASE_URL,
	timeout: Number(config.TIMEOUT),
	// headers: {
	// 	Accept: 'application/json',
	// 	'Cache-Control': 'no-cache',
	// 	'Access-Control-Allow-Origin': '*',
	// 	'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
	// 	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
	// 	//'Access-Control-Allow-Credentials': true,
	// },
	withCredentials: false,
})

// 공통 응답 처리
// request.interceptors.response.use(
// 	response => response,
// 	error => {
// 		console.error('API 호출 중 오류 발생:', error)
// 		return Promise.reject(error)
// 	},
// )

// 공통 요청 함수
const sendRequest = async (url, data = {}, method = 'POST', type = 'json') => {
	console.log('sendRequest 호출됨:', { url, data, method, type })

	// 기본 헤더 설정
	const headers = {
		Accept: 'application/json',
	}

	if (type === 'json') {
		headers['Content-Type'] = 'application/json; charset=UTF-8'
	} else if (type === 'form' && !(data instanceof FormData)) {
		headers['Content-Type'] = 'application/x-www-form-urlencoded'
	} else if (type === 'form') {
		headers['Content-Type'] = 'multipart/form-data'
	}

	// 데이터 변환
	if (type === 'form' && !(data instanceof FormData)) {
		const formData = new URLSearchParams()
		console.log('데이터 확인 (form 타입):', data)
		Object.keys(data).forEach(key => formData.append(key, data[key]))
		data = formData
		console.log('변환된 form 데이터:', data)
	}

	// HTTP 메소드에 따른 요청 처리
	const config = { headers }
	console.log('최종 요청 데이터:', { url, data, method, headers })

	switch (method) {
		case 'GET':
			return await request.get(url, { params: data, ...config })
		case 'POST':
			return await request.post(url, data, config)
		case 'PUT':
			return await request.put(url, data, config)
		case 'DELETE':
			return await request.delete(url, { data, ...config })
		default:
			return Promise.reject(new Error(`Unsupported HTTP method: ${method}`))
	}
}

export default {
	sendRequest,
}
