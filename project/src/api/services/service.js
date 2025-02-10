import request from '@/api/utils/request'

// 보드 종류에 따른 기준월 리스트
const getPredictBasemonth = board_category => {
	return request.sendRequest('/predict/basemonth', { board_category }, 'POST', 'json')
}

// 보드 종류, 기준월에 따른 제품 종류 리스트
const getPredictProdtype = board_category => {
	return request.sendRequest('/predict/prodtype', { board_category }, 'POST', 'json')
}

// 예측 데이터 (카드 섹션, 테이블, 요약)
const getPredictPreddata = board_category => {
	return request.sendRequest('/predict/preddata', { board_category }, 'POST', 'json')
}

// 보드 영향인자 리스트
const getPredictFeatureList = board_category => {
	return request.sendRequest('/predict/feature_list', { board_category }, 'POST', 'json')
}

// 개별 영향인자 정보
const getPredictFeatureValue = board_category => {
	return request.sendRequest('/predict/feature_value', { board_category }, 'POST', 'form')
}

// 외부 경기지표 리스트
const getExternalList = () => {
	return request.sendRequest('/external/list', {}, 'GET', 'json')
}

// 개별 지표 값
const getExternalValue = board_category => {
	return request.sendRequest('/external/value', { board_category }, 'POST', 'json')
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
	getExternalValue,
}
