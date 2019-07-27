<template>
  <div class="dashboard-container">
    <!-- 头部 -->
    <div class="head">1111</div>
    <!-- content -->
    <div class="content">
      <h3 class="title">本月数据统计</h3>
      <el-row :gutter="24">
        <el-col :span="6">
          <el-card shadow="hover">
            <div>活跃人数</div>
            <div>24小时</div>
            <div>300人</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div>活跃人数</div>
            <div>24小时</div>
            <div>300人</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div>活跃人数</div>
            <div>24小时</div>
            <div>300人</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div>活跃人数</div>
            <div>24小时</div>
            <div>300人</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- foot -->
    <div class="foot">
      <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine(){
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
          title: { text: '在Vue中使用echarts' },
          tooltip: {},
          xAxis: {
              data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
          },
          yAxis: {},
          series: [{
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
          }]
      });
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    background-color: #F4F5F9;
    padding: 20px;
    .head {
      width: 100%;
      height: 88px;
      background-color: #ccc;
    }
    .content {
      margin-top: 48px;
    }
    .foot {

    }
  }

}
</style>
