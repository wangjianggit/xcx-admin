<template>
  <div class="app-container">

    <!-- filter 条件筛选过滤器-->
    <div>
      <button @click="ing">营业中</button>
      <button @click="gotoAdd">新增店铺</button>
    </div>
    <el-table
      ref="filterTable"
      v-loading="listLoading"
      :data="storeList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          {{ scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="企业名称" >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="企业地址" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="审核状态" width="110" align="center" :filter-method="filterHandler">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="提交时间" width="240">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.addtime }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { storeList } from '@/api/store'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        '营业中': 'success',
        draft: 'gray',
        '审核失败': 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      storeList: null,  //店铺列表数据存储
    }
  },
  created() {
    this.getStoreList()
  },
  methods: {
    getStoreList() {
      this.listLoading = true
      storeList().then(res => {
        if (res.code == 200) {
          this.storeList = res.list
          // this.storeList = [{name: 'aaaa'}]
        }
        console.log(this.storeList)
        console.log(res)
        // this.list = response.data.items
        this.listLoading = false
      }).catch(err => {})
    },
    filterHandler (value, row, column) {
      console.log(value)
      console.log(row)
      console.log(column)
      const property = column['property'];
      return row[property] === value;
    },
    ing () {
      console.log(this.$refs.filterTable)
      // this.$refs.filterTable
    },
    gotoAdd () {
      this.$router.push({name: 'addstore',params:{ id:'1'}});
    }

  }
}
</script>
