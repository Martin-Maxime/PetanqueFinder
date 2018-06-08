<template>
	<div class="login">
		<a><span v-on:click="displayLogin" class="icon-LOGIN"></span></a>
		<div v-if="!isLoggedIn() || !this.isLogged" v-on-clickaway="away" ref="connect" class="connect-wrapper">
			<div class="col-md-12 facebooklog">
				<button type="button" class="col-md-12 btn btn-primary btn-block" @click="openFbLoginDialog">Facebook Login</button>
			</div>
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
		<div v-if="isLoggedIn() || this.isLogged" v-on-clickaway="away" ref="connect" class="col-md-12 connect-wrapper">
			<div class="row">
				<div class="col-md-12">
					Bonjour {{this.userStorage.firstname}}
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<router-link class="myAccount-link" to="/user/Account">Mon compte</router-link>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<a href="" @click="logout()">Déconnexion</a>
				</div>
			</div>
		</div>
 	</div>
</template>
 
<script>
import LoginService from '@/services/auth/LoginService';
import {isLoggedIn, logout} from '@/services/auth/LoginService';
import { mixin as clickaway } from 'vue-clickaway';
export default {
	name: 'LoginComponent',
	data: () => ({
		errorEmail: false,
		errorPassword: false,
		isLogged: false,
	    email: '',
	    password: '',
	    userStorage: [],
	}),
	mixins: [ clickaway ],
  	methods: {
	    displayLogin: function (event) {
		    var element = this.$refs.connect;
		    element.classList.toggle("active");
	    },
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
		openFbLoginDialog () {
			FB.login(function(response) {
				console.log(response);
			}, { scope: 'email' })
		},
        away: function() {
        	var clickElement = event.target;
        	if(clickElement.className != 'icon-LOGIN') {
				var element = this.$refs.connect;
				element.classList.remove('active');
        	}
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
		div.connect-wrapper {
			display: none;
			z-index: 10;
			position: absolute;
			top: 70px;
			right: 50px;
			width: 250px;
			height: auto;
			padding: 15px 15px;
			border-radius: 5px;
			background-color: #FFF;
			border: 1px solid #000;
			text-align: left;
			&.active {
				display: block;
			}
			div.facebooklog {
				margin-bottom: 15px;
			}
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