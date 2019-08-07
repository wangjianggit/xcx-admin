<template>
  <div class="app-container">
    <div class="title">
      订单管理 -
      <span>订单查询</span>
    </div>
    <!-- 条件过滤 -->
    <div class="filtrate">
      <el-form :model="formData" ref="formData" class="demo-form-inline">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
            <el-select v-model="formData.type" multiple collapse-tags placeholder="请选择订单类型">
              <el-option v-for="item in orderFilteData[0].options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>
          <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
            <el-select v-model="formData.cardtype" multiple collapse-tags placeholder="请选择卡类型">
              <el-option v-for="item in orderFilteData[1].options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>
          <el-col :xs="24" :sm="12" :md="7" :lg="7" :xl="7">
            <el-select v-model="formData.storeids" multiple collapse-tags placeholder="请选择店铺" style="width: 100%;">
              <el-option v-for="item in orderFilteData[2].options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>
          <el-button @click="resetForm">重置</el-button>
          <el-button type="primary" @click="getOrderfilter">搜索</el-button>
        </el-row>
      </el-form>
    </div>
    <el-table v-loading="listLoading" :data="orderList" element-loading-text="Loading" border fit >
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="店铺名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="卡类型" align="center" width="140">
        <template slot-scope="scope">
          <el-tag :type="scope.row.cardtype | statusFilter">{{ scope.row.cardtype }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="购卡方式" align="center" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="购卡时间" width="260">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.addtime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="购卡金额" align="center" width="90">
        <template slot-scope="scope">
          <span style="color: indianred; font-weight: bold;">{{ scope.row.payamount }} 元</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { orderList, orderData } from '@/api/order';

export default {
  // 过滤器
  filters: {
    statusFilter(status) {
      const statusMap = {
        '储值卡': 'success',
        '记次卡': 'info',
        '套餐卡': 'warning',
        '限时卡': '',
        '体验': 'danger'
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      orderList: null,  //列表数据存储
      orderFilteData: null,  //过滤条件后台返回数据
      listLoading: true,
      // 多选参数
      formData: {
        cardtype: [],
        type: [],
        storeids: []
      }
    };
  },
  created() {
    this.getOrderData();
  },
  methods: {
    // 获取订单列表&查询条件数据
    getOrderData() {
      this.listLoading = true;
      orderData().then(res => {
        if (res.code == 200) {
          this.orderList = res.list
          this.orderFilteData = res.selectinfo
          this.listLoading = false;
        }
      }).catch(err => {})
    },
    // 附加条件查询
    getOrderfilter() {
      this.listLoading = true;
      let that = this
      orderData(that.formData.type, that.formData.cardtype, that.formData.storeids).then(res => {
        if (res.code == 200) {
          this.orderList = res.list
          this.listLoading = false;
        }
      }).catch(err => {})
    },
    // 重置表单
    resetForm() {
      this.formData.type = []
      this.formData.cardtype = []
      this.formData.storeids = []
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.app {
  &-container {
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
    .filtrate {
      margin-bottom: 15px;
    }
  }
}
</style>
