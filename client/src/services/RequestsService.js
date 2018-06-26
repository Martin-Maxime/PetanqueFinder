import Api from '@/services/Api'

export default {
	listRequests() {
		return Api().get('request');
	},
	postRequest(params) {
		return Api().post('request', params);
	},
}