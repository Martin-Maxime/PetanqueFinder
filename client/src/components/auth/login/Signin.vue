<template>
	<div class="login container">
		<div v-if="!isLoggedIn() || !this.isLogged" ref="connect" class="signin-wrapper">
			<facebooklogin-component></facebooklogin-component>
			<form class="col-md-12" @submit.prevent="checkLogin">
				<div class="row">
					<div class="col-md-12 form-group">
						<label class="label">Email</label>
						<p class="">
							<input name="email" v-model="email" :class="{'input form-control': true, 'is-danger': errors.has('email') }" type="text" placeholder="Email">
							<i v-show="errors.has('email')" class="fa fa-warning"></i>
							<span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
							<div v-if="this.errorEmail" class="wrong" role="alert">
								L'adresse email n'existe pas
							</div>
						</p>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12 form-group">
						<label class="label">Mot de passe</label>
						<p class="">
							<input name="password" v-model="password" :class="{'input form-control': true, 'is-danger': errors.has('password') }" type="password" placeholder="Mot de passe">
							<i v-show="errors.has('password')" class="fa fa-warning"></i>
							<span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
						</p>
						<div v-if="this.errorPassword" class="wrong" role="alert">
							Mauvais mot de passe
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<button class="btn btn-primary btn-block submit" v-on:click="checkLogin();" type="submit">Submit</button>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<router-link class="signup-link" to="/signup">Pas encore inscrit ?</router-link>
					</div>
				</div>
			</form>
		</div>
		<div v-if="isLoggedIn() || this.isLogged">
			<p>Vous êtes bien connecté.</p>
		</div>
 	</div>
</template>
 
<script>
import FacebookLogin from '@/components/auth/login/FacebookLogin.vue';
import LoginService from '@/services/auth/LoginService';
import {isLoggedIn, logout} from '@/services/auth/LoginService';
export default {
	name: 'Signin',
	components: {
		'facebooklogin-component': FacebookLogin
	},
	data: () => ({
		errorEmail: false,
		errorPassword: false,
		isLogged: false,
	    email: '',
	    password: '',
	    userStorage: [],
	}),
  	methods: {
        async checkLogin() {
			await LoginService.checkLogin({
				email: this.email,
				password: this.password,
			}).then(response => {
				let token = response.data.token;
				let user = response.data.user;
				let userInfos = {'userid': user._id, 'address': user.address, 'birthday': user.birthday, 'city': user.city, 'email': user.email, 'firstname': user.firstname, 'lastname': user.lastname, 'postcode': user.postcode};
				localStorage.setItem('user-token', token);
				localStorage.setItem('user-infos', JSON.stringify(userInfos));
				this.isLogged = true;
				setTimeout( () => this.$router.go({ path: '/', force: true }), 3000);
			}).catch(error => {
		        this.errorPassword = error.response.data.errorPassword;
		        this.errorEmail = error.response.data.userNotFound;
		        localStorage.removeItem('user-token');
		        localStorage.removeItem('user-infos');
		        this.isLogged = false;
			})
	    },
        isLoggedIn() {
	      return isLoggedIn();
	    },
	    logout() {
	    	return logout();
	    },
	},
    created: function() {
    	this.userStorage = JSON.parse(localStorage.getItem('user-infos') || '[]');
    },
}
</script>

<style lang="scss">
	div.login {
		position: relative;
		a {
			span {
				font-size: 42px;
				line-height: 90px;
				color: #FFF;
				cursor: pointer;
			}
		}
		div.signin-wrapper {
			width: 400px;
			margin: 0 auto;
			div.form-group {
				div.wrong {
					color: red;
				}
			}
			button.submit {
				margin-bottom: 5px;
			}
			a.signup-link {
				text-decoration: none;
			}
		}
	}
</style>