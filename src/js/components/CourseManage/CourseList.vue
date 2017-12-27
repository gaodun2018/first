<template>
  <div class="module-edu-content course-manage">

    <div class="search_tools" style="overflow: hidden;margin-bottom: 22px;">
      <el-row>
        <el-col :sm="24">
          <div class="button_group_t">
            <span>项 目:</span>
            <span class="clitem" :class="[clver === '0'||clver === 0 ?'current':'']"
                  @click="outlinechange('0')">全部</span>
            <template v-for="(rev,index) in projectlist">
              <span class="clitem" :class="[rev.project_id === clver ?'current':'']"
                    @click="outlinechange(rev.project_id,index)">{{rev.project_name}}</span>
            </template>
          </div>
          <div class="button_group_b">
            <span> 科 目:</span>
            <span class="clitem" :class="[clversm === '0'||clversm === 0 ?'current':'']"
                  @click="mulchange('0')">全部</span>
              <template v-for="(revs,index) in subtablist">
                <span class="clitem" :class="[revs.subject_id === clversm ?'current':'']"
                      @click="mulchange(revs.subject_id)">{{revs.subject_name}}</span>
              </template>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" align="bottom">
        <el-col :sm="12">
          <el-row>
            <div class="select-search">
              <el-select v-model="selectvalue" placeholder="请选择" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-row>
        </el-col>
        <el-col :sm="12">
          <el-row type="flex" justify="end">
            <div class="input-search">
              <el-input placeholder="课程ID／课程名称" size="small" icon="search" v-model="input2"
                        :on-icon-click="handleIconClick"></el-input>
              <el-button type="primary" size="small" @click="dialogCourseVisible = true">新增一个课程</el-button>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="edu_table">
      <el-table ref="multipleTable" border v-loading="loading" @selection-change="handleSelectionChange"
                :data="videoList" style="width: 100%">
        <el-table-column prop="courseid" label="课程id" min-width="100" fixed>
        </el-table-column>
        <el-table-column prop="coursename" label="课程名称" min-width="300">
        </el-table-column>
        <el-table-column prop="usefullife" label="课程有效期" min-width="150">
        </el-table-column>
        <el-table-column prop="price" label="课程价格" min-width="125">
        </el-table-column>
        <el-table-column prop="coursetype" label="课程包类型" min-width="150">
        </el-table-column>
        <el-table-column prop="onlinecoursetype" label="网课类型" min-width="115">
        </el-table-column>
        <el-table-column prop="status" label="发布状态" min-width="150">
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="200" align="center">
          <template scope="scope">
            <el-button type="text" style="margin: 0 10px;">
              <router-link class="routerBtn" to="/CourseSet">基本设置</router-link>
            </el-button>
            <el-button type="text" style="margin: 0 10px;">
              <router-link class="routerBtn" to="/CourseContent">课程内容</router-link>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="edu-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[15, 30, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="eduTotal"
        >
        </el-pagination>
      </div>
    </div>

    <el-dialog class="addCourse" title="新建课程" :visible.sync="dialogCourseVisible" @close="closeDialog('ruleForm')">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="课程名称" prop="course_name">
            <el-input v-model="ruleForm.course_name"></el-input>
          </el-form-item>
          <el-form-item label="所属项目" prop="project_id">
            <el-select v-model="ruleForm.project_id" placeholder="请选择所属项目" @change="changeProject">
              <el-option :label="item.project_name" :value="item.project_id" v-for="(item,index) in projectlist" :key="item.project_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属科目" prop="subject_id">
            <el-select v-model="ruleForm.subject_id" :disabled="!bSubject" placeholder="请选择所属科目">
              <el-option :label="item.subject_name" :value="item.subject_id" v-for="(item,index) in selectedlist" :key="item.subject_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="网课类型" prop="course_type_id">
            <el-select v-model="ruleForm.course_type_id" placeholder="请选择网课类型">
              <el-option :label="item.name" :value="item.course_type_id" v-for="item in course_type" :key="item.course_type_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="last-form-item">
            <el-button @click="closeDialog('ruleForm')">取消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>

  </div>
