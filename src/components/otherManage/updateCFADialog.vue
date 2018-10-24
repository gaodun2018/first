<template>
  <el-dialog class="addCourse cfa-course-dialog" title="新建一次续派课" :visible.sync="dialog" @close="closeDialog('ruleForm')">
      <el-form :model="data" ref="ruleForm" label-width="130px" class="demo-ruleForm">
        <el-form-item label="任务名称" prop="course_name">
          <el-input v-model="ruleForm.course_name"></el-input>
        </el-form-item>
        <el-form-item label="考试" prop="project_id">
          <el-select v-model="ruleForm.project_id" placeholder="请选择考试">
            <el-option label="CFA-Level1 考试反馈" value="1"></el-option>
            <el-option label="CFA-Level2 考试反馈" value="1"></el-option>
            <el-option label="CFA-Level3 考试反馈" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="已学课程" prop="subject_id">
          <el-select v-model="ruleForm.subject_id" placeholder="请选择所属科目">
            <el-option label="不限科目" value="0"></el-option>
            <el-option :label="item.subject_name" :value="item.subject_id" v-for="item in projectlist" :key="item.subject_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="全科学员标签" prop="course_type_id">
          <el-select v-model="ruleForm.course_type_id" placeholder="请选择网课类型">
            <el-option :label="item.name" :value="item.course_type_id" v-for="item in projectlist" :key="item.course_type_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下一考季复读课程" prop="course_type_id">
          <el-select v-model="ruleForm.course_type_id" placeholder="请选择网课类型">
            <el-option :label="item.name" :value="item.course_type_id" v-for="item in projectlist" :key="item.course_type_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下一考季升级课程" prop="course_type_id">
          <el-select v-model="ruleForm.course_type_id" placeholder="请选择网课类型">
            <el-option :label="item.name" :value="item.course_type_id" v-for="item in projectlist" :key="item.course_type_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下一考季试听课程" prop="course_type_id">
          <el-select v-model="ruleForm.course_type_id" placeholder="请选择网课类型">
            <el-option :label="item.name" :value="item.course_type_id" v-for="item in projectlist" :key="item.course_type_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="首次开启时间" prop="course_type_id">
          <el-date-picker
            v-model="ruleForm.value1"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="二次开启时间" prop="course_type_id">
          <el-date-picker
            v-model="ruleForm.value2"
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
      type:JSON
    }
  },
  data () {
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
      this.$refs[ruleForm].validate((valid)=>{
        if(valid){
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
