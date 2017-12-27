<template>
  <div class="module-edu-content courseset">


    <el-row class="progressBox">
      <el-col v-for="item in progressText" :key="item.text" :sm="12">
        <div class="order-progress-bar">
          <i class="progress-bar-line" :class="item.isCustomerConfirm ? item.currentLine : ''"></i>
          <i class="progress-bar-dot" :class="item.isCustomerConfirm ? item.currentDot : ''"></i>
          <span :class="item.isCustomerConfirm ? item.currentText : ''">{{item.text}}</span>
        </div>
      </el-col>
    </el-row>
    <div class="formBox">
      <div v-show="active == 0">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
          <el-form-item label="课程名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="所属项目" prop="project">
            <el-select v-model="ruleForm.project" placeholder="请选择所属项目">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所属科目" prop="subject">
            <el-select v-model="ruleForm.subject" placeholder="请选择所属科目">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="网课类型" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择网课类型">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>


          <el-form-item class="last-form-item">
            <el-button style="margin-top: 12px;" @click="next('ruleForm')">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="active == 1">
        <el-form :model="kForm" :rules="kForms" ref="kForm" label-width="100px" class="kForm">

        <el-form-item label="内容制作状态" prop="status">
          <el-select v-model="kForm.status" placeholder="请选择所属项目">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="可提问" prop="bAsk">
          <el-radio-group v-model="kForm.bAsk">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="可下载讲义" prop="bDown">
          <el-radio-group v-model="kForm.bDown">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="可制定学习计划" prop="bPlan">
          <el-radio-group v-model="kForm.bPlan">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="可使用考试重点模式" prop="bEm">
          <el-radio-group v-model="kForm.bEm">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="可使用问卷调查" prop="bQuestion">
          <el-radio-group v-model="kForm.bQuestion">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="问卷地址" prop="address" v-if="kForm.bQuestion=='是'?true:false">
          <el-input v-model="kForm.address"></el-input>
        </el-form-item>


        <el-form-item class="last-form-item">
          <el-button style="margin-top: 12px;" @click="prev">上一步</el-button>
          <el-button type="primary" @click="submitForm('kForm')">确定</el-button>
        </el-form-item>
      </el-form>
      </div>
    </div>



  </div>
</template>
<style>
  .courseset{
    padding: 0 110px 0 0;
  }
  .courseset .progressBox{
    margin-top: 20px;
  }
  .courseset .formBox{
    margin-top: 30px;
  }
  .courseset .el-form-item__label{
    width: 150px !important;
  }
  .courseset .el-form-item__content{
    margin-left: 150px !important;
  }
  .courseset .order-progress-bar {
    font-size: 12px;
    color: #8d98a9;
    text-align: center;
  }
  .courseset .order-progress-bar .progress-bar-dot {
    display: inline-block;
    position: relative;
    z-index: 10;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #bfc5cc;
    -webkit-box-shadow: inset 0 0 0 3px #dee5ed;
    -moz-box-shadow: inset 0 0 0 3px #dee5ed;
    box-shadow: inset 0 0 0 3px #dee5ed;
  }
  .courseset .order-progress-bar .progress-bar-line {
    position: relative;
    top: 8px;
    z-index: 9;
    display: block;
    border-top: 1px solid #e6ebf1;
  }
  .courseset .order-progress-bar .bar-line-current {
    border-top: 1px solid #f7cbb1;

  }
  .courseset .order-progress-bar .bar-dot-current {
    background: #f09862;
    -webkit-box-shadow: inset 0 0 0 3px #f7cbb0;
    -moz-box-shadow: inset 0 0 0 3px #f7cbb0;
    box-shadow: inset 0 0 0 3px #f7cbb0;
  }
  .courseset .order-progress-bar span {
    display: block;
  }
  .courseset .order-progress-bar .current-text {
    color: #f09862;
  }
</style>
<script>
  import Vue from 'vue';


  export default {
    components: {},
    data() {
      return {
        active: 0,
        progressText: [
          {
            text: '基本设置',
            currentLine: 'bar-line-current',
            currentDot: 'bar-dot-current',
            currentText: 'current-text',
            isCustomerConfirm: true
          }, {
            text: '功能模块',
            currentLine: 'bar-line-current',
            currentDot: 'bar-dot-current',
            currentText: 'current-text',
            isCustomerConfirm: false
          }
        ],
        rules: {
          name: [
            {required: true, message: '请输入课程名称', trigger: 'blur'},
            {min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
          ],
          project: [
            {required: true, message: '请选择所属项目', trigger: 'change'}
          ],
          subject: [
            {required: true, message: '请选择所属科目', trigger: 'change'}
          ],
          type: [
            {required: true, message: '请选择网课类型', trigger: 'change'}
          ]
        },
        kForms:{
          address: [
            {required: true, message: '请输入完成URL地址', trigger: 'blur'},
            {min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
          ],
        },
        ruleForm: {
          name: '',
          project: '',
          subject: '',
          type: '',
        },
        kForm:{
          status:'全部完成',
          bAsk:'否',
          bDown:'否',
          bPlan:'否',
          bEm:'否',
          bQuestion:'否',
          address:''
        }
      }
    },
    methods: {
      next(formName) {
        if(this.active >= this.progressText.length -1)return;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.active++;
            this.progressText[this.active].isCustomerConfirm=true;
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      prev(){
        if(this.active<=0)return
        this.progressText[this.active].isCustomerConfirm=false;
        this.active--;
      },
      submitForm(formName){
        console.log(this.kForm);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert("submittttttttt")
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }

    },
    computed: {},
    mounted() {
      console.log(this.active);
    },
    created() {
    }
  }
</script>