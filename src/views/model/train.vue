<template>
  <div>
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="任务名称" style="width: 200px; margin-left: 15px;margin-top: 15px" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-top: 15px;margin-left: 10px" @click="handleFilter">
        查询
      </el-button>
    </div>
    <div class="dashboard-editor-container">
      <span style="margin-bottom: 10px">损失曲线</span>
      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;margin-top: 10px">
        <line-chart :chart-data="lossesData" />
      </el-row>
      <span style="margin-bottom: 10px">学习率曲线</span>
      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;margin-top: 10px">
        <line-chart :chart-data="lrData" />
      </el-row>
    </div>
  </div>
</template>

<script>
import LineChart from './components/LineChart'
const lossesData = require('./data/losses.json')
const lrData = require('./data/lr.json')
export default {
  name: 'TrainDashboard',
  components: {
    LineChart
  },
  data() {
    const losses = []
    const iter = []
    const lrs = []
    lossesData.map(x => {
      losses.push(x[2])
      iter.push(x[1])
    })
    lrData.map(x => {
      lrs.push(x[2])
    })
    return {
      lossesData: { y: losses, x: iter, title: 'losses' },
      lrData: { y: lrs, x: iter, title: 'learning rate' },
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      }
    }
  },
  methods: {
    handleSetLineChartData(type) {
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
  .filter-container {
    padding-bottom: 10px;

    .filter-item {
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 10px;
    }
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
