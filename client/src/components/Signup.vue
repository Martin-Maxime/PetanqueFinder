<template>
  <div class="signup container">
    <div class="row">
      <div class="col-md-12">
        <h1>Inscription</h1>
      </div>
    </div>
    <div class="row">
      <form class="col-md-12" @submit.prevent="validateBeforeSubmit" v-if="!formSubmitted">
          <div class="column is-12">
              <label class="label">Email</label>
              <p class="control has-icon has-icon-right">
                  <input name="email" v-model="email" v-validate.initial="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" type="text" placeholder="Email">
                  <i v-show="errors.has('email')" class="fa fa-warning"></i>
                  <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
              </p>
          </div>
          <div class="column is-12">
              <label class="label">First Name</label>
              <p class="control has-icon has-icon-right">
                  <input name="first_name" v-model="first_name" v-validate.initial="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('first_name') }" type="text" placeholder="First Name">
                  <i v-show="errors.has('first_name')" class="fa fa-warning"></i>
                  <span v-show="errors.has('first_name')" class="help is-danger">{{ errors.first('first_name') }}</span>
              </p>
          </div>
          <div class="column is-12">
              <label class="label">Last Name</label>
              <p class="control has-icon has-icon-right">
                  <input name="last_name" v-model="last_name" v-validate.initial="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('last_name') }" type="text" placeholder="Last Name">
                  <i v-show="errors.has('last_name')" class="fa fa-warning"></i>
                  <span v-show="errors.has('last_name')" class="help is-danger">{{ errors.first('last_name') }}</span>
              </p>
          </div>
          <div class="column is-12">
              <label class="label">Full Name</label>
              <p class="control has-icon has-icon-right">
                  <input :value="name" name="name" v-validate:name.initial="'required|alpha_spaces'" :class="{'input': true, 'is-danger': errors.has('name') }" type="text" placeholder="Full Name">
                  <i v-show="errors.has('name')" class="fa fa-warning"></i>
                  <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
              </p>
          </div>
        <button class="btn btn-primary btn-block" type="submit">Submit</button>
      </form>
      <div v-else>
        <h1 class="submitted">Form submitted successfully!</h1>
      </div>
    </div>
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
  data: () => ({
    email: '',
    first_name: '',
    last_name: ''
  }),
  computed: {
    name() {
      return `${this.first_name} ${this.last_name}`;
    }
  }
};
</script>