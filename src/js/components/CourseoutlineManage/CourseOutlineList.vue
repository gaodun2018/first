<template>
  <div class="module-edu-content permission-courseoutline">

    <div class="search_tools" style="overflow: hidden;margin-bottom: 22px;">
      <el-row>
        <el-col :sm="24">
          <div class="button_group_t">
            <span>项 目:</span>
            <span class="clitem" :class="[clver === '0'||clver === 0 ?'current':'']" @click="outlinechange('0')">全部</span>
            <template v-for="(rev,index) in projectlist">
                <span class="clitem" :class="[rev.project_id === clver ?'current':'']" @click="outlinechange(rev.project_id,index)">{{rev.project_name}}</span>
            </template>
          </div>
          <div class="button_group_b">
            <span> 科 目:</span>
            <span class="clitem" :class="[clversm === '0'||clversm === 0 ?'current':'']" @click="mulchange('0')">全部</span>
            <template v-for="(revs,index) in subjectlist">
              <span class="clitem" :class="[revs.subject_id === clversm ?'current':'']" @click="mulchange(revs.subject_id,index)">{{revs.subject_name}}</span>
            </template>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" align="bottom">
        <el-col :sm="12">
          <el-row>
            <div class="select-search">
              <el-select v-model="selectvalue" @change="selectval" placeholder="请选择" size="small">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </el-row>
        </el-col>
        <el-col :sm="12">
          <el-row type="flex" justify="end">
            <div class="input-search">
              <el-input placeholder="请输入课程大纲ID、名称" size="small" icon="search" v-model="input2"
                        :on-icon-click="handleIconClick" @keyup.native.enter="handleIconClick"></el-input>
              <el-button type="primary" size="small" @click="addCourseOutline">新建一个课程大纲</el-button>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <div class="edu_table">
      <el-table ref="multipleTable" v-loading="loading" :row-class-name="tableRowClassName" @selection-change="handleSelectionChange" border :data="CourseLineList" style="width: 100%">
        <el-table-column prop="id" label="大纲ID" min-width="100">
        </el-table-column>
        <el-table-column prop="title" label="课程大纲名称" min-width="200">
        </el-table-column>
        <el-table-column prop="subject.project.name" label="所属项目" min-width="100">
        </el-table-column>
        <el-table-column prop="subject.name" label="所属科目" min-width="125">
        </el-table-column>
        <el-table-column prop="num" label="使用" min-width="150">
        </el-table-column>
        <el-table-column label="所属状态" min-width="115">
          <template scope="scope">
            <span v-if="scope.row.status == 0">启用</span>
            <span class="rowtype" v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="155">
          <template scope="scope">
            <el-button type="text" @click="UpdateOutlineTitle(scope.$index, scope.row)">编辑课程大纲</el-button>
            <!-- <el-button type="text"><router-link to="/CourseoutlineManage/CourseOutline">查看大纲</router-link></el-button> -->
            <el-button type="text"><router-link to="/CourseoutlineManage/CourseModule">查看大纲</router-link></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="edu-pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[15, 30,50]" :page-size="page_size" :current-page="pagenum" :current-page.sync="pagenum" layout="total, sizes, prev, pager, next, jumper" :total="courselinenum">
        </el-pagination>
      </div>
    </div>

    <el-dialog :title="dialogCourse ? '新建课程大纲' : '编辑课程大纲'" class="tabplane" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="课程大纲名称" prop="title">
          <el-input class="coursetxt" v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="所属项目" prop="project_id">
          <el-select v-model="ruleForm.project_id" @change="checkproject" placeholder="请选择所属项目">
            <el-option v-for="(rev,index) in projectlist" :key="rev.project_name" :label="rev.project_name" :value="rev.project_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属科目" prop="subject_id">
          <el-select v-model="ruleForm.subject_id" :disabled="!issubject" placeholder="请选择所属科目">
            <el-option v-for="(com,index) in boxsubject" :label="com.subject_name" :value="com.subject_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用" prop="status">
          <el-select v-model="ruleForm.status" placeholder="是否启用">
            <el-option label="是" value="0"></el-option>
            <el-option label="否" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="coursebtn">
          <el-button type="primary" v-if="substatus == 'addoutline'" @click="submitForm('ruleForm')">确 定</el-button>
          <el-button type="primary" v-if="substatus == 'updateoutline'" @click="updateForm('ruleForm')">保 存</el-button>
          <el-button @click="resetForm('ruleForm')">重 置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<style>

