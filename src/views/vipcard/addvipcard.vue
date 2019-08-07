<template>
  <div class="app-container">
    <div class="title">
      会员卡管理 -
      <span>添加会员卡</span>
    </div>
    <div class="content">
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
            <el-form-item label="卡片类型" prop="cardtype">
              <el-select v-model="ruleForm.cardtype" style="width: 100%;" placeholder="请选择会员卡类型" @change="onSelectedDrug($event)">
                <el-option v-for="(item, index) in addCardData" :label="item.name" :value="item.id" >{{item.name}}</el-option>
              </el-select>
            </el-form-item>
            <!-- 一下都是动态生成的 -->
            <el-form-item v-if="addCardDataItem.options.length > 0" v-for="el in addCardDataItem.options" :label="el.diaplayname" :prop="el.name">

              <div v-if="el.type == 'textarea'">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
              </div>
              <div v-else-if="el.type == 'select'">
                <el-select v-model="ruleForm.chooseData"
                  multiple
                  collapse-tags
                  style="width: 100%;"
                  @change="selectAll"
                  placeholder="请选择">
                  <el-option
                    v-for="item in selectOptions"
                    :key="item.storeid"
                    :label="item.name"
                    :value="item.storeid">
                  </el-option>
                </el-select>
              </div>
              <div v-else>
                <el-input v-model="valid" :placeholder="el.placeholder"></el-input>
              </div>
            </el-form-item>



            <!-- <el-form-item label="卡片名称" prop="cardname" class="hide-required-asterisk" >
              <el-input v-model="ruleForm.cardname"></el-input>
            </el-form-item>
            <el-form-item label="适用门店" prop="chooseData">
              <el-select
                v-model="ruleForm.chooseData"
                multiple
                collapse-tags
                style="width: 100%;"
                @change="selectAll"
                placeholder="请选择">
                <el-option
                  v-for="item in selectOptions"
                  :key="item.storeid"
                  :label="item.name"
                  :value="item.storeid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="卡片售价" prop="cardprice">
              <el-input v-model="ruleForm.cardprice"></el-input>
            </el-form-item>
            <el-form-item label="有效日期" prop="carddate">
              <el-input v-model="ruleForm.carddate"></el-input>
            </el-form-item>
            <el-form-item label="使用说明" prop="desc">
              <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item> -->
            <el-form-item>
              <el-button type="primary" @click="onSubmit('ruleForm')">立即创建</el-button>
            </el-form-item>
          </el-form>
        </el-col>

        <!-- 创建会员卡可视视图 -->
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="card-warpper">
            <div class="card" v-if="bgtype == 1" :style="{ backgroundImage: 'url(' + imgbase + 'chuzhika-bg.png)'}">
              <div class="card-type">储值卡</div>
            </div>
            <div class="card" v-if="bgtype == 2" :style="{ backgroundImage: 'url(' + imgbase + 'jicika-bg.png)'}"></div>
            <div>{{ruleForm.cardname}}</div>
          </div>
        </el-col>
      </el-row>

    </div>
    <!-- <el-dialog title="适用门店" :visible.sync="dialogTableVisible">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedsystores" @change="handleCheckedCitiesChange()">
        <el-checkbox v-for="(item, index) in checkedsystoreList" :label="item" :key="item">11</el-checkbox>
        <el-checkbox v-for="(item, index) in checkedsystoreList" :label="item" :key="item.id">{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </el-dialog> -->
  </div>
</template>

<script>
import { homeStores, addCard } from '@/api/store';

export default {
  data() {
    return {
      imgbase: this.Global.imgbase,
      dialogImageUrl: '',
      dialogVisible: false,
      dialogTableVisible: false,
      bgtype: '', //背景图片，根据不同卡类型展示不同的背景图



      selectOptions: [],  //适用店铺数据源
      oldChooseData: [],  //适用店铺存放老数据


      // addCard返回数据
      addCardData: null,  //添加会员卡数据格式集合（包含5中类型卡，以及没重卡对应的input select等）
      addCardDataItem: [], //添加会员卡数据格式集合子集（5中类型卡其中一个）



      // typeList: [
      //   {id: 1, name: '储值卡'},
      //   {id: 2, name: '记次卡'},
      //   {id: 3, name: '限时卡'},
      //   {id: 4, name: '体验卡'},
      //   {id: 5, name: '套餐卡'}
      // ],
      ruleForm: {
        cardtype: '', //卡片类型
        cardname: '', //卡片名称
        chooseData: [],  //适用门店
        cardprice: '', //卡片售价
        carddate: '', //有效日期
        desc: '', //卡片说明
      },
      rules: {
        cardtype: [{ required: true, message: '请选择卡片类型', trigger: 'change' }],
        cardname: [{ required: true, message: '请输入卡片名称', trigger: 'blur' }],
        chooseData: [{ required: true, message: '请选择适用门店', trigger: 'change' }],
        cardprice: [{ required: true, message: '请输入卡片售价', trigger: 'blur' }],
        carddate: [{ required: true, message: '请输入卡片有效期', trigger: 'blur' }]
      }
    };
  },
  mounted() {
    this.getHomeStores()
    this.getAddCardParam()
  },
  methods: {
    onSubmit(formName) {
      let that = this;
      // console.log()
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 去掉表单数据中下标ALL_SELECT的元素（全选的时候才存在）
          var index = that.ruleForm.chooseData.indexOf('ALL_SELECT')
          if (index > -1) that.ruleForm.chooseData.splice(index, 1)

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 监听卡片类型select
    onSelectedDrug(e) {
      this.bgtype = e;
      this.addCardDataItem = this.addCardData[e-1];
      console.log(this.addCardDataItem)
      console.log(this.addCardData)
    },
    // 获取适用店铺数据
    getHomeStores() {
      this.dialogTableVisible = true;
      homeStores().then(res => {
        let frit = { name: '全部选中', storeid: 'ALL_SELECT' }
        this.selectOptions.push(frit)
        for (let i = 0; i < res.list.length; i++) {
          this.selectOptions.push(res.list[i]);
        }
      }).catch(err => {})
    },
    getAddCardParam() {
      addCard().then(res => {
        this.addCardData = res.list
      }).catch(err =>{})
    },
    // 适用店铺全选
    selectAll (val) {
      const allValues = this.selectOptions.map(item => {
        return item.storeid;
      });
      // 用来储存上一次选择的值，可进行对比
      const oldVal = this.oldChooseData.length > 0 ? this.oldChooseData : [];

      // 若选择全部
      if (val.includes('ALL_SELECT')) {
        this.ruleForm.chooseData = allValues;
      }

      // 取消全部选中， 上次有， 当前没有， 表示取消全选
      if (oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
        this.ruleForm.chooseData = [];
      }

      // 点击非全部选中，需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes('ALL_SELECT') && val.includes('ALL_SELECT')) {
        const index = val.indexOf('ALL_SELECT');
        val.splice(index, 1); // 排除全选选项
        this.ruleForm.chooseData = val;
      }

      // 全选未选，但是其他选项都全部选上了，则全选选上
      if (!oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
        if (val.length === allValues.length - 1) {
          this.ruleForm.chooseData = ['ALL_SELECT'].concat(val);
        }
      }

      // 储存当前选择的最后结果 作为下次的老数据
      this.oldChooseData = this.ruleForm.chooseData;

      console.log(this.ruleForm.chooseData)
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
    .content {
      width: 100%;
      .el-form-item.is-required .el-form-item__label:before {
        content: '' !important;
      }
      .item {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        background-color: #fff;
        padding: 24px 0;
      }
      .card-warpper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .card {
          position: relative;
          min-width: 300px;
          min-height: 200px;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          .card-type {
            position: absolute;
            top: 0;
            left: 0;
            font-size: 14px;
            color: #ffe373;
            padding: 4px 12px;
            border-top-left-radius: 7px;
            border-bottom-right-radius: 7px;
            background-color: rgba(0, 0, 0, 0.4);
          }
        }
      }
    }
    .foot {
    }
  }
}


</style>
