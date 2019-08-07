<template>
  <div class="app-container vip-card">
    <div class="title">
      入驻申请 -
      <span>基本信息审核</span>
    </div>
    <el-button type="primary" plain icon="iconfont icon-jiahao" style="margin-bottom: 15px;" @click="addVipCard">新增会员卡</el-button>
    <template>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="second">
          <span slot="label">
            <i class="iconfont icon-update" style="margin-right: 4px;"></i>
            待上架
          </span>
          <div class="card-w" v-loading="listLoading">
            <el-row :gutter="15" style="width: 100%;">
              <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="6" v-for="(item, index) in list">
                <!-- 储值卡 -->
                <el-card class="card-i" :body-style="{ padding: '0px' }">
                  <div class="i-head">
                    <div class="i-head-l" v-if="item.type == 1" :style="{ backgroundImage: 'url(' + imgbase + 'chuzhika-bg.png)' }"><div class="card-type">{{item.type | filterImg}}</div></div>
                    <div class="i-head-l" v-if="item.type == 2" :style="{ backgroundImage: 'url(' + imgbase + 'jicika-bg.png)' }"><div class="card-type">{{item.type | filterImg}}</div></div>
                    <div class="i-head-l" v-if="item.type == 3" :style="{ backgroundImage: 'url(' + imgbase + 'xianshika-bg.png)' }"><div class="card-type">{{item.type | filterImg}}</div></div>
                    <div class="i-head-l" v-if="item.type == 4" :style="{ backgroundImage: 'url(' + imgbase + 'tiyanka-bg.png)' }"><div class="card-type">{{item.type | filterImg}}</div></div>
                    <div class="i-head-l" v-if="item.type == 5" :style="{ backgroundImage: 'url(' + imgbase + 'taocanka-bg.png)' }"><div class="card-type">{{item.type | filterImg}}</div></div>
                  </div>
                  <div class="i-content">
                    <span class="card-name">{{ item.cardname == '' ? '暂无' : item.cardname}}</span>
                    <div class="bottom clearfix">
                      <time class="time">有效期 {{ item.lastday }} 天</time>
                      <el-button plain class="button" type="primary" size="medium" :disabled="item.action == 1 ? false : true">上架</el-button>
                    </div>
                    <div class="card-p">
                      <strong>￥ {{ item.amount }}</strong>
                      <span>已售 {{ item.salenum }} 份</span>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <i class="iconfont icon-upload1-copy" style="margin-right: 4px;"></i>
            销售中
          </span>
          <div class="card-w" v-loading="listLoading">
            <el-row :gutter="15" style="width: 100%;">
              <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="6" v-for="(item, index) in list">
                <!-- 储值卡 -->
                <el-card class="card-i" :body-style="{ padding: '0px' }">
                  <div class="i-head">
                    <div class="i-head-l" v-if="item.type == 1" :style="{ backgroundImage: 'url(' + imgbase + 'chuzhika-bg.png)' }"><div class="card-type">{{item.type | filterImg}}</div></div>
                    <div class="i-head-l" v-if="item.type == 2" :style="{ backgroundImage: 'url(' + imgbase + 'jicika-bg.png)' }"><div class="card-type">{{item.type | filterImg}}</div></div>
                    <div class="i-head-l" v-if="item.type == 3" :style="{ backgroundImage: 'url(' + imgbase + 'xianshika-bg.png)' }"><div class="card-type">{{item.type | filterImg}}</div></div>
                    <div class="i-head-l" v-if="item.type == 4" :style="{ backgroundImage: 'url(' + imgbase + 'tiyanka-bg.png)' }"><div class="card-type">{{item.type | filterImg}}</div></div>
                    <div class="i-head-l" v-if="item.type == 5" :style="{ backgroundImage: 'url(' + imgbase + 'taocanka-bg.png)' }"><div class="card-type">{{item.type | filterImg}}</div></div>
                  </div>
                  <div class="i-content">
                    <span class="card-name">{{ item.cardname == '' ? '暂无' : item.cardname}}</span>
                    <div class="bottom clearfix">
                      <time class="time">有效期 {{ item.lastday }} 天</time>
                      <el-button round class="button" type="primary" size="medium" :disabled="item.action == 1 ? false : true">上架</el-button>
                    </div>
                    <div class="card-p">
                      <strong>￥ {{ item.amount }}</strong>
                      <span>已售 {{ item.salenum }} 份</span>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已下架">
          <span slot="label">
            <i class="iconfont icon-upload1" style="margin-right: 4px;"></i>
            已下架
          </span>
          <div class="card-w" v-loading="listLoading">
            <el-row :gutter="15" style="width: 100%;">
              <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="6" v-for="(item, index) in list">
                <!-- 储值卡 -->
                <el-card class="card-i" :body-style="{ padding: '0px' }">
                  <div class="i-head">
                    <div class="i-head-l" v-if="item.type == 1" :style="{ backgroundImage: 'url(' + imgbase + 'chuzhika-bg.png)' }"><div class="card-type">{{item.type | filterImg}}</div></div>
                    <div class="i-head-l" v-if="item.type == 2" :style="{ backgroundImage: 'url(' + imgbase + 'jicika-bg.png)' }"><div class="card-type">{{item.type | filterImg}}</div></div>
                    <div class="i-head-l" v-if="item.type == 3" :style="{ backgroundImage: 'url(' + imgbase + 'xianshika-bg.png)' }"><div class="card-type">{{item.type | filterImg}}</div></div>
                    <div class="i-head-l" v-if="item.type == 4" :style="{ backgroundImage: 'url(' + imgbase + 'tiyanka-bg.png)' }"><div class="card-type">{{item.type | filterImg}}</div></div>
                    <div class="i-head-l" v-if="item.type == 5" :style="{ backgroundImage: 'url(' + imgbase + 'taocanka-bg.png)' }"><div class="card-type">{{item.type | filterImg}}</div></div>
                  </div>
                  <div class="i-content">
                    <span class="card-name">{{ item.cardname == '' ? '暂无' : item.cardname}}</span>
                    <div class="bottom clearfix">
                      <time class="time">有效期 {{ item.lastday }} 天</time>
                      <el-button round class="button" type="primary" size="medium" :disabled="item.action == 1 ? false : true">上架</el-button>
                    </div>
                    <div class="card-p">
                      <strong>￥ {{ item.amount }}</strong>
                      <span>已售 {{ item.salenum }} 份</span>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
