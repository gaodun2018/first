<template>
  <div class="module-edu-content coursecontent">
    <div class="outlineeat">
      【课程ID：{{course_id}}】 {{course_name}}
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="主课程" name="MainCourse"></el-tab-pane>
      <el-tab-pane label="批量讲义" name="Handout"></el-tab-pane>
      <el-tab-pane label="选老师" name="Teacher" v-if="course_type == '11'"></el-tab-pane>
      <el-tab-pane label="考季管理" name="ExamTime" v-if="course_type == '11'"></el-tab-pane>
    </el-tabs>
    <div class="el-tabs__content">
      <div class="el-tab-pane">
        <keep-alive>
          <component :is="activeName"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<style>
.coursecontent .el-tabs.el-tabs--card .el-tabs__content {
  display: none;
}
</style>
<script>
import MainCourse from "./courseContent/MainCourse.vue";
import Glive from "./courseContent/Glive.vue";
import Handout from "./courseContent/Handout.vue";
import Teacher from "./courseContent/Teacher.vue";
import ExamTime from "./courseContent/ExamTime.vue";
export default {
  name: "CourseModuleContentSet",
  components: {
    MainCourse,
    Glive,
    Handout,
    Teacher,
    ExamTime
  },
  data() {
    return {
      activeName: "MainCourse",
      handout: "courseHandout"
    };
  },
  methods: {
    handleClick(tab, event) {},
    //获取课程的基本设置 拿到项目 科目id
    async getCourseInfo() {
      let url = this.course_id;
      let ret = await this.$http.getCourseInfo(url);
      if (ret.status == 0) {
        this.$store.dispatch("saveCourseInfo", ret.result);
        this.CourseSyllabuses();
      }
    },
    //获取课程下的大纲 根据项目科目id
    async CourseSyllabuses() {
      let params = {
        page: "1",
        page_size: "100",
        project_id:
          this.$store.state.course.course_info &&
          this.$store.state.course.course_info.project_id,
        subject_id:
          this.$store.state.course.course_info &&
          this.$store.state.course.course_info.subject_id,
        status: "0", //获取启用的大纲
        keyword: ""
      }
      if (this.course_type == 4) {
        params.type = 1 //区分GLIVE&SS（默认0，GLIVE&SS 1）
      }
      let ret = await this.$http.CourseSyllabuses(params);
      if (ret.status == 0) {
        this.$store.dispatch("saveCourseSyllabuses", ret.result.list);
      }
    },
    // 获取课程多项启用设置
     async GetCourseDisable() {
      let course_id = this.course_id;
      let ret = await this.$http.GetCourseDisable(course_id);
      if (ret.status === 0) {
        //0是没启用 1是启用了
        this.$store.dispatch('courseDisable',ret.result);
        // this.ruleForm = {
        //   bEnabled: ret.result.handout_download_open
        //     ? Number(ret.result.handout_download_open)
        //     : 0
        // };
      }
    },
  },
  computed: {
    course_id() {
      return this.$route.params.cid;
    },
    course_name() {
      return this.$store.state.course.course_info.course_name;
    },
    course_type(){
      return this.$store.state.course.course_info.course_type;
    }
  },
  mounted() {},
  created() {
    this.getCourseInfo();
    this.GetCourseDisable();
  }
};
</script>
<style lang="less" scoped>
.outlineeat {
  margin-bottom: 20px;
}
</style>
<style>
.coursecontent .el-tabs__header {
  margin: 0;
}

.coursecontent .el-tabs__content {
  border: 1px solid #d1dbe5;
  border-top: none;
  padding-top: 36px;
  padding-left: 30px;
  padding-bottom: 40px;
}

.coursecontent .fromtitle {
  margin-bottom: 6px;
}

.coursecontent .fromtitle .titicon {
  width: 4px;
  height: 18px;
  background: #26a1ff;
  display: inline-block;
  margin-right: 4px;
  vertical-align: middle;
}

.coursecontent .fromtitle .tittxt {
  display: inline-block;
  font-size: 14px;
  color: #2a2b2c;
  font-weight: 700;
  line-height: 20px;
  vertical-align: middle;
}

.coursecontent .el-form-item.w_350 .el-input__inner {
  width: 330px;
}

.coursecontent .first-form-item {
  display: block;
}

.coursecontent .el-form-item .el-form-item__label {
  font-size: 14px;
}

.coursecontent .el-form-item .el-form-item__content .el-radio__label {
  font-size: 14px;
  color: #2a2b2c;
}

.coursecontent
  .el-form-item
  .el-form-item__content
  .el-radio-group
  .el-radio
  + .el-radio {
  margin-left: 42px;
}

.coursecontent .el-table--fit {
  border-right: 0;
}

.coursecontent .el-table .el-table__header-wrapper tr th {
  background-color: #f5f7fa;
}

.coursecontent .el-table .el-table__header-wrapper tr th:nth-child(3) {
  text-align: center;
}

.coursecontent .el-table .el-table__header-wrapper tr th .cell {
  background-color: #f5f7fa;
  font-size: 14px;
  color: #253342;
}

.coursecontent .el-table .el-table__body-wrapper tr td {
  height: 50px;
  font-size: 12px;
  color: #253342;
}

.coursecontent .el-table .el-table__body-wrapper tr td:nth-child(3) {
  text-align: center;
}

.coursecontent
  .el-table
  .el-table__body-wrapper
  tr
  td:nth-child(3)
  .cell
  .el-button {
  margin: 0 14px;
}

.coursecontent .addBox {
  text-align: center;
  height: 60px;
  border: 1px solid #dfe6ec;
  border-top: none;
  width: 89.8%;
}

.coursecontent .addBox .additem {
  display: inline-block;
  width: 13px;
  height: 13px;
  background: url("./../../assets/images/additem.png") no-repeat center;
  vertical-align: middle;
}

.coursecontent .addBtn {
  line-height: 40px;
}

.coursecontent .addContent.tabplane .el-form-item__label {
  color: #8f9aac;
}

.module-edu-content.coursecontent
  .addContent.tabplane
  .coursebtn
  .el-form-item__content {
  margin-left: 0 !important;
}
</style>
