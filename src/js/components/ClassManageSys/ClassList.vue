<template>
  <div class="module-edu-content permission-outlinemodule">

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
            <el-input class="selother" size="small" v-if="!selother" :disabled="true" v-model="stopsearchinput"></el-input>

            <el-select v-model="selteach" @change="checkteachlist" v-if="selother" placeholder="请选择">
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
            <el-button type="primary" size="small" @click="addPelOrign">学员入班</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="edu_table">
      <el-table ref="multipleTable" v-loading="loading" :row-class-name="tableRowClassName" @selection-change="handleSelectionChange" border :data="mmClassList" style="width: 100%">
        <el-table-column prop="class_id" label="班级ID" min-width="40">
        </el-table-column>
        <el-table-column prop="class_name" label="班级名称" min-width="200">
        </el-table-column>
        <el-table-column prop="student_number" label="班级学员" min-width="50">
        </el-table-column>
        <el-table-column label="课程名称" min-width="230">
          <template scope="scope">
            【课程ID：{{scope.row.course_id}}】{{scope.row.course_name}}
          </template>
        </el-table-column>
        <el-table-column prop="teacher_name" label="学管师" min-width="60">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="text" @click="UpdateClassTitle(scope.$index, scope.row)">基本设置</el-button>

            <el-button type="text"><router-link :to="'/EducationalClass/'+scope.row.course_id+'/'+scope.row.class_id" tag="a" target="_blank">查看详情</router-link></el-button>


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
          <!-- <el-input v-if="teachtrue" v-model="teacher_name" :disabled="!isidentity" @click="handleClkteach"></el-input> -->

          <el-select v-model="ruleForm.teacher_id" :disabled="!isidentity" @click="handleClkteach" placeholder="请选择班主任"><!--  v-if="!teachtrue"   :disabled="!isidentity"-->
            <el-option v-for="(rev,index) in teachrulelist" :key="rev.id" :label="rev.name" :value="rev.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目" prop="project_id">
          <el-select v-model="ruleForm.project_id" :disabled="!isproject" @change="checkproject" placeholder="请选择所属项目">
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
          <el-button @click="resetForm('ruleForm')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


    <el-dialog title="学员入班" class="tabplane" :visible.sync="dialogFormVisiblePel" :before-close="handleCloseStudent">
      <el-col v-for="item in progressText" :key="item.text" :sm="12">
        <div class="order-progress-bar">
          <i class="progress-bar-line" :class="item.isCustomerConfirm ? item.currentLine : ''"></i>
          <i class="progress-bar-dot" :class="item.isCustomerConfirm ? item.currentDot : ''"></i>
          <span :class="item.isCustomerConfirm ? item.currentText : ''">{{item.text}}</span>
        </div>
      </el-col>
      <div class="peldrop" v-show="module1">
        <div class="pelclass">
          <el-input :placeholder="txtcomt" size="small" icon="search" v-model="inputstudent" placeholder="请输入学员ID / 手机号 / 邮箱 / 昵称 / 姓名" @keyup.native.enter="handleIconClickChrad" :on-icon-click="handleIconClickChrad"></el-input>
        </div>

        <el-table ref="multipleTable" :data="tableDatamin1" tooltip-effect="dark" style="width:100%;margin-top:20px;" @selection-change="handleSelectionChange">
          <el-table-column label="学员ID" width="120">
            <template scope="scope">
              <el-radio-group class="radio" @change="handClkStudent(scope.row)" v-model="radio">
                <el-radio :label="scope.row.id">{{scope.row.id}}</el-radio>
              </el-radio-group>


              <!-- <el-radio class="radio" @change="handClkStudent" v-model="radio" :label="scope.row.id"></el-radio> -->
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">            
          </el-table-column>
          <el-table-column prop="phone" label="手机" show-overflow-tooltip>            
          </el-table-column>
          <el-table-column prop="user_email" label="邮箱" show-overflow-tooltip>            
          </el-table-column>
          <el-table-column prop="nickname" label="昵称" show-overflow-tooltip>            
          </el-table-column>
        </el-table>

        <div class="pageclass" v-if="courselinenumpel > 0">
          <el-pagination @size-change="handleSizeChangepel" @current-change="handleCurrentChangepel" :page-sizes="[10,20,30]" :page-size="page_sizepel" :current-page="pagenumpel" :current-page.sync="pagenumpel" layout="total, sizes, prev, pager, next, jumper" :total="courselinenumpel">
          </el-pagination>
        </div>

        <div class="coursebtn" style="margin-top:10px;padding-top:20px;">
          <el-button style="margin-top:12px;" @click="next">下一步</el-button>
        </div>
      </div>

      <div class="rulemodule" v-show="module2">
        <el-input :placeholder="txtcomt" size="small" icon="search" v-model="inputClass" placeholder="请输入班级ID / 名称" @keyup.native.enter="handleIconClickClass" :on-icon-click="handleIconClickClass"></el-input>
        <div class="selmodule">已选择：<span v-for="(item,index) in selmodulelist">【班级ID：{{item.class_id}}】{{item.class_name}}</span></div>
        <el-table ref="multipleTable" :data="tableDataclass" tooltip-effect="dark" style="width:100%;margin-top:20px;"> <!-- @selection-change="handleSelectionChange" -->
          <!-- <el-table-column type="selection" width="35" class="selection" prop="id" :selectable='checkboxInit' @selection-change="changeFun(scope.row)"> -->
          </el-table-column>
          <el-table-column label="班级ID" width="100">
            <template scope="scope">

              <!-- <el-radio-group class="radio" @change="handClkClass(scope.row)" v-model="radio">
                <el-radio :label="scope.row.id">{{scope.row.id}}</el-radio>
              </el-radio-group> -->

              <!-- <el-checkbox-group v-model="checkList" @change="handClkClass(scope.row)">
                <el-checkbox :label="scope.row.id">{{scope.row.id}}</el-checkbox>
              </el-checkbox-group> -->
