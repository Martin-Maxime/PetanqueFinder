<template>
   <div class="my-account container">
      <div class="row">
         <div class="col-md-12">
            <h2>Mes informations</h2>
         </div>
      </div>
      <div class="row">
         <div class="col-md-12">
            <div v-if="this.isErrorEmail" class="col-md-12 alert alert-danger" role="alert">
               Cette adresse email est déjà existante sur notre site, veuillez en choisir une autre.
            </div>
            <div v-if="this.accountUpdated" class="col-md-12 alert alert-success" role="alert">
               Les informations de votre compte ont bien été mises à jour.
            </div>
         </div>
         <form class="col-md-12 update-form" @submit.prevent="validateBeforeSubmit">
            <div class="row">
                <div class="col-md-12 form-group">
                    <label class="label">First Name</label>
                    <p class="">
                        <input name="first_name" ref="firstname" v-model="first_name" v-validate.initial="'required|alpha_spaces'" :class="{'input form-control': true, 'is-danger': errors.has('first_name') }" type="text" placeholder="First Name">
                        <i v-show="errors.has('first_name')" class="fa fa-warning"></i>
                        <span v-show="errors.has('first_name')" class="help is-danger">{{ errors.first('first_name') }}</span>
                    </p>
                </div>
            </div>
            <div class="row">
               <div class="col-md-12 form-group">
                  <label class="label">Last Name</label>
                     <p class="">
                        <input name="last_name" v-model="last_name" v-validate.initial="'required|alpha_spaces'" :class="{'input form-control': true, 'is-danger': errors.has('last_name') }" type="text" placeholder="Last Name">
                        <i v-show="errors.has('last_name')" class="fa fa-warning"></i>
                        <span v-show="errors.has('last_name')" class="help is-danger">{{ errors.first('last_name') }}</span>
                     </p>
               </div>
            </div>
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
                  <label class="label">Date de naissance</label>
                     <p class="">
                       <input name="date_limit" value="01/01/2017" type="hidden">
                       <input name="birthday" value="01/01/2017" v-model="birthday" v-validate.initial="'required'" :class="{'input form-control': true, 'is-danger': errors.has('birthday') }" type="date">
                        <i v-show="errors.has('birthday')" class="fa fa-warning"></i>
                        <span v-show="errors.has('birthday')" class="help is-danger">{{ errors.first('birthday') }}</span>
                     </p>
               </div>           
            </div>
            <div class="row">
               <div class="col-md-12 form-group">
                  <label class="label">Adresse</label>
                     <p class="">
                        <input name="address" v-model="address" v-validate.initial="'required'" :class="{'input form-control': true, 'is-danger': errors.has('address') }" type="text" placeholder="Adresse">
                        <i v-show="errors.has('address')" class="fa fa-warning"></i>
                        <span v-show="errors.has('address')" class="help is-danger">{{ errors.first('address') }}</span>
                     </p>
               </div>           
            </div>
            <div class="row">
               <div class="col-md-12 form-group">
                  <label class="label">Code postal</label>
                     <p class="">
                        <input name="postcode" v-model="postcode" v-validate.initial="'required|numeric|min:5|max:5'" :class="{'input form-control': true, 'is-danger': errors.has('postcode') }" type="text" placeholder="Code postal">
                        <i v-show="errors.has('postcode')" class="fa fa-warning"></i>
                        <span v-show="errors.has('postcode')" class="help is-danger">{{ errors.first('postcode') }}</span>
                     </p>
               </div>
            </div>
            <div class="row">
               <div class="col-md-12 form-group">
                  <label class="label">Ville</label>
                     <p class="">
                        <input name="city" v-model="city" v-validate.initial="'required|alpha_spaces'" :class="{'input form-control': true, 'is-danger': errors.has('city') }" type="text" placeholder="Ville">
                        <i v-show="errors.has('city')" class="fa fa-warning"></i>
                        <span v-show="errors.has('city')" class="help is-danger">{{ errors.first('city') }}</span>
                     </p>
               </div>          
            </div>
            <div class="row">
               <button :disabled="checkErrors() || !validateBeforeSubmit" class="btn btn-primary btn-block" v-on:click="updateUserInfos();" type="submit">Submit</button>
            </div>
         </form>
      </div>
      <div class="row">
         <div class="col-md-12">
            <h2>Changer de mot de passe</h2>
         </div>
      </div>
      <div class="row">
         <form class="col-md-12 update-form" @submit.prevent="validateBeforeSubmit">
            <div class="row">
               <div class="col-md-12">
                  <div v-if="this.passwordUpdated" class="alert alert-success" role="alert">
                     Votre mot de passe a bien été modifié.
                  </div>
               </div>
            </div>
            <div class="row">
                <div class="col-md-12 form-group">
                    <label class="label">Mot de passe actuel</label>
                    <p class="">
                        <input name="password" v-model="password" v-validate.initial="'required|min:6'" :class="{'input form-control': true, 'is-danger': errors.has('password') }" type="password" placeholder="Tapez votre ancien mot de passe">
                        <i v-show="errors.has('password')" class="fa fa-warning"></i>
                        <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                    </p>
                    <div v-if="this.errorPassword" class="col-md-12 alert alert-danger" role="alert">
                       Votre mot de passe actuel n'est pas correct.
                     </div>    
                </div>     
            </div>
            <div class="row">
                <div class="col-md-12 form-group">
                    <label class="label">Tapez votre nouveau mot de passe</label>
                    <p class="">
                        <input name="new_password" v-model="new_password" v-validate.initial="'required|min:6'" :class="{'input form-control': true, 'is-danger': errors.has('new_password') }" type="password" placeholder="Votre nouveau mot de passe">
                        <i v-show="errors.has('new_password')" class="fa fa-warning"></i>
                        <span v-show="errors.has('new_password')" class="help is-danger">{{ errors.first('new_password') }}</span>
                    </p>
                </div>         
            </div>
            <div class="row">
                <div class="col-md-12 form-group">
                    <label class="label">Confirmation du nouveau mot de passe</label>
                    <p class="">
                        <input name="new_password_confirmation" v-model="new_password_confirmation" v-validate.initial="'required|confirmed:new_password'" :class="{'input form-control': true, 'is-danger': errors.has('new_password_confirmation') }" type="password" placeholder="Retapez votre nouveau mot de passe" data-vv-as="new_password">
                        <i v-show="errors.has('new_password_confirmation')" class="fa fa-warning"></i>
                        <span v-show="errors.has('new_password_confirmation')" class="help is-danger">{{ errors.first('new_password_confirmation') }}</span>
                    </p>
                </div>         
            </div>
            <div class="row">
               <button :disabled="checkPassword() || !validateBeforeSubmit" class="btn btn-primary btn-block" v-on:click="updateUserPassword();" type="submit">Submit</button>
            </div>
         </form>
      </div>
   </div>
