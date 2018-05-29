<template>
	<div class="login">
		<a><span v-on:click="displayLogin" class="icon-LOGIN"></span></a>
		<div ref="connect" class="connect-wrapper">
			
		</div>
 	</div>
</template>
 
<script>
export default {
	name: 'LoginComponent',
  	methods: {
	    displayLogin: function (event) {
		    var element = this.$refs.connect;
		    element.classList.toggle("active");
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
			bottom: -175px;
			width: 200px;
			height: 200px;
			border-radius: 5px;
			background-color: #FFF;
			border: 1px solid #000;
			&.active {
				display: block;
			}
		}
	}
</style>