<!-- list  [1,2,3,4].indexOf(1)> -1 slice([1,2,3,4].indexOf(1),1)    .push()-->
               <!-- @change="handClkStudent(scope.row)" -->
              <el-checkbox @change="handClkClass(scope.row)" :label="scope.row.class_id">{{scope.row.class_id}}</el-checkbox>
              <!-- {{scope.row.class_id}} -->
            </template>
          </el-table-column>
          <el-table-column prop="class_name" label="班级名称" width="230">            
          </el-table-column>
          <el-table-column prop="teacher_name" label="班主任" width="100">            
          </el-table-column>
          <el-table-column prop="course_name" label="课程">            
          </el-table-column>
        </el-table>

        <div class="pageclass" v-if="courselinenumclass > 0">
          <el-pagination @size-change="handleSizeChangeclass" @current-change="handleCurrentChangeclass" :page-sizes="[10,20,30]" :page-size="page_sizeclass" :current-page="pagenumclass" :current-page.sync="pagenumclass" layout="total, sizes, prev, pager, next, jumper" :total="courselinenumclass">
          </el-pagination>
        </div>

        <div class="coursebtn">
          <el-button style="margin-top:12px;" v-show="prevclk" @click="prev">上一步</el-button>
          <!-- <el-button style="margin-top:12px;" v-show="nextclk" @click="next">下一步</el-button> -->
          <el-button type="primary" @click="orginpel">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<style>

