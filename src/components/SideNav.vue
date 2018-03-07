<script>
import Vue from 'vue'
import router from '../router'

const nav = `
  <div>
    <div id='sideNav' v-bind:class='{ open: this.open }' ref="leftSidenav">
        <md-list>
          <md-list-item>
            <md-button id="toggleNav" class="md-icon-button" v-on:click="toggleNav()">
              <md-icon>menu</md-icon>
            </md-button>
          </md-list-item>
          <md-list-item>
          <md-list-item><router-link to='/login'>Login</router-link></md-list-item>
          
            <router-link to='/home'>Home<md-button id="toggleNav" class="md-icon-button">
              <md-icon>home</md-icon>
            </md-button></router-link>
          </md-list-item>
          <md-list-item><router-link to='/dashboard'>Dashboard</router-link></md-list-item>
        </md-list>
      </md-sidenav>
    </div>
  </div>
`

Vue.component('side-nav', {
  props: {
    open: {
      default: true,
      type: Boolean
    },
    toggleNav:{
      type: Function,
      default: () => {
        console.log("Default Toggle Function");
      }
    }
  },
  template: nav,
  data() {
    return {
    }
  },
  methods: {

  }
})
</script>
