<template>
  <div ref="chart" style="width: 100%; height: 400px;" />
</template>

<script>
// YourComponent.vue
// YourComponent.vue
// YourComponent.vue
import * as echarts from 'echarts'
import 'echarts-gl'

export default {
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      // Simulated 3D body pose data
      const bodyPoseData = [
        [0, 0, 0],
        [0.5, 0.6, 0.7],
        [0.7, 0.5, 0.3],
        [0.2, 0.1, 0.8]
        // Add more joints as needed
      ]

      // Create lines connecting body joints
      const bodyLines = [
        [0, 1], [1, 2], [2, 3], [3, 0] // Connect the base
        // Add more connections as needed
      ]

      // Create the chart
      this.chart = echarts.init(this.$refs.chart)

      // Generate ECharts options
      const options = this.generateBodyPoseChartOptions(bodyPoseData, bodyLines)

      // Set options to the chart
      this.chart.setOption(options)
    },
    generateBodyPoseChartOptions(bodyPoseData, bodyLines) {
      const y = bodyLines.map((line) => (
        [bodyPoseData[line[0]], bodyPoseData[line[1]]]
      ))
      console.log(y)
      console.log(bodyPoseData)
      return {
        grid3D: {
          viewControl: {
            projection: 'orthographic'
          },
          show: false
        },
        xAxis3D: { min: 0, max: 1, show: false },
        yAxis3D: { min: 0, max: 1, show: false },
        zAxis3D: { min: 0, max: 1, show: false },
        series: [
          {
            type: 'scatter3D',
            symbolSize: 10,
            data: bodyPoseData.map(coordinates => ({ value: coordinates }))
          },
          {
            type: 'line3D',
            effect: {
              show: true,
              trailWidth: 2,
              trailLength: 0.1,
              trailOpacity: 0.5,
              trailColor: 'rgba(232,11,11,0.3)'
            },
            lineStyle: {
              width: 2,
              color: 'rgba(229,16,16,0.8)'
            },
            data: y[0]
          },
          {
            type: 'line3D',
            effect: {
              show: true,
              trailWidth: 2,
              trailLength: 0.1,
              trailOpacity: 0.5,
              trailColor: 'rgba(232,11,11,0.3)'
            },
            lineStyle: {
              width: 2,
              color: 'rgba(229,16,16,0.8)'
            },
            data: y[1]
          },
          {
            type: 'line3D',
            effect: {
              show: true,
              trailWidth: 2,
              trailLength: 0.1,
              trailOpacity: 0.5,
              trailColor: 'rgba(232,11,11,0.3)'
            },
            lineStyle: {
              width: 2,
              color: 'rgba(229,16,16,0.8)'
            },
            data: y[2]
          },
          {
            type: 'line3D',
            effect: {
              show: true,
              trailWidth: 2,
              trailLength: 0.1,
              trailOpacity: 0.5,
              trailColor: 'rgba(232,11,11,0.3)'
            },
            lineStyle: {
              width: 2,
              color: 'rgba(229,16,16,0.8)'
            },
            data: y[3]
          }
        ]
      }
    }
  }
}

</script>
