import request from '@/api/utils/request'

const baseUrl = '/customer-kiosk/customer-kiosk'
//MDF
const getMdfList = code => {
	// MDF
	return request.get(`${baseUrl}/office-contractlist?buildCode=${code}`)
}

export default {
	getMdfList,
}
