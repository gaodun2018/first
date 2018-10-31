<template>
  <div class="edu_table">
    <el-table ref="multipleTable" v-loading="tableLoading" border :data="CourseLineList" style="width: 100%">
      <el-table-column prop="id" label="大纲ID" min-width="100" fixed>
      </el-table-column>
      <el-table-column prop="title" label="课程大纲名称" min-width="200">
      </el-table-column>
      <el-table-column prop="title" label="大纲类型" min-width="100">
      </el-table-column>
      <el-table-column prop="project.name" label="所属项目" min-width="100">
      </el-table-column>
      <el-table-column prop="subject.name" label="所属科目" min-width="125">
      </el-table-column>
      <!--<el-table-column prop="num" label="使用" min-width="150">-->
      <!--</el-table-column>-->
      <el-table-column label="所属状态" min-width="115">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">启用</span>
          <span class="rowtype" v-else>禁用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="260" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="UpdateOutlineTitle(scope.$index, scope.row)" v-if="unlocking('SY_BASIC_SET')">基本设置</el-button>
          <el-button type="text" @click="checkSyllabus(scope.$index, scope.row)" v-if="unlocking('SY_CONTENT')">编辑大纲内容</el-button>
          <el-button type="text" @click="UpdateOutlineTitle(scope.$index, scope.row, 'true')">复制大纲</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="edu-pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[15, 30,50]" :page-size="page_size" :current-page="currentPage" layout="total, sizes, prev, pager, next, jumper" :total="courselinenum">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableLoading: false, //列表loading
      CourseLineList: [{id: 1}],
      currentPage: 1, //第几页 当前页码
      page_size: 15, //一页显示多少
      courselinenum: 0,
    }
  },
  methods: {
    UpdateOutlineTitle(index, row, copy) {
      this.ruleForm = {
        title: row.title,
        project_id: String(row.project.id),
        subject_id: String(row.subject.id),
        status: String(row.status),
        is_knowledge_open:row.is_knowledge_open
      };
      //判断是编辑还是复制
      if (copy) {
        //复制一个课程大纲
        this.btnLoading = false;
        this.dialogTitle = "复制课程大纲";
        this.ruleForm.title = "";
        this.substatus = "copyoutline";
        this.issubject = false;
        this.ruleForm.id = row.id;
        this.isCopy = true;
        if (row.template) {
          this.ruleForm.template_id = row.template.id;
        } else {
          this.ruleForm.template_id = 0;
        }
      } else {
        // 修改一个课程大纲 弹出框
        this.btnLoading = false;
        this.isCopy = false;
        this.dialogTitle = "编辑课程大纲";
        if (this.ruleForm.hasOwnProperty("id")) {
          delete this.ruleForm.id;
        }
        if (this.ruleForm.hasOwnProperty("template_id")) {
          delete this.ruleForm.template_id;
        }
        this.substatus = "updateoutline";
        this.dialogCourse = false;
        this.issubject = true;
        this.outlineid = row.id;
      }
      for (var i = 0; i < this.projectlist.length; i++) {
        if (this.projectlist[i].project_id == row.project.id) {
          let subjectall = [...this.projectlist[i]["subject_list"]];
          this.boxsubject = subjectall;
        }
      }
      this.currentIndex = index;
      this.dialogFormVisible = true;
    },
    //查看大纲按钮
    checkSyllabus(index, row) {
      if (row.template == null) {
        this.$router.push({
          path: "/syllabus/manage/template/" + row.id
        });
      } else {
        this.$router.push({
          path: "/syllabus/manage/edit/" + row.id
        });
      }
    },
    handleSizeChange(val) {
      this.page_size = val;
      this.currentPage = 1;
      this.getCourseSyllabuses();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCourseSyllabuses();
    },
  }
}
</script>

<style>

</style>
