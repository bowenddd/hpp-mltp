<template>
  <div>
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="任务名称" style="width: 200px; margin-left: 15px;margin-top: 15px" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-top: 15px;margin-left: 10px" @click="handleFilter">
        查询
      </el-button>
    </div>
    <div class="dashboard-editor-container">
      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:15px;">
        <span>推理结果可视化</span>
        <body-chart />
      </el-row>
      <div style="text-align: center">第1帧</div>
      <el-button-group>
        <el-button type="primary" icon="el-icon-arrow-left" style="margin-left: 480px">上一帧</el-button>
        <el-button type="primary">下一帧<i class="el-icon-arrow-right el-icon--right" /></el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
// import GithubCorner from '@/components/GithubCorner'
import BodyChart from './components/BodyChart'

const lineChartData = {
}

export default {
  name: 'InferenceView',
  components: {
    BodyChart
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
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
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
  height: 800px;

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
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
