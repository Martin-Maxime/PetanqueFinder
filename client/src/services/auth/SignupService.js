import Api from '@/services/Api'

export default {
	addUser(params) {
		return Api().post('signup', params)
	},
	updateUserInfos(params) {
		return Api().put('user/account', params)
	},
	updateUserPassword(params) {
		return Api().put('user/account', params)
	}

}