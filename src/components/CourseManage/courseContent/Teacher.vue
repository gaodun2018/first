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
      <el-form :model="teacherForm" ref="teacherForm" label-width="0">
        <el-form-item label="" prop="teacher">
          <el-select style="width:90%;" filterable multiple remote reserve-keyword :remote-method="remoteMethod" :loading="loading" v-model="teacherForm.teacher" placeholder="请选择一个老师（可输入老师姓名搜索）">
            <el-option v-for="item in options" :key="item.user_id" :label="item.name" :value="item.user_id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </template>
  </div>
</template>

<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      options: [],
      ruleForm: {
        bEnabled: 1
      },
      teacherForm: {
        teacher: ""
      },
      loading: false,
      seachTimeOut: null
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
        // {
        //     "name": "江伟东",
        //     "user_id": "57",
        //     "english_name": "Jokki.Jiang",
        //     "introduction": "",
        //     "picture": "",
        //     "video": "0"
        // }
        this.$http.searchTeacher().then(res => {
            console.log(res);
            if(res.status === 0){
              this.options = res.result;
            }
          })
          .catch(err => {
            console.log(err);
          });
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
    }
  },
  computed: {
    course_id() {
      return this.$route.params.cid;
    }
  },
  mounted() {},
  created() {}
};
</script>
