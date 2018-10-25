<template>
  <el-dialog class="addCourse cfa-course-dialog" title="新建一次续派课" :visible.sync="dialog" @close="closeDialog('ruleForm')" :before-close="closeDialog">
      <el-form :model="data" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
        <el-form-item label="任务名称" prop="course_name">
          <el-input v-model="ruleForm.course_name"></el-input>
        </el-form-item>
        <el-form-item label="考试" prop="project_id">
          <el-select v-model="data.project_id" placeholder="请选择考试">
            <el-option label="CFA-Level1 考试反馈" value="1"></el-option>
            <el-option label="CFA-Level2 考试反馈" value="1"></el-option>
            <el-option label="CFA-Level3 考试反馈" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="已学课程" prop="subject_id">
          <el-select v-model="data.subject_id" placeholder="请选择所属科目">
            <el-option label="不限科目" value="0"></el-option>
            <el-option :label="item.subject_name" :value="item.subject_id" v-for="item in projectlist" :key="item.subject_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="全科学员标签" prop="course_type_id">
          <el-select v-model="data.course_type_id" placeholder="请选择网课类型">
            <el-option :label="item.name" :value="item.course_type_id" v-for="item in projectlist" :key="item.course_type_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下一考季复读课程" prop="course_type_id">
          <el-select v-model="data.course_type_id" placeholder="请选择网课类型">
            <el-option :label="item.name" :value="item.course_type_id" v-for="item in projectlist" :key="item.course_type_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下一考季升级课程" prop="course_type_id">
          <el-select v-model="data.course_type_id" placeholder="请选择网课类型">
            <el-option :label="item.name" :value="item.course_type_id" v-for="item in projectlist" :key="item.course_type_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下一考季试听课程" prop="course_type_id">
          <el-select v-model="data.course_type_id" placeholder="请选择网课类型">
            <el-option :label="item.name" :value="item.course_type_id" v-for="item in projectlist" :key="item.course_type_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="首次开启时间" prop="value1">
          <el-date-picker
            v-model="data.value1"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="二次开启时间" prop="value2">
          <el-date-picker
            v-model="data.value2"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="last-form-item">
          <el-button @click="closeDialog('ruleForm')">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">
            确定
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
</template>

<script>
// import Vue from '../../common/vue.js'
export default {
  props: {
    dialog: {
      default:false,
      type:Boolean
    },
    type: {
      type:String
    },
    data: {
      course_name: {
        type:String
      },
      project_id: {
        type: String
      },
      subject_id: {
        type: String
      },
      course_type_id: {
        type: String
      },
      value1: {
        type: String
      },
      value2: {
        type: String
      }
    }
  },
  data () {
    var validateTime = (rule, value, callback)=>{
      if(this.data.value2 && this.data.value2){
        if(Date.parse(this.data.value1)>Date.parse(this.data.value2)){
          callback(new Error('二次开启时间必须大于首次开启时间'));
        }else{
          callback();
        }
      }else{
        callback();
      }
    };
    return {
      ruleForm: {
        course_name: "",
        project_id: "",
        subject_id: "",
        course_type_id: ""
      },
      rules:{
        course_name:[{required:true,message:'请输入课程名称',trigger:'blur'}],
        project_id:[{required:true,message:'请输入课程名称',trigger:'blur'}],
        subject_id:[{required:true,message:'请输入科目名称',trigger:'blur'}],
        course_type_id:[{required:true,message:'请输入课程类型',trigger:'blur'}],
        value1:[
          {required:true,message:'请输入开始时间',trigger:'blur'},
          {validator: validateTime, trigger:'change'}
        ],
        value2:[
          {required:true,message:'请输入结束时间',trigger:'blur'},
          {validator: validateTime, trigger:'change'}
        ]
      },
      projectlist: []
    }
  },
  methods: {
    //关闭弹层
    closeDialog(formName) {
     this.$emit('closeDialog');
    },
    submitForm(ruleForm){
      console.log("保存")
      console.log(this.data);
      this.$refs[ruleForm].validate((valid)=>{
        if(valid){
          console.log("验证成功");
          if(this.type === "add"){//新增还是修改
            this.$emit('dialogSave');
          }else{
            this.$emit("dialogChageForm");
          }
        }
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang='less'>
  .cfa-course-dialog {
    .el-dialog__header {
      text-align: center;
    }
  }
  .last-form-item {
    text-align: center;
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
</style>
