<template>
  <div class="signup container">
    <div class="row">
      <div class="col-md-12">
        <h1>Inscription</h1>
      </div>
    </div>
    <div class="row">
      <form class="col-md-12" @submit.prevent="addUser">
         <div class="row">
             <div class="col-md-12 form-group">
                 <label class="label">Email</label>
                 <p class="">
                     <input name="email" v-model="email" v-validate.initial="'required|email'" :class="{'input form-control': true, 'is-danger': errors.has('email') }" type="text" placeholder="Email">
                     <i v-show="errors.has('email')" class="fa fa-warning"></i>
                     <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                 </p>
             </div>
         </div>
         <div class="row">
             <div class="col-md-12 form-group">
                 <label class="label">Mot de passe</label>
                 <p class="">
                     <input name="password" v-model="password" v-validate.initial="'required|min:6'" :class="{'input form-control': true, 'is-danger': errors.has('password') }" type="password" placeholder="Mot de passe">
                     <i v-show="errors.has('password')" class="fa fa-warning"></i>
                     <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                 </p>
             </div>
         </div>
         <div class="row">
             <div class="col-md-12 form-group">
                 <label class="label">First Name</label>
                 <p class="">
                     <input name="first_name" v-model="first_name" v-validate.initial="'required|alpha'" :class="{'input form-control': true, 'is-danger': errors.has('first_name') }" type="text" placeholder="First Name">
                     <i v-show="errors.has('first_name')" class="fa fa-warning"></i>
                     <span v-show="errors.has('first_name')" class="help is-danger">{{ errors.first('first_name') }}</span>
                 </p>
             </div>
         </div>
         <div class="row">
            <div class="col-md-12 form-group">
               <label class="label">Last Name</label>
                  <p class="">
                     <input name="last_name" v-model="last_name" v-validate.initial="'required|alpha'" :class="{'input form-control': true, 'is-danger': errors.has('last_name') }" type="text" placeholder="Last Name">
                     <i v-show="errors.has('last_name')" class="fa fa-warning"></i>
                     <span v-show="errors.has('last_name')" class="help is-danger">{{ errors.first('last_name') }}</span>
                  </p>
            </div>
         </div>
         <div class="row">
            <div class="col-md-12 form-group">
               <label class="label">Date de naissance</label>
                  <p class="">
                     <input :value="birthday" name="birthday" v-validate.initial="'required'" :class="{'input form-control': true, 'is-danger': errors.has('birthday') }" type="date">
                     <i v-show="errors.has('birthday')" class="fa fa-warning"></i>
                     <span v-show="errors.has('birthday')" class="help is-danger">{{ errors.first('birthday') }}</span>
                  </p>
            </div>           
         </div>
         <div class="row">
            <div class="col-md-12 form-group">
               <label class="label">Adresse</label>
                  <p class="">
                     <input :value="address" name="address" v-validate.initial="'required|alpha_spaces'" :class="{'input form-control': true, 'is-danger': errors.has('address') }" type="text" placeholder="Adresse">
                     <i v-show="errors.has('address')" class="fa fa-warning"></i>
                     <span v-show="errors.has('address')" class="help is-danger">{{ errors.first('address') }}</span>
                  </p>
            </div>           
         </div>
         <div class="row">
            <div class="col-md-12 form-group">
               <label class="label">Code postal</label>
                  <p class="">
                     <input :value="postcode" name="postcode" v-validate.initial="'required|numeric'" :class="{'input form-control': true, 'is-danger': errors.has('postcode') }" type="text" placeholder="Code postal">
                     <i v-show="errors.has('postcode')" class="fa fa-warning"></i>
                     <span v-show="errors.has('postcode')" class="help is-danger">{{ errors.first('postcode') }}</span>
                  </p>
            </div>
         </div>
         <div class="row">
            <div class="col-md-12 form-group">
               <label class="label">Ville</label>
                  <p class="">
                     <input :value="city" name="ville" v-validate.initial="'required'" :class="{'input form-control': true, 'is-danger': errors.has('city') }" type="text" placeholder="Ville">
                     <i v-show="errors.has('city')" class="fa fa-warning"></i>
                     <span v-show="errors.has('city')" class="help is-danger">{{ errors.first('city') }}</span>
                  </p>
            </div>          
         </div>
         <div class="row">
            <button class="btn btn-primary btn-block" type="submit">Submit</button>
         </div>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VeeValidate from 'vee-validate';
import { Validator } from 'vee-validate';
import SignupService from '@/services/auth/SignupService'

Vue.use(VeeValidate);

export default {
  name: 'Signup',
  data: () => ({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    birthday: '',
    address:'',
    postcode: '',
    city:''
  }),
  methods: {
    async addUser() {
      await SignupService.addUser({
        email: this.email,
        password: this.password,
        first_name: this.first_name,
        last_name: this.last_name,
        birthday: this.birthday,
        address: this.address,
        postcode: this.postcode,
        city: this.city
      })
      this.$router.push({ name: 'Signup' })
    }
  }
};


</script>