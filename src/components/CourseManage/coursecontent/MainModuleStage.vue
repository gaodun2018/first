<template>
  <div class="modlue-stage">
    <!--阶段-->
    <el-row style="margin-bottom: 22px;">
      <div class="fromtitle">
        <i class="titicon"></i>
        <span class="tittxt">阶段</span>
      </div>
      <el-table :data="tableData" border style="width: 90%;margin-top: 16px;">
        <el-table-column label="序号" align="center" width="60">
          <template slot-scope="scope">
            <span>{{scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="阶段名称" width="240">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
            <el-tag type="danger" size="small" v-if="scope.row.attribute == '1'">前导阶段</el-tag>
            <el-tag type="danger" size="small" v-if="scope.row.attribute == '2'">翻转阶段</el-tag>
            <el-tag type="danger" size="small" v-if="scope.row.attribute == '3'">复习阶段</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="阶段描述" width="220">
          <template slot-scope="scope">
            <span>{{scope.row.description}}</span>
          </template>
        </el-table-column>
        <el-table-column label="阶段课程大纲 ">
          <template slot-scope="scope">
            <span>{{scope.row.syllabus_id}} - {{scope.row.syllabus_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="160">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
            <el-button size="small" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="text" @click="handleCheck(scope.row)">查看大纲</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="addBox">
        <div @click="addTableData" style="cursor: pointer;display: inline-block;padding: 0 30px;">
          <i class="additem"></i>
          <el-button type="text" class="addBtn">新增一个阶段</el-button>
        </div>
      </div>
    </el-row>
    <el-dialog class="addContent tabplane" width="660px" top="8%" :title="uAction == 'addDate'?'新增一个阶段':'编辑课程阶段'" :visible.sync="dialogVisible" @close="cancel('stageForm')">
      <el-form :model="stageForm" ref="stageForm" label-width="120px">
        <el-form-item label="阶段名称" prop="name" :rules="filter_rules({required:true,type:'isAllSpace',max:10})">
          <el-input v-model="stageForm.name" class="coursetxt"></el-input>
        </el-form-item>
        <el-form-item label="阶段介绍" prop="description" :rules="filter_rules({required:true,type:'isAllSpace',max:20})">
          <el-input v-model="stageForm.description" class="coursetxt"></el-input>
        </el-form-item>
        <el-form-item label="阶段课程大纲">
          <el-radio v-model="chooseOutlineRadio" label="1">新建课程大纲</el-radio>
          <el-radio v-model="chooseOutlineRadio" label="2">从已有的课程大纲中选择</el-radio>
        </el-form-item>
        <el-form-item v-if="chooseOutlineRadio == 2" label="" prop="syllabus_id" :rules="[{required: true, message: '选择该阶段的课程大纲', trigger: 'change'}]">
          <el-select @change="handleChange" v-model="stageForm.syllabus_id" placeholder="选择该阶段的课程大纲" style="width: 90%;">
            <el-option :label="item.id+' - '+item.title" :value="String(item.id)" v-for="item in outlineList" :key="item.id"></el-option>
          </el-select>
          <el-button type="primary" class="checkOutlineBtn" @click="openSyllabusPage">查看大纲</el-button>
        </el-form-item>
        <el-form-item v-if="chooseOutlineRadio == 1" label="" prop="title" :rules="filter_rules({required:true,type:'isAllSpace',max:50})">
          <el-input class="coursetxt" v-model="stageForm.title" placeholder="请输入课程大纲名称（限50字内）"></el-input>
        </el-form-item>
        <el-form-item label="阶段特殊属性（选填）">
          <el-checkbox-group v-model="attribute" @change="handleCheckboxChange">
            <el-checkbox :label="1">前导阶段</el-checkbox>
            <el-checkbox :label="2">翻转阶段</el-checkbox>
            <el-checkbox :label="3">复习阶段</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item style="margin-top:-24px;" v-if="attribute.length > 0" label="" prop="attribute_id" :rules="[{required: true, message: '该选项为必填项！', trigger: 'change'}]">
          <el-select v-model="stageForm.attribute_id" style="width: 90%;" filterable :placeholder="attribute[0]===1?'请选择学前测试的试卷ID':attribute[0]===2?'请选择该翻转阶段适用的考季':'请选择该复习阶段适用的考季'">
            <el-option v-for="item in attrOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="coursebtn">
          <el-button @click="cancel('stageForm')">取 消</el-button>
          <el-button type="primary" :loading="btnLoading" @click="updateTable('stageForm')" v-if="uAction==='update'">保 存
          </el-button>
          <el-button type="primary" :loading="btnLoading" @click="addTable('stageForm')" v-if="uAction==='addDate'">确 定</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>

  </div>
</template>
<style lang="less">
.checkOutlineBtn {
  margin-top: 20px;
}
.modlue-stage {
  .el-checkbox__inner {
    border-radius: 50%;
  }
}
</style>

<script>
export default {
  components: {},
  data() {
    return {
      ruleForm: {
        bEnabled: "1"
      },
      stageForm: {
        name: "", //阶段名称
        description: "", //阶段描述
        syllabus_id: "", //阶段挂载的大纲id
        title: "", //新建的大纲标题
        // attribute: [] //属性，1:前导阶段；2:翻转阶段；3：复习阶段；0:普通阶段
        attribute_id: "" //试卷id， 考季id，
      },
      attribute: [], //属性，1:前导阶段；2:翻转阶段；3：复习阶段；0:普通阶段
      dialogVisible: false, //
      currentTemplate: "", //当前大纲的模板  定位需要跳转的页面
      tableData: [], //阶段数据
      uAction: "", //标记新增/修改
      gradation_id: "", //阶段的id 用于修改、删除
      chooseOutlineRadio: "2", //新增阶段时候的大纲选择
      btnLoading: false, //按钮loading
      attrOptions: [
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
      ]
    };
  },
  methods: {
    //新增数据 确定
    addTable(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.AddCourseStage();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleChange(sy_id) {
      this.outlineList.forEach(item => {
        if (item.id == sy_id) {
          this.currentTemplate = item.template;
        }
      });
    },
    //打开大纲页面
    openSyllabusPage() {
      let sy_id = this.stageForm.syllabus_id;
      if (sy_id) {
        if (this.currentTemplate) {
          window.open(`/#/syllabus/manage/edit/${sy_id}`);
        } else {
          window.open(`/#/syllabus/manage/template/${sy_id}`);
        }
      } else {
        window.open("/#/syllabus/manage/list");
      }
    },
    // 查看大纲
    handleCheck(row) {
      let sy_id = row.syllabus_id;
      let currentTemplate;
      this.outlineList.forEach(item => {
        if (item.id == sy_id) {
          currentTemplate = item.template;
        }
      });
      if (sy_id) {
        if (currentTemplate) {
          window.open(`/#/syllabus/manage/edit/${sy_id}`);
        } else {
          window.open(`/#/syllabus/manage/template/${sy_id}`);
        }
      } else {
        window.open("/#/syllabus/manage/list");
      }
    },
    //
    handleCheckboxChange(d) {
      if (d.length > 1) {
        this.attribute = d.splice(-1);
      }
      console.log(this.attribute);
    },
    // 新增阶段
    async AddCourseStage() {
      let stageParams = {};
      let syllabus_id; //大纲id
      let attribute; //阶段属性
      let paper_id; //试卷id
      let season_id; //考季id
      if (this.attribute.length === 0) {
        attribute = 0;
        paper_id = 0;
        season_id = 0;
      } else {
        attribute = this.attribute[0];
        switch (attribute) {
          case 1:
            // 前导阶段
            paper_id = 1;
            season_id = 0;
            break;
          case 2:
          case 3:
            paper_id = 0;
            season_id = 1;
            // 翻转/复习阶段
            break;
        }
      }
      if (this.chooseOutlineRadio == "1") {
        //新建大纲流程
        this.btnLoading = true;
        syllabus_id = await this.createSyllabus();
        if (!syllabus_id) {
          this.btnLoading = false;
          this.$message.error("添加失败");
          return;
        }
      } else if (this.chooseOutlineRadio == "2") {
        // 选择已有大纲流程
        syllabus_id = this.stageForm.syllabus_id;
      } else {
        return;
      }
      stageParams = {
        name: this.stageForm.name, //阶段名称
        syllabus_id: syllabus_id, //大纲id
        description: this.stageForm.description, //阶段描述
        course_id: this.course_id, //课程id
        attribute: attribute, //属性，1:前导阶段；2:翻转阶段；3：复习阶段；0:普通阶段
        paper_id: paper_id, //试卷id，属性选择前导阶段时，若属性选择其他的，则试卷id为0
        season_id: season_id //考季id，选择前导阶段属性时默认为0
      };
      this.btnLoading = true;
      let ret = await this.$http.AddCourseStage(stageParams);
      this.btnLoading = false;
      if (ret.status == 0) {
        this.$message({
          type: "success",
          message: ret.message
        });
        this.dialogVisible = false;
        this.getStageAndOutline();
      } else if (ret.status > 0) {
        ret.message ? ret.message : "新增失败！";
        this.$message.error(ret.message);
      }
    },
    //新建课程大纲
    async createSyllabus() {
      let stageParams = {};
      //新建大纲流程
      let syllabusParams = {
        title: this.stageForm.title,
        project_id: this.project_id, //项目id
        subject_id: this.subject_id, //科目id
        status: "0" //是否启用 0-启用 1-禁用
      };
      let syllabusRet = await this.$http.CourseSyllabus(syllabusParams);
      if (syllabusRet.status == 0) {
        let outlineList = JSON.parse(JSON.stringify(this.outlineList));
        if (!(outlineList instanceof Array)) {
          outlineList = [];
        }
        outlineList.unshift(syllabusRet.result);
        this.$store.dispatch("saveCourseSyllabuses", outlineList); //更新大纲列表数据
        let syllabus_id = syllabusRet.result.id; //大纲id
        return syllabus_id;
      } else {
        return;
      }
    },
    //更新数据
    updateTable(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.changeStage();
        } else {
          return false;
        }
      });
    },
    //编辑课程阶段
    async changeStage() {
      let gradation_id = this.gradation_id;
      let stageParams = {};
      let syllabus_id; //大纲id
      let attribute; //阶段属性
      let paper_id; //试卷id
      let season_id; //考季id
      if (this.attribute.length === 0) {
        attribute = 0;
        paper_id = 0;
        season_id = 0;
      } else {
        attribute = this.attribute[0];
        switch (attribute) {
          case 1:
            // 前导阶段
            paper_id = 1;
            season_id = 0;
            break;
          case 2:
          case 3:
            paper_id = 0;
            season_id = 1;
            // 翻转/复习阶段
            break;
        }
      }
      if (this.chooseOutlineRadio == "1") {
        //新建大纲流程
        syllabus_id = await this.createSyllabus();
        if (!syllabus_id) {
          this.$message.error("编辑失败!");
          return;
        }
      } else if (this.chooseOutlineRadio == "2") {
        // 选择已有大纲流程
        syllabus_id = this.stageForm.syllabus_id;
      } else {
        return;
      }
      stageParams = {
        name: this.stageForm.name, //阶段名称
        syllabus_id: syllabus_id, //大纲id
        description: this.stageForm.description, //阶段描述
        course_id: this.course_id, //课程id
        attribute: attribute, //属性，1:前导阶段；2:翻转阶段；3：复习阶段；0:普通阶段
        paper_id: paper_id, //试卷id，属性选择前导阶段时，若属性选择其他的，则试卷id为0
        season_id: season_id //考季id，选择前导阶段属性时默认为0
      };
      let ret = await this.$http.changeStage(gradation_id, stageParams);
      if (ret.status == 0) {
        this.$message({
          type: "success",
          message: ret.message
        });
        this.dialogVisible = false;
        this.getStageAndOutline();
      } else if (ret.status > 0) {
        ret.message ? ret.message : "编辑失败!";
        this.$message.error(ret.message);
      }
    },
    handleDelete(index, row) {
      this.gradation_id = row.id;
      this.$confirm("此操作将删除该阶段, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.DeleteStage();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //删除一个阶段
    async DeleteStage() {
      let gradation_id = this.gradation_id;
      let ret = await this.$http.DeleteStage(gradation_id);
      if (ret.status == 0) {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.getStageAndOutline();
      } else if (ret.status > 0) {
        ret.message ? ret.message : "删除失败！";
        this.$message.error(ret.message);
      }
    },
    //弹层新增阶段弹层
    addTableData() {
      this.stageForm = {
        name: "",
        description: "",
        syllabus_id: "",
        title: "",
        attribute: 0
      };
      this.chooseOutlineRadio = "2";
      this.uAction = "addDate";
      this.dialogVisible = true;
    },
    //弹出编辑弹层
    handleEdit(index, row) {
      this.uAction = "update";
      this.gradation_id = row.id;
      let sy_id = row.syllabus_id;
      this.chooseOutlineRadio = "2";
      this.stageForm = { ...this.tableData[index] };
      this.dialogVisible = true;
      this.handleChange(sy_id);
    },
    cancel(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    },
    async getStageAndOutline() {
      let course_id = this.course_id;
      let ret = await this.$http.getStageAndOutline(course_id);
      if (ret.status == 0) {
        this.tableData = ret.result.gradation_list;
        this.$store.dispatch('getDradationList',ret.result.gradation_list);
      }
    }
  },
  computed: {
    course_id() {
      return this.$route.params.cid;
    },
    outlineList() {
      return this.$store.state.course.course_Syllabuses;
    },
    project_id() {
      if (this.$store.state.course.course_info) {
        return this.$store.state.course.course_info.project_id;
      }
    },
    subject_id() {
      if (this.$store.state.course.course_info) {
        return this.$store.state.course.course_info.subject_id;
      }
    }
  },
  mounted() {},
  created() {
    this.getStageAndOutline();
  }
};
</script>
