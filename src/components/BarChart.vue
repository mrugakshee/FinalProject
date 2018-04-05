<script>
  //Importing Line class from the vue-chartjs wrapper
  import {Bar} from 'vue-chartjs'
  //Exporting this so it can be used in other components
  export default{
    extends:Bar, 
    name: 'bar-chart',
    props: ['chartData'],
    data () {
      return {
        datacollection: {
        //Data to be represented on x-axis
          labels: ['Yes', 'No', 'Later'], 
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              //Data to be represented on y-axis
              data: this.chartData
            }
          ]
        },
        //Chart.js options that controls the appearance of the chart
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
    //renderChart function renders the chart with the datacollection and options object.
      this.renderChart(this.datacollection, this.options)
        console.log("this is props in lineCharts", this.chartData)
      
      
    },

    updated: function(){
    }
    
  }
</script>