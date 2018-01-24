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
              <el-input placeholder="请输入课程大纲ID、名称" size="small" icon="search" v-model="searchinput"
                        :on-icon-click="handleIconClick" @keyup.native.enter="handleIconClick"></el-input>
              <el-button type="primary" size="small" @click="addCourseOutline">新建一个课程大纲</el-button>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <div class="edu_table">
      <el-table ref="multipleTable" v-loading="loading" :row-class-name="tableRowClassName" @selection-change="handleSelectionChange" border :data="CourseLineList" style="width: 100%">
        <el-table-column prop="id" label="大纲ID" min-width="100" fixed>
        </el-table-column>
        <el-table-column prop="title" label="课程大纲名称" min-width="200">
        </el-table-column>
        <el-table-column prop="project.name" label="所属项目" min-width="100">
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
        <el-table-column label="操作" min-width="200" fixed="right" align="center">
          <template scope="scope">
            <el-button type="text" @click="UpdateOutlineTitle(scope.$index, scope.row)">基本设置</el-button>
            <el-button type="text" @click="checkSyllabus(scope.$index, scope.row)">编辑大纲内容</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="edu-pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[15, 30,50]" :page-size="page_size" :current-page="currentPage" layout="total, sizes, prev, pager, next, jumper" :total="courselinenum">
        </el-pagination>
      </div>
    </div>

    <el-dialog :title="dialogCourse ? '新建课程大纲' : '编辑课程大纲'" class="tabplane" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="课程大纲名称" prop="title" :rules="filter_rules({required:true,type:'isAllSpace',maxLength:100})">
          <el-input class="coursetxt" v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="所属项目" prop="project_id" :rules="[ { required: true, message: '请选择所属项目', trigger: 'change' }]">
          <el-select v-model="ruleForm.project_id" @change="checkproject" placeholder="请选择所属项目">
            <el-option v-for="(rev,index) in projectlist" :key="rev.project_name" :label="rev.project_name" :value="rev.project_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属科目" prop="subject_id" :rules="[ { required: true, message: '请选择所属科目', trigger: 'change' }]">
          <el-select v-model="ruleForm.subject_id" :disabled="!issubject" placeholder="请选择所属科目">
            <el-option v-for="(com,index) in boxsubject" :label="com.subject_name" :value="com.subject_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用" prop="status" :rules="[ { required: true, message: '请选择是否启用', trigger: 'change' }]">
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
        searchinput:'',
        CourseLineList:[],
        courselinenum:'',
        ruleForm: {
          title:'',
          project_id:'',
          subject_id:'',
          status:''
        },
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
        clver:"0",     //项目id
        clversm:"0",   //科目id
        projectlist:[],
        subjectlist:[],
        issubject:false,
        boxsubject:[],
        currentPage:1,   //第几页 当前页码
        page_size:15,    //一页显示多少
        currentIndex:'',
        substatus:'addoutline',
        outlineid:'',
        dialogCourse:true,
        selectcur:true
      }
    },
    methods: {
      checkproject(value){
        console.log(this.selectcur)
        if(this.selectcur){
          for(let reg of this.projectlist){
            if(reg.project_id == value){
              this.issubject = true;
              let subjectall = [...reg.subject_list];
              subjectall.unshift({
                subject_id:'0',
                subject_name:'全部'
              })
              this.boxsubject = subjectall;
              this.ruleForm.subject_id = '0';
            }
          }
          this.selectcur = true;
        }
      },
      async coursesubmit(ruleForm){
        // 添加一个课程大纲提交
        let ret = await CourseSyllabus({...ruleForm});
        console.log(ret);
        if(ret.status == 0){
          this.dialogFormVisible = false;
          this.clver = "0";    //项目id
          this.clversm = "0";   //科目id
          this.currentPage = 1;
          this.page_size = 15;
          this.getCourseSyllabuses();
          this.$message({
            message: '已添加成功',
            type: 'success'
          });
        }
      },
      submitForm(formName) {
        // 添加一个课程大纲
        if(this.substatus == 'addoutline'){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.coursesubmit(this.ruleForm)
            } else {
              return false;
            }
          });
        }
      },
      async courseupdate(){
        // 修改一个课程大纲提交
        let ret = await UpdateCourseSyllabus(this.outlineid,{...this.ruleForm});
        console.log(ret);
        if(ret.status == 0){
          this.dialogFormVisible = false;
          this.clver = "0";    //项目id
          this.clversm = "0";   //科目id
          this.currentPage = 1;
          this.page_size = 15;
          this.getCourseSyllabuses()
          this.outlineid = '';
          this.$message({
            message: "修改大纲成功",
            type: 'success'
          });
        }
      },
      updateForm(formName) {
        // 修改一个课程大纲
        if(this.substatus == 'updateoutline'){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.courseupdate();
            } else {
              return false;
            }
          });
        }
      },
      addCourseOutline(){
        // 新增一个课程大纲 弹出框
        this.substatus = 'addoutline';
        this.dialogCourse = true;
        this.ruleForm = {
          title:'',
          project_id:'',
          subject_id:'',
          status:''
        }
        this.dialogFormVisible = true;
        this.issubject = false;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      outlinechange(reid,index){
        this.clver = reid;
        if (reid == '0') {
          this.subjectlist = [];
        } else {
          this.subjectlist = this.projectlist[index].subject_list;
        }
        this.clversm = '0';  //科目设置为0
        this.pageSize = 15;
        this.currentPage = 1;
        this.searchinput = '';
        this.selectvalue = '';
        this.getCourseSyllabuses(1,this.page_size);
      },
      mulchange(reid){
        this.clversm = reid;
        this.pageSize = 15;
        this.currentPage = 1;
        this.searchinput = '';
        this.getCourseSyllabuses();
      },
      async getProjectSubject(projectid){
        let ret = await getProjectSubject();
        if(ret.status == 0){
          this.projectlist = ret.result;
        }
      },
      selectval(value){ // 状态搜索
        this.selectvalue = value;
        this.getCourseSyllabuses(1,this.page_size);
        this.searchinput = "";
      },
      handleIconClick(){   // 搜索框
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
      //拉去大纲列表
      async getCourseSyllabuses(){
        console.log(this.currentPage);
        let ret = await CourseSyllabuses({
          page:this.currentPage,
          page_size:this.page_size,
          project_id:this.clver,
          subject_id:this.clversm,
          status:this.selectvalue,
          keyword:this.searchinput
        });
        if(ret.status == 0){
          this.CourseLineList = ret.result.list;
          this.courselinenum = ret.result.total;
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.page_size = val;
        this.currentPage = 1;
//        this.getCourseSyllabuses();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getCourseSyllabuses();
      },
      UpdateOutlineTitle(index, row){
        // 修改一个课程大纲 弹出框
          console.log(row);
        this.substatus = 'updateoutline';
        this.dialogCourse = false;
        this.issubject = true;
        this.outlineid = row.id;
        if(row){
          this.selectcur = false;
        }
        this.ruleForm = {
          title:row.title,
          project_id:row.project.id+'',
          subject_id:row.subject.id+'',
          status:row.status+'',
        }
        for(var i = 0; i < this.projectlist.length; i++){
          if(this.projectlist[i].project_id == row.project.id){
            let subjectall = [...this.projectlist[i]['subject_list']];
            subjectall.unshift({
              subject_id:'0',
              subject_name:'全部'
            })
            this.boxsubject = subjectall;
          }
        }
        this.selectcur = true;
        this.currentIndex = index;
        this.dialogFormVisible = true;
      },
      //查看大纲按钮
      checkSyllabus(index,row){
        console.log(row);
        if(row.template == null){
          this.$router.replace({
            path:'/CourseOutlineManage/CourseOutline/'+row.id,
          })
        }else{
          this.$router.push({
            path:'/CourseOutlineManage/CourseModule/'+row.id,
          })
        }
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