</template>

<script>
import VeeValidate from 'vee-validate';
import { Validator } from 'vee-validate';
import SignupService from '@/services/auth/SignupService';
export default {
   name: 'My-Account',
   data: () => ({
      isErrorEmail: false,
      accountUpdated: false,
      passwordUpdated: false,
      errorPassword: false,
      userId: '',
      email: '',
      password: '',
      new_password: '',
      new_password_confirmation: '',
      first_name: '',
      last_name: '',
      birthday: '',
      address:'',
      postcode: '',
      city:''
   }),
   methods: {
      checkErrors() {
         let checkErrors = false;
         this.errors.items.forEach(function(element){
            if(element.field != 'password' && element.field != 'new_password' && element.field != 'new_password_confirmation' ) {
               checkErrors = true;
            }
         })
         return checkErrors;
      },
      checkPassword() {
         let checkPassword = false;
         this.errors.items.forEach(function(element){
            if(element.field === 'password' || element.field === 'new_password' || element.field === 'new_password_confirmation') {
               checkPassword = true;
            }
         })
         return checkPassword;
      },
      validateBeforeSubmit() {
         this.$validator.validateAll().then((result) => {
            if (result) {
               return true;
            }
            return false;
         });
      },
      async updateUserInfos() {
         await SignupService.updateUserInfos({
            id: this.userStorage.userid,
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            birthday: this.birthday,
            address: this.address,
            postcode: this.postcode,
            city: this.city
         }).then(response => {
            this.accountUpdated = true;
            this.isErrorEmail = false;
            let userInfos = {'userid': this.userStorage.userid, 'address': this.address, 'birthday': this.birthday, 'city': this.city, 'email': this.email, 'firstname': this.first_name, 'lastname': this.last_name, 'postcode': this.postcode};
            localStorage.setItem('user-infos', JSON.stringify(userInfos));
         }).catch(error => {
            this.isErrorEmail = true;
            this.accountUpdated = false;
         })
      },
      async updateUserPassword() {
         await SignupService.updateUserPassword({
            id: this.userStorage.userid,
            password: this.password,
            new_password: this.new_password
         }).then(response => {
            this.errorPassword = false;
            this.passwordUpdated = true;
         }).catch(error => {
            this.errorPassword = true;
            this.passwordUpdated = false;
         })
      }
   },
   created: function() {
      this.userStorage = JSON.parse(localStorage.getItem('user-infos') || '[]');
      this.first_name = this.userStorage.firstname;
      this.last_name = this.userStorage.lastname;
      this.email = this.userStorage.email;
      this.birthday = this.userStorage.birthday;
      this.address = this.userStorage.address;
      this.postcode = this.userStorage.postcode;
      this.city = this.userStorage.city;
   }
}
</script>
