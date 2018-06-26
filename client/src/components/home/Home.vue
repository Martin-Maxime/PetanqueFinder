<template>
  <request-component></request-component>
</template>

<script>

import RequestComponent from '@/components/request/Request.vue';
export default {
  name: 'HomeComponent',
  components: {
    'request-component': RequestComponent
  },
  data () {
  }
}
</script>