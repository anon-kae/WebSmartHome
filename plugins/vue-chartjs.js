import Vue from 'vue'
import { Line } from 'vue-chartjs'

const registerComponent = function (name, originalComponent) {
  Vue.component(name, {
    extends: originalComponent,
    props: {
      chartData: {
        type: Object,
        default: () => {},
      },
      chartOptions: {
        type: Object,
        default: () => {},
      },
    },
    mounted () {
      this.renderChart(this.chartData, this.chartOptions)
    },
  })
}

registerComponent('LineChart', Line)
