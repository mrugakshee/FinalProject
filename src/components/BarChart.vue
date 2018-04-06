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
          labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'], 
          datasets: [
            {
              label: 'Qualifed',
              backgroundColor: '#359636',
              pointBackgroundColor: '#359636',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              //Data to be represented on y-axis
              data: this.chartData.Qualified
            },
            {
              label: 'Unqualified',
              backgroundColor: '#c94949',
              pointBackgroundColor: '#c94949',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              //Data to be represented on y-axis
              data: this.chartData.Unqualified
            },
            
          ]
        },
        //Chart.js options that controls the appearance of the chart
        options: {
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Total Time spent on Clients (in seconds)'
              },
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
        console.log("this is props in barCharts", this.chartData)
      
      
    },

    updated: function(){
    }
    
  }
</script>