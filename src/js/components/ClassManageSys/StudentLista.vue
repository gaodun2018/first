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
                :key="rev.id"
                :label="rev.name"
                :value="rev.id">
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
                :key="revs.id"
                :label="revs.name"
                :value="revs.id">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :sm="6">
          <div class="button_group_t teachtxt">
            <el-input placeholder="学员ID,手机,姓名,邮箱,昵称" size="small" icon="search" v-model="searchinput"
                        :on-icon-click="handleIconClick" @keyup.native.enter="handleIconClick"></el-input>
          </div>
        </el-col>
        <!-- <el-col :sm="6">
          <div class="button_group_t">
            <el-button type="primary" size="small" @click="addClassModel">新建班级</el-button>
            <el-button type="primary" size="small" @click="addCourseOutline">学员入班</el-button>
          </div>
        </el-col> -->
      </el-row>
    </div>

    <div class="edu_table">
      <el-table ref="multipleTable" v-loading="loading" :row-class-name="tableRowClassName" @selection-change="handleSelectionChange" border :data="mmStudentList" style="width: 100%">
        <el-table-column prop="id" label="学员ID" min-width="120">
        </el-table-column>
        <el-table-column prop="name" label="姓名" min-width="180">
        </el-table-column>
        <el-table-column prop="phone" label="手机" min-width="120">
        </el-table-column>
        <el-table-column prop="user_email" label="邮箱" min-width="240">
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" min-width="120">
        </el-table-column>
        <el-table-column label="操作" min-width="155">
          <template scope="scope">
            <el-button type="text"><router-link :to="'//'+baseUrl+'gcloud.gaodun.com/edata/#/studentHome/'+scope.row.id" target="_blank" tag="a">查看详情</router-link></el-button>

            <el-button type="text"><router-link :to="'//'+baseUrl+'buyclass/buyclass.html?studentId='+scope.row.id+'&stuName='+scope.row.name+'&nickname='+scope.row.nickname" target="_blank" tag="a">购课列表</router-link></el-button>
            <!-- <el-button type="text"><router-link :to="'/SyllabusManage/CourseModule/'+scope.row.id">查看大纲</router-link></el-button> -->

          </template>
        </el-table-column>
      </el-table>
      <div class="edu-pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[15, 30,50]" :page-size="page_size" :current-page="pagenum" :current-page.sync="pagenum" layout="total, sizes, prev, pager, next, jumper" :total="courselinenum">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<style>
.teachtxt{}
.teachtxt span{float:left;margin:8px 4px 0 0;}
.teachtxt .el-input--small{width:220px;}
.teachtxt .el-input--small .el-input__inner{padding:6px 20px 6px 10px;height:36px;}
</style>
<script>
  import Vue from 'vue';
  import {getStudentList} from '../../api/outline.js';
  import {getEnv} from '../../util/config';

  export default {
    components: {},
    data() {
      return {
        courselinenum:'',
        projectlist:[],
        subjectlist:[],
        issubject:false,
        pagenum:'',
        page_size:'',
        flag:true,
        selproject:"",
        selsubject:'',
        mmStudentList:[],
        baseUrl: getEnv(),
        projecttop:'',
        subjecttop:'',
        searchinput:''
      }
    },
    methods: {
      checkprojectlist(val){
        this.projecttop = val;
        if(val){
          if(this.flag){
            for(let reg of this.projectlist){
              if(reg.id == val){
                this.issubject = true;
                let subjectall = [...reg.subject];
                subjectall.unshift({
                  id:'0',
                  name:'全部'
                })
                this.subjectlist = subjectall;
                this.selsubject = '0';
              }
            }
            this.getStudentList();
          }
        }
      },
      checksubjectlist(val){
        this.subjecttop = val;
        if(val != 0){
          
        }
        this.getStudentList();
      },

      async getStudentList(){
        if(!this.pagenum){
          this.flag = false;
        }
        this.page_size = this.page_size ? this.page_size : 15;
        this.pagenum = this.pagenum ? this.pagenum : 1;
        this.projecttop = this.projecttop ? this.projecttop : '';
        this.subjecttop = this.subjecttop ? this.subjecttop : '';
        this.$jsonp('//t-jerusalemapi.gaodun.com/Student/getStudentList',{
          current_page:this.pagenum,
          nums:this.page_size,
          project_id:this.projecttop,
          subject_id:this.subjecttop,
          other_search:this.searchinput
        }).then(json => {
          this.flag = true;
          // 返回数据 json， 返回的数据就是json格式
          if (json.status == "100") {
            this.mmStudentList = json.data.list;
            this.courselinenum = json.data.count;
            this.projectlist = json.data.project_list;
          }
        }).catch(err => {
          console.log(err)
          // this.studyempty = false;
          // this.loadingf = false;
        })
      },
      handleIconClick(){
        this.getStudentList();
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.page_size = val;
        this.pagenum = 1;
        this.getStudentList();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        if(this.flag){
          this.pagenum = val;
          this.getStudentList();
        }
      }
    },
    computed: {},
    mounted() {
      this.getStudentList();
    },
    created() {

    }
  }
</script>