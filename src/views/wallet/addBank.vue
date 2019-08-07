<template>
  <div class="app-container wallet">
    <div class="app-title">
      钱包管理 -
      <span>我的银行卡</span>
    </div>
    <!-- content -->
    <div class="content" :style="{height: (windHeigth - 156)+'px'}">

    </div>
  </div>
</template>

<script>
import { balance, balanceDetail } from '@/api/wallet'
import InfiniteLoading from 'vue-infinite-loading'
import {formatDate} from '@/utils/index'

export default {
  components: {
    InfiniteLoading,
  },
  // 过滤器
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  data() {
    return {
      list: [], //提现明细数据存储
      loading: true, //modal Loading加载
      balance: 0, //金额
      page: 1, //默认分页
      windHeigth: document.body.clientHeight,
      detailShow: false, //明细是否显示
      count: 30,
      resData: '',
      busy: false,
      loadingShow: false
    }
  },
  created() {
    this.getBalance()
  },
  mounted() {
  },
  methods: {
    infiniteHandler($state) {
      let that = this
      setTimeout(() => {
        const tmp = [];
        balanceDetail(this.page).then(res => {
          that.list = that.list.concat(res.list);
          console.log(that.list)
          if (res.list.length == 10) {
            that.page += 1;
            that.$refs.infiniteLoading.$emit("$InfiniteLoading:loaded");
            $state.loaded();
          } else if (res.list.length < 10) {
            $state.complete()
          }
        }).catch(err => {})
      }, 500);
    },
    // 获取侨胞初始化数据
    getBalance() {
      this.loading = true
      balance().then(res => {
        this.balance = res.balance
        this.loading = false
      }).catch(err => {})
    },
    // 获取钱包明细
    getBalanceDetail(flag) {
      let that = this
      balanceDetail(this.page).then(res => {
        that.list = res.list
      }).catch(err => {})
    },
    // 添加银行卡
    addBank() {
      console.log('添加银行卡')
    },
    // 点击明细
    handeldetailShow() {
      this.list = []
      this.infiniteHandler()
      this.detailShow = !this.detailShow
    },
    // 点击提现
    handeltake() {
      if (true) {
        // 如果没有绑定银行卡
        this.$confirm('您还未绑定银行卡, 是否前往绑定?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.$router.push({name: 'addBank'})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else{
        // 已绑定流程
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.wallet {
  .content {
    background-color: #fff;
    padding: 15px;
    .icon {
      color: rgb(64, 158, 255);
    }
    .el-card__body {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;
      position: relative;
    }
    .el-scrollbar__wrap{
      overflow-x: hidden;
    }
    .money-img {
      width: 48px;
      height: 48px;
    }
    .num {
      font-size: 1.5rem;
      font-weight: bold;
      color: #333;
      padding-left: 14px;
    }
    .handel {
      position: absolute;
      right: 20px;
      .text {
        font-size: 14px;
        cursor: pointer;
        &.j {
          color: #a0cfff;
          margin-bottom: 8px;
        }
        &.t {
          color: #f56c6c;
          margin-top: 8px;
        }
      }
    }
    .srcoll {
      .infinite-list {
        width: 100%;
        height: 200px;
        // overflow-y: hidden;
        // &:-webkit-scrollbar-button: none;
        padding: 0;
        overflow-y: scroll;
      }
    }
    .list-group {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .item {
        font-size: 13px;
        color: #666;
        padding: 8px 0;
        width: 33.333333%;
        text-align: left;
        &.add {color: red; text-align: center;}
        &.pre {color: #333; text-align: center;}
      }
    }
    .tips {
      font-size: 10px;
      color: #999;
      margin-top: 18px;
    }


  }

  .outer-container,.srcoll-content {
    width: 100%;
  }
  .outer-container {
    position: relative;
    overflow: hidden;
  }
  .inner-container {
      position: absolute;
      left: 0;
      overflow-x: hidden;
      overflow-y: scroll;
      width: 100%;
  }

   /* for Chrome */
  .inner-container::-webkit-scrollbar {
      display: none;
  }


  .load-more-normal {
    text-align: center;
    height: 60px;
    line-height: 60px;
  }
  .load-more-hide {
    height: 0;
  }
}
</style>
