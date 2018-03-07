<template>
  <div id="app">
    <side-nav :open='open' :toggleNav='this.toggleNav'></side-nav>
    <main v-bind:class='{ open: this.open }'>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import SideNav from './components/SideNav'

export default {
  name: 'app',
  data() {
    return {
      open: true
    }
  },
  methods: {
    toggleNav() {
      console.log(this.open)
      this.open = !this.open
      console.log(this.open)
    }
  }
}
</script>

<style lang='scss'>
@import '../node_modules/vue-material/dist/vue-material.css';


@mixin transition($args...) {
  -webkit-transition: $args;
  -moz-transition: $args;
  -ms-transition: $args;
  -o-transition: $args;
  transition: $args;
}

$side_nav_open_width: 200px;
$side_nav_closed_width: 75px;

body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: inline-block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

a {
  color: white;
  text-decoration: none;
  display: inline-block;
  margin-left: 20px;
}

main {
  padding-left: 20px;
  padding-right: 20px;
  margin-left: $side_nav_closed_width;
  text-align: center;
  @include transition(margin-left .5s ease);

  &.open {
      margin-left: $side_nav_open_width;
  }
}

#sideNav {

  position: absolute;
  z-index: 1;
  width:100%;
  height: 100vh;
  border-right: 2px solid black;
  width: $side_nav_open_width;
  // transform: translate3d(-80%, 0 ,0);
  margin-left: $side_nav_closed_width - $side_nav_open_width;
  @include transition(margin-left .5s ease);

  &.open {
    // transform: translate3d(0%, 0 ,0);
    margin-left: 0;
  }

  #toggleNav {
    position: absolute;
    right: 0;
  }
}

// #toggleNav {
//   position: absolute;
//   top:0;
//   right: 0;
//   z-index: 10;
// }
</style>
