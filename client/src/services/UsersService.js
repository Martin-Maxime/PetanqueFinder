import Api from '@/services/Api'

export default {
	listUsers() {
		return Api().get('users')
	},
	deleteUser(userid) {
		return Api().delete('users/'+userid)
	}
}