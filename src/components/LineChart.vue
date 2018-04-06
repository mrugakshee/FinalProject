<script>
  //Importing Line class from the vue-chartjs wrapper
  import {Line} from 'vue-chartjs'
  //Exporting this so it can be used in other components
  export default{
    extends:Line, 
    name: 'line-chart',
    props: ['chartData'],
    data () {
      return {
        datacollection: {
        //Data to be represented on x-axis
          labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'], 
          datasets: [
            {
              label: 'Closed',
              borderColor: 'green',
              pointBackgroundColor: 'green',
              borderWidth: 2,
              pointBorderColor: '#249EBF',
              //Data to be represented on y-axis
              data: this.chartData.yes
            },
            {
              label: 'No',
              borderColor: 'red',
              pointBackgroundColor: 'red',
              borderWidth: 2,
              pointBorderColor: '#249EBF',
              //Data to be represented on y-axis
              data: this.chartData.no
            },
            {
              label: 'Later',
              borderColor: 'blue',
              pointBackgroundColor: 'blue',
              borderWidth: 2,
              pointBorderColor: '#249EBF',
              //Data to be represented on y-axis
              data: this.chartData.later
            }
          ]
        },
        //Chart.js options that controls the appearance of the chart
        options: {
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Total Number of clients'
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
        console.log("this is props in lineCharts", this.chartData)
      
      
    },

    updated: function(){
    }
    
  }
</script>