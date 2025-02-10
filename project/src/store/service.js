import { defineStore } from 'pinia'
import service from '@/api/services/service.js'

export const useServiceStore = defineStore('service', {
	state: () => ({
		errorMessage: '',
		status: null,
		basemonth: [],
	}),
	getters: {
		getErrorMessage: state => state.errorMessage,
		getstatus: state => state.status,
		getBasemonth: state => state.basemonth,
	},
	actions: {
		// 공통 에러 처리 메서드
		handleError(res) {
			if (res.status === 200) {
				this.basemonth = res.data.body || []
				this.errorMessage = ''
				this.status = res.status
			} else {
				if (res.status >= 300 && res.status < 400) {
					this.basemonth = []
					this.errorMessage =
						'요청한 페이지로 이동할 수 없습니다. 잠시 후 다시 시도하거나 다른 방법을 사용해 주세요. 잠시 후 다시 시도해 주세요.' // 3xx 에러 메시지
					this.status = res.status
				} else if (res.status >= 400 && res.status < 500) {
					this.basemonth = []
					this.errorMessage = '잘못된 요청입니다. 요청을 확인하고 다시 시도해 주세요.' // 4xx 에러 메시지
					this.status = res.status
				} else if (res.status >= 500) {
					this.basemonth = []
					this.errorMessage = '서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.' // 5xx 에러 메시지
					this.status = res.status
				}
			}
		},

		async actGetBasemonth(code) {
			try {
				const res = await service.getPredictBasemonth(code)
				console.log('ㅅㅂ', res)
				if (res.status !== 200) {
					this.handleError(res)
				} else {
					this.basemonth = res.data.body || []
					this.errorMessage = ''
					this.status = res.status
				}
			} catch (error) {
				this.basemonth = []
				this.errorMessage = '서버와 연결할 수 없습니다.'
				this.status = 500
				console.error('Failed to fetch data:', error)
			}
		},

		// async actAnotherAction(code) {
		// 	try {
		// 		const res = await service.getAnotherData(code)
		// 		// status가 200이 아닐 때만 handleError 호출
		// 		if (res.status !== 200) {
		// 			this.handleError(res)
		// 		} else {
		// 			this.basemonth = res.data || []
		// 			this.errorMessage = '' // 에러 메시지 초기화
		// 			this.status = res.status
		// 		}
		// 	} catch (error) {
		// 		this.basemonth = []
		// 		this.errorMessage = '서버와 연결할 수 없습니다.' // 네트워크 에러 처리
		// 		this.status = 500
		// 		console.error('Failed to fetch data:', error)
		// 	}
		// },
	},
})
