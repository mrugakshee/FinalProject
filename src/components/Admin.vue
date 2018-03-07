<template>
  <div id='auth'>
    <div id='signUp' v-if='!loggedIn'>
      <div>
        <h1> Welcome!</h1> 
        <h1 class="ng-binding">Sign up to start tracking your progress. </h1>
        <h4>First Name:</h4><input v-model="signupFName" type='fname' placeholder="Jane">
        <h4>Last Name:</h4><input v-model="signupLName" type='lname' placeholder="Appleseed">
        <h4>Email:</h4><input v-model="signupEmail" type='email' placeholder="janeappleseed@gmail.com">
        <h4>Password:</h4><input v-model='signupPassword' type='password' />
        <div>
            <input type="checkbox" id="termsAndConditions" v-model="termsAndConditions" />
            <label for='termsAndConditions'>I agree to the Terms and Conditions</label>
        </div>
        <button v-on:click='signUp(signupFName, signupLName, signupEmail, signupPassword, termsAndConditions)'>Sign Up</button>
      </div>
    </div>
  </div>
</template>


<script>

import firebase from 'firebase';
import { auth, db } from '../firebase'

import router from '../router/index'

export default {
  name: 'login',
  data () {
    return {
      signupFName: '',
      signupLName: '',
      signupEmail: '',
      signupPassword: '',
      loggedIn: auth.currentUser,
      termsAndConditions: false
    }
  },
  methods: {
    signUp: function(fname, lname, email, password, termsAndConditions) {
      console.log("New User is Signing up with Email and password:", email, password);
      if (termsAndConditions) {
        auth.createUserWithEmailAndPassword(email, password).then(function(res) {
          console.log(res)
          var uid = res.uid;
          db.ref(`users/${uid}`).set({
            name: `${fname} ${lname}`,
            email: email
          })
        router.push({ name: 'Dashboard'})
        })
        .catch(function(error) {
          console.log("There was an error signing up: ", error);
        })
      } else {
        console.log("Please agree to the terms and conditions");
      }
    },
    logout: function() {
      let t = this
      auth.signOut().then(function() {
        // Sign Out Successfull
        t.loggedIn = auth.currentUser
      }).catch(function(error) {
        console.log("There was an error signing out: ", error);
      })
    }
  }
}
</script>

<style>

</style>
