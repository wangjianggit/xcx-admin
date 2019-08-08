<template>
  <div class="app-container rule">
    <div class="app-title">
      权限管理 -
      <span>角色编辑</span>
    </div>
     <!-- content -->
    <div class="content">
      <el-form :model="ruleForm" ref="ruleForm" label-width="" class="r-form">
        <el-row>
          <el-col :xs="24" :sm="42" :md="24" :lg="12" :xl="12">
            <div class="section">
               <img class="s-img" src="../../assets/icons/juese-authoritymanagement@3x.png" alt="">
               <span class="s-title">角色名称</span>
               <input class="s-input" type="text" style="outline:none; text-align: center;" value="" :placeholder="ruleName">
            </div>
            <div class="line">选择该角色可以操作的权限</div>
            <div class="section" v-for="(item, key) in ruleList" :key="key">
              <img class="s-img" :src="imgbase + item.icon" alt="">
              <span class="s-title">{{item.name}}</span>
              <el-switch class="s-switch" @change="handelSwitch($event, item.id)" v-model="item.select" :active-value="1" :inactive-value="0" ></el-switch>
            </div>
          </el-col>
          <!-- 订单管理弹出层 -->
          <el-col :xs="24" :sm="42" :md="24" :lg="12" :xl="12">
            <transition name="el-zoom-in-center">
              <div v-show="storeModal" class="srcoll-warpper" style="height: 300px;">
                <div class="tips">在”订单管理“处打开使用订单权限并勾选店铺后该店铺具有收款权限</div>
                <el-scrollbar style="height: 100%;">
                  <div class="item" v-if="" v-for="i in stores" :id="i.storeid">
                    <img class="li-img" :src="i.logo" alt="">
                    <span class="li-name">{{i.name}}</span>
                  </div>
                </el-scrollbar>
              </div>
            </transition>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <el-button type="primary" @click="saveEdit">保存</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import { editAuthority } from '@/api/rule'

export default {
  data() {
    return {
      imgbase : this.Global.merchantImgbase,
      id: this.$route.params.id, //角色ID
      ruleName: this.$route.params.name, // 角色Name
      ruleList: [], //角色数据
      stores: [], //店铺数据
      users: [], //用户数据
      loading: true,
      listLoading: true,
      activeName: 'first',
      // srcollHeight: this.$refs.outer.offsetHeight,
      windHeigth: document.body.clientHeight,
      test: true,
      ruleForm: {},
      storeModal: false,  //店铺管理模态框
      show2: true
    }
  },
  created() {
  },
  mounted() {
    this.getEdit(this.id)
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getEdit(id) {
      editAuthority(id).then(res => {
        this.ruleList = res.returninfo
        console.log(res)
        for (var i in res.returninfo) {
          // 遍历订单管理开关下的stores集合
          if (res.returninfo[i].stores != undefined) {
            // this.stores = res.returninfo[i].stores
            this.stores = res.returninfo[i].stores.concat(res.returninfo[i].stores).concat(res.returninfo[i].stores)
          }
          // 判断订单管理switch开关是否开启，开启则显示店铺弹层
          if (res.returninfo[i].type == 2) {
            res.returninfo[i].select == 1 ? this.storeModal = true : this.storeModal = false
          }
        }
        console.log(res.returninfo)
      }).catch(err => {})
    },
    // 获取角色列表数据
    getRuleList() {
      this.loading = true
      ruleList().then(res => {
        this.list = res.returninfo
        this.loading = false
      }).catch(err => {})
    },
    // 点击角色列表item
    handelDetail(e) {
      let ruleID = e.target.id
      alert(e.target.id)
    },
    // 点击switch开关
    handelSwitch(ev, id) {
      if (id == 6 && ev == 1) {
        this.storeModal = true
      } else if (id == 6 && ev == 0) {
        this.storeModal = false
      }
      // alert(e.target.id)
    },
    // 保存编辑
    saveEdit() {
      alert('保存编辑')
    },
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.rule {
  .content {
    background-color: #fff;
    padding-left: 24px;
    .r-form {
      .item {
        padding: 8px 0;
        display: flex;
        align-items: center;
        &:hover {
          background-color: #f8fdff;
          cursor: pointer;
        }
        .li-img {
          width: 24px;
          height: 24px;
        }
        .li-name {
          font-size: 13px;
          color: #666;
          margin-left: 20px;
        }
      }
      .tips {
        font-size: 12px;
        color: #999;
        margin-top: 64px;
        padding-bottom: 18px;
      }
    }
    .section {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: #666;
      margin: 20px 0;
      position: relative;
      .s-img {
        width: 24px;
      }
      .s-title {
        margin-left: 14px;
        font-size: 13px;
      }
      .s-input {
        border-left: none;
        border-right: none;
        border-top: none;
        border-bottom: 1px solid #d1d1d1;
        position: absolute;
        right: 30%;
      }
      .s-switch {
        position: absolute;
        right: 30%;
      }
    }
    .line {
      font-size: 12px;
      color: #999;
    }

  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
</style>
