<template>
<v-app>
  <div>
    <md-layout>
    <h1>Dashboards</h1>
    </md-layout>
    <div v-if="chartData">
      <div v-if="admin">
        <div style="max-width=500px; max-height=300px"> 
          <h2> Client conversion rate for the year </h2>
          <line-chart id="line-chart-style" :chart-data="monthCount"></line-chart>
          <br>
          <br>
          <br>
          <v-data-table
          :headers="headers"
          :items="items"
          hide-actions
          class="elevation-1" id="adminDataTable">

          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.totalClosed }}</td>        
            <td class="text-xs-left">{{ props.item.avgClosed }}</td>
            
            </template>
          </v-data-table>


        </div>
      </div>
      <div v-else>
          <div style="max-width=500px; max-height=300px"> 
          <h2> Client conversion rate for the year </h2>
          <line-chart id="line-chart-style" :chart-data="monthCount"></line-chart>
          <h2> Time spent per type of client per month </h2>
          <bar-chart id="bar-chart-style" :chart-data="timeSpent"></bar-chart>
          <br>
          <br>
          <br>
        </div>
      </div>
        
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
    monthCount: [],
    admin: '',
    users: '',
    headers: [
      {
        text: 'Employee',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      { text: 'Total Closed', value: 'totalClosed' },
      { text: 'Avg', value: 'avgClosed' },
    ],
    items: [
      {
        name:"Mruga Palwe",
        totalClosed: "7",
        avgClosed: "3"
      },
      {
        name: "Spongebob Squarepants",
        totalClosed: "3",
        avgClosed: "0.6"
      },
      {
        name: "Finn The Human",
        totalClosed: "2",
        avgClosed: "0.4",
      },
    ],
  }),

  created() {
  var user = firebase.auth().currentUser;
  this.uid = user.uid
  
  let t = this
  
  firebase.database().ref('users').child(this.uid).on('value', function (snapshot) {
      // console.log("This is auth.currentuser", auth.currentUser)
      // console.log("This is auth.SNP", snapshot.val())
      
    if (snapshot.val().admin == true) {
      t.admin = true
    }
    
    var buildChart = function (snapshot) {
      var cd = snapshot.val()
      t.chartData = cd
      if (!t.admin) {
        t.monthCount = t.aggregateMonth(cd)
        t.timeSpent = t.aggregateTS(cd)
      }
      else {
        t.monthCount = t.aggregateMonth(cd)
        t.items = t.aggregateClosed(cd)
      }
      // t.count = t.aggregateCount(cd)
      // t.dayCount = t.aggregateDay(cd)
    }
    
    var ref = database.ref('clients').orderByChild('user')
    if (t.admin == false)
    {
      ref = ref.equalTo(t.uid)
    }
    ref.on('value', buildChart)
  })

  

  




  
  },

  methods: {
    

    aggregateStatus(chartData) {
      return Object.keys(chartData).reduce((acc, key) => {
        var totalTime
        if (chartData[key].status === 'Qualified'){
          acc[0]++
        }
        else {
          acc[1]++
        }
      return acc;
      },[0, 0])
    },

    aggregateTS(chartData) {
      return Object.keys(chartData).reduce((acc, key) => {
        // const values = []
        var entry = chartData[key]
        var month = moment(entry.time.timestamp, "DD/MM/YYYY, hh:mm:ss").month()
        var timespent = moment.duration(entry.time.timeSpent).asSeconds()
        
        // values[Number(entry.day)]
        // console.log("This is entry in AggTT", entry)
        
        if (!acc[entry.status])
          acc[entry.status] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        var currentValues = acc[entry.status];
        currentValues[month] += timespent;
        acc[entry.status] = currentValues;
        console.log("acc",acc)
        return acc;
      },{})
    },

    aggregateMonth(chartData) {
      return Object.keys(chartData).reduce((acc, key) => {
        // const values = []
        var entry = chartData[key]
        var month = moment(entry.time.timestamp, "DD/MM/YYYY, hh:mm:ss").month()
        
        // values[Number(entry.day)]
        // console.log("This is entry in AggMonth", entry)

          // const values = acc[entry.conclusion] || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          // values[Number(day)] ++
          // acc[entry.conclusion] = values
        
        
        if (!acc[entry.conclusion])
          acc[entry.conclusion] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        var currentValues = acc[entry.conclusion];
        currentValues[Number(month)]++;
        acc[entry.conclusion] = currentValues;
        // console.log("This is acc",acc)
        return acc;
      },{})
    },

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
#line-chart-style {
    display: block;
    height: 300px;
    width: 1000px;
}
#bar-chart-style {
    display: block;
    height: 300px;
    width: 1000px;
}
#adminDataTable {
    width: 500px;
    margin-left: 250px;
}
</style>
