<template>
  <div class="search_tools" style="overflow: hidden;margin-bottom: 22px;">
    <el-row>
      <el-col :sm="24">
        <div class="button_group_t">
          <span>项 目:</span>
          <span class="clitem" :class="[clver === null ?'current':'']" @click="outlinechange(null)">全部</span>
          <span class="clitem" :class="[rev.project_id === clver ?'current':'']" v-for="(rev,index) in projectlist" :key="index" @click="outlinechange(rev.project_id,index)">{{rev.project_name}}
          </span>
        </div>
        <div class="button_group_b">
          <span> 科 目:</span>
          <span class="clitem" :class="[clversm === null ?'current':'']" @click="mulchange(null)">全部</span>
          <span class="clitem" :class="[revs.subject_id === clversm ?'current':'']" v-for="(revs,index) in subjectlist" :key="index" @click="mulchange(revs.subject_id,index)">{{revs.subject_name}}
          </span>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" align="bottom">
      <el-col :sm="6">
        <el-row>
          <div class="select-search">
            <el-select v-model="selectvalue" @change="selectval" placeholder="请选择" size="small">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </el-row>
      </el-col>
      <el-col :sm="18">
        <el-row type="flex" justify="end">
          <div class="input-search">
            <el-input placeholder="请输入课程大纲ID、名称" size="small" v-model="searchinput" @keyup.native.enter="handleIconClick">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="handleIconClick"></i>
            </el-input>
            <el-button type="primary" size="small" @click="addCourseOutline" v-if="unlocking('SY_CREATE')">+&nbsp;新建一个课程大纲</el-button>
            <a class='docBtn' :href="`${docUrl}#/outlineCourse`" target="_blank">
              <i class="el-icon-question"></i>
              使用帮助
            </a>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getDocumentUrl } from "../../util/config.js";
export default {
  data () {
    return {
      clver: null, //项目id
      clversm: null, //科目id
      subjectlist: [],
      selectvalue: "",
      options: [
        {
          value: "",
          label: "全部状态"
        },
        {
          value: "0",
          label: "启用"
        },
        {
          value: "1",
          label: "禁用"
        }
      ],
      searchinput: "",
      docUrl: getDocumentUrl,
    }
  },
  computed: {
    ...mapState({
      projectlist: state => {
        return state.common.project_subject_list;
      }
    })
  },
  mounted () {
    this.$store.dispatch("getProjectSubjectList");
  },
  methods: {
    getCourseSyllabuses (){},
    outlinechange(reid, index) {
      this.clver = reid;
      if (reid === null) {
        this.subjectlist = [];
      } else {
        this.subjectlist = this.projectlist[index].subject_list;
      }
      this.clversm = null; //科目设置为0
      this.pageSize = 15;
      this.currentPage = 1;
      this.searchinput = "";
      this.selectvalue = "";
      this.getCourseSyllabuses(1, this.page_size);
    },
    mulchange(reid) {
      this.clversm = reid;
      this.pageSize = 15;
      this.currentPage = 1;
      this.searchinput = "";
      this.getCourseSyllabuses();
    },
    selectval(value) {
      // 状态搜索
      this.selectvalue = value;
      this.getCourseSyllabuses(1, this.page_size);
      this.searchinput = "";
    },
    handleIconClick() {
      // 搜索框
      this.clversm = null;
      this.clver = null;
      this.selectvalue = "";
      this.subjectlist = [];
      this.getCourseSyllabuses();
    },
    addCourseOutline() {
      // 新增一个课程大纲 弹出框
      this.btnLoading = false;
      this.substatus = "addoutline";
      this.dialogCourse = true;
      this.isCopy = false;
      this.dialogTitle = "新建课程大纲";
      this.ruleForm = {
        title: "",
        project_id: "",
        subject_id: "",
        status: ""
      };
      this.dialogFormVisible = true;
      this.issubject = false;
    },
  }
}
</script>

<style>

</style>
