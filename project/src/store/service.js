import { defineStore } from 'pinia'
import service from '@/api/services/service.js'

export const useServiceStore = defineStore('service', {
	state: () => ({
		basemonth: [],
	}),
	getters: {
		getBasemonth: state => {
			return state.basemonth
		},
	},
	actions: {
		async actGetBasemonth(code) {
			try {
				const res = await service.getPredictBasemonth(code)
				console.log('res', res)
				this.basemonth = res || []
			} catch (error) {
				console.error('Failed to fetch statusList:', error)
			}
		},
	},
})
