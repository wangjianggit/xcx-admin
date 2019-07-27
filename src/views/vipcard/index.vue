<template>
  <div class="app-container vip-card">
    <div class="title">
      入驻申请 -
      <span>基本信息审核</span>
    </div>
    <template>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane>
          <span slot="label"><i class="iconfont icon-upload1-copy" style="margin-right: 4px;"></i>已上架</span>
          <div>已上架内容</div>
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label"><i class="iconfont icon-update" style="margin-right: 4px;"></i>待上架</span>
          <div>已上架内容</div>
        </el-tab-pane>
        <el-tab-pane label="已下架">
          <span slot="label"><i class="iconfont icon-upload1" style="margin-right: 4px;"></i>已下架</span>
          <div>已上架内容</div>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
// import { getList } from '@/api/table'

export default {
  // 过滤器
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      activeName: 'second'
    }
  },
  created() {
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .vip-card {
    // background-color: #fff;
    .title {
      width: 100%;
      height: 42px;
      line-height: 42px;
      background-color: #fff;
      font-size: 14px;
      color: #333;
      padding-left: 24px;
      margin-bottom: 24px;
      span {
        font-size: 12px;
        color: #999;
      }
    }
  }
</style>
