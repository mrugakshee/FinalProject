// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'


import { auth } from './firebase'

import VueFire from 'vuefire'
import VueMaterial from 'vue-material'
import 'babel-polyfill'

import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueFire)
Vue.use(VueMaterial)
Vue.use(Vuetify)

Vue.material.registerTheme({
  default: {
    primary: {
     color: 'green',
     hue: 400
   }
 }
})


let app;

auth.onAuthStateChanged(function(user) {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      template: '<App/>',
      components: { App }
    })
  }

  if (user) {
    // User is signed in
    console.log("----- User " + user.email + " is signed in");
  } else {
    // User is Signed Out
    console.log("----- No Logged in User");
  }
})