import { cardList } from '@/api/store';

export default {
  // 过滤器
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      };
      return statusMap[status];
    },
    filterImg(type) {
      const bgtype = {
        1: '储值卡',
        2: '记次卡',
        3: '限时卡',
        4: '体验卡',
        5: '套餐卡'
      };
      return bgtype[type];
    }
  },
  data() {
    return {
      imgbase: this.Global.imgbase,
      list: null, //会员卡列数组存储
      listLoading: true,
      activeName: 'second',
      page: 1,
      status: 0 //0待上架1上架2下架   action为1则可以操作（编辑/上下架）0为不可 操作
    };
  },
  created() {
    this.getCardList(this.page, this.status)
  },
  mounted() {
    // this.getCardList();
  },
  methods: {
    handleClick(tab, event) {
      this.getCardList(this.page, tab.index)
    },

    getCardList(p, s) {
      this.listLoading = true;
      cardList(p, s)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.list = res.list;
          }
          this.listLoading = false;
        })
        .catch(err => {});
    },
    addVipCard() {
      // this.$router.push()
      this.$router.push({name: 'addvipacrd',params:{ id:'1'}});
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.vip-card {
  background-color: #fff;
  .title {
    width: 100%;
    height: 42px;
    line-height: 42px;
    background-color: #f4f5f9;
    font-size: 14px;
    color: #333;
    padding-left: 24px;
    margin-bottom: 24px;
    span {
      font-size: 12px;
      color: #999;
    }
  }
  .card-w {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .card-i {
      margin-bottom: 15px;
      .i-head {
        padding: 15px 15px 0 15px;
        display: flex;
        flex-direction: row;
        .i-head-l {
          width: 100%;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          position: relative;
          min-height: 110px;
          color: #fff;
          .card-type {
            position: absolute;
            top: 0;
            left: 0;
            font-size: 14px;
            color: #ffe373;
            height: initial;
            border-top-left-radius: 7px;
            border-bottom-right-radius: 7px;
            padding: 6px 12px;
            background-color: rgba(0, 0, 0, 0.3);
            background-size: 100% 30px;
          }
          .card-name {
          }
          .card-price {
            padding-left: 0.833333rem;
            padding-top: 3em;
            font-weight: bold;
            font-size: 18px;
            letter-spacing: 1px;
            span {
              font-size: 13px;
            }
          }
        }
        .i-head-r {
        }
      }
      .i-content {
        padding: 14px 14px 14px 18px;
        .bottom {
          margin: 8px 0;
        }
        .card-name {
          font-size: 16px;
        }
        .time {
          font-size: 12px;
          color: #999;
        }
        .button {
          padding: 4px 12px;
          float: right;
        }
        .card-p {
          strong {
            color: #ff0000;
          }
          span {
            margin-left: 8px;
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }

  .clearfix:after {
    clear: both;
  }
}
</style>
