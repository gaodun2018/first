<template>
  <div>
    <!-- 选老师 -->
    <el-row class="set-tab-wrapper">
      <el-row class="tab-title">
        本课程是否启用选老师的功能
      </el-row>
      <el-row class="tab-radio">
        <el-radio-group v-model="isEnabled" @change="handleChange">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">不启用</el-radio>
        </el-radio-group>
      </el-row>
    </el-row>
    <template v-if="isEnabled == 1 ? true : false">
      <el-row>
        <el-tag class="teacher-tag" v-for="tag in teacherList" :key="tag.user_id" closable @close="removeTeacher(tag)">
          {{tag.name}}（老师ID：{{tag.user_id}}）
        </el-tag>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-select style="width:90%;" v-model="selectValue" filterable remote reserve-keyword
                     placeholder="请选择一个老师（可输入老师姓名搜索）" clearable :remote-method="remoteMethod" :loading="loading">
            <el-option v-for="item in options" :key="item.user_id" :label="item.name+'-ID:'+item.user_id"
                       :value="item.user_id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button :disabled="selectValue==undefined||selectValue==null||selectValue==''" type="primary"
                     @click="addTeacher">增加一位老师
          </el-button>
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
        if(this.teacherList != null){ // 初始回调会将数组指向空对象
          if(this.teacherList.length == 4){//判断老师数量
                this.$message({
                message: '最多可添加四个老师',
                type: 'warning'
            });
            this.selectValue = '';
            return false;
          }
          if(this.teacherList.length != 0 ){//判断老师是否重复
            for(let i=0;i<this.teacherList.length;i++){
              if(this.teacherList[i].user_id == this.selectValue) {
                  this.$message({
                      message: '此老师已选择，请勿重复添加',
                      type: 'warning'
                  });
                  this.selectValue = '';
                  return false;
              }
            }
          }
        }

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
      async handleRemoveTag(val) {
      },
      //  搜索老师
      remoteMethod(query) {
        if (query !== '') {
          clearTimeout(this.seachTimeOut);
          this.seachTimeOut = setTimeout(() => {
            this.loading = true;
            let params = {
              name: query
            };
            this.$http
              .searchTeacher(params)
              .then(res => {
                this.loading = false;
                if (res.status === 0) {
                  this.options = res.result;
                }
              })
              .catch(err => {
                this.loading = false;
              });
          }, 500);
        } else {
          this.options = [];
        }
      },
      // 启用设置
      handleChange(value) {
        this.SetCourseDisable();
      },
      //设置讲义模块的启用
      async SetCourseDisable() {
        let msg = this.isEnabled === 1? '启用选择老师成功' : '已关闭选择老师';
        let cource_id = this.$route.params.cid;
        let params = {
          setting_value: this.isEnabled, //是否启用，0:不启用，1:启用
          setting_key: "course_teacher_open" //启用键值，prefix:前导阶段；mock:模考阶段；classroom:翻转课堂；review:特殊复习阶段;knowledge_recommend:知识点判断推荐；knowledge_syllabus:知识骨牌;gaodun_course_id:高顿关联课程id;classroom_pk_open:班级pk；handout_download_open：讲义下载；study_record_open：学习记录；course_syllabus_open：课程大纲；glive_open：glive开关；course_teacher_open:选老师的开关
        };
        let ret = await this.$http.SetCourseDisable(cource_id, params);
        if(ret.status === 0){
          this.$message({
            message:msg,
            type:'success'
          })
        }else{
          this.$message({
            message:'启用选择老师失败',
            type:'warning'
          })
        }
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
      },
      isEnabled: {
        get() {
          return this.$store.state.course.course_disable.course_teacher_open;
        },
        set(v) {
          let data = {};
          data.course_teacher_open = v;
          this.$store.dispatch("courseDisable", data);
        }
      }
    },
    mounted() {
    },
    created() {
      this.getTeacherList();
    }
  };
</script>
