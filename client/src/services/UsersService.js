import Api from '@/services/Api'

export default {
	listUsers() {
		return Api().get('users', {headers: {'Authorization': localStorage.getItem('user-token')}})
	},
	deleteUser(userid) {
		return Api().delete('users/'+userid)
	}
}