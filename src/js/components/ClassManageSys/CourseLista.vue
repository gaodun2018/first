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
          <div class="button_group_t">
            <span>网课类型:</span>
            <el-select v-model="selttype" @change="checkcoursetype" placeholder="请选择">
              <el-option key="-1" label="全部" value="-1">全部</el-option>
              <el-option key="0" label="普通网课" value="0">普通网课</el-option>
              <el-option key="3" label="EP" value="3">EP</el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :sm="6">
          <div class="button_group_t teachtxt">
            <el-input placeholder="课程ID,课程名称" size="small" icon="search" v-model="searchinput"
                        :on-icon-click="handleIconClick" @keyup.native.enter="handleIconClick"></el-input>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="edu_table">
      <el-table ref="multipleTable" v-loading="loading" :row-class-name="tableRowClassName" @selection-change="handleSelectionChange" border :data="mmCourseList" style="width: 100%">
        <el-table-column prop="course_id" label="课程ID" min-width="60">
        </el-table-column>
        <el-table-column prop="course_name" label="课程包名称" min-width="280">
        </el-table-column>
        <el-table-column label="课程现价/原价" min-width="150">
          <template scope="scope">
            <div class="pricecourse">
              <em class="cp1">{{scope.row.now_price}}</em><br/>
              <em class="cp2"><s>{{scope.row.old_price}}</s></em>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="使用周期/截止日期" min-width="120">
        </el-table-column>
        <el-table-column label="网课类型" min-width="100">
          <template scope="scope">
            <span v-if="scope.row.type == 0">普通网课</span>
            <span v-if="scope.row.type == 3">EP</span>
          </template>
        </el-table-column>
        <el-table-column prop="student_count" label="学员数量" min-width="100">
        </el-table-column>
        <el-table-column label="操作" min-width="155">
          <template scope="scope">
            <el-button type="text"><router-link :to="'//'+baseUrl+'gcloud.gaodun.com/edata/#/courseHome/'+scope.row.course_id" target="_blank" tag="a">课程统计</router-link></el-button>
            <!-- <el-button type="text"><router-link :to="'/CourseoutlineManage/CourseModule/'+scope.row.id">查看大纲</router-link></el-button> -->

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
  import {getClassList} from '../../api/outline.js';
  import {getEnv} from '../../util/config';

  export default {
    components: {},
    data() {
      return {
        mmCourseList:[],
        projectlist:[],
        courselinenum:'',
        flag:true,
        pagenum:'',
        page_size:'',
        projecttop:'',
        subjecttop:'',
        searchinput:'',
        baseUrl: getEnv(),
        selproject:'',
        selsubject:'',
        selttype:''
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
                  id:'',
                  name:'全部'
                })
                this.subjectlist = subjectall;
                this.selsubject = '';
              }
            }
            this.getCourseList();
          }
        }
      },
      checksubjectlist(val){
        this.subjecttop = val;
        if(val != 0){
          
        }
        this.getCourseList();
      },
      checkcoursetype(val){
        this.selttype = val;
        this.getCourseList();
      },
      handleIconClick(){
        this.projecttop = '';
        this.subjecttop = '';
        this.page_size = 15;
        this.pagenum = 1;
        this.getCourseList();
      },
      async getCourseList(){
        if(!this.pagenum){
          this.flag = false;
        }
        this.page_size = this.page_size ? this.page_size : 15;
        this.pagenum = this.pagenum ? this.pagenum : 1;
        this.projecttop = this.projecttop ? this.projecttop : '';
        this.subjecttop = this.subjecttop ? this.subjecttop : '';
        this.selttype = this.selttype ? this.selttype : '-1'
        this.$jsonp('//t-jerusalemapi.gaodun.com/CourseList/getAllCourse',{
          current_page:this.pagenum,
          nums:this.page_size,
          type:this.selttype,               // 网课类型
          project_id:this.projecttop,
          subject_id:this.subjecttop,
          other_search:this.searchinput
        }).then(json => {
          this.flag = true;
          // 返回数据 json， 返回的数据就是json格式
          if (json.status == "100") {
            if(json.data.list.length > 0){
              this.mmCourseList = json.data.list;
            }else{
              this.mmCourseList = [];
            }
            this.courselinenum = json.data.count;
            this.projectlist = json.data.project_list;
          }else{
            this.mmCourseList = [];
          }
        }).catch(err => {
          console.log(err)
          // this.studyempty = false;
          // this.loadingf = false;
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.page_size = val;
        this.pagenum = 1;
        // if(!this.flagtwo){
          this.getCourseList();
        // }
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        if(this.flag){
          this.pagenum = val;
          this.getCourseList();
        }
      }
    },
    computed: {},
    mounted() {
      this.getCourseList();
    },
    created() {

    }
  }
</script>