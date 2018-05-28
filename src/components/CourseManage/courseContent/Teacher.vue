<template>
  <div>
    <!-- 选老师 -->
    <el-form ref="firstForm" :model="ruleForm" label-width="100%" label-position="left" :inline="true">
      <el-form-item label="本课程是否启用选老师的功能" class="handouts-form-item">
        <el-radio-group v-model="ruleForm.bEnabled" @change="handleChange">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">不启用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template v-if="ruleForm.bEnabled===1?true:false">
      <el-form :model="teacherForm" ref="teacherForm" label-width="0">
        <el-form-item label="" prop="teacher">
          <el-select style="width:90%;" filterable multiple remote reserve-keyword :remote-method="remoteMethod" :loading="loading" v-model="teacherForm.teacher" placeholder="请选择一个老师（可输入老师姓名搜索）">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </template>
  </div>
</template>
<style>
.handouts-form-item {
  width: 89%;
}

.handouts-form-item .el-form-item__content {
  width: 100%;
}

.handouts-form-item .el-form-item__content .addhandout {
  float: right;
}
</style>
<style lang="less" scoped>
.scroll-table {
  width: 90%;
  overflow-x: auto;
}
.table {
  // width: 100%;
  min-width: 820px;
  border: 1px solid #ebeef5;
  border-bottom: none;
  .center {
    text-align: center;
  }
  .table-move {
    cursor: move;
  }
  .table-item {
    border-right: 1px solid #ebeef5;
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    padding: 0 8px;
    color: #253342;
    &:last-child {
      border-right: none;
      min-width: 114px;
    }
  }
  .table-line-title {
    min-height: 50px;
    border-bottom: 1px solid #ebeef5;
    display: flex;
    justify-content: space-around;
    line-height: 50px;
    .table-item {
      background-color: #f5f7fa;
      font-size: 14px;
      font-weight: 600;
    }
  }
  .table-line {
    // height: 56px;
    border-bottom: 1px solid #ebeef5;
    display: flex;
    justify-content: space-around;
    .table-item {
      padding-top: 12px;
      padding-bottom: 12px;
      box-sizing: border-box;
      font-size: 12px;
      line-height: 16px;
      .table-item-text {
        padding-top: 9px;
        padding-bottom: 9px;
      }
    }
    .border-r-n {
      border-right: none;
    }
  }
  .table-line-bg:hover {
    background: #f5f7fa;
  }
}
</style>

