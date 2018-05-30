<template>
	<div class="login">
		<a><span v-on:click="displayLogin" class="icon-LOGIN"></span></a>
		<div ref="connect" class="connect-wrapper">
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
 	</div>
</template>
 
<script>
import LoginService from '@/services/auth/LoginService';
import { mixin as clickaway } from '@/directives/outside-click';
export default {
	name: 'LoginComponent',
	data: () => ({
		errorEmail: false,
		errorPassword: false,
	    email: '',
	    password: '',
	}),
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
				console.log(this.errorPassword)
				console.log('ok')		
			}).catch(error => {
		        this.errorPassword = error.response.data.errorPassword;
		        this.errorEmail = error.response.data.userNotFound;
			})
	    }
	}
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
			padding: 15px 0;
			border-radius: 5px;
			background-color: #FFF;
			border: 1px solid #000;
			text-align: left;
			&.active {
				display: block;
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