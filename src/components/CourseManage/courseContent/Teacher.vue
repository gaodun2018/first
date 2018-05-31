<template>
  <div>
    <!-- 选老师 -->
    <el-form ref="firstForm" :model="ruleForm" label-width="100%" label-position="left" :inline="true">
      <el-form-item label="本课程是否启用选老师的功能">
        <el-radio-group v-model="ruleForm.bEnabled" @change="handleChange">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">不启用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template v-if="ruleForm.bEnabled===1?true:false">
      <el-row>
        <el-tag class="teacher-tag" v-for="tag in teacherList" :key="tag.user_id" closable @close="removeTeacher(tag)">
          {{tag.name}}（老师ID：{{tag.user_id}}）
        </el-tag>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-select style="width:90%;" v-model="selectValue" filterable remote reserve-keyword placeholder="请选择一个老师（可输入老师姓名搜索）" :remote-method="remoteMethod" :loading="loading">
            <el-option v-for="item in options" :key="item.user_id" :label="item.name+'-ID:'+item.user_id" :value="item.user_id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button :disabled="selectValue==undefined||selectValue==null||selectValue==''" type="primary" @click="addTeacher">增加一位老师</el-button>
        </el-col>
      </el-row>
    </template>
  </div>
</template>
<style lang="less">
.teacher-tag {
  margin: 0 10px 10px 0;
}
</style>

<script>
// change	选中值发生变化时触发	目前的选中值
// visible-change	下拉框出现/隐藏时触发	出现则为 true，隐藏则为 false
// remove-tag	多选模式下移除tag时触发	移除的tag值
export default {
  components: {},
  props: [],
  data() {
    return {
      options: [],
      ruleForm: {
        bEnabled: 1
      },
      selectValue: [],
      loading: false,
      seachTimeOut: null,
      isHandle: false,
      teacherList: []
    };
  },
  methods: {
    handleVisibleChange(bool) {
      this.isHandle = bool;
    },
    //增加老师
    async addTeacher() {
      let params = {
        course_id: this.course_id,
        teacher_id: this.selectValue
      };
      let ret = await this.$http.addTeacher(params);
      if (ret.status === 0) {
        this.$message({
          message: "添加老师成功！",
          type: "success"
        });
        this.selectValue = '';
        this.getTeacherList();
      } else {
        this.$message({
          message: "添加老师失败！",
          type: "error"
        });
      }
    },
    // 删除老师
    async removeTeacher(tag) {
      let id = tag.user_id;
      let params = {
        course_id: this.course_id,
        teacher_id: id
      };
      let ret = await this.$http.removeTeacher(params);
      if (ret.status === 0) {
        this.$message({
          message: "删除成功！",
          type: "success"
        });
        this.getTeacherList();
      } else {
        this.$message({
          message: "删除失败！",
          type: "error"
        });
      }
    },
    async handleRemoveTag(val) {},
    //  搜索老师
    remoteMethod(query) {
      if (query !== '') {
      clearTimeout(this.seachTimeOut);
      this.seachTimeOut = setTimeout(() => {
        console.log(query);
        this.loading = true;
        let params = {
          name: query
        };
        this.$http
          .searchTeacher(params)
          .then(res => {
            console.log(res);
            this.loading = false;
            if (res.status === 0) {
              this.options = res.result;
            }
          })
          .catch(err => {
            this.loading = false;
            console.log(err);
          });
      }, 500);
      }else{
        this.options = [];
      }
    },
    // 启用设置
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
    // 获取老师列表
    async getTeacherList() {
      let ret = await this.$http.getTeacherList(this.course_id);
      if (ret.status === 0) {
        this.teacherList = ret.result;
        //   let list = ret.result;
        //   list.forEach(element => {
        //     this.teacherList.push(element.user_id);
        //   });
        //   this.teacherForm.teacher = ret.result;
      }
    }
  },
  computed: {
    course_id() {
      return this.$route.params.cid;
    }
  },
  mounted() {},
  created() {
    this.getTeacherList();
  }
};
</script>
