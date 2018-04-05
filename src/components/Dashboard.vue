<template>
<v-app>
  <div>
    <md-layout>
    <h1>Dashboards</h1>
    </md-layout>
    <div v-if="chartData"> 
      	<line-chart :chart-data="dayCount"></line-chart>
      	<bar-chart :chart-data="count"></bar-chart>
        
        
  </div>
  </div>
</v-app>
</template>



<script>
import firebase from 'firebase';
import { auth, db } from '../firebase';
import LineChart from './LineChart';
import BarChart from './BarChart';
import Chart from 'chart.js';
import VueCharts from 'vue-chartjs'

var database = firebase.database();
var moment = require('moment');


export default {
  components: {LineChart, BarChart},
  data:() => ({
    uid: '',
    chartData: null,
    count: [],
    dayCount: [],
    

  }),

  created() {
  var user = firebase.auth().currentUser;
  this.uid = user.uid
  console.log("CL 1 This is current user", firebase.auth().currentUser)
  console.log("CL 2 This is uid of this", this.uid)

  let t = this
  database.ref('clients').orderByChild('user').equalTo(this.uid).on('value', function (snapshot) {
    var cd = snapshot.val()
    t.chartData = cd
    console.log("This is chartData", t.chartData)
    t.count = t.aggregateCount(cd)
    t.dayCount = t.aggregateDay(cd)
    console.log("Day count: ", t.dayCount)
    

  })

  
  },

  methods: {
    aggregateCount(chartData) {
      return Object.keys(chartData).reduce((acc, key) => {
        if (chartData[key].conclusion === 'yes'){
          acc[0]++
        }
        else if (chartData[key].conclusion === 'no'){
          acc[1]++
        }
        else {
          acc[2]++
        }
      return acc;
      },[0, 0, 0])
    },
    // "clients" : {
    // "-L8tfnzsecWcFzYBIMS6" : {
    //   "client_fname" : "Pineapple",
    //   "client_lname" : "Peeled",
    //   "conclusion" : "yes",
    //   "country" : "Australia",
    //   "time" : {
    //     "timeSpent" : "00:00:02",
    //     "timestamp" : "01/04/2018, 11:19:49"
    //   },
    //   "user" : "2aCdoDPq01apQsu9sUhZdse5hLS2",
    //   "username" : "Mruga Palwe",
    //   "visa_type" : "Work"
    // },

    /*
    {
      yes: []
      no: []
      later: []
    }
    */

    aggregateDay(chartData) {
      return Object.keys(chartData).reduce((acc, key) => {
        // const values = []
        var entry = chartData[key]
        const day = entry.time.day
        // values[Number(entry.day)]
        console.log("This is number", entry)
        
        if (!acc[entry.conclusion]) {
          const values = [0, 0, 0, 0, 0, 0, 0];
          values[Number(day)] = 1;
          acc[entry.conclusion] = values
        }
        else {
          var currentValues = acc[entry.conclusion]
          currentValues[Number(day)]++
          acc[entry.conclusion] = currentValues
        }
        return acc;
      },{})
    }
  } //end of methods
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
</style>
