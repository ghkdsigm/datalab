import { defineStore } from 'pinia'
import service from '@/api/services/service.js'

export const useUpdateStore = defineStore('update', {
	state: () => ({
		errorMessage: '',
		status: null,
		competitionMdf: [],
		competitionPb: [],
		updateHistory: null,
		updateDownloadFile: null,
		updateGetdata: null,
		updateUpload: null,
	}),
	getters: {
		getErrorMessage: state => state.errorMessage,
		getstatus: state => state.status,
		getCompetitionMdf: state => state.competitionMdf,
		getCompetitionPb: state => state.competitionPb,
		getUpdateHistory: state => state.updateHistory,
		getUpdateDownloadFile: state => state.updateDownloadFile,
		getUpdateGetdata: state => state.updateGetdata,
		getUpdateUpload: state => state.updateUpload,
	},
	actions: {
		// 공통 에러 처리 메서드
		handleError(type, res) {
			if (res.status === 200) {
				if (this[type] !== 'preddata') {
					this[type] = res.data.body || []
				} else {
					this[type] = res.data || []
				}
				this.errorMessage = ''
				this.status = res.status
			} else {
				if (res.status >= 300 && res.status < 400) {
					this[type] = []
					this.errorMessage =
						'요청한 페이지로 이동할 수 없습니다. 잠시 후 다시 시도하거나 다른 방법을 사용해 주세요. 잠시 후 다시 시도해 주세요.' // 3xx 에러 메시지
					this.status = res.status
				} else if (res.status >= 400 && res.status < 500) {
					this[type] = []
					this.errorMessage = '잘못된 요청입니다. 요청을 확인하고 다시 시도해 주세요.' // 4xx 에러 메시지
					this.status = res.status
				} else if (res.status >= 500) {
					this[type] = []
					this.errorMessage = '서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.' // 5xx 에러 메시지
					this.status = res.status
				}
			}
		},

		async actGetUpdateCompetitorMdf(formData) {
			try {
				const res = await service.getUpdateCompetitorMdf(formData)
				console.log('response', res.data)
				if (res.status !== 200) {
					const type = 'update'
					this.handleError(type, res)
				} else {
					this.competitionMdf = res.data.body || []
					this.errorMessage = ''
					this.status = res.status
				}
				return res
			} catch (error) {
				this.competitionMdf = []
				this.errorMessage = '서버와 연결할 수 없습니다.'
				this.status = 500
				console.error('Failed to fetch data:', error)
				return { status: 500, error }
			}
		},

		async actGetUpdateCompetitorPb(formData) {
			try {
				const res = await service.getUpdateCompetitorPb(formData)
				if (res.status !== 200) {
					const type = 'update'
					this.handleError(type, res)
				} else {
					this.competitionPb = res.data.body || []
					this.errorMessage = ''
					this.status = res.status
				}
				return res
			} catch (error) {
				this.competitionPb = []
				this.errorMessage = '서버와 연결할 수 없습니다.'
				this.status = 500
				console.error('Failed to fetch data:', error)
				return { status: 500, error }
			}
		},

		async actGetUpdateHistory() {
			console.log('vv', service)
			try {
				const res = await service.getUpdateHistorys()

				if (res.status !== 200) {
					const type = 'updatehitory'
					this.handleError(type, res)
				} else {
					this.updateHistory = res.data.body || []
					this.errorMessage = ''
					this.status = res.status
				}
			} catch (error) {
				this.updateHistory = []
				this.errorMessage = '서버와 연결할 수 없습니다.'
				this.status = 500
				console.error('Failed to fetch data:', error)
			}
		},

		async actGetUpdateDownload(params) {
			try {
				const res = await service.getUpdateDownload(params)

				if (res.status !== 200) {
					const type = 'updatedownloadfile'
					this.handleError(type, res)
				} else {
					this.updateDownloadFile = res || []
					this.errorMessage = ''
					this.status = res.status
				}
				return res
			} catch (error) {
				this.updateDownloadFile = []
				this.errorMessage = '서버와 연결할 수 없습니다.'
				this.status = 500
				console.error('Failed to fetch data:', error)
				return { status: 500, error }
			}
		},

		async actGetUpdateGetdata(params) {
			try {
				const res = await service.getUpdateGetdata(params)

				if (res.status !== 200) {
					const type = 'updatedownloadfile'
					this.handleError(type, res)
				} else {
					this.updateGetdata = res.data.body.data || []
					this.errorMessage = ''
					this.status = res.status
				}
				return res
			} catch (error) {
				this.updateGetdata = []
				this.errorMessage = '서버와 연결할 수 없습니다.'
				this.status = 500
				console.error('Failed to fetch data:', error)
				return { status: 500, error }
			}
		},

		async actGetUpdateUpload(params) {
			try {
				const res = await service.getUpdateUpload(params)

				if (res.status !== 200) {
					const type = 'updatedownloadfile'
					this.handleError(type, res)
				} else {
					this.updateUpload = res || []
					this.errorMessage = ''
					this.status = res.status
				}
				return res
			} catch (error) {
				this.updateUpload = []
				this.errorMessage = '서버와 연결할 수 없습니다.'
				this.status = 500
				console.error('Failed to fetch data:', error)
				return { status: 500, error }
			}
		},
	},
})
