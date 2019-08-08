<template>
  <div class="app-container rule">
    <div class="app-title">
      权限管理 -
      <span>列表</span>
    </div>
     <!-- content -->
    <div class="content">
      <template>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="角色列表" name="first">
            <div class="outer-container" :style="{height: (windHeigth - 236)+'px'}" ref="outer">
               <div class="inner-container" ref="inner">
                  <div class="srcoll-content" v-loading="loading" :style="{height: (windHeigth - 236)+'px'}" ref="content">
                    <div class="list-group">
                      <div class="item" v-for="i in list" :id="i.id" @click="handelDetail(i.id, i.name)">{{i.name}}</div>
                    </div>
                  </div>
               </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="用户列表" name="second">
            <div class="srcoll-warpeer">
              <div class="search-w">
                <input class="search-input" type="text" ref="phone" value="" placeholder="请您输入手机号搜索...">
                <i class="iconfont el-icon-search" @click="searchUser"></i>
              </div>
              <el-scrollbar style="height: calc(100% - 56px);">
                <div class="item" v-for="i in users">
                  <!-- <img class="li-img" :src="i.logo" alt=""> -->
                  <span class="li-name">- {{i.name}}</span>
                  <span class="li-phone">{{i.phone}}</span>
                </div>
              </el-scrollbar>
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
      <!-- 错误提示 -->
     <!-- <template>
        <el-button :plain="true" @click="open">打开消息提示</el-button>
      </template> -->
    </div>
  </div>
</template>

<script>
import { ruleList, ruleSearchAdd, userList } from '@/api/rule'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  // 注册滚动加载组件
  components: {
    InfiniteLoading
  },
  // 数据源
  data() {
    return {
      list: [], //角色数据
      users: [], //用户数据
      loading: true,
      listLoading: true,
      activeName: 'first',
      windHeigth: document.body.clientHeight,
    }
  },
  created() {
  },
  mounted() {
    this.getRuleList()
    this.getUserList()
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
      console.log(tab.name);
      let re = tab.name

    },
    onInfinite($state) {
      let that = this
      this.loading = true
      setTimeout(() => {
        const tmp = [];
        ruleList().then(res => {
          that.list = that.list.concat(res.returninfo);
          that.$refs.infiniteLoading.$emit("$InfiniteLoading:loaded");
          $state.complete()
          this.loading = false
        }).catch(err => {})
      }, 500);
    },
    // 获取角色列表数据
    getRuleList() {
      this.loading = true
      ruleList().then(res => {
        this.list = res.returninfo
        this.loading = false
      }).catch(err => {})
    },
    // 获取用户列表数据
    getUserList() {
      userList().then(res => {
        console.log(res)
        this.users = res.returninfo
      }).catch(err => {})
    },
    // 点击角色列表item
    handelDetail(id, name) {
      this.$router.push({name: 'ruleEdit', params: {id: id, name: name}})
    },
    // 点击搜索查找用户
    searchUser() {
      let phone = this.$refs.phone.value;
      console.log(phone)
      ruleSearchAdd(phone).then(res => {
        this.$message({
          message: res.info,
          type: 'warning'
        });
      }).catch(err => {})
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.rule {
  .content {
    background-color: #fff;
    padding-left: 24px;
    .item {
      padding: 12px 0;
      color: #666;
      .li-name {
        font-size: 14px;
      }
      .li-phone {
        margin-left: 24px;
        font-size: 13px;
      }
    }
  }
  .srcoll-warpeer {
    height: 400px;
    .search-w {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 16px 0;
      .search-input {
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 1px solid #e1e1e1;
        outline: none;
        color: #333;
        font-size: 14px;
        padding-bottom: 6px;
        width: 36%;
        min-width: 120px;
      }
      .iconfont {
        padding: 4px;
        cursor: pointer;
        color: #409EFF;
      }
    }
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: #9f9f9f;
    font-size: 12px;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
     color: #9f9f9f;
     font-size: 12px;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
     color: #9f9f9f;
     font-size: 12px;
  }
  :-ms-input-placeholder { /* Internet Explorer 10-11 */
     color: #9f9f9f;
     font-size: 12px;
  }
}
</style>
