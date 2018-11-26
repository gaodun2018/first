<template>
  <el-dialog class="addCourse cfa-course-dialog" :title="type== 'add'?'新增续派课任务':'修改续派课任务'" :visible.sync="dialog" @close="closeDialog('ruleForm')" :before-close="closeDialog">
      <el-form :model="data" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
        <div class="cfa-box">
        <el-form-item label="任务名称" prop="name">
          <el-input v-model="data.name"  style="width:90%;" placeholder="请输入任务名称"></el-input>
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
            placeholder="请选择已学课程过期时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="全科学员标签" prop="tag">
          <div class="tree-box">
            <div class="input" @click="isTag = !isTag">
              <div class="plac" v-if="list.length === 0">请选择全科学员标签</div>
              <div class="item" v-for="p in list" :key="p.id">{{p.name}}</div>
            </div>
            <div class="child" v-show="isTag">
              <el-tree
                ref="tree"
                @check-change="chooseTag"
                :data="remoteTag"
                show-checkbox
                node-key="id"
                highlight-current
                :props="defaultProps">
              </el-tree>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="下一考季复读课程" :prop="'repeat'">
          <el-select
            style="width:60%;min-width:450px;"
            v-model="data.repeat"
            filterable
            remote
            clearable
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
            clearable
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
            clearable
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
            placeholder="请选择首次开启时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="二次开启时间" prop="again_time">
          <el-date-picker
            v-model="data.again_time"
            type="date"
            placeholder="请选择二次时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="结束时间" prop="end_time">
          <el-date-picker
            v-model="data.end_time"
            type="date"
            placeholder="请选择结束时间">
          </el-date-picker>
        </el-form-item>
        </div>
        <el-form-item class="last-form-item">
          <el-button @click="closeDialog('ruleForm')">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
      <!-- <div @click="ceshi">测试按钮</div> -->
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
    },
    remoteTag:{
      type:Array
    },
    firstUpdate:{
      type:String
    }
  },
  data () {
    var validateCourse = (rule,value,callback) => {
      if(!value && this.data.exam != 3) {
        return callback("请选择升级课程")
      }
      callback();
    }
    var validateCourse2 = (rule,value,callback) => {
      if(!value && this.data.exam != 3) {
        return callback("请选择试听课程")
      }
      callback();
    }
    var validateChoose = (rule,value,callback) => {
      for(let i= 0;i< this.selectedList.length;i++){
        if(value.includes(Number(this.selectedList[i])) && !this.updateCourse.includes(Number(this.selectedList[i]))){
          callback("该课程在其他任务中已存在，不可重复选择~");
        }
      }
      callback();
    }
    return {
      isTag:false,
      list:[],
      loading:false,//远程搜索loading
      rules:{
        name:[{required:true,message:'请输入任务名称',trigger:'change'},{max:30,message:'最多输入30个字符',trigger:'change'}],
        exam:[{required:true,message:'请选择考试名称',trigger:'change'}],
        expire:[{required:true,message:'请选择已学课程过期时间',trigger:'change'}],
        end_time:[{required:true,message:'请选择结束时间',trigger:'change'}],
        tag:[{required:true,message:'请选择全科学员标签',trigger:'change'}],
        repeat:[{required:true,message:'请选择复读课程',trigger:'change'}],
        upgrade:[{ validator: validateCourse, trigger: 'change' }],
        auditions:[{ validator: validateCourse2, trigger: 'change' }],
        courses:[{required:true,message:'请选择已学课程',trigger:'change'},{validator:validateChoose,trigger:'change'}],
        first_time:[{required:true,message:'请选择首次开启时间',trigger:'change'}],
        again_time:[{required:true,message:'请选择二次开启时间',trigger:'change'}]
      },
      projectlist: [],
      defaultProps: {
        children: 'tagSubList',
        label: 'name'
      }
    }
  },
  computed:{
    updatedTag(){
      return this.data.tag;
    }
  },
  methods: {
    // 选择tag标签
    chooseTag(data) {
      this.data.tag = [];
      this.list = this.$refs.tree.getCheckedNodes().filter(o=>{
        if(!o.appid){
          this.data.tag.push(o.id);
          return o;
        }
      });
    },
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
     this.isTag = false;
     this.$refs.tree.setCheckedKeys([]);
     this.$emit('closeDialog');
    },
    submitForm(ruleForm){
      this.$refs[ruleForm].validate((valid)=>{
        if(valid){
          let judgeTime = this.judgeTime();
          if(judgeTime.ok){
            this.$message({
              message:judgeTime.msg,
              type:'warning'
            })
            return;
          }
          let judgeCourse = this.judgeCourse()
          if(judgeCourse.ok){
            this.$message({
              message: judgeCourse.msg,
              type:"warning"
            })
            return;
          }
          if(this.type === "add"){//新增还是修改
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

      if(first>=second){
        return {ok:true,msg:'已学课程过期时间必须小于首次开启时间，请修改'};
      }else if(second>=third){
        return {ok:true,msg:'首次开启时间必须小于二次开启时间，请修改'};
      } else if(third>=forth){
        return {ok:true,msg:'二次开启时间必须小于结束时间，请修改'};
      }else{
        return {ok:false,msg:''};
      }
    },
    // 判断课程
    judgeCourse(){
      let first = this.data.repeat;
      let second = this.data.upgrade?this.data.upgrade:-1;
      let third = this.data.auditions?this.data.auditions:0;
      console.log(this.data.courses, first , second,third)
      for(let i=0;i<this.data.courses.length;i++){
        if(this.data.courses[i] == first){
          return {ok:true,msg:"复读课程和已学课程ID有重复，请检查"};
        }else if(this.data.courses[i] == second) {
          console.log('eeeee')
          return {ok:true,msg:"升级课程和已学课程ID有重复，请检查"};
        }else if (this.data.courses[i] == third) {
          return {ok:true,msg:"试听课程和已学课程ID有重复，请检查"};
        }
      }
      if(first == second){
        return {ok:true,msg:"复读课程和升级课程ID有重复，请检查"};
      }else if(second == third){
        return {ok:true,msg:"升级课程和试听课程ID有重复，请检查"};
      }else if(first == third){
        return {ok:true,msg:"复读课程和试听课程ID有重复，请检查"};
      }
      return {ok:false,msg:""};
    },
    checkedKeys(val){//选中数组
      this.$refs.tree.setCheckedKeys(val);
    }

  },
  mounted () {
  },
  async created() {
  },
  updated() {
    if(this.firstUpdate === 'update'){
      this.$nextTick(this.checkedKeys(this.data.tag));
      this.$emit("changeType")
    }
    if(this.firstUpdate === "add"){
      this.list = [];
      this.$emit("changeType")
    }
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
  .tree-box{
    position: relative;

    .input{
      border: 1px solid #dcdfe6;
      min-height: 40px;
      border-radius: 5px;
      box-sizing: border-box;
      padding-left: 13px;
      padding: 0 10px;
      .item{
        display:inline-block;
        padding: 0 6px;
      }
      .plac{
        color: #c0c4cc;
      }
    }
    .child{
      width: 220px;
      border: 2px solid #ebeef5;
      position: absolute;
      z-index: 10;
      margin-top: 10px;
      height: 210px;
      overflow-y: scroll;
    }
  }
</style>
