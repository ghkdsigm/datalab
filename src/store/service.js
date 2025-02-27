import { defineStore } from 'pinia'
import service from '@/api/services/service.js'

export const useServiceStore = defineStore('service', {
	state: () => ({
		errorMessage: '',
		status: null,
		selectMonth: null,
		selectProd: null,
		basemonth: [],
		prodtype: [],
		preddata: [],
		featurelist: [],
		featurevalue: [],
		externallist: [],
		externaltrend: [],
		loading: {
			preddata: false,
			trend: false,
		},
	}),
	getters: {
		getErrorMessage: state => state.errorMessage,
		getstatus: state => state.status,
		getselectMonth: state => state.selectMonth,
		getselectProd: state => state.selectProd,
		getBasemonth: state => state.basemonth,
		getProdtype: state => state.prodtype,
		getPreddata: state => state.preddata,
		getFeaturelist: state => state.featurelist,
		getFeaturevalue: state => state.featurevalue,
		getExternallist: state => state.externallist,
		getExternaltrend: state => state.externaltrend,
		getLoadingpreddata: state => state.loading.preddata,
		getLoadingtrend: state => state.loading.trend,
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

		selectMonthValue(month) {
			this.selectMonth = month
		},

		selectProdValue(prod) {
			this.selectProd = prod
		},

		async actGetBasemonth(code) {
			this.loading.preddata = true
			try {
				const res = await service.getPredictBasemonth(code)
				console.log('response', res.data)
				if (res.status !== 200) {
					const type = 'basemonth'
					this.handleError(type, res)
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

		async actGetProdtype(params) {
			try {
				const res = await service.getPredictProdtype(params)
				if (res.status !== 200) {
					const type = 'prodtype'
					this.handleError(type, res)
				} else {
					this.prodtype = res.data.body || []
					this.errorMessage = ''
					this.status = res.status
				}
			} catch (error) {
				this.prodtype = []
				this.errorMessage = '서버와 연결할 수 없습니다.'
				this.status = 500
				console.error('Failed to fetch data:', error)
			}
		},

		async actGetPreddata(params) {
			try {
				const res = await service.getPredictPreddata(params)
				if (res.status !== 200) {
					this.handleError('preddata', res)
				} else {
					this.preddata = res.data || []
					this.errorMessage = ''
					this.status = res.status
				}
			} catch (error) {
				this.preddata = []
				this.errorMessage = '서버와 연결할 수 없습니다.'
				this.status = 500
				console.error('Failed to fetch data:', error)
			} finally {
				this.loading.preddata = false
			}
		},

		async actGetFeaturelist(params) {
			this.loading.trend = true
			try {
				const res = await service.getPredictFeatureList(params)
				if (res.status !== 200) {
					const type = 'featurelist'
					this.handleError(type, res)
				} else {
					this.featurelist = res.data.body || []
					this.errorMessage = ''
					this.status = res.status
				}
			} catch (error) {
				this.featurelist = []
				this.errorMessage = '서버와 연결할 수 없습니다.'
				this.status = 500
				console.error('Failed to fetch data:', error)
			} finally {
				this.loading.trend = false
			}
		},
		//주요영향인자 분석 추가
		async actGetFeaturevalue(params) {
			// try {
			// 	const res = await service.getPredictFeatureValue(params)
			// 	if (res.status !== 200) {
			// 		const type = 'featurevalue'
			// 		this.handleError(type, res)
			// 	} else {
			// 		this.featurevalue = res.data.body || []
			// 		this.errorMessage = ''
			// 		this.status = res.status
			// 	}
			// } catch (error) {
			// 	this.featurevalue = []
			// 	this.errorMessage = '서버와 연결할 수 없습니다.'
			// 	this.status = 500
			// 	console.error('Failed to fetch data:', error)
			// }
			try {
				const res = await service.getPredictFeatureValue(params)

				if (res.status !== 200) {
					const type = 'featurevalue'
					this.handleError(type, res)
				} else {
					const newValueData = res.data.body || null
					//console.log('newValueData', newValueData?.graph_data['index'])

					if (newValueData && newValueData?.graph_data['index'].length !== 0) {
						const isDuplicate = this.featurevalue.some(item => {
							return item[params.feature_name] === newValueData.graph_data[params.feature_name]
						})

						if (!isDuplicate) {
							this.featurevalue.push(newValueData)
						}
					}

					this.errorMessage = ''
					this.status = res.status
				}
			} catch (error) {
				this.featurevalue = []
				this.errorMessage = '서버와 연결할 수 없습니다.'
				this.status = 500
				console.error('Failed to fetch data:', error)
			}
		},
		//주요영향인자 분석 삭제
		async removeFeatureValue(keyToRemove) {
			//console.log('keyToRemove', keyToRemove)
			if (keyToRemove !== 'remove') {
				this.featurevalue = this.featurevalue.filter(item => {
					if (Object.keys(item).length === 0) return false

					return !Object.keys(item.graph_data).includes(keyToRemove)
				})
			} else {
				this.featurevalue = []
			}

			//this.items = this.items.filter(item => !item.hasOwnProperty(String(keyToRemove)))
		},

		async actGetExternallist() {
			try {
				const res = await service.getExternalList()
				if (res.status !== 200) {
					const type = 'externallist'
					this.handleError(type, res)
				} else {
					this.externallist = res.data.body || []
					this.errorMessage = ''
					this.status = res.status
				}
			} catch (error) {
				this.externallist = []
				this.errorMessage = '서버와 연결할 수 없습니다.'
				this.status = 500
				console.error('Failed to fetch data:', error)
			}
		},

		//외부 경기지표 추가
		async actGetExternaltrend(params) {
			try {
				const res = await service.getExternalTrend(params)

				if (res.status !== 200) {
					const type = 'externaltrend'
					this.handleError(type, res)
				} else {
					const newTrendData = res.data.body || null

					if (newTrendData && (newTrendData['index'].length !== 0 || newTrendData[params.external_name].length !== 0)) {
						const isDuplicate = this.externaltrend.some(item => {
							return item[params.external_name] === newTrendData[params.external_name]
						})

						if (!isDuplicate) {
							this.externaltrend.push(newTrendData)
						}
					}

					this.errorMessage = ''
					this.status = res.status
				}
			} catch (error) {
				this.externaltrend = []
				this.errorMessage = '서버와 연결할 수 없습니다.'
				this.status = 500
				console.error('Failed to fetch data:', error)
			}
		},

		//외부 경기지표 삭제
		async removeExternalTrend(keyToRemove) {
			//console.log('keyToRemove', keyToRemove)
			if (keyToRemove !== 'remove') {
				this.externaltrend = this.externaltrend.filter(item => {
					if (Object.keys(item).length === 0) return false

					return !Object.keys(item).includes(keyToRemove)
				})
			} else {
				this.externaltrend = []
			}

			//this.items = this.items.filter(item => !item.hasOwnProperty(String(keyToRemove)))
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
