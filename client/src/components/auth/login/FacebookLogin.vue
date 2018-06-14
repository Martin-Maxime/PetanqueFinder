<template>
	<div class="col-md-12 facebooklog">
		<button type="button" class="col-md-12 btn btn-primary btn-block" @click="openFbLoginDialog">Facebook Login</button>
	</div>
</template>
 
<script>
import FacebookLoginService from '@/services/auth/FacebookLoginService';
export default {
	name: 'FacebookLogin',
	data: () => ({
		userID: '',
		email: '',
		facebookToken: '',
		firstname: '',
		lastname: '',
		picture: ''
	}),
  	methods: {
		openFbLoginDialog () {
			FB.login(this.checkLoginState, { scope: 'email' })
		},
	    checkLoginState: function (response) {
			if (response.status === 'connected') {
				this.checkFacebookLogin()
			} else if (response.status === 'not_authorized') {
				// the user is logged in to Facebook, 
				// but has not authenticated your app
			} else {
				// the user isn't logged in to Facebook.
			}
	    },
	    async checkFacebookLogin() {
			await	FB.api('/me', { fields: 'name,email,first_name,picture' }, function(profile) {
	  			this.userID = profile.id;
	  			this.email = profile.email;
	  			this.firstname = profile.first_name;
	  			this.lastname = profile.name;
	  			this.picture = profile.picture.data.url;
	    	 	FacebookLoginService.checkFacebookLogin({
					userID: this.userID,
					email: this.email,
					firstname: this.firstname,
					lastname: this.lastname,
					picture: this.picture
				}).then(response => {
					console.log(response);
					let token = response.data.token;
					let user = response.data.user;
					let userInfos = {'userid': user._id, 'facebookId': user.facebookId, 'email': user.email, 'firstname': user.firstname, 'lastname': user.lastname, 'picture': user.picture};
					localStorage.setItem('user-token', token);
					localStorage.setItem('user-infos', JSON.stringify(userInfos));
					this.isLogged = true;
					window.location.replace('/');
				}).catch(error => {
					console.log(error);
				})
			});
	    }
	},
}
</script>

<style lang="scss">
	div.facebooklog {
		margin: 30px 0 15px 0;
		button {
			background-color: #3b5998;
			border: none;
		}
	}
</style>