import Api from '@/services/Api';

export default {
	checkFacebookLogin(params) {
		return Api().post('fblogin', params)
	}
}