</style>
<script>
  import Vue from 'vue';
  import {getProjectSubject,CourseSyllabuses,UpdateCourseSyllabus,getClassListout,teachermin,checkcoursemit,checkstudent,checkclass} from '../../api/outline.js';
  import {CourseSyllabus,addClassList,OrginClassStudent,updateinfoClass} from '../../api/fromAxios';
  import {getEnv} from '../../util/config';

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
          course_id:'',
          course_name:''
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
          course_name: [
            { required: true, message: '课程ID、课程名称', trigger: 'change' }
          ]
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
        teachtop:'',
        dialogFormVisiblePel:false,
        progressText: [
          {
            text: '第一步：搜索学员',
            currentLine: 'bar-line-current',
            currentDot: 'bar-dot-current',
            currentText: 'current-text',
            isCustomerConfirm: true
          }, {
            text: '第二步：为学员选择班级（可选择多个班级）',
            currentLine: 'bar-line-current',
            currentDot: 'bar-dot-current',
            currentText: 'current-text',
            isCustomerConfirm: false
          }
        ],
        module1:true,
        module2:false,
        active:0,
        inputstudent:'',
        tableDatamin1:[],
        radio:'',
        orginstudent_id:'',
        orginmobile:'',
        orginstudent_name:'',
        orginclass_id:'',
        inputClass:'',
        tableDataclass:[],
        page_sizepel:'',
        pagenumpel:'',
        courselinenumpel:'',
        checkList:'',
        selmodulelist:[],
        baseUrl: getEnv(),
        selother:false,
        overflag:true,
        teachtrue:true,
        teacher_name:'',
        isproject:true,
        teacher_sid:'',
        pagenumclass:'',
        page_sizeclass:''
      }
    },
    mounted() {
      this.getProjectSubject();
      this.getClassList();
      this.teachmin();
    },
    methods: {
      checkprojectlist(val){
        this.projecttop = val;
        if(val){
          for(let reg of this.searchTree){
            if(reg.project_id == val){
              this.issubject = true;
              let subjectall = [...reg.subject_list];
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

        let ret = await getClassListout(params);
        this.flag = true;
        if(ret.status == 0){
          this.mmClassList = ret.result.lists;
          this.searchTree = [];
          this.searchTree = ret.result.searchTree;
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
          // this.teachtop = ret.result.userId;
          
          if(ret.result.identily == 1){
            this.selother = false;
            for(let i of ret.result.searchTree){
              for(let j of i.subject_list){
                for(let o of j.teacher_list){
                  this.stopsearchinput = o.teacher_name;
                }
              }
            }
          }else{
            this.selother = true;
          }
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
        this.substatus = 'addoutline';

        // console.log(this.$ref('ruleForm'),"添加表单")
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
          this.addCloseClass();
        }
      },
      handleClose(done) {
        this.issubject = false;
        this.iscourse = false;
        this.isproject = true;

        this.teacher_name = "";
        console.log(this.ruleForm,"ruleForm kkk")

        this.ruleForm = {
          class_id:'',
          class_name:'',
          student_number:'',
          course_name:'',
          teacher_name:'',
          course_id:'',
          project_id:'',
          subject_id:''


          // course_id:'请输入课程ID、课程名称',
          // project_id:'请选择所属项目',
          // subject_id:'请选择所属科目'
        }

        this.$refs['ruleForm'].resetFields();
        done();
      },
      addCloseClass(){
        console.log(this.ruleForm.course_id);
        // if(this.ruleForm.course_id){
          // this.ruleForm.class_name = '';
          this.issubject = false;
          this.iscourse = false;
          this.teacher_name = "";
          this.isproject = true;

          // this.ruleForm.project_id = '全部';
          // this.ruleForm.subject_id = '0';
          // this.ruleForm.course_id = '';
        // }
      },
      UpdateClassTitle(row,data){
        // 修改班级 弹出框
        console.log(row,data,"dddddd");
        let rult = {
          class_id:data.class_id,
          class_name:data.class_name,
          student_number:data.student_number,
          course_name:data.course_name,
          teacher_name:data.teacher_name+'',
          course_id:data.course_name+'',
          teacher_id:data.teacher_name+'',
          project_id:data.project_name+'',
          subject_id:data.subject_name+''

          // course_id:data.course_name,
          // teacher_id:data.teacher_name,
          // project_id:data.project_name,
          // subject_id:data.subject_name
        }
        this.teacher_sid = data.teacher_id;
        this.ruleForm = rult;
        console.log(this.ruleForm)
        console.log(this.ruleForm,"kkkkkk")
        this.dialogFormVisible = true;
        this.dialogClass = false;
        this.substatus = 'updateoutline';
        this.teacher_name = data.teacher_name;
        this.overflag = false;
        this.isproject = false;
        this.issubject = false;
        this.iscourse = false;
     },
      updateForm(formName) {
        // 修改班级
        if(this.substatus == 'updateoutline'){
          this.reformval = this.$refs[formName];
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.updateinfo(this.ruleForm)
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      },
      async updateinfo(ruleForm){  // 修改班级
        console.log(ruleForm,"dsddddddddd")
        let ret = await updateinfoClass(this.ruleForm.class_id,{
          class_name:ruleForm.class_name,
          teacher_id:this.teacher_sid,
          teacher_name:ruleForm.teacher_name
        });

        if(ret.status == 0){
          this.$message({
            message:'修改成功！',
            type:'success'
          })
          this.dialogFormVisible = false;
          this.getClassList();

          this.ruleForm = {
            class_id:'',
            class_name:'全部',
            student_number:'',
            course_name:'',
            teacher_name:'',
            teacher_id:'0',
            course_id:'0',
            project_id:'全部',
            subject_id:'全部'
          }
        }else{
          this.$message({
            message:'修改失败！',
            type:'error'
          })
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
            this.iscourse = true;
            this.ruleForm.course_id = "";
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
        if(this.overflag){
          this.search_info = query;
          if (query !== '') {
            // this.loading = true;
            this.getcheckcoursemit(query);
            setTimeout(() => {
              // this.loading = false;

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
        }
      },
      async getcheckcoursemit(query){  // 创建班级时的课程搜索
        let courseinfo = {
          search_info:query
        }
        let ret = await checkcoursemit(this.checkprojectname,this.checksubjectname,courseinfo);
        if(ret.status == 0){
          this.states = ret.result;
        }
        console.log(ret,"kecheng")
      },
      addPelOrign(){
        this.dialogFormVisiblePel = true;
      },
      prev(){
        if(this.active<=0)return
        this.progressText[this.active].isCustomerConfirm=false;
        this.active--;
        console.log(this.active);
        this.showitem();
      },
      next(){
        if(this.orginstudent_id){
          if(this.active == 0){
            if(this.active >= this.progressText.length-1)return;
            this.active++;
            this.progressText[this.active].isCustomerConfirm=true;
            this.showitem();
          }else{
            if(this.active >= this.progressText.length-1)return;
            this.active++;
            this.progressText[this.active].isCustomerConfirm=true;
            this.showitem();
          }
        }else{
          this.$message({
            message: '选择学生ID',
            type: 'warning'
          });
        }
      },
      showitem(){
        if(this.active == 0){
          this.module1 = true;
          this.module2 = false;
          this.prevclk = false;
          this.nextclk = true;
        }else if(this.active == 1){
          this.module1 = false;
          this.module2 = true;
          this.prevclk = true;
          this.nextclk = true;
        }
      },
      handleIconClickChrad(){
        console.log(this.inputstudent);
        this.checkstudent();
      },
      async checkstudent(){
        this.page_sizepel = this.page_sizepel ? this.page_sizepel : '10';
        this.pagenumpel ? this.pagenumpel : this.pagenumpel = '1';

        let ret = await checkstudent(this.pagenumpel,this.page_sizepel,{search_info:this.inputstudent})
        if(ret.status == 0){
          this.tableDatamin1 = ret.result.student_list;
          this.courselinenumpel = ret.result.student_sum;
        }
      },
      handClkStudent(val){
        this.orginstudent_id = val.id;
        this.orginmobile = val.phone;
        this.orginstudent_name = val.name;
      },
      handleIconClickClass(){
        console.log(this.inputClass);
        this.checkclass();
      },
      handleSizeChangepel(val){
        console.log(`每页 ${val} 条`);
        this.page_sizepel = val;
        this.pagenumpel = 1;
        this.checkstudent();
      },
      handleCurrentChangepel(val){
        console.log(`当前页: ${val}`);
        this.pagenumpel = val;
        this.checkstudent();
      },
      async checkclass(){

        this.page_sizeclass = this.page_sizeclass ? this.page_sizeclass : '10';
        this.pagenumclass = this.pagenumclass ? this.pagenumclass :'1';

        let ret = await checkclass(this.orginstudent_id,this.pagenumclass,this.page_sizeclass,{search_info:this.inputClass})
        if(ret.status == 0){
          this.tableDataclass = ret.result.all_class;
          this.selmodulelist = ret.result.exists_class;
          this.courselinenumclass = ret.result.all_class_sum;
        }
      },
      handClkClass(val){  // 学员入班 搜索班级 添加班级
        console.log(val)
        this.orginclass_id = val.class_id;
        // let checklist;
        console.log(this.selmodulelist.indexOf(val.class_id),val.class_id,"indexOf")
        var flag = true;  //标记循环完毕后是否有这个选项
        if(this.selmodulelist.length > 0){
            for(let i = 0; i < this.selmodulelist.length; i++){
              if(this.selmodulelist[i].class_id == val.class_id){
                flag = false;
                console.log(i,"indexnum",this.selmodulelist.splice(i,1))
                this.selmodulelist.splice(i,1);
                // this.selmodulelist.shift(i);
                console.log(this.selmodulelist)
              }
            }
          if(flag){
            this.selmodulelist.push(val);
          }
          
        }else{
          this.selmodulelist.push(val);
        }
        console.log(this.selmodulelist,'    this.selmodulelist')
      },
      handleSelectionChange(val){   //  学员入班 搜索班级
        // console.log(this.selmodulelist,val[0].class_id,val[0].class_name,"很累");
        
        // if(this.selmodulelist.length > 0){
        //   for(let o of this.selmodulelist){
        //     if(val){
        //       if(o.class_id == val[0].class_id){
        //         this.$message({
        //           message:"已存在此班级！",
        //           type:"warning"
        //         })
        //       }
        //     }
        //   }
        // }

        // let checked = [];
        // if(val){
        //   for(let o of this.selmodulelist){
        //     for(let j of val){
        //       if(o.class_id != j.class_id){
        //         checked.push({
        //           class_id:j.class_id,
        //           class_name:j.class_name
        //         })
        //       }
        //     }
        //   }
        // }

        // // console.log(checked,[...val])

        // this.selmodulelist = [...checked]


        // if(val){
        //   if(this.selmodulelist.length > 0){
        //     for(let o of this.selmodulelist){
        //       for(let j of val){
        //         if(o.class_id != j.class_id){
        //           this.selmodulelist.push([...val]);
        //         }
        //       }
        //     }
        //   }
        // }

        this.selmodulelist = [...val];
        console.log(this.selmodulelist,"sssssssssssss000000")
      },
      async orginpel(){
        let classid = [];
        if(this.selmodulelist.length > 0){
          for(let o of this.selmodulelist){
            classid.push(o.class_id);
          }
          console.log(classid)
          let params = {
            'student_id':this.orginstudent_id,
            'class_id[]':classid
          }
          console.log(params)

          let ret = await OrginClassStudent(params);
          if(ret.status == 0){
            this.$message({
              message:'添加成功！',
              type:'success'
            })
            this.examSet();
            this.dialogFormVisiblePel = false;
          }else{
            this.$message({
              message:'添加失败！',
              type:'error'
            })
          }
        }else{
          this.$message({
            message:'没有选择班级列表！',
            type:'warning'
          })
        }
      },

      courselinenumclass(val){
        console.log(`每页 ${val} 条`);
        this.page_sizeclass = val;
        this.pagenumclass = 1;
        this.checkclass();
      },
      handleCurrentChangeclass(val){
        console.log(`当前页: ${val}`);
        this.pagenumclass = val;
        this.checkclass();
      },

      handleCloseStudent(done){
        this.examSet();
        done();
      },
      resetForm(formName){
        this.$refs[formName].resetFields();
        this.dialogFormVisible = false;
      },
      examSet(){
        this.module1 = true;
        this.module2 = false;
        this.inputClass = '';
        this.inputstudent = '';
        this.tableDatamin1 = [];
        this.radio = '';
        this.courselinenumpel = 0;
        this.selmodulelist = [];
        this.tableDataclass = [];
        this.orginstudent_id = '';
        this.orginmobile = '';
        this.orginstudent_name = '';
        this.active = 0;
        this.progressText[0].isCustomerConfirm=true;
        this.progressText[1].isCustomerConfirm=false;
        this.showitem();
      },
      handleClkteach(data){
        console.log(data)
      }
    },
    computed: {},
    created() {

    }
  }
</script>