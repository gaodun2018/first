<template>
  <div class="module-edu-content permission-courseoutline">

    <div class="search_tools" style="overflow: hidden;margin-bottom: 22px;">
      <el-row>
        <el-col :sm="6">
          <div class="button_group_t">
            <span>项 目:</span>
            <el-select v-model="selproject" @change="checkprojectlist" placeholder="请选择">
              <el-option
                v-for="(rev,index) in selprojectlist"
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
                v-for="(revs,index) in selsubjectlist"
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
            <el-select v-model="selteach" @change="checkteachlist" placeholder="请选择">
              <el-option
                v-for="(revs,index) in teachalllist"
                :key="revs.teacher_id"
                :label="revs.teacher_name"
                :value="revs.teacher_id">
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
            <el-button type="text" @click="UpdateClassTitle(scope.$index, scope.row)">基本设置</el-button>

            <el-button type="text"><router-link to="">查看详情</router-link></el-button>
            <!-- <el-button type="text"><router-link :to="'/CourseoutlineManage/CourseModule/'+scope.row.id">查看大纲</router-link></el-button> -->

          </template>
        </el-table-column>
      </el-table>
      <div class="edu-pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[15, 30,50]" :page-size="page_size" :current-page="pagenum" :current-page.sync="pagenum" layout="total, sizes, prev, pager, next, jumper" :total="courselinenum">
        </el-pagination>
      </div>
    </div>

    <el-dialog :title="dialogClass ? '创建班级' : '编辑班级'" class="tabplane" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="班级名称" prop="class_name">
          <el-input class="coursetxt" v-model="ruleForm.class_name"></el-input>
        </el-form-item>
        <el-form-item label="班主任" prop="teachid">
          <el-select v-model="ruleForm.teacher_id" :disabled="!isidentity" @change="checkproject" placeholder="请选择所属项目">
            <el-option v-for="(rev,index) in teachrulelist" :key="rev.id" :label="rev.name" :value="rev.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目" prop="project_id">
          <el-select v-model="ruleForm.project_id" @change="checkproject" placeholder="请选择所属项目">
            <el-option v-for="(rev,index) in projectlist" :key="rev.project_name" :label="rev.project_name" :value="rev.project_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="科目" prop="subject_id">
          <el-select v-model="ruleForm.subject_id" :disabled="!issubject" @change="checksubject" placeholder="请选择所属科目">
            <el-option v-for="(com,index) in boxsubject" :label="com.subject_name" :value="com.subject_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程" prop="course_id">
          <!-- <el-select v-model="ruleForm.course_id" placeholder="请选择所属科目">
            <el-option v-for="(com,index) in boxsubject" :label="com.course_name" :value="com.course_id"></el-option>
          </el-select> -->



          <el-select v-model="ruleForm.course_id" :disabled="!iscourse" filterable remote placeholder="请输入课程ID、课程名称" :remote-method="remoteMethod" :loading="loading">
            <el-option v-for="item in courselistitem" :key="item.course_id" :label="item.course_name" :value="item.course_id"></el-option>
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
  import {getProjectSubject,CourseSyllabuses,UpdateCourseSyllabus,getClassList,teachermin,checkcoursemit} from '../../api/outline.js';
  import {CourseSyllabus,addClassList} from '../../api/fromAxios';

  export default {
    components: {},
    data() {
      return {
        input2:'',
        CourseLineList:[],
        ruleForm: {
          class_name:'',
          teacher_id:'',
          project_id:'',
          subject_id:'',
          course_id:''
        },
        rules: {
          class_name: [
            { required: true, message: '班级名称', trigger: 'blur' }
          ],
          teacher_id: [
            { required: true, message: '班主任', trigger: 'change' }
          ],
          project_id: [
            { required: true, message: '所属项目', trigger: 'change' }
          ],
          subject_id: [
            { required: true, message: '所属科目', trigger: 'change' }
          ],
          // course_id: [
          //   { required: true, message: '课程ID、课程名称', trigger: 'change' }
          // ]
        },
        rulesback:{},
        dialogFormVisible: false,
        selectvalue:'',
        clver:"0",
        clversm:"0",
        issubject:false,
        boxsubject:[],
        projectlid:'',
        subjectlid:'',
        currentIndex:'',
        substatus:'addoutline',
        outlineid:'',
        dialogCourse:true,
        selectcur:true,




        projectlist:[],
        subjectlist:[],
        selproject:"",
        selprojectcur:"2",
        selsubject:'',
        selteach:'',
        courselist:[],
        flag:true,
        mmClassList:[],
        reformval:'',
        dialogClass:true,
        selprojectlist:[],
        selsubjectlist:[],
        searchTree:[],
        teachlist:[],
        teachalllist:'',
        iscourse:false,
        states:[],
        courselistitem:[],
        list:[],
        teachrulelist:[],
        isidentity:true,
        checkprojectname:'',
        checksubjectname:'',
        search_info:'',
        projecttop:'',
        subjecttop:'',
        courselinenum:'',
        pagenum:'',
        page_size:'',
        teachtop:''
      }
    },
    mounted() {
      // this.projectLoad();
      this.getProjectSubject();
      this.getClassList();
      this.teachmin();

      // this.list = this.states.map(item => {
      //   console.log(item,"kkkllljjjhhh")
      //   return { course_id: item.course_id, course_name: item.course_name };
      //   // return { value: item.id, label: item.name }
      //   // return item;
      // });
    },
    methods: {
      checkprojectlist(val){
        console.log(this.searchTree,val)
        this.projecttop = val;
        console.log(this.flag,"dddddddooooooooooo")
        console.log(this.searchTree,"11222222")
        if(val){
          for(let reg of this.searchTree){
            if(reg.project_id == val){
              this.issubject = true;
              let subjectall = [...reg.subject_list];
              console.log(subjectall,"fffffffffdddd")
              subjectall.unshift({
                subject_id:'0',
                subject_name:'全部'
              })
              this.selsubjectlist = subjectall;
              this.selsubject = '0';
              this.teachlist = reg.teacher_list;
            }
          }
          this.getClassList();
        }
        
      },
      // projectLoad(){   // 科目选项
      //   for(let reg of this.projectlist){
      //     // if(reg.project_id == this.selprojectcur){
      //       // this.selproject = reg.project_name;
      //       this.issubject = true;
      //       let subjectall = [...reg.subject_list];
      //       subjectall.unshift({
      //         subject_id:'0',
      //         subject_name:'全部'
      //       })
      //       this.subjectlist = subjectall;
      //       // this.selsubject = '0';
      //     // }
      //   }
      // },
      checksubjectlist(val){
        this.subjecttop = val;
        if(val != 0){
          for(let reg of this.selsubjectlist){
            if(reg.subject_id == val){
              this.issubject = true;
              let teachall = [...reg.teacher_list];
              teachall.unshift({
                teacher_id:'0',
                teacher_name:'全部'
              })
              this.teachalllist = teachall;
              this.selteach = '0';
            }
          }
        }
        this.getClassList();
      },
      checkteachlist(val){
        this.teachtop = val;
        this.getClassList();
      },
      async getClassList(){
        if(!this.pagenum){
          this.flag = false;
        }
        this.pagenum = this.pagenum ? this.pagenum : 1;
        this.page_size = this.page_size ? this.page_size : 15;
        let params = {
          project_id:this.projecttop,
          subject_id:this.subjecttop,
          teacher_id:this.teachtop,
          page:this.pagenum,
          pagenum:this.page_size
        }

        let ret = await getClassList(params);
        this.flag = true;
        if(ret.status == 0){
          this.mmClassList = ret.result.lists;
          // console.log(ret.result.searchTree,"retererer")
          this.searchTree = [];
          this.searchTree = ret.result.searchTree;
          // console.log(this.searchTree,"oooooooooooooooijj9jsidfsdfn")
          this.courselinenum = Number(ret.result.pages.total);
          // this.pagenum = ret.result.pages.current_page;
          // this.page_size = ret.result.pages.current_page;
          // for(let o of ret.result.searchTree){
          //   this.selprojectlist.push({
          //     project_id:o.project_id,
          //     project_name:o.project_name
          //   });

          //   // for(let j of o.subject_list){
          //   //   this.selsubjectlist.push({
          //   //     subject_id:j.subject_id,
          //   //     subject_name:j.subject_name
          //   //   })
          //   // }
          // }
          this.selprojectlist = [];
          this.selprojectlist = ret.result.searchTree;

          // console.log(this.selprojectlist,this.selsubjectlist);
          // this.selprojectlist = ;
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.page_size = val;
        this.pagenum = 1;
        this.getClassList();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        if(this.flag){
          this.pagenum = val;
          this.getClassList();
        }
      },
      addClassModel(){
        // 新增一个班级 弹出框
        this.dialogFormVisible = true;
        this.dialogClass = true;
        this.substatus == 'addoutline'
      },
      submitForm(formName) {
        // 添加一个课程大纲
        if(this.substatus == 'addoutline'){
          this.reformval = this.$refs[formName];
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
      async coursesubmit(min){
        console.log(min)
        let teacher_name;
        console.log(this.teachrulelist)
        for(let o of this.teachrulelist){
          if(o.id == min.teacher_id){
            teacher_name = o.name;
          }
        }

        let params = {
          class_name:min.class_name,
          course_id:min.course_id,
          teacher_id:min.teacher_id,
          teacher_name:teacher_name,
          project_id:min.project_id,
          subject_id:min.subject_id
        }

        let ret = await addClassList(params);
        console.log(ret.status)
        if(ret.status == 0){
          this.$message({
            message: '已添加成功',
            type: 'success'
          });
          this.getClassList();
          this.dialogFormVisible = false;
        }
      },
      handleClose(done) {
        if(this.reformval){
          this.reformval.resetFields();
        }
        done();
      },
      UpdateClassTitle(row,data){
        // 修改班级 弹出框
        console.log(row,data);
        let rult = {
          class_id:data.class_id,
          class_name:data.class_name,
          course_id:data.course_id+'',
          course_name:data.course_name,
          student_number:data.student_number,
          teacher_id:data.teacher_id,
          teacher_name:data.teacher_name
        }
        this.ruleForm = rult;

        console.log(this.ruleForm)
        this.dialogFormVisible = true;
        this.dialogClass = false;
        this.substatus == 'updateoutline'
      },
      updateForm(formName) {
        // 添加一个课程大纲
        if(this.substatus == 'updateoutline'){
          this.reformval = this.$refs[formName];
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
      async getProjectSubject(){
        let ret = await getProjectSubject()
        if(ret.status == 0){
          this.projectlist = ret.result;
        }
      },
      checkproject(val){
        this.checkprojectname = val;
        for(let reg of this.projectlist){
          if(reg.project_id == val){
            this.issubject = true;
            let subjectall = [...reg.subject_list];
            subjectall.unshift({
              subject_id:'0',
              subject_name:'全部'
            })
            this.boxsubject = subjectall;
            this.ruleForm.subject_id = '0';
            this.ruleForm.course_id = "";
          }
        }
      },
      checksubject(val){
        this.checksubjectname = val;
        if(val != 0){
          this.iscourse = true;
          this.ruleForm.course_id = "";
          // this.course_name = "";
        }
      },
      async teachmin(){
        let ret = await teachermin();
        this.teachrulelist = ret.result.list;
        if(ret.result.identity == 2){
          this.isidentity = true;
        }else{
          this.ruleForm.teacher_id = ret.result.list[0].id;
          this.isidentity = false;
        }
      },
      remoteMethod(query) {
        this.search_info = query;
        if (query !== '') {
          // this.loading = true;
          this.getcheckcoursemit(query);
          setTimeout(() => {
            // this.loading = false;

            console.log(this.ruleForm.course_id,"ddddddddddddddddddd")

            this.list = this.states.map(item => {
              return { course_id: item.course_id, course_name: item.course_name };
              // return { value: item.id, label: item.name }
              // return item;
            });

            this.courselistitem = this.list.filter(item => {
              // return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
              return item.course_name.toLowerCase().indexOf(query.toLowerCase()) > -1;
              // return item.course_name.indexOf(query) > -1
            });
          }, 200);
        } else {
          this.courselistitem = [];
        }

        if(this.reformval){
          this.reformval.resetFields();
        }
      },
      async getcheckcoursemit(query){
        let courseinfo = {
          // search_info:this.search_info
          search_info:query
        }
        let ret = await checkcoursemit(this.checkprojectname,this.checksubjectname,courseinfo);
        if(ret.status == 0){
          this.states = ret.result;
        }
        console.log(ret,"kecheng")
      }
      // states
    },
    computed: {},
    created() {

    }
  }
</script>