<template>
  <div class="signup">
    <h1>Inscription</h1>
    <form @submit.prevent="validateBeforeSubmit" v-if="!formSubmitted">
      <div class="form-group" :class="{'has-error': errors.has('email') }" >
        <label class="control-label" for="email">Email</label>
        <input v-model="email" v-validate="email" data-rules="required|email" class="form-control" type="email" placeholder="Email">
        <p class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</p>
      </div>
      <div class="form-group" :class="{'has-error': errors.has('confirm-email') }" >
        <label class="control-label" for="email">Confirmer l'email</label>
        <input v-model="confirm-email" v-validate="confirm-email" data-rules="required|confirm-email" class="form-control" type="email" placeholder="Confirmer email">
        <p class="text-danger" v-if="errors.has('confirm-mail')">{{ errors.first('confirm-email') }}</p>
      </div>
      <div class="form-group" :class="{'has-error': errors.has('name') }">
          <label class="control-label" for="name">Name</label>
          <input v-model="name" v-validate.initial="name" data-rules="required|alpha|min:3" class="form-control" type="text" placeholder="Full Name">
          <p class="text-danger" v-if="errors.has('name')">{{ errors.first('name') }}</p>
      </div>
    </div>
    <button class="btn btn-primary btn-block" type="submit">Submit</button>
  </form>
  <div v-else>
    <h1 class="submitted">Form submitted successfully!</h1>
  </div>
</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate';
import { Validator } from 'vee-validate';

Vue.use(VeeValidate);

VeeValidate.Validator.extend('passphrase', {
    getMessage: field => 'Sorry dude, wrong pass phrase.',
    validate: value => value.toUpperCase() == 'Demogorgon'.toUpperCase()
});

export default {
  name: 'Signup',
  data () {
    return {
      msg:'Inscription'
    }
  }
}
</script>