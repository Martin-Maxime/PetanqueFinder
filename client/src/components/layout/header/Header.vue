<template>
  <header>
  	<div class="row">
  		<div class="col-md-2"></div>
  		<div class="logo col-md-8">
  			<h1>Pétanque finder</h1>
  		</div>
  		<div class="col-md-2">
  			<login-component></login-component>
  		</div>
  	</div>
  </header>
</template>

<script>

import LoginComponent from '@/components/auth/login/Login.vue';
export default {
	name: 'HeaderComponent',
	components: {
		'login-component': LoginComponent
	}
}
</script>

<style lang="scss">
	header {
		height: 90px;
		background-color: #42b983;
		div.logo {
			h1 {
				line-height: 90px;
				color: #FFF;
				text-transform: uppercase;
				margin: 0;
			}
		}
	}
</style>