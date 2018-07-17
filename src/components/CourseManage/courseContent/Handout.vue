<template>
  <div>
    <!--批量讲义 -->
    <el-row class="set-tab-wrapper">
      <el-row class="tab-title">
        本课程是否启用批量下载讲义模块
      </el-row>
      <el-row class="tab-radio">
        <el-radio-group v-model="isEnabled" @change="handleChange">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">不启用</el-radio>
        </el-radio-group>
      </el-row>
    </el-row>
    <template v-if="isEnabled==1?true:false">
      <div class="scroll-table">
        <div class="table">
          <div class="table-line-title">
            <span class="table-item center" :style="item.flex" v-for="(item,index) in tableConfig" :key="index">{{item.text}}</span>
          </div>
          <draggable v-model="handout" :options="{group:'people',animation:200,draggable:'.table-move'}" element="div" @end="dragEnd(handout)">
            <div class="table-line table-line-bg table-move" v-for="(ele,index) in handout" :key="index">
              <span class="table-item center" :style="item.flex" v-for="(item,i) in tableConfig" :key="i">
                <span class='table-item-text beyond-hidden-2' v-if="item.key === 'index'">{{index + 1}}</span>
                <template v-else-if="item.key === 'done'">
                  <el-button size="small" type="text" @click="handleDelete(index, ele)" style="margin: 0 10px">删除
                  </el-button>
                  <el-button size="small" type="text" @click="handleEdit(index, ele)" style="margin: 0 10px">编辑
                  </el-button>
                </template>
                <span class="table-item-text beyond-hidden-2" v-else>{{ele[item.key]}}</span>
              </span>
            </div>
          </draggable>
        </div>
      </div>
      <div class="addBox">
        <div @click="addTableData" style="cursor: pointer;display: inline-block;padding: 0 30px;">
          <i class="additem"></i>
          <el-button type="text" class="addBtn">新增一个讲义</el-button>
        </div>
      </div>
    </template>
    <el-dialog class="addContent tabplane handoutsDialog" :title="Doing=='update'?'编辑讲义':'新增讲义'" :visible.sync="dialogVisible" @close="cancel('NewTableForm')">
      <el-form :model="NewTableForm" ref="NewTableForm" label-width="120px">
        <el-form-item label="显示名称" prop="name" :rules="filter_rules({required:true,type:'isAllSpace',maxLength:60})">
          <el-input v-model="NewTableForm.name" auto-complete="off" class="coursetxt" placeholder="请输入显示名称"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="content" :rules="filter_rules({type:'isAllSpace',max:50})">
          <el-input v-model="NewTableForm.content" type="textarea" auto-complete="off" placeholder="请输入备注" class="coursetxt"></el-input>
        </el-form-item>
        <el-form-item label="上传文件" prop="file_name">
          <FilesUpload :file="file" @updateFlies="updateFlies"></FilesUpload>
        </el-form-item>
        <el-form-item class="coursebtn">
          <el-button @click="cancel('NewTableForm')">取 消</el-button>
          <el-button type="primary" @click="updateTable('NewTableForm')" v-if="Doing=='update'">保 存
          </el-button>
          <el-button type="primary" @click="addTable('NewTableForm')" v-if="Doing=='addDate'">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
import FilesUpload from "./HandoutModelUpload.vue";
import Vue from "../../../common/vue.js";
import draggable from "vuedraggable";
import { handoutTable } from "../../common/courseConfig.js";
export default {
  components: { FilesUpload, draggable },
  props: [],
  data() {
    return {
      dialogVisible: false,
      NewTableForm: {},
      tableData: [],
      file: [],
      currentIndex: "",
      Doing: "addDate",
      handout: [], //讲义列表
      tableConfig: handoutTable
    };
  },
  methods: {
    //获取讲义列表
    async getCourseHandout() {
      let url = this.course_id;
      let ret = await this.$http.getCourseHandout(url);
      if (ret.status == 0) {
        this.handout = ret.result.list;
      }
    },
    handleChange(value) {
      this.SetCourseDisable();
    },
    //设置讲义模块的启用
    async SetCourseDisable() {
      let cource_id = this.$route.params.cid;
      let params = {
        setting_value: this.isEnabled, //是否启用，0:不启用，1:启用
        setting_key: "handout_download_open" //启用键值，prefix:前导阶段；mock:模考阶段；classroom:翻转课堂；review:特殊复习阶段;knowledge_recommend:知识点判断推荐；knowledge_syllabus:知识骨牌;gaodun_course_id:高顿关联课程id;classroom_pk_open:班级pk；handout_download_open：讲义下载；study_record_open：学习记录；course_syllabus_open：课程大纲；glive_open：glive开关；
      };
      let ret = await this.$http.SetCourseDisable(cource_id, params);
      if (ret.status === 0) {
        this.$message({
          message: "启用批量讲义成功！",
          type: "success"
        });
      } else {
        this.$message({
          message: "启用批量讲义失败！",
          type: "error"
        });
        this.isEnabled = this.isEnabled === 1 ? 0 : 1;
      }
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
      let { cids } = this.getSortData(data);
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
    },
    isEnabled: {
      get() {
        return this.$store.state.course.course_disable.handout_download_open;
      },
      set(v) {
        let data = {};
        data.handout_download_open = v;
        this.$store.dispatch("courseDisable", data);
      }
    }
  },
  mounted() {
    // Vue.$on('uploadFile', (res, fileList) => {
    // })
  },
  created() {
    // this.GetCourseDisable();
    this.getCourseHandout();
  }
};
</script>
