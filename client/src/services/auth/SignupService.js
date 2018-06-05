import Api from '@/services/Api'

export default {
  addUser(params) {
    return Api().post('signup', params)
  }
}

function updateUserInfos() {
	return Api().put('account', params)
}