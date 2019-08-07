<template>
  <div class="app-container vip">
    <div class="app-title">
      会员管理 -
      <span>会员查询</span>
    </div>
    <!-- filter -->
    <div class="filte">
      <el-form :inline="true" :model="formfilte" class="form-inline">
        <el-form-item label="">
          <el-input v-model="formfilte.text" placeholder="请输入手机号搜索..."></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- content -->
    <div class="content">
        <el-table :data="vipList" style="width: 100%" v-loading="Loading">
          <template slot="empty" class="data-empty">
            <img class="not-data-pic" src="../../assets/icons/zanwushuju@2x.png" alt="" />
            <div class="not-data-text">暂无数据</div>
          </template>
          <el-table-column  label="头像"  width="60" align="center">
            <template slot-scope="scope">
              <img class="plogo" :src="scope.row.plogo"/>
            </template>
          </el-table-column>
          <el-table-column  label="手机号"  width="280" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.phone == '' ? '暂无手机号' : scope.row.phone}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="微信名" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.nickname == '' ? '暂无微信名' : scope.row.nickname}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="真实姓名" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.name == '' ? '暂无真实姓名' : scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="注册时间" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.addtime == '' ? '暂无' : scope.row.addtime}}</span>
            </template>
          </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
import { memberList } from '@/api/vip';

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      vipList: null,
      Loading: true,
      formfilte: {
        text: ''
      }
    };
  },
  created() {
    this.getVipList();
  },
  methods: {
    // 初始化获取数据
    getVipList() {
      this.Loading = true;
      memberList().then(res => {
        console.log(res);
        this.vipList = res.list
        this.Loading = false;
      });
    },
    // 查询
    onSubmit() {
      this.Loading = true;
      memberList(this.formfilte.text).then(res => {
        this.vipList = res.list
        this.Loading = false;
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.vip {
  .content {
    .plogo {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .el-table td {
      padding-top: 6px;
      padding-bottom: 6px;
    }
    .el-table .cell {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
