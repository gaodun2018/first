<template>
  <div class="module-edu-content course-manage">
    <div class="search_tools" style="overflow: hidden;margin-bottom: 22px;">
      <el-row>
        <el-col :sm="24">
          <div class="button_group_t">
            <span>项 目:</span>
            <span class="clitem" :class="[clver === null ?'current':'']" @click="outlinechange(null)">全部</span>
            <template v-for="(rev,index) in projectlist">
              <span class="clitem" :class="[rev.project_id === clver ?'current':'']" :key="index" @click="outlinechange(rev.project_id,index)">{{rev.project_name}}
              </span>
            </template>
          </div>
          <div class="button_group_b">
            <span> 科 目:</span>
            <span class="clitem" :class="[clversm === null ?'current':'']" @click="mulchange(null)">全部</span>
            <template v-for="(revs,index) in subtablist">
              <span class="clitem" :class="[revs.subject_id === clversm ?'current':'']" :key="index" @click="mulchange(revs.subject_id)">{{revs.subject_name}}</span>
            </template>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" align="bottom">
        <el-col :sm="6">
          <el-row>
            <div class="select-search">
              <el-select v-model="selectvalue" placeholder="请选择" size="small" @change="changesearch" @visible-change="visibleChange">
                <el-option label="全部课程类型" value=""></el-option>
                <el-option v-for="item in course_type" :key="item.course_type_id" :label="item.name" :value="item.course_type_id">
                </el-option>
              </el-select>
            </div>
          </el-row>
        </el-col>
        <el-col :sm="18">
          <el-row type="flex" justify="end">
            <div class="input-search">
              <el-input placeholder="课程ID／课程名称" size="small" v-model="searchinput" @keydown.native.enter="handleIconClick">
                <i slot="suffix" class="el-input__icon el-icon-search" @click="handleIconClick"></i>
              </el-input>
              <el-button
                type="primary"
                size="small"
                @click="dialogCourseVisible = true"
                :disabled="isBtnDisabled"
                v-if="unlocking('COURSE_CREATE')"
              >
                +&nbsp;新增一个课程
              </el-button>
              <a class='docBtn' :href="`${docUrl}#/createCourse`" target="_blank">
                <i class="el-icon-question"></i>
                使用帮助
              </a>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="edu_table">
      <el-table ref="multipleTable" border v-loading="loading" :data="videoList" style="width: 100%">
        <el-table-column prop="course_id" label="课程id" width="80" fixed>
        </el-table-column>
        <el-table-column prop="course_name" label="课程名称" min-width="260">
        </el-table-column>
        <el-table-column prop="" label="项目" min-width="170">
          <template slot-scope="scope">
            <span>{{scope.row.project&&scope.row.project.project_name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="科目" min-width="200">
          <template slot-scope="scope">
            <span>{{scope.row.subject&&scope.row.subject.subject_name?scope.row.subject.subject_name:'不限科目'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="course_type" label="网课类型" min-width="260">
          <template slot-scope="scope">
            <span v-if="scope.row.course_type==10">网课2.0</span>
            <span v-else-if="scope.row.course_type==11">EP2.0</span>
            <span v-else-if="scope.row.course_type==12">Glive2.0</span>
            <span v-else-if="scope.row.course_type==3">自适应学习网课-EP</span>
            <span v-else>{{scope.row.course_type}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="400" align="center">
          <template slot-scope="scope">
            <router-link style="margin: 0 10px;" v-if="unlocking('COURSE_BASIC_SET')" class="routerBtn" :to="'/course/manage/basic/set/'+scope.row.course_id">基本设置
            </router-link>
            <router-link style="margin: 0 10px;" v-if="unlocking('COURSE_CONTENT')" class="routerBtn" :to="'/course/manage/content/set/'+scope.row.course_id">课程内容
            </router-link>
            <el-button type="text" @click="clearCache(scope.row)" :disabled="index == scope.row.course_id">{{index == scope.row.course_id? '正在清除':'清除缓存'}}</el-button>
            <el-tooltip class="item" effect="dark" placement="top-end" :disabled="isTooldisabled">
              <div slot="content">如果没有打开预览页面<br/>请注意浏览器右上角，允许弹框！</div>
              <el-button type="text" @click="previewCourse(scope.row)">课程预览</el-button>
            </el-tooltip>
            <el-button type="text" @click="showLogs(scope.row.course_id)">操作日志</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="edu-pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="eduTotal">
        </el-pagination>
      </div>
    </div>
    <el-dialog class="addCourse" title="新建课程" :visible.sync="dialogCourseVisible" @close="closeDialog('ruleForm')">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="课程名称" prop="course_name" :rules="filter_rules({required:true,type:'isAllSpace',max:50})">
          <el-input v-model="ruleForm.course_name"></el-input>
        </el-form-item>
        <el-form-item label="所属项目" prop="project_id" :rules="[ { required: true, message: '请选择所属项目', trigger: 'change' }]">
          <el-select v-model="ruleForm.project_id" placeholder="请选择所属项目" @change="changeProject">
            <el-option :label="item.project_name" :value="item.project_id" v-for="item in projectlist" :key="item.project_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属科目" prop="subject_id" :rules="[ { required: true, message: '请选择所属科目', trigger: 'change' }]">
          <el-select v-model="ruleForm.subject_id" :disabled="!bSubject" placeholder="请选择所属科目">
            <el-option label="不限科目" value="0"></el-option>
            <el-option :label="item.subject_name" :value="item.subject_id" v-for="item in selectedlist" :key="item.subject_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网课类型" prop="course_type_id" :rules="[ { required: true, message: '请选择网课类型', trigger: 'change' }]">
          <el-select v-model="ruleForm.course_type_id" placeholder="请选择网课类型">
            <el-option :label="item.name" :value="item.course_type_id" v-for="item in course_type" :key="item.course_type_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="last-form-item">
          <el-button @click="closeDialog('ruleForm')">取消</el-button>
          <el-button type="primary" :loading="btnLoading" @click="submitForm('ruleForm')">
            {{btnLoading?'新建中':'确定'}}
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <logs-dialog
    :dialog="logVisiable"
    :list="logList"
    :total="logTotal"
    @handleChangePage="handleChangePage"
    @toClose="toClose"
    ></logs-dialog>
  </div>
</template>
<style>
.course-manage .el-dialog__header {
  padding: 30px 20px 0;
  text-align: center;
}

.course-manage .el-form-item__label {
  color: #8f9aac;
}

.course-manage .last-form-item {
  text-align: center;
  margin-top: 40px;
}

.course-manage .last-form-item .el-form-item__content {
  margin-left: 0 !important;
}
</style>
<script>
import { SAAS_TOKEN } from "../../util/keys";
import { setToken } from "./../../util/setToken";
import { getCookie, setCookie } from "../../util/cookie.js";
import { getEnv, getBaseUrl, getDocumentUrl } from "../../util/config";
import { course_type,old_course_type } from "../../common/courseConfig.js";
import { mapState } from "vuex";
import logsDialog from "../public/showLogsDialog"
let prefix = getEnv();
export default {
  components:{
      logsDialog,
  },
  data() {
    return {
      index:-1,
      logVisiable: false,
      logList: [], // log日志列表
      page: 1,
      logTotal: 0,
      sourceId: 0,
      btnLoading: false, //按钮loading
      loading: false,
      selectfalg: false, //选择器搜索开关
      subtablist: [], //按钮组科目列表
      selectedlist: [], //新增课程科目列表
      bSubject: false, //是否可以选择科目
      course_type: course_type, //网课类型
      selectvalue: "", //下拉搜索所选择的的网课类型
      // options: options, //下拉搜索的网课类型列表
      //新增课程的表单
      ruleForm: {
        course_name: "",
        project_id: "",
        subject_id: "",
        course_type_id: ""
      },
      dialogCourseVisible: false,
      searchinput: "", //输入框搜索
      clver: null, //点击搜索所选项目
      clversm: null, //点击搜索所选科目
      videoList: [],
      eduTotal: 0, //总数
      currentPage: 1, //默认当前页
      pageSize: 15, //默认分页数量
      docUrl: getDocumentUrl,
      authCodeKey: "iTSe2NQd9PG6lzojysC48BHuXgvIcAqw",
      isBtnDisabled: true
    };
  },
  computed: {
    ...mapState({
      projectlist: state => {
        return state.common.project_subject_list;
      }
    }),
    isTooldisabled() {
      return getCookie(`Identification`) ? true : false;
    }
  },
  methods: {
    //   显示操作日志弹框
    showLogs(val){
        this.sourceId = val;
        this.logVisiable = true;
        this.getlogs();
    },
    //   关闭弹框
    toClose(){
        this.logVisiable = false;
    },
    // 获取弹层数据列表
    async getlogs(){
        let params = {
            log_type:1,
            page_num: this.page,
            page_size: 50,
            source_id: this.sourceId?this.sourceId: '',
        }
        let ret = await this.$http.getLogsList(params);
        console.log(ret);
        this.logList = ret.result.data;
        this.logTotal = ret.result.total;
        console.log(this.logList,this.logTotal);
    },
    // 改变分页
    handleChangePage(val){
        this.page = val;
        this.getlogs();
    },
    // 清除函数
    clearCache(val){
      this.index = val.course_id;
      let param = {course_id : val.course_id}
      this.$http.clearCache(param).then(res=>{
        if(res.status === 0){
          setTimeout(() => {
            this.index = -1;
            this.$message({
              message:'此课程缓存清除成功',
              type:'success'
            })
          }, 600);
        }
      })
    },
    async searchCourse() {
      this.loading = true;
      let ret = await this.$http.searchCourse({
        project_id: this.clver,
        subject_id: this.clversm,
        page: this.currentPage,
        page_size: this.pageSize,
        course_type: this.selectvalue,
        course_id_name: this.searchinput
      });
      this.loading = false;
      if (ret.status == 0) {
        this.isBtnDisabled = false;
        this.videoList = ret.result.item_list;
        this.eduTotal = ret.result.all_item_count;
      }else {
        this.isBtnDisabled = true;
      }
    },
    visibleChange(bool) {
      //开关函数
      this.selectfalg = bool;
    },
    changesearch(val) {
      //选择器搜索
      if (this.selectfalg) {
        this.searchinput = "";
        this.searchCourse();
      }
    },
    handleIconClick() {
      //输入框搜索
      this.clver = null; //点击搜索所选项目
      this.clversm = null; //点击搜索所选科目
      this.selectvalue = ""; //下拉搜索所选择的的网课类型
      this.subtablist = [];
      this.searchCourse();
    },
    //新增下拉框选取项目后切换科目
    changeProject(val) {
      for (var obj in this.projectlist) {
        if (this.projectlist[obj].project_id == val) {
          this.bSubject = true;
          let subject_list = [...this.projectlist[obj].subject_list];
          this.selectedlist = subject_list;
          this.ruleForm.subject_id = "0";
        }
      }
    },
    //点击项目切换科目
    outlinechange(reid, index) {
      this.clver = reid;
      if (reid === null) {
        this.subtablist = [];
      } else {
        this.subtablist = this.projectlist[index].subject_list;
      }
      this.clversm = null; //科目设置为null 全部
      this.pageSize = 15;
      this.currentPage = 1;
      this.searchinput = "";
      this.searchCourse();
    },
    //点击切换科目
    mulchange(reid) {
      this.clversm = reid;
      this.pageSize = 15;
      this.currentPage = 1;
      this.searchinput = "";
      this.searchCourse();
    },
    //关闭弹层
    closeDialog(formName) {
      this.bSubject = false;
      this.dialogCourseVisible = false;
      this.$refs[formName].resetFields();
    },
    //新增一个课程
    addCourse(ruleForm) {
      this.btnLoading = true;
      this.$http
        .addCourse({ ...ruleForm })
        .then(res => {
          this.btnLoading = false;
          if (res.status == 0) {
            this.dialogCourseVisible = false;
            this.bSubject = false;
            this.clver = null; //点击搜索所选项目
            this.clversm = null; //点击搜索所选科目
            this.searchCourse();
            this.$message({
              message: res.message,
              type: "success"
            });
          }
        })
        .catch(error => {
          // console.log(error);
        });
    },
    //新增课程确定按钮表单验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addCourse(this.ruleForm);
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1;
      this.searchCourse();
    },
    handleCurrentChange(page) {
      // console.log(page);
      this.currentPage = page;
      this.searchCourse();
    },
    previewCourse(row) {
      console.log(row);
      const {course_type, course_id} = row;
      let previewUrl = "";
      switch(course_type) {
        case "10":
          previewUrl = `//${prefix}cloud.gaodun.com/preview/course/${row.course_id}`
          // previewUrl = `http://dev-cloud.gaodun.com:8060/preview/course/${row.course_id}`
          break;
        default:
          previewUrl = "#"

      }
      if (previewUrl && previewUrl !== '#'){
        window.open(previewUrl);
      }else {
        this.$message({
          type: 'warning',
          message : '该课程类型暂不支持课程预览'
        })
      }
      // let GDSID = getCookie(`${getEnv()}GDSID`);
      // this.$http
      //   .previewCourse({ session_id: GDSID, course_id: row.course_id })
      //   .then(res => {
      //     setToken("Identification", res.headers.identification, ".gaodun.com");
      //     setToken("Accesstoken", res.headers.accesstoken, ".gaodun.com");
      //     setToken("Refreshtoken", res.headers.refreshtoken, ".gaodun.com");
      //     window.open(res.data.result.call_back);
      //   });
    }
  },
  mounted() {
    this.$store.dispatch("getProjectSubjectList");
    this.searchCourse();
    //线上测试使用属性，可以建ep2课程
    // let ep2 = localStorage.getItem('isInEP2') ? true :false;
    // if (ep2){
    //   this.course_type =  course_type;
    // }
  }
};
</script>
