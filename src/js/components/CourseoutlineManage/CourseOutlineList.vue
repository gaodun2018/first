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
              <el-input placeholder="请输入课程大纲ID、名称" size="small" icon="search" v-model="input2"
                        :on-icon-click="handleIconClick"></el-input>
              <el-button type="primary" size="small" @click="dialogFormVisible = true">新建一个课程大纲</el-button>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <div class="edu_table">
      <el-table ref="multipleTable" v-loading="loading" :row-class-name="tableRowClassName" @selection-change="handleSelectionChange" border :data="videoList" style="width: 100%">

        <el-table-column prop="videoid" label="大纲ID" min-width="100">
        </el-table-column>
        <el-table-column prop="classname" label="课程大纲名称" min-width="200">
        </el-table-column>
        <el-table-column prop="project" label="所属项目" min-width="100">
        </el-table-column>
        <el-table-column prop="subject" label="所属科目" min-width="125">
        </el-table-column>
        <el-table-column prop="num" label="使用" min-width="150">
        </el-table-column>
        <el-table-column label="所属状态" min-width="115">
          <template scope="scope">
            <span v-if="scope.row.type == 1">启用</span>
            <span class="rowtype" v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="155">
          <template scope="scope">
            <el-button type="text"><router-link to="/CourseoutlineManage/CourseOutline">编辑课程大纲</router-link></el-button>

            <!-- <el-button type="text"><router-link to="/CourseoutlineManage/CourseModule">编辑课程大纲</router-link></el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <!--<div class="clues-pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :page-sizes="[10, 20, 50, 100, 200, 300, 400]" :page-size="pageSize"
                       :current-page="currentPage" layout="total, sizes, prev, pager, next, jumper"
                       :total="cluesTotal" :page-count="10/pageSize">
        </el-pagination>
      </div>-->
    </div>


    <el-dialog title="新建课程大纲" class="tabplane" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="课程大纲名称" prop="name">
          <el-input class="coursetxt" v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="所属项目" prop="project">
          <el-select v-model="ruleForm.project" @change="checkproject" placeholder="请选择所属项目">
            <el-option v-for="(rev,index) in projectlist" :key="rev.project_id" :label="rev.project_name" :value="rev.project_id"></el-option>
          </el-select>
        </el-form-item>

        
        <el-form-item label="所属科目" prop="subjectrule">
          <el-select v-model="ruleForm.subjectrule" :disabled="!issubject" placeholder="请选择所属科目">
            <el-option v-for="(com,index) in boxsubject" :label="com.subject_name" :value="com.subject_id"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="是否启用" prop="istrue">
          <el-select v-model="ruleForm.istrue" placeholder="是否启用">
            <el-option label="是" value="0"></el-option>
            <el-option label="否" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="coursebtn">
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
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
  import {getProjectSubject,CourseSyllabus} from '../../api/outline.js';

  export default {
    components: {},
    data() {
      return {
        radio: '全部',
        radio2: '全部',
        input2:'',
        videoList:[
          {
            videoid: '123',
            classname: '基金从业一类线索',
            project: 'CFA',
            subject: 'level1',
            type:1,
            num: '12',
            updatetime: '2017-10-21 09:57'
          },{
            videoid: '1234',
            classname: '基金从业一类线索1',
            project: 'ACCA',
            subject: 'level2',
            type:0,
            num: '4',
            updatetime: '2017-10-21 09:57'
          }
        ],
        ruleForm: {
          name: '',
          project: '',
          subjectrule: '',
          istrue: ''
        },
        rules: {
          name: [
            { required: true, message: '课程大纲名称', trigger: 'blur' },
            { min: 3, max: 80, message: '长度在 3 到 80 个字符', trigger: 'blur' }
          ],
          project: [
            { required: true, message: '所属项目', trigger: 'change' }
          ],
          subjectrule: [
            { required: true, message: '所属科目', trigger: 'change' }
          ],
          istrue: [
            { required: true, message: '是否启用', trigger: 'change' }
          ]
        },
        dialogFormVisible: false,
        options: [{
          value: '1',
          label: '全部状态'
        }, {
          value: '2',
          label: '启用'
        }, {
          value: '3',
          label: '禁用'
        }],
        selectvalue:"全部状态",
        clver:"0",
        clversm:"0",
        tablist:[
          {
          id:"12",
          name:"CFA",
          tabdata:[{
            id:"1",
            name:"level11"
          },{
            id:"2",
            name:"level12"
          },{
            id:"3",
            name:"level13"
          }]
        },{
          id:"123",
          name:"ACCA",
          tabdata:[{
            id:"4",
            name:"alevel14"
          },{
            id:"5",
            name:"alevel15"
          },{
            id:"6",
            name:"alevel16"
          }]
        }
        ],
        outdata:[],
        projectlist:[],
        subjectlist:[],
        issubject:false,
        boxsubject:[]
      }
    },
    methods: {
      checkproject(value){
        this.issubject = true;
        for(let reg of this.projectlist){
          if(reg.project_id == value){
            let subjectall = reg.subject_list;
            subjectall.unshift({
              subject_id:'0',
              subject_name:'全部'
            })
            this.boxsubject = subjectall;
          }
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let ret = CourseSyllabus({
              title:this.ruleForm.name,
              project_id:this.ruleForm.project,
              subject_id:this.ruleForm.subjectrule,
              status:this.ruleForm.istrue
            });
            
            if(ret.status == 0){
              console.log("提交成功！");
            }else{
              console.log("提交失败！");
            }







            this.dialogFormVisible = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // onload(){
      //   let ret = this.tablist
      //   console.log(ret);
      //   this.outdata = ret;
      // },
      outlinechange(reid,index){
        this.clver = reid;
        if(this.clver == '0'){
          this.subjectlist = [];
        }else{
          this.subjectlist = this.projectlist[index].subject_list;
        }
      },
      mulchange(reid){
        this.clversm = reid;
      },
      async getProjectSubject(projectid){
        let ret = await getProjectSubject();
        if(ret.status == 0){
          this.projectlist = ret.result;
          this.boxsubject = ret.result;
        }
      },
    },
    computed: {},
    mounted() {
      //this.onload();
      this.getProjectSubject();
    },
    created() {

    }
  }
</script>