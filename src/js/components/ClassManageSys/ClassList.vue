<template>
  <div class="module-edu-content permission-courseoutline">

    <div class="search_tools" style="overflow: hidden;margin-bottom: 22px;">
      <el-row>
        <el-col :sm="6">
          <div class="button_group_t">
            <span>项 目:</span>
            <el-select v-model="selproject" @change="checkprojectlist" placeholder="请选择">
              <el-option
                v-for="(rev,index) in projectlist"
                :key="rev.project_id"
                :label="rev.project_name"
                :value="rev.project_id">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :sm="6">
          <div class="button_group_t">
            <span>科 目:</span>
            <el-select v-model="selsubject" @change="checksubjectlist" placeholder="请选择">
              <el-option
                v-for="(revs,index) in subjectlist"
                :key="revs.subject_id"
                :label="revs.subject_name"
                :value="revs.subject_id">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :sm="6">
          <div class="button_group_t">
            <span>学管师:</span>
            <el-select v-model="selteach" placeholder="请选择">
              <el-option
                v-for="(revs,index) in courselist"
                :key="revs.course_id"
                :label="revs.course_name"
                :value="revs.course_id">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :sm="6">
          <div class="button_group_t">
            <el-button type="primary" size="small" @click="addClassModel">新建班级</el-button>
            <el-button type="primary" size="small" @click="addCourseOutline">学员入班</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="edu_table">
      <el-table ref="multipleTable" v-loading="loading" :row-class-name="tableRowClassName" @selection-change="handleSelectionChange" border :data="mmClassList" style="width: 100%">
        <el-table-column prop="class_id" label="班级ID" min-width="60">
        </el-table-column>
        <el-table-column prop="class_name" label="班级名称" min-width="280">
        </el-table-column>
        <el-table-column prop="student_number" label="班级学员" min-width="80">
        </el-table-column>
        <el-table-column prop="course_name" label="课程名称" min-width="240">
        </el-table-column>
        <el-table-column prop="teacher_name" label="学管师" min-width="100">
        </el-table-column>
        <el-table-column label="操作" min-width="155">
          <template scope="scope">
            <el-button type="text" @click="UpdateOutlineTitle(scope.$index, scope.row)">基本设置</el-button>

            <el-button type="text"><router-link :to="'/CourseoutlineManage/CourseOutline/'+scope.row.id">查看详情</router-link></el-button>
            <!-- <el-button type="text"><router-link :to="'/CourseoutlineManage/CourseModule/'+scope.row.id">查看大纲</router-link></el-button> -->

          </template>
        </el-table-column>
      </el-table>
      <div class="edu-pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[15, 30,50]" :page-size="page_size" :current-page="pagenum" :current-page.sync="pagenum" layout="total, sizes, prev, pager, next, jumper" :total="courselinenum">
        </el-pagination>
      </div>
    </div>

    <el-dialog :title="dialogCourse ? '创建班级' : '编辑课程大纲'" class="tabplane" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="班级名称" prop="classname">
          <el-input class="coursetxt" v-model="ruleForm.classname"></el-input>
        </el-form-item>
        <el-form-item label="班主任" prop="teachid">
          <el-select v-model="ruleForm.teachid" @change="checkproject" placeholder="请选择所属项目">
            <el-option v-for="(rev,index) in projectlist" :key="rev.teachname" :label="rev.teachname" :value="rev.teachid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目" prop="project_id">
          <el-select v-model="ruleForm.project_id" @change="checkproject" placeholder="请选择所属项目">
            <el-option v-for="(rev,index) in projectlist" :key="rev.project_name" :label="rev.project_name" :value="rev.project_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="科目" prop="subject_id">
          <el-select v-model="ruleForm.subject_id" :disabled="!issubject" placeholder="请选择所属科目">
            <el-option v-for="(com,index) in boxsubject" :label="com.subject_name" :value="com.subject_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程" prop="course_id">
          <el-select v-model="ruleForm.course_id" :disabled="!issubject" placeholder="请选择所属科目">
            <el-option v-for="(com,index) in boxsubject" :label="com.course_name" :value="com.course_id"></el-option>
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
  import {getProjectSubject,CourseSyllabuses,UpdateCourseSyllabus,   getClassList} from '../../api/outline.js';
  import {CourseSyllabus} from '../../api/fromAxios';

  export default {
    components: {},
    data() {
      return {
        input2:'',
        CourseLineList:[],
        courselinenum:'',
        ruleForm: {
          classname:'',
          teachid:'',
          project_id:'',
          subject_id:'',
          course_id:''
        },
        rules: {
          classname: [
            { required: true, message: '班级名称', trigger: 'blur' }
          ],
          teachid: [
            { required: true, message: '班主任', trigger: 'change' }
          ],
          project_id: [
            { required: true, message: '所属项目', trigger: 'change' }
          ],
          subject_id: [
            { required: true, message: '所属科目', trigger: 'change' }
          ],
          course_id: [
            { required: true, message: '课程名称', trigger: 'change' }
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
        projectlist:[{
          project_id: "1",
          project_name: "ACCA",
          subject_list: [
          {
            subject_id: "1",
            subject_name: "F1",
            courseitem:[{
              course_id:"3",
              course_name:"【课程ID：9001】CMA-中文P1"
            },{
              course_id:"4",
              course_name:"【课程ID：9002】CMA-中文P2"
            }]
          },
          {
            subject_id: "2",
            subject_name: "F2",
            courseitem:[{
              course_id:"3",
              course_name:"【课程ID：9003】CMA-中文m1"
            },{
              course_id:"4",
              course_name:"【课程ID：9004】CMA-中文m2"
            }]
          }]
        },{
          project_id: "2",
          project_name: "CMA",
          subject_list: [{
            subject_id: "19",
            subject_name: "英文Part 1",
            courseitem:[{
              course_id:"3",
              course_name:"【课程ID：9005】CMA-中文P1"
            },{
              course_id:"4",
              course_name:"【课程ID：9006】CMA-中文P2"
            }]
          },
          {
            subject_id: "20",
            subject_name: "英文Part 2",
            courseitem:[{
              course_id:"3",
              course_name:"【课程ID：9007】CMA-中文P1"
            },{
              course_id:"4",
              course_name:"【课程ID：9008】CMA-中文P2"
            }]
          },
          {
            subject_id: "21",
            subject_name: "Part3",
            courseitem:[{
              course_id:"3",
              course_name:"【课程ID：9009】CMA-中文P1"
            },{
              course_id:"4",
              course_name:"【课程ID：9010】CMA-中文P2"
            }]
          },
          {
            subject_id: "76",
            subject_name: "新纲 中文Part 1",
            courseitem:[{
              course_id:"3",
              course_name:"【课程ID：9011】CMA-中文P1"
            },{
              course_id:"4",
              course_name:"【课程ID：9012】CMA-中文P2"
            }]
          }]
        }],
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
        dialogCourse:true,
        selectcur:true,




        selproject:"",
        selprojectcur:"2",
        selsubject:'',
        selteach:'',
        courselist:[],
        mmClassList:[],
        reformval:''
      }
    },
    methods: {
      checkprojectlist(val){
        for(let reg of this.projectlist){
          if(reg.project_id == val){
            this.issubject = true;
            let subjectall = [...reg.subject_list];
            subjectall.unshift({
              subject_id:'0',
              subject_name:'全部'
            })
            this.subjectlist = subjectall;
            this.selsubject = '0';
          }
        }
      },
      projectLoad(){   // 科目选项
        for(let reg of this.projectlist){
          if(reg.project_id == this.selprojectcur){
            this.selproject = reg.project_name;
            this.issubject = true;
            let subjectall = [...reg.subject_list];
            subjectall.unshift({
              subject_id:'0',
              subject_name:'全部'
            })
            this.subjectlist = subjectall;
            this.selsubject = '0';
          }
        }
      },
      checksubjectlist(val){
        if(val != 0){
          for(let reg of this.subjectlist){
            if(reg.subject_id == val){
              this.issubject = true;
              let courseall = [...reg.courseitem];
              courseall.unshift({
                course_id:'0',
                course_name:'全部'
              })
              this.courselist = courseall;
              this.selteach = '0';
            }
          }
        }
      },
      async getClassList(){
        let ret = await getClassList();
        if(ret.status == 0){
          this.mmClassList = ret.result.lists;
        }
      },
      addClassModel(){
        // 新增一个课程大纲 弹出框
        this.dialogFormVisible = true;
        this.substatus == 'addoutline'
      },
      submitForm(formName) {
        // 添加一个课程大纲
        if(this.substatus == 'addoutline'){
          this.reformval = this.$refs[formName];
          console.log(this.$refs[formName],"adddddd")
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // this.coursesubmit(this.ruleForm)
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      },
      handleClose(done) {
        done();
        console.log(this.reformval,"uuuuuuuuuutttttttttt")
        this.reformval.resetFields();
        // this.$confirm('确认关闭？')
        //   .then(_ => {
        //     done();
        //   })
        //   .catch(_ => {});
      },















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








      coursesubmit(ruleForm){
        // 添加一个课程大纲提交
        CourseSyllabus({...ruleForm}).then(res=>{
          if(res.status == 0){
            this.dialogFormVisible = false;
            if(res.data.message == ""){
              res.data.message = "已添加";
            }
            this.getCourseSyllabuses(1,this.page_size);
            this.$message({
              message: res.data.message,
              type: 'success'
            });
          }
        }).catch( error => {
          console.log(error);
        });
      },
      courseupdate(outlineid,ruleForm){
        // 修改一个课程大纲提交
        UpdateCourseSyllabus(outlineid,{...ruleForm}).then(res=>{
          if(res.status == 0){
            this.dialogFormVisible = false;
            if(res.message == ""){
              res.message = "已修改";
            }
            this.getCourseSyllabuses(1,this.page_size)
            this.outlineid = '';
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
              this.courseupdate(this.outlineid,this.ruleForm)
              this.dialogFormVisible = false
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
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
        // let ret = await getProjectSubject();
        // if(ret.status == 0){
        //   this.projectlist = ret.result;
        // }
      },
      handleIconClick(){   // 搜索框
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
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        if(this.flag){
          this.getCourseSyllabuses(val,this.page_size);
        }
      },
      UpdateOutlineTitle(index, row){
        // 修改一个课程大纲 弹出框
        this.substatus = 'updateoutline';
        this.dialogCourse = false;
        this.issubject = true;
        this.outlineid = row.id;
        if(row){
          this.selectcur = false;
        }
        this.ruleForm = {
          title:row.title,
          project_id:row.subject.project.id+'',
          subject_id:row.subject.id+'',
          status:row.status+'',
        }
        for(var i = 0; i < this.projectlist.length; i++){
          if(this.projectlist[i].project_id == row.subject.project.id){
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
      }
    },
    computed: {},
    mounted() {
      this.getProjectSubject();
      this.getCourseSyllabuses();




      this.projectLoad();
      this.getClassList();
    },
    created() {

    }
  }
</script>