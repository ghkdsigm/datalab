import axios from 'axios'
import config from '@/api/config'

const request = axios.create({
	baseURL: config.API_BASE_URL,
	timeout: Number(config.TIMEOUT),
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json; charset=UTF-8',
	},
	withCredentials: true,
})

// 공통 응답 처리
request.interceptors.response.use(
	response => response,
	error => {
		// 에러 처리 로직
		console.error('API 호출 중 오류 발생:', error)
		return Promise.reject(error)
	},
)

// 공통 요청 함수
const sendRequest = (url, data = {}, method = 'POST', type = 'json') => {
	// 기본 헤더 설정
	const headers = {
		Accept: 'application/json',
		'Content-Type': type === 'form' ? 'application/x-www-form-urlencoded' : 'application/json; charset=UTF-8',
	}

	// 데이터를 form 형식으로 처리하는 경우
	if (type === 'form') {
		const formData = new URLSearchParams()
		Object.keys(data).forEach(key => formData.append(key, data[key]))
		data = formData
	} else {
		data = JSON.stringify(data) // json일 경우 string화 처리
	}

	// HTTP 메소드에 따른 요청 처리
	const config = { headers }

	switch (method.toLowerCase()) {
		case 'get':
			return request.get(url, { params: data, ...config })
		case 'post':
			return request.post(url, data, config)
		case 'put':
			return request.put(url, data, config)
		case 'delete':
			return request.delete(url, { data, ...config })
		default:
			return Promise.reject(new Error(`Unsupported HTTP method: ${method}`))
	}
}

export default {
	sendRequest,
}
