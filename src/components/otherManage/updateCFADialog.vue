<template>
  <el-dialog class="addCourse cfa-course-dialog" title="新建一次续派课" :visible.sync="dialog" @close="closeDialog('ruleForm')" :before-close="closeDialog">
      <el-form :model="data" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
        <div class="cfa-box">
        <el-form-item label="任务名称" prop="name">
          <el-input v-model="data.name"  style="width:90%;"></el-input>
        </el-form-item>
        <el-form-item label="考试" prop="exam">
          <el-select v-model="data.exam" placeholder="请选择考试" @change="changeExam">
            <el-option label="CFA-Level1 考试反馈" value="1"></el-option>
            <el-option label="CFA-Level2 考试反馈" value="2"></el-option>
            <el-option label="CFA-Level3 考试反馈" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="已学课程" prop="courses">
          <el-select
            style="width:60%;min-width:450px;"
            v-model="data.courses"
            filterable
            multiple
            remote
            reserve-keyword
            placeholder="请选择已学课程"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              v-for="item in remoteList"
              :key="item.course_id"
              :label="`${item.course_name}-(课程id：${item.course_id})`"
              :value="item.course_id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="已学课程过期时间" prop="expire">
          <el-date-picker
            v-model="data.expire"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="全科学员标签" prop="tag">
          <!-- <el-select v-model="data.tag" placeholder="请选择网课类型"  style="width:50%;">
            <el-option :label="item.name" :value="item.course_type_id" v-for="item in projectlist" :key="item.course_type_id"></el-option>
          </el-select> -->
          <el-input v-model="data.tag"  style="width:50%;"></el-input>
        </el-form-item>
        <el-form-item label="下一考季复读课程" :prop="'repeat'">
          <el-select
            style="width:60%;min-width:450px;"
            v-model="data.repeat"
            filterable
            remote
            reserve-keyword
            placeholder="请选择复读课程"
            value-key="course_id"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              v-for="item in remoteList"
              :key="item.course_id"
              :label="`${item.course_name}-(课程id：${item.course_id})`"
              :value="item.course_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下一考季升级课程" prop="upgrade">
          <el-select
            style="width:60%;min-width:450px;"
            v-model="data.upgrade"
            filterable
            remote
            placeholder="请选择升级课程"
            :remote-method="remoteMethod"
            :disabled="this.data.exam == 3"
            :loading="loading">
            <el-option
              v-for="item in remoteList"
              :key="item.course_id"
              :label="`${item.course_name}-(课程id：${item.course_id})`"
              :value="item.course_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下一考季试听课程" prop="auditions">
          <el-select
            style="width:60%;min-width:450px;"
            v-model="data.auditions"
            filterable
            remote
            placeholder="请选择试听课程"
            :remote-method="remoteMethod"
            :disabled="this.data.exam == 3"
            :loading="loading">
            <el-option
              v-for="item in remoteList"
              :key="item.course_id"
              :label="`${item.course_name}-(课程id：${item.course_id})`"
              :value="item.course_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="首次开启时间" prop="first_time">
          <el-date-picker
            v-model="data.first_time"
            type="date"
            placeholder="选择二次开启日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="二次开启时间" prop="again_time">
          <el-date-picker
            v-model="data.again_time"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="结束时间" prop="end_time">
          <el-date-picker
            v-model="data.end_time"
            type="date"
            placeholder="选择结束日期">
          </el-date-picker>
        </el-form-item>
        </div>
        <el-form-item class="last-form-item">
          <el-button @click="closeDialog('ruleForm')">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
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
    addloading:{
      type:Boolean
    },
    data: {
      name: {
        type:String
      },
      exam: {
        type: String
      },
      tag: {
        type: Array
      },
      repeat: {
        type: Number
      },
      upgrade: {
        type: String
      },
      auditions: {
        type: String
      },
      first_time:{
        type:  String
      },
      again_time:{
        type: String
      },
      courses:{
        type: Array
      },
      expire:{
        type: String
      },
      end_time:{
        type: String
      }
    },
    remoteList:{
      type:Array
    },
    selectedList:{
      type:Array
    },
    updateCourse:{
      type:Array
    }
  },
  data () {
    var validateCourse = (rule,value,callback) => {
      if(!value && this.data.exam != 3) {
        return callback("请选择对应课程")
      }
      callback();
    }
    var validateChoose = (rule,value,callback) => {
      console.log(this.selectedList,value)
      for(let i= 0;i< this.selectedList.length;i++){
        if(value.includes(Number(this.selectedList[i])) && !this.updateCourse.includes(Number(this.selectedList[i]))){
          callback("这个课程在数据库里面已经有了哦");
        }
      }
      callback();
    }
    return {
      loading:false,//远程搜索loading
      rules:{
        name:[{required:true,message:'请输入课程名称',trigger:'blur'}],
        exam:[{required:true,message:'请选择考试名称',trigger:'blur'}],
        expire:[{required:true,message:'请选择已学课程过期时间',trigger:'blur'}],
        end_time:[{required:true,message:'请选择结束时间',trigger:'blur'}],
        tag:[{required:true,message:'请选择全科学员标签',trigger:'blur'}],
        repeat:[{required:true,message:'请选择复读课程',trigger:'blur'}],
        // upgrade:[{required:true,message:'请选择升级课程',trigger:'blur'}],
        // auditions:[{required:true,message:'请选择试听课程',trigger:'blur'}],
        upgrade:[{ validator: validateCourse, trigger: 'blur' }],
        auditions:[{ validator: validateCourse, trigger: 'blur' }],
        courses:[{required:true,message:'请选择已学课程',trigger:'blur'},{validator:validateChoose,trigger:'change'}],
        first_time:[{required:true,message:'请选择首次次开启时间',trigger:'blur'}],
        again_time:[{required:true,message:'请选择二次开启时间',trigger:'blur'}]
      },
      projectlist: []
    }
  },
  methods: {
    // 选择试卷种类
    changeExam(val){
      if(val == 3){
        this.data.auditions = "";
        this.data.upgrade = "";
      }
    },
    //关闭弹层
    closeDialog(formName) {
     this.$refs.ruleForm.resetFields();
     this.$emit('closeDialog');
    },
    submitForm(ruleForm){
      this.$refs[ruleForm].validate((valid)=>{
        if(valid){
          console.log("验证成功");
          console.log(this.data);
          if(this.judgeTime()){
            this.$message({
              message:'请注意你选择的时间顺序，否则无法保存',
              type:'warning'
            })
            return;
          }
          if(this.judgeCourse()){
            this.$message({
              message:'请注意你选择的课程有重复，否则无法保存',
              type:"warning"
            })
            return;
          }
          if(this.type === "add"){//新增还是修改
            console.log("新增")
            // this.addloading = true;
            this.$emit('save',this.data);
          }else{
            this.$emit("dialogChangeForm",this.data);
          }
        }
      })
    },
    // 远程搜索课程
    async remoteMethod(query) {
      this.$emit("remoteMethod",query);
    },
    // 判断时间
    judgeTime(){
      let first = Date.parse(this.data.expire);
      let second = Date.parse(this.data.first_time);
      let third = Date.parse(this.data.again_time);
      let forth = Date.parse(this.data.end_time);
      if(first>second || first>third || first>forth || second>third || second>forth || third>forth){
        return true;
      }else{
        return false;
      }
    },
    // 判断课程
    judgeCourse(){
      let first = this.data.repeat;
      let second = this.data.auditions?this.data.auditions:0;
      let third = this.data.upgrade?this.data.upgrade:-1;
      if(first == second || first == third || second == third){
        return true;
      }
      for(let i=0;i<this.data.courses.length;i++){
        if(this.data.courses[i] == first || this.data.courses[i] == second || this.data.courses[i] == third){
          return true;
        }
      }
      return false;
    }

  },
  mounted () {
  },
  async created() {
  }
}
</script>

<style lang='less'>
  .cfa-course-dialog {
    .cfa-box{
      width: 100%;
      height: 450px;
      overflow-y: scroll;
    }
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
