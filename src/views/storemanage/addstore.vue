<template>
  <div class="app-container">
    <div class="title">
      入驻申请 -
      <span>基本信息审核</span>
    </div>
    <div class="content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" width="100%" label-width="100px" class="demo-ruleForm">
        <div class="item">
          <el-row :gutter="10">
            <el-col :sm="12">
              <el-form-item label="企业名称" prop="companyname" :sm="6"><el-input v-model="ruleForm.companyname"></el-input></el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :sm="12">
              <el-form-item label="企业地址" prop="address" :sm="6"><el-input v-model="ruleForm.address"></el-input></el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :sm="12">
              <el-form-item label="法人姓名" prop="name" :sm="6"><el-input v-model="ruleForm.name"></el-input></el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :sm="12">
              <el-form-item label="法人电话" type="phone" prop="phone" :sm="6"><el-input v-model="ruleForm.phone"></el-input></el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :sm="12">
              <el-form-item label="身份证号" type="number" prop="IDcard" :sm="6"><el-input v-model="ruleForm.IDcard"></el-input></el-form-item>
            </el-col>
          </el-row>
        </div>
        <!-- 上传文件 -->
        <div class="item">
          <!-- 营业执照 -->
          <div class="up-load-i">
            <div class="title">
              <strong>营业执照</strong>
              <span>注 : 支持ipg/png/格式RGB模式，大小不超过10M</span>
            </div>
            <div class="up-load-c">
              <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                <i class="iconfont icon-shangchuan"></i>
                <span>点此上传文件</span>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible"><img width="100%" :src="dialogImageUrl" alt="" /></el-dialog>
            </div>
          </div>
          <!-- 租赁合同 -->
          <div class="up-load-i">
            <div class="title">
              <strong>租赁合同</strong>
              <span>注 : 上传租赁合同正反面，支持ipg/png/格式RGB模式，大小不超过10M</span>
            </div>
            <div class="up-load-c">
              <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                <i class="iconfont icon-shangchuan"></i>
                <span>点此上传文件</span>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible"><img width="100%" :src="dialogImageUrl" alt="" /></el-dialog>
            </div>
          </div>
          <!-- 其他资料 -->
          <div class="up-load-i">
            <div class="title">
              <strong>其他资料</strong>
              <span>注 : 健康证、卫生许可证等，最多上传两张，支持ipg/png/格式RGB模式，大小不超过10M</span>
            </div>
            <div class="up-load-c">
              <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                <i class="iconfont icon-shangchuan"></i>
                <span>点此上传文件</span>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible"><img width="100%" :src="dialogImageUrl" alt="" /></el-dialog>
            </div>
          </div>
        </div>
        <!-- 提交按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交审核</el-button>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      ruleForm: {
        companyname: '', //公司名称
        address: '', //公司地址
        name: '', //法人姓名
        phone: '18706778242', //法人电话
        IDcard: '61048119900117581X', //法人身份证号
      },
      rules: {
        companyname: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
        address: [{ required: true, message: '请输入企业地址', trigger: 'blur' }],
        name: [{ required: true, message: '请输入法人姓名', trigger: 'change' }, { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入法人电话', trigger: 'blur' },
          { pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/, message: '手机号格式错误', trigger: 'blur'},
        ],
        IDcard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/, message: '身份证号格式错误', trigger: 'blur'},
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        console.log(that.ruleForm.name)
        if (valid) {
          alert('submit!');
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
      .item {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        background-color: #fff;
        padding: 24px 0;

        &:nth-child(2) {

          margin-top: 24px;
          padding-left: 24px;
          .title {
            padding-left: 0;
            font-size: 14px;
            color: #333;
            span {
              margin-left: 24px;
            }
          }
          .up-load-c {
            padding-left: 80px;
          }
        }
        .demo-ruleForm {
          width: 100%;
        }
      }

      // background-color: #000;
    }
    .foot {
    }
  }
}
.el-input__inner {
  width: 400px !important;
  background-color: green !important;
}
.el-row {
  width: 100%;
}
// .el-form-item {
//   width: 100%;
// }
</style>
