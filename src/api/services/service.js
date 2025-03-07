import request from '@/api/utils/request'

// 보드 종류에 따른 기준월 리스트
const getPredictBasemonth = board_category => {
	return request.sendRequest('/predict/basemonth', { board_category }, 'POST', 'json')
}

// 보드 종류, 기준월에 따른 제품 종류 리스트
const getPredictProdtype = params => {
	return request.sendRequest('/predict/prodtype', params, 'POST', 'json')
}

// 예측 데이터 (카드 섹션, 테이블, 요약)
const getPredictPreddata = params => {
	return request.sendRequest('/predict/preddata', params, 'POST', 'json')
}

// 보드 영향인자 리스트
const getPredictFeatureList = params => {
	return request.sendRequest('/predict/feature_list', params, 'POST', 'json')
}

// 개별 영향인자 정보
const getPredictFeatureValue = params => {
	return request.sendRequest('/predict/feature_value', params, 'POST', 'json')
}

// 외부 경기지표 리스트
const getExternalList = () => {
	return request.sendRequest('/external/list', {}, 'GET', 'json')
}

// 개별 지표 값
const getExternalTrend = params => {
	return request.sendRequest('/external/value', params, 'POST', 'json')
}

// MDF 동종사지표
const getUpdateCompetitorMdf = formData => {
	return request.sendRequest('/update/competitor_indicator_mdf', formData, 'POST', 'form')
}

// PB 동종사지표
const getUpdateCompetitorPb = formData => {
	return request.sendRequest('/update/competitor_indicator_pb', formData, 'POST', 'form')
}

// 동종사지표 다운로드
const getUpdateDownload = params => {
	return request.sendRequest('/update/download', params, 'POST', 'raw')
}

// 데이터 히스토리
const getUpdateHistorys = () => {
	return request.sendRequest('/update/competitor_indicator_history', null, 'GET', 'json')
}

// 업데이트데이터 받기
const getUpdateGetdata = params => {
	return request.sendRequest('/update/getdata', params, 'POST', 'raw')
}

// 업데이트데이터 업로드
const getUpdateUpload = params => {
	return request.sendRequest('/update/upload', params, 'POST', 'raw')
}

// 시뮬레이션 영향인자 리스트
const getSimulationFeatureList = params => {
	return request.sendRequest('/simulation/feature_list', params, 'POST', 'json')
}

// 시뮬레이션 결과
const getSimulationExecute = params => {
	return request.sendRequest('/simulation/execute', params, 'POST', 'json')
}

// post, form
// const getPredictFeatureValue = board_category => {
// 	return request.sendRequest('/predict/feature_value', { board_category }, 'post', 'form')
// }
// delete
// const deleteItem = itemId => {
// 	return request.sendRequest(`/items/${itemId}`, {}, 'delete', 'json')
// }

export default {
	getPredictBasemonth,
	getPredictProdtype,
	getPredictPreddata,
	getPredictFeatureList,
	getPredictFeatureValue,
	getExternalList,
	getExternalTrend,
	getUpdateCompetitorMdf,
	getUpdateCompetitorPb,
	getUpdateDownload,
	getUpdateHistorys,
	getUpdateGetdata,
	getUpdateUpload,
	getSimulationFeatureList,
	getSimulationExecute,
}
