<template>
  <div id='auth'>
    <div id='login' v-if='!loggedIn'>
      <h1> Welcome!</h1> 
      <h3> Enter Login credentials to get started!</h3>
      <h4>Email:</h4><input v-model="loginEmail" type='email' placeholder="Your Email">
      <h4>Password:</h4><input v-model='loginPassword' type='password' /><br><br>
      <button v-on:click='login(loginEmail, loginPassword)'>Login</button>
    </div>

    <div id='logout' v-if='loggedIn'>
      <button v-on:click='logout()'>Logout</button>
    </div>
  </div>
</template>

<script>

import firebase from 'firebase';
import { auth } from '../firebase'

import router from '../router/index'

export default {
  name: 'login',
  data () {
    return {
      loginEmail: '',
      loginPassword: '',
      signupEmail: '',
      signupPassword: '',
      loggedIn: auth.currentUser,
      termsAndConditions: false
    }
  },
  methods: {
    login: function(email, password) {
      console.log("Logging in with Email and Password:", email, password);
      let t = this
      auth.signInWithEmailAndPassword(email, password).then(function(ret) {
        if (ret) t.loggedIn = auth.currentUser
      router.push({ name: 'Dashboard'})
      })
      .catch(function(error) {
        console.log("There was an error logging in: ", error);
      });
      this.loginEmail = ""
      this.loginPassword = ""
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
