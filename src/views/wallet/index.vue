<template>
  <div class="app-container wallet">
    <div class="app-title">
      钱包管理 -
      <span>余额</span>
    </div>
    <!-- content -->
    <div class="content" :style="{height: (windHeigth - 156)+'px'}">
     <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="10" :lg="8" :xl="8">
          <el-card class="box-card" v-loading="loading">
             <img class="money-img" src="../../assets/icons/yingbi.png" alt="">
             <span class="num">￥{{balance}}</span>
             <div class="handel">
              <div class="text j" @click="handeldetailShow">交易明细</div>
              <div class="text t" @click="handeltake">提现</div>
             </div>
          </el-card>
          <template >
             <el-card class="box-card" style="margin-top: 15px; cursor: pointer; padding: 0;">
              <i class="iconfont icon-jiahao" style="color: #a0cfff;" @click="addBank">&nbsp;&nbsp;添加银行卡</i>
            </el-card>
          </template>
        </el-col>
        <el-col :xs="24" :sm="12" :md="14" :lg="16" :xl="16">
          <el-card class="box-card srcoll" v-show="detailShow">
            <div class="outer-container" :style="{height: (windHeigth - 236)+'px'}" ref="outer">
               <div class="inner-container" ref="inner">
                  <div class="srcoll-content" :style="{height: (windHeigth - 236)+'px'}" ref="content">
                    <div class="list-group" v-for="i in list">
                      <span class="item">{{i.note}}</span>
                      <span class="item">{{i.addtime*1000 | formatDate}}</span>
                      <span class="item add" v-if="i.type == 1"><i class="iconfont">+</i> {{i.amount}}</span>
                      <span class="item pre" v-if="i.type == 0"><i class="iconfont">-</i> {{i.amount}}</span>
                    </div>
                    <!-- 无限滚动组件 -->
                    <infinite-loading  @infinite="infiniteHandler" ref="infiniteLoading" spinner="circles">
                      <!-- <span slot="spinner">...</span> -->
                      <div class="tips" slot="spinner">加载中...</div>
                      <div slot="no-more">没有更多了</div>
                      <div class="tips" slot="no-results">没有更多了</div>
                    </infinite-loading>
                  </div>
               </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
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
      resData: '',
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
            // $state.loaded();
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
          // this.$message({
          //   type: 'info',
          //   message: '取消删除'
          // });
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