</style>
<script>
  import Vue from 'vue';
  import {getProjectSubject,CourseSyllabuses,UpdateCourseSyllabus} from '../../api/outline.js';
  import {CourseSyllabus} from '../../api/fromAxios';

  export default {
    components: {},
    data() {
      return {
        input2:'',
        CourseLineList:[],
        courselinenum:'',
        ruleForm: {
          title:'',
          project_id:'',
          subject_id:'',
          status:''
        },
        rules: {
          title: [
            { required: true, message: '课程大纲名称', trigger: 'blur' }
          ],
          project_id: [
            { required: true, message: '所属项目', trigger: 'change' }
          ],
          subject_id: [
            { required: true, message: '所属科目', trigger: 'change' }
          ],
          status: [
            { required: true, message: '是否启用', trigger: 'change' }
          ]
        },
        rulesback:{},
        dialogFormVisible: false,
        options: [{
          value: '',
          label: '全部状态'
        }, {
          value: '0',
          label: '启用'
        }, {
          value: '1',
          label: '禁用'
        }],
        selectvalue:'',
        clver:"0",
        clversm:"0",
        projectlist:[],
        subjectlist:[],
        issubject:false,
        boxsubject:[],
        pagenum:'',
        page_size:'',
        flag:true,
        flagtwo:true,
        projectlid:'',
        subjectlid:'',
        currentIndex:'',
        substatus:'addoutline',
        outlineid:'',
        dialogCourse:true
      }
    },
    methods: {
      checkproject(value){
        console.log(value)
        this.issubject = true;
        for(let reg of this.projectlist){
          if(reg.project_id == value){
            let subjectall = [...reg.subject_list];
            subjectall.unshift({
              subject_id:'0',
              subject_name:'全部'
            })
            this.boxsubject = subjectall;
          }
        }
      },
      coursesubmit(ruleForm){
        // 添加一个课程大纲提交
        CourseSyllabus({...ruleForm}).then(res=>{
          if(res.data.status == 0){
            this.dialogFormVisible = false;
            if(res.message == ""){
              res.message = "已添加"
            }
            this.$message({
              message: res.message,
              type: 'success'
            });
          }
        }).catch( error => {
          console.log(error);
        });
      },
      submitForm(formName) {
        // 添加一个课程大纲
        this.rules = this.rulesback;
        if(this.substatus == 'addoutline'){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.coursesubmit(this.ruleForm)
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      },
      courseupdate(outlineid,ruleForm){
        // 修改一个课程大纲提交
        UpdateCourseSyllabus(outlineid,{...ruleForm}).then(res=>{
          if(res.status == 0){
            this.dialogFormVisible = false;
            if(res.message == ""){
              res.message = "已修改";
              this.getCourseSyllabuses(1,this.page_size)
            }
            this.$message({
              message: res.message,
              type: 'success'
            });
          }
        }).catch( error => {
          console.log(error);
        });
      },
      updateForm(formName) {
        // 修改一个课程大纲
        if(this.substatus == 'updateoutline'){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              console.log(this.ruleForm)
              this.courseupdate(this.outlineid,this.ruleForm)
              this.dialogFormVisible = false
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      },
      addCourseOutline(){
        this.substatus = 'addoutline';
        this.dialogCourse = true;
        this.ruleForm = {
          title:'',
          project_id:'',
          subject_id:'',
          status:''
        }
        this.rulesback = this.rules;
        this.rules = {
          title: [
            { required: false, message: '课程大纲名称', trigger: 'blur' }
          ],
          project_id: [
            { required: false, message: '所属项目', trigger: 'change' }
          ],
          subject_id: [
            { required: false, message: '所属科目', trigger: 'change' }
          ],
          status: [
            { required: false, message: '是否启用', trigger: 'change' }
          ]
        }
        this.dialogFormVisible = true;
        this.issubject = false;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      outlinechange(reid,index){
        this.clver = reid;
        this.projectlid = reid
        this.clversm = '0';
        if(this.clver == '0'){
          this.subjectlist = [];
        }else{
          this.subjectlist = this.projectlist[index].subject_list;
        }
        this.subjectlid = '0';
        this.selectvalue = '';
        this.options.value = '';
        this.input2 = "";
        this.getCourseSyllabuses(1,this.page_size);
      },
      mulchange(reid){
        this.clversm = reid;
        this.subjectlid = reid;
        this.input2 = "";
        this.getCourseSyllabuses(1,this.page_size);
      },
      async getProjectSubject(projectid){
        let ret = await getProjectSubject();
        if(ret.status == 0){
          this.projectlist = ret.result;
          this.boxsubject = ret.result;
        }
      },
      selectval(value){ // 状态搜索
        this.selectvalue = value;
        this.getCourseSyllabuses(1,this.page_size);
        this.input2 = "";
      },
      handleIconClick(){   // 搜索框
        console.log(this.input2)
        this.subjectlid = '0';
        this.projectlid = '0';
        this.clversm = '0';
        this.clver = '0';
        this.selectvalue = '';
        if(this.clver == '0'){
          this.subjectlist = [];
        }else{
          this.subjectlist = this.projectlist[index].subject_list;
        }
        this.getCourseSyllabuses();
      },
      async getCourseSyllabuses(pagenum,page_size){
        if(!pagenum){        //不传页面  切换科目  查看回放
          this.flag = false;
          this.flagtwo = false;
          this.pagenum = 1;
        }
        this.page_size = page_size ? page_size : '15';
        let ret = await CourseSyllabuses({
          page:this.pagenum,
          page_size:this.page_size,
          project_id:this.projectlid,
          subject_id:this.subjectlid,
          status:this.selectvalue,
          keyword:this.input2
        });
        this.flag = true;
        this.flagtwo = true;
        if(ret.status == 0){
          this.CourseLineList = ret.result.list;
          this.courselinenum = ret.result.total;
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagenum = 0;
        this.page_size = val;
        if(!this.flagtwo){
          this.getCourseSyllabuses(1,val);
        }
        //flagtwo
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        if(this.flag){
          this.getCourseSyllabuses(val,this.page_size);
        }
      },
      UpdateOutlineTitle(index, row){
        // let arr = {...this.CourseLineList[index]}
        // let status;
        this.substatus = 'updateoutline';
        this.dialogCourse = false;
        this.issubject = true;
        if(row.status == 1){
          status = "否"
        }else if(row.status == 0){
          status = "是"
        }

        this.outlineid = row.id;
        this.ruleForm = {
          title:row.title,
          project_id:row.subject.project.id+'',
          subject_id:row.subject.id+'',
          status:row.status+'',
        }

        this.currentIndex = index;
        this.dialogFormVisible = true;
      }
    },
    computed: {},
    mounted() {
      this.getProjectSubject();
      this.getCourseSyllabuses();
    },
    created() {

    }
  }
</script>