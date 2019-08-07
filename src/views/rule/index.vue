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
                  <div class="srcoll-content" :style="{height: (windHeigth - 236)+'px'}" ref="content">
                    <div class="list-group" >
                      <div class="item" v-for="i in list" :id="120" @click="handelDetail">{{i.name}}</div>
                    <!--  <span class="item add" v-if="i.type == 1"><i class="iconfont">+</i> {{i.amount}}</span>
                      <span class="item pre" v-if="i.type == 0"><i class="iconfont">-</i> {{i.amount}}</span> -->
                    </div>
                    <!-- 无限滚动组件 -->
                    <infinite-loading  @infinite="onInfinite" ref="infiniteLoading" spinner="circles">
                      <div class="tips" slot="spinner">加载中...</div>
                      <div slot="no-more">没有更多了</div>
                      <div class="tips" slot="no-results">没有更多了</div>
                    </infinite-loading>
                  </div>
               </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="用户列表" name="second">用户列表</el-tab-pane>
        </el-tabs>
      </template>
    </div>
  </div>
</template>

<script>
import { ruleList, ruleSearchAdd } from '@/api/rule'
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
      listLoading: true,
      activeName: 'first',
      windHeigth: document.body.clientHeight,
    }
  },
  created() {
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onInfinite($state) {
      let that = this
      setTimeout(() => {
        const tmp = [];
        ruleList().then(res => {
          that.list = that.list.concat(res.returninfo);
          console.log(res)
          // return
          if (res.returninfo.length == 10) {
            that.page += 1;
            that.$refs.infiniteLoading.$emit("$InfiniteLoading:loaded");
            $state.loaded();
          } else if (res.returninfo.length < 10) {
            $state.complete()
          }
        }).catch(err => {})
      }, 500);
    },
    // 点击角色
    handelDetail(e) {
      let ruleID = e.target.id

      alert(e.target.id)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.rule {
  .content {
    background-color: #fff;
    padding-left: 24px;
    .list-group {
      .item {
        padding: 8px 0;
        &:hover {
          background-color: #f5f5f5;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