</template>
<style>
  .course-manage .el-dialog__header {padding: 30px 20px 0;text-align: center;}
  .course-manage .el-form-item__label {color: #8f9aac;}
  .course-manage .last-form-item {text-align: center;margin-top: 40px;}
  .course-manage .last-form-item .el-form-item__content {margin-left: 0 !important;}
</style>
<script>
  import Vue from 'vue';
  import {getProject} from '../../api/course'
  import {addCourse} from '../../api/fromAxios'

  export default {
    components: {},
    data() {
      return {
        projectlist: [],    //项目列表
        subtablist: [],  //按钮组科目列表
        selectedlist:[],   //新增课程科目列表
        bSubject:false,    //是否可以选择科目
        course_type:[
          {
            course_type_id:'0',
            name:'普通网课',
          },{
            course_type_id:'1',
            name:'任务制网课（选择考试时间）',
          },{
            course_type_id:'2',
            name:'任务制网课（选择自主学习时间）',
          },{
            course_type_id:'3',
            name:'自适应学习网课-EP',
          },{
            course_type_id:'4',
            name:'私播课-Glive+',
          },{
            course_type_id:'4',
            name:'SmartSchool',
          }
        ],   //网课类型
        selectvalue: '全部课程类型', //下拉搜索所选择的的网课类型
        options: [
          {
            value: '',
            label: '全部课程类型'
          }, {
            value:'0',
            label:'普通网课',
          },{
            value:'1',
            label:'任务制网课（选择考试时间）',
          },{
            value:'2',
            label:'任务制网课（选择自主学习时间）',
          },{
            value:'3',
            label:'自适应学习网课-EP',
          },{
            value:'4',
            label:'私播课-Glive+',
          },{
            value:'4',
            label:'SmartSchool',
          }
        ],     //下拉搜索的网课类型列表
        rules: {   //表单验证
          course_name: [
            {required: true, message: '请输入课程名称', trigger: 'blur'}
          ],
          project_id: [
            {required: true, message: '请选择所属项目', trigger: 'change'}
          ],
          subject_id: [
            {required: true, message: '请选择所属科目', trigger: 'change'}
          ],
          course_type_id: [
            {required: true, message: '请选择网课类型', trigger: 'change'}
          ]
        },
        //新增课程的表单
        ruleForm: {
          course_name: '',
          project_id: '',
          subject_id: '',
          course_type_id: '',
        },
        dialogCourseVisible: false,
        input2: '',
        clver: "0",    //点击搜索所选项目
        clversm: "0",     //点击搜索所选科目
        videoList: [
          {
            courseid: '123',
            coursename: 'CFA持证无忧123456789',
            usefullife: '36个月',
            price: '99999.999',
            coursetype: 'EP课',
            onlinecoursetype: '大包',
            status: '发布'
          }, {
            courseid: '123',
            coursename: 'CFA持证无忧12345672',
            usefullife: '36个月',
            price: '99999.999',
            coursetype: 'EP课',
            onlinecoursetype: '大包',
            status: '发布'
          }, {
            courseid: '123',
            coursename: 'CFA持证无忧123456789',
            usefullife: '36个月',
            price: '99999.999',
            coursetype: 'EP课',
            onlinecoursetype: '大包',
            status: '发布'
          },
        ],
        eduTotal: 3,       //总数
        currentPage: 1,     //默认当前页
        pageSize: 15,    //默认分页数量
      }
    },
    computed: {},
    methods: {
      //新增下拉框选取项目后切换科目
      changeProject(val){
        for(var obj in this.projectlist){
          if(this.projectlist[obj].project_id == val){

            this.bSubject = true;
            let subject_list = [...this.projectlist[obj].subject_list];
            subject_list.unshift({
              subject_id:'0',
              subject_name:'全部'
            })
            this.selectedlist = subject_list;
            this.ruleForm.subject_id = '0';

          }
        }
      },
      //点击项目切换科目
      outlinechange(reid,index){
        this.clver = reid;
        if(reid == '0'){
          this.subtablist = [];
        }else{
          this.subtablist = this.projectlist[index].subject_list;
        }
        this.clversm = '0';  //科目设置为0
      },
      mulchange(reid){
        this.clversm = reid;
      },
      //关闭弹层
      closeDialog(formName){
        this.bSubject = false;
        this.dialogCourseVisible = false;
        this.$refs[formName].resetFields();
      },
      //新增一个课程
      addCourse(ruleForm){
        addCourse({...ruleForm}).then(res=>{
          if(res.data.status == 0){
            this.dialogCourseVisible = false;
            this.bSubject = false;
            this.$message({
              message: res.data.message,
              type: 'success'
            });
          }
        }).catch( error => {
          console.log(error);
        });

      },
      //新增课程确定按钮表单验证
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addCourse(this.ruleForm);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleSizeChange(size){
        console.log(size);
      },
      handleCurrentChange(page){
        console.log(page);
      },
      async getProject(){
        let ret = await getProject();
        console.log(ret);
        this.projectlist = ret.result;
      }
    },
    mounted() {
      this.getProject();
    },
    created() {

    }
  }
</script>