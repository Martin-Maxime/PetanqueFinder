<template>
  <div class="signup">
    <h1>Inscription</h1>
    <div class="form-group" :class="{'has-error': errors.has('email') }" >
    <label class="control-label" for="email">Email</label>
    <input v-model="email" v-validate="email" data-rules="required|email" class="form-control" type="email" placeholder="Email">
    <p class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</p>
</div>
  </div>
</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

export default {
  name: 'Signup',
  data () {
    return {
      msg:'Inscription'
    }
  }
}
</script>