<script>
import { format } from "../../../util/util";
import Vue from "../../../common/vue.js";
import { handoutTable } from "../../common/courseConfig.js";
export default {
  components: {},
  props: [],
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value10: [],
      dialogVisible: false,
      ruleForm: {
        bEnabled: ""
      },
      teacherForm: {
        teacher: ""
      },
      loading: false,
      NewTableForm: {},
      tableData: [],
      file: [],
      currentIndex: "",
      Doing: "addDate",
      handout: [], //讲义列表
      tableConfig: handoutTable,
      seachTimeOut:null,
    };
  },
  methods: {
    //  搜索老师
    remoteMethod(query) {
      // console.log(query);
      // if (query !== "") {
        clearTimeout(this.seachTimeOut);
        this.seachTimeOut = setTimeout(() => {
          console.log(query);
          this.loading = true;
          // this.loading = false;
          this.$http.searchTeacher().then(res => {
            console.log(res);
          }).catch(err =>{
            console.log(err);
          })
          // this.$http
          // this.options4 = this.list.filter(item => {
          //   return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          // });
        }, 500);
      // }
      // else {
      //   this.options4 = [];
      // }
    },
    //获取讲义列表
    async getCourseHandout() {
      let url = this.course_id;
      let ret = await this.$http.getCourseHandout(url);
      if (ret.status == 0) {
        this.handout = ret.result.list;
      }
    },
    //获取讲义是否设置
    async GetCourseDisable() {
      let course_id = this.$route.params.cid;
      let ret = await this.$http.GetCourseDisable(course_id);
      if (ret.status == 0) {
        //0是没启用 1是启用了
        this.ruleForm = {
          bEnabled: ret.result.handout_download_open
            ? Number(ret.result.handout_download_open)
            : 0
        };
      }
    },
    handleChange(value) {
      this.SetCourseDisable();
    },
    //设置讲义模块的启用
    async SetCourseDisable() {
      let cource_id = this.$route.params.cid;
      let params = {
        setting_value: this.ruleForm.bEnabled, //是否启用，0:不启用，1:启用
        setting_key: "handout_download_open" //启用键值，prefix:前导阶段；mock:模考阶段；classroom:翻转课堂；review:特殊复习阶段;knowledge_recommend:知识点判断推荐；knowledge_syllabus:知识骨牌;gaodun_course_id:高顿关联课程id;classroom_pk_open:班级pk；handout_download_open：讲义下载；study_record_open：学习记录；course_syllabus_open：课程大纲；glive_open：glive开关；
      };
      let ret = await this.$http.SetCourseDisable(cource_id, params);
    },
    //获取讲义列表
    async getCourseHandout() {
      let url = this.course_id;
      let ret = await this.$http.getCourseHandout(url);
      if (ret.status == 0) {
        this.handout = ret.result.list;
      }
    },
    //删除数据
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.DeleteStage(row.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async DeleteStage(id) {
      let ret = await this.$http.deleteCourseHandout(id);
      if (ret.status == 0) {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.getCourseHandout();
      } else if (ret.status > 0) {
        ret.message ? ret.message : "删除失败！";
        this.$message.error(ret.message);
      }
    },
    //新增数据
    addTableData() {
      this.NewTableForm = {
        name: "",
        content: "",
        file_name: "",
        size: "",
        path: ""
      };
      this.Doing = "addDate";
      this.file = [];
      this.dialogVisible = true;
    },
    addTable(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.AddCourseHandout();
        } else {
          return false;
        }
      });
    },
    // 上传批量讲义
    async AddCourseHandout() {
      if (this.NewTableForm.path == "") {
        this.$message({
          showClose: true,
          message: "你必须要上传一个讲义！",
          type: "warning"
        });
        return;
      }
      let params = {
        ...this.NewTableForm,
        course_id: this.course_id
      };
      let ret = await this.$http.AddCourseHandout(params);
      if (ret.status == 0) {
        this.$message({
          type: "success",
          message: ret.message ? ret.message : "添加成功！"
        });
        this.dialogVisible = false;
        this.NewTableForm = {
          name: "",
          content: "",
          file_name: "",
          size: "",
          path: ""
        };
        this.file = [];
        this.getCourseHandout();
      } else if (ret.status > 0) {
        this.$message.error("添加失败！");
      }
    },
    //编辑数据按钮
    handleEdit(index, row) {
      this.Doing = "update";
      this.NewTableForm = { ...this.handout[index] };
      this.currentIndex = index;
      this.file = [
        {
          name: this.NewTableForm.file_name,
          response: {
            filePath: this.NewTableForm.path
          }
        }
      ];
      this.dialogVisible = true;
    },
    //更新数据
    updateTable(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updateCourseHandout();
        } else {
          return false;
        }
      });
    },
    // 更新讲义
    async updateCourseHandout() {
      if (this.NewTableForm.path == "") {
        this.$message({
          showClose: true,
          message: "你必须要上传一个讲义！",
          type: "warning"
        });
        return;
      }
      let params = {
        ...this.NewTableForm,
        course_id: this.course_id
      };
      console.log(params);
      let ret = await this.$http.updateCourseHandout(params.id, params);
      if (ret.status == 0) {
        this.$message({
          type: "success",
          message: ret.message ? ret.message : "编辑成功！"
        });
        this.dialogVisible = false;
        this.NewTableForm = {
          name: "",
          content: "",
          file_name: "",
          size: "",
          path: ""
        };
        this.file = [];
        this.getCourseHandout();
      } else if (ret.status > 0) {
        ret.message ? ret.message : "编辑失败！";
        this.$message.error(ret.message);
      }
    },
    //取消
    cancel(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
      this.file = [];
    },
    //更新文件
    updateFlies(res, fileList) {
      if (res && res != "remove") {
        this.NewTableForm.path = res.filePath ? res.filePath : "";
        this.NewTableForm.upload_size =
          res.result && res.result.file.size ? res.result.file.size : "";
        this.NewTableForm.file_name =
          res.result && res.result.file.name ? res.result.file.name : "";
      } else if (res == "remove") {
        this.NewTableForm.path = "";
        this.NewTableForm.upload_size = "";
        this.NewTableForm.file_name = "";
        this.file = [];
        return;
      }
      this.file = this.file.concat(fileList).slice(-1);
    },
    //排序
    async dragEnd(data) {
      console.log(data);
      let { cids } = this.getSortData(data);
      console.log(cids);
      let params = {
        course_id: this.course_id,
        handout_sort: cids.join(",")
      };
      let ret = await this.$http.handoutSort(params);
      if (ret.status == 0) {
        this.message({
          type: "success",
          message: "排序成功！"
        });
        this.getCourseHandout();
      } else {
        this.message({
          type: "warning",
          message: "排序失败！"
        });
      }
    },
    getSortData(data) {
      let cids = [];
      for (let value of data) {
        cids.push(value.id);
      }
      return { cids };
    }
  },
  computed: {
    course_id() {
      return this.$route.params.cid;
    }
  },
  mounted() {
    // Vue.$on('uploadFile', (res, fileList) => {
    // })
  },
  created() {
    this.GetCourseDisable();
    this.getCourseHandout();
  }
};
</script>
