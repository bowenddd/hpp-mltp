<template>
  <div ref="chart" style="width: 100%; height: 500px;" />
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
      const bodyPoseData = [[-0.047973327338695526, -0.40648072957992554, 0.15397486090660095], [0.03481435403227806, -0.8483873009681702, 0.2185373157262802], [0.0479280911386013, -0.8692373037338257, 0.3794299364089966], [0.03699324652552605, -0.8370922207832336, 0.44630321860313416], [0.18453189730644226, -0.43987134099006653, 0.0028020052704960108], [0.264641135931015, -0.8030538558959961, -0.25793662667274475], [0.25137072801589966, -0.9234334826469421, -0.1491897851228714], [0.24583102762699127, -0.93285071849823, -0.0749899297952652], [-0.035147663205862045, 0.2298073023557663, -0.021609198302030563], [-0.08172976970672607, 0.4705910086631775, -0.09869512170553207], [-0.0520985871553421, 0.5720193982124329, -0.039467260241508484], [-0.10456306487321854, 0.6192444562911987, -0.1302570402622223], [0.06172511354088783, 0.43989917635917664, -0.13461218774318695], [0.07971450686454773, 0.16679702699184418, -0.1881580799818039], [0.0946815088391304, -0.0793461725115776, -0.23874661326408386], [0.1880517452955246, -0.10019427537918091, -0.2096385657787323], [0.09263911843299866, -0.1636137217283249, -0.29255035519599915], [-0.2094936966896057, 0.39444732666015625, -0.1249440386891365], [-0.11103980988264084, 0.1444944143295288, -0.19985461235046387], [-0.042855940759181976, -0.09497588872909546, -0.23689812421798706], [-0.03756154701113701, -0.15384237468242645, -0.15623410046100616], [-0.022031815722584724, -0.2041091024875641, -0.31790751218795776]]
      // 互换第二列和第三列
      for (let i = 0; i < bodyPoseData.length; i++) {
        const temp = bodyPoseData[i][1] // 保存第二列的值
        bodyPoseData[i][1] = bodyPoseData[i][2] // 将第三列的值赋给第二列
        bodyPoseData[i][2] = temp // 将保存的第二列的值赋给第三列
      }
      // Create lines connecting body joints
      const bodyLines = [
        [8, 0, 1, 2, 8, 4, 5, 6, 8, 9, 10, 9, 12, 13, 14, 14, 9, 17, 18, 19, 19],
        [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
      ]

      // Create the chart
      this.chart = echarts.init(this.$refs.chart)

      // Generate ECharts options
      const options = this.generateBodyPoseChartOptions(bodyPoseData, bodyLines)

      // Set options to the chart
      this.chart.setOption(options)
    },
    generateBodyPoseChartOptions(bodyPoseData, bodyLines) {
      const y = []
      for (let i = 0; i < bodyLines[0].length; i++) {
        y.push([bodyPoseData[bodyLines[0][i]], bodyPoseData[bodyLines[1][i]]])
      }
      const options = {
        grid3D: {
          viewControl: {
            projection: 'orthographic'
          },
          show: false
        },
        xAxis3D: { min: -1, max: 1, show: false },
        yAxis3D: { min: -1, max: 1, show: false },
        zAxis3D: { min: -1, max: 1, show: false },
        series: [
          {
            type: 'scatter3D',
            symbolSize: 10,
            data: bodyPoseData.map(coordinates => ({ value: coordinates }))
          }
        ]
      }
      for (let i = 0; i < y.length; i++) {
        options.series.push(
          {
            type: 'line3D',
            effect: {
              show: true,
              trailWidth: 2,
              trailLength: 0.1,
              trailOpacity: 0.5,
              trailColor: 'rgb(9,9,9)'
            },
            lineStyle: {
              width: 2,
              color: 'rgb(9,9,9)'
            },
            data: y[i]
          }
        )
      }
      return options
    }
  }
}

</script>
