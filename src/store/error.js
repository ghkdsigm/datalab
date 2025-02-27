import { defineStore } from 'pinia'

export const useErrorStore = defineStore('error', {
	state: () => ({
		errorMessage: '',
		errorCode: null,
	}),
	actions: {
		setError(status, message) {
			this.errorMessage = message || '알 수 없는 오류가 발생했습니다.'
			this.errorCode = status
		},
		clearError() {
			this.errorMessage = ''
			this.errorCode = null
		},
	},
})
