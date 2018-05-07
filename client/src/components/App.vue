<template>
	<header-component></header-component>
</template>

<script>

import HeaderComponent from './layout/header/Header.vue';
export default {
  name: 'App',
  components: {
  	'header-component': HeaderComponent
  }
}
</script>