<template>
    <div class="module-edu-content courseset" v-loading="zLoading">
        <el-row class="progressBox">
            <el-col v-for="item in progressText" :key="item.text" :sm="12">
                <div class="order-progress-bar">
                    <i class="progress-bar-line" :class="item.isCustomerConfirm ? item.currentLine : ''"></i>
                    <i class="progress-bar-dot" :class="item.isCustomerConfirm ? item.currentDot : ''"></i>
                    <span :class="item.isCustomerConfirm ? item.currentText : ''">{{item.text}}</span>
                </div>
            </el-col>
        </el-row>
        <div class="formBox">
            <div v-show="active == 0">
                <el-form :model="ruleForm" label-position="left" ref="ruleForm" label-width="100px" class="ruleForm">
                    <el-form-item label="课程名称" prop="name" :rules="filter_rules({required:true,type:'isAllSpace',max:50})">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="所属项目" prop="project_id" :rules="[{required: true, message: '请选择所属项目', trigger: 'change'}]">
                        <el-select v-model="ruleForm.project_id" placeholder="请选择所属项目" @change="changeProject" @visible-change="visibleChange">
                            <el-option :label="item.project_name" :value="item.project_id" v-for="item in projectlist" :key="item.project_id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="所属科目" prop="subject_id" :rules="[{required: true, message: '请选择所属科目', trigger: 'change'}]">
                        <el-select v-model="ruleForm.subject_id" placeholder="请选择所属科目">
                            <el-option label="不限科目" value="0"></el-option>
                            <el-option :label="item.subject_name" :value="item.subject_id" v-for="item in selectedlist" :key="item.subject_id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="网课类型" prop="course_type" :rules="[{required: true, message: '请选择网课类型', trigger: 'change'}]">
                        <el-select v-model="ruleForm.course_type" placeholder="请选择网课类型">
                            <el-option :label="item.name" :value="item.course_type_id" v-for="item in course_type" :key="item.course_type_id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="课程封面" class="pad_10">
                        <ImgUpload></ImgUpload>
                    </el-form-item>

                    <el-form-item label="课程简介" class="pad_10">
                        <div id="ed" type="text/plain"></div>
                    </el-form-item>
                    <template  v-if="ruleForm.course_type != 11">
                       <el-form-item label="资源介绍" class="res_intro pad_10">
                        <ResourceIntro></ResourceIntro>
                    </el-form-item>

                    </template>

                    <!-- 给学员的信模块 -->
                    <template v-if="ruleForm.course_type != 11">
                      <el-form-item label="给新学员的欢迎信" class="pad_10">
                          <el-radio-group v-model="ruleForm.welcome_letter_type" @change="changeLetterType">
                              <el-radio label="1">通用模板内容</el-radio>
                              <el-radio label="2">自定义内容</el-radio>
                              <el-radio label="0">不启用欢迎信</el-radio>
                          </el-radio-group>
                      </el-form-item>
                      <el-form-item v-if="ruleForm.welcome_letter_type==0?false:true" prop="welcome_letter" :rules="filter_rules({required:true,type:'isAllSpace',max:200})">
                          <el-row>
                              <el-col :span="24">
                                  <el-input v-model="ruleForm.welcome_letter" type="textarea" @change="changeWelcomeLetter" :autosize="{ minRows: 4}" :disabled="ruleForm.welcome_letter_type==1?true:false" class="coursetxt" auto-complete="off" placeholder="请输入欢迎信的正文内容（字数请控制在100-200字内）">
                                  </el-input>
                              </el-col>
                          </el-row>
                      </el-form-item>

                       <el-form-item v-if="ruleForm.welcome_letter_type==0?false:true" prop="teacher_name" :rules="filter_rules({type:'isAllSpace',max:10})">
                        <el-row>
                            <el-col :span="6">
                                <el-input v-model="ruleForm.teacher_name" class="coursetxt" auto-complete="off" placeholder="请输入老师名字"></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    </template>
                    <!-- 编写网课2.0显示 -->
                    <template v-if="ruleForm.course_type == 11">
                      <el-form-item label="新学员介绍视频" class="pad_10">
                          <el-radio-group v-model="index" @change="changeNewMember">
                              <el-radio label="1">默认EP视频</el-radio>
                              <el-radio label="2">自定义视频</el-radio>
                          </el-radio-group>
                      </el-form-item>

                      <el-form-item>
                          <el-row v-if="isTrue==false?true:false">
                              <el-input  type="textarea" :rows="1" v-model="moren" disabled="disabled"></el-input>
                          </el-row>

                            <div class="place" v-if="isTrue" @click="isShowBox">{{ isChangeVideo }} <i v-show="isIcon" class="el-icon-arrow-right ps"></i> <i v-show="!isIcon" class="el-icon-arrow-down ps"></i> </div>

                            <!-- 弹出框 -->
                              <div v-if="isBox" class="messagebox">
                                <!-- 搜索框 -->
                                <div style="margin-top: 15px;">
                                    <el-input placeholder="请输入视频资源ID/名称" v-model="resourceinput"  @keydown.native.enter="handleIconClick" class="input-with-select">
                                      <el-button slot="append" icon="el-icon-search" @click="handleIconClick"></el-button>
                                    </el-input>
                                </div>

                                 <!-- table表格 -->
                                <el-table
                                    v-loading="resLoading"
                                    @row-click="handleRow"
                                    :data="resourceTable"
                                    cell-click="handleRow"
                                    height="250"
                                    border
                                    style="width: 100%; margin-top:20px;">
                                    <el-table-column
                                      prop="id"
                                      label="资源ID"
                                      width="180">
                                      <template slot-scope="scope">
                                        <span>{{ scope.row.id }}</span>
                                      </template>
                                    </el-table-column>
                                    <el-table-column
                                      prop="discriminator"
                                      label="资源类型"
                                      width="180">
                                      <template slot-scope="scope">
                                        <span>{{ scope.row.discriminator | changeVal }}</span>
                                      </template>
                                    </el-table-column>
                                    <el-table-column
                                      prop="title"
                                      label="资源名称">
                                       <template slot-scope="scope">
                                        <span>{{ scope.row.title }}</span>
                                      </template>
                                    </el-table-column>
                                  </el-table>

                                  <!-- 分页控件 -->
                                    <div style="width:100%;text-align:right;margin-top:20px;">
                                        <el-pagination  @current-change="handleCurrentChange" :current-page.sync="pagination.current_page" :page-size="50" layout="total, prev, pager, next, jumper" :total="pagination.total">
                                        </el-pagination>
                                      </div>

                              </div>
                      </el-form-item>
                    </template>


                    <el-form-item class="last-form-item">
                        <el-button style="margin-top: 12px;" @click="next('ruleForm')">下一步</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div v-show="active == 1">
                <el-form :model="kForm" label-position="left" ref="kForm" label-width="100px" class="kForm">
                    <el-form-item label="内容制作状态" prop="ware_status">
                        <el-select v-model="kForm.ware_status">
                            <el-option :label="item[1]" :value="item[0]+''" v-for="(item,index) in ware_status_list" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="可提问" prop="allow_question">
                        <el-radio-group v-model="kForm.allow_question">
                            <el-radio label="0">否</el-radio>
                            <el-radio label="1">是</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!-- <el-form-item label="可下载讲义" prop="allow_download">
                       <el-radio-group v-model="kForm.allow_download">
                         <el-radio label="0">否</el-radio>
                         <el-radio label="1">是</el-radio>
                       </el-radio-group>
                     </el-form-item>-->
                    <el-form-item label="可制定学习计划" prop="allow_plan">
                        <el-radio-group v-model="kForm.allow_plan">
                            <el-radio label="0">否</el-radio>
                            <el-radio label="1">是</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!-- <el-form-item label="可使用考试重点模式" prop="allow_exam">
                       <el-radio-group v-model="kForm.allow_exam">
                         <el-radio label="0">否</el-radio>
                         <el-radio label="1">是</el-radio>
                       </el-radio-group>
                     </el-form-item>-->
                    <el-form-item label="可使用问卷调查" prop="allow_investigate">
                        <el-radio-group v-model="kForm.allow_investigate">
                            <el-radio label="0">否</el-radio>
                            <el-radio label="1">是</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="问卷地址" prop="investigate_url" :rules="filter_rules({required:true,type:'isAllSpace'})" v-if="kForm.allow_investigate=='1'?true:false">
                        <el-input v-model="kForm.investigate_url"></el-input>
                    </el-form-item>
                    <el-form-item class="last-form-item">
                        <el-button style="margin-top: 12px;" @click="prev">上一步</el-button>
                        <el-button type="primary" :loading="btnLoading" @click="submitForm('kForm')">
                            {{btnLoading?'保存中':'确定'}}
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<style>
.courseset .el-loading-mask {
  height: calc(100vh - 100px);
}
</style>
<script>
import ImgUpload from "./courseSet/CourseModelUpload.vue";
import ResourceIntro from "./courseSet/CourseModelResourceIntro.vue";
import { getEnv } from "./../../util/config.js";
import {
  initial_info,
  course_type,
  progressText,
  resourceTableConfig,
  old_course_type
} from "../../common/courseConfig.js";
import { mapState, mapActions } from "vuex";
export default {
  name: "CourseModuleBasicSet",
  components: {
    ImgUpload,
    ResourceIntro
  },
  data() {
    return {
      chName:"",
      isIcon:true,
      resourceType: "video",//资源类型
      resourceRadio: "", //选择的资源
      multipleSelection: [],
      resLoading: false,
      isBox: false, //判断显示弹出框
      isTrue: false, //判断显示自定义
      searchResourceTimer: "", //搜索所用的参数
      pagination: {
        //分页参数
        current_page: 1, //资源列表当前页数
        total: 1 //资源列表总数量
      },
      resourceinput: "",
      place: "请选择视频",
      vid_id: "", //默认EPid
      index: "1",
      value: "",
      resourceTable: [],

      zLoading: false,
      btnLoading: false, //按钮loading
      editor: null,
      selectfalg: false, //选择器搜索开关
      // projectlist: [], //项目列表
      selectedlist: [], //科目列表
      ware_status_list: [], //内容制作状态
      course_type: old_course_type, //网课类型
      active: 0,
      progressText: progressText, //进度状态
      ruleForm: {
        name: "",
        project_id: "",
        subject_id: "",
        course_type: "",
        welcome_letter_type: "1",
        welcome_letter: "",
        teacher_name: ""
      },
      templateContent: "", //通用模块介绍
      userDefinedContent: "", //自定义模块介绍
      kForm: {
        ware_status: "",
        allow_question: "0",
        //          allow_download:'0',
        allow_plan: "0",
        //          allow_exam:'0',
        allow_investigate: "0",
        investigate_url: ""
      }
    };
  },
  computed: {
    ...mapState({
      projectlist: state => {
        return state.common.project_subject_list;
      }
    }),
    course_id() {
      return this.$route.params.cid;
    },
    moren(){
      return "默认视频-ID:" + this.vid_id
    },
    isChangeVideo(){
      if(this.chName == ""){
        return this.place;
      }else{
        return this.chName + "-ID:" + this.place;
      }
    }
  },
  watch: {
    projectlist: function() {
      this.getCourseInfo();
    }
  },
  methods: {
    ...mapActions(["getProjectSubjectList"]),
    //是否启用介绍信
    changeLetterType(value) {
      // console.log(value);
      if (value == 1) {
        this.ruleForm.welcome_letter = this.templateContent;
      } else if (value == 2) {
        this.ruleForm.welcome_letter = this.userDefinedContent;
      }
    },
    // 新学员介绍视频radio切换。
    changeNewMember(value) {
      // console.log(value);
      if (value == 1) {
        this.isTrue = false;
        this.isBox = false;
      }
      if (value == 2) {
        this.isTrue = true;
        this.isIcon = true;
      }
    },
    handleRow(row) {
      // console.log(row);
      this.place = row.id;
      this.chName = row.title;
      this.isBox = false;
      this.isIcon = true;
    },
    // 添加分页控件函数
    async handleIconClick() {
      // console.log("search");
      if (this.pagination.current_page != 1) {
        this.pagination.current_page = 1;
      } else {
        this.searchResource();
      }
    },
    async handleCurrentChange(val) {
      val = Number(val);
      this.searchResource(val);
    },
    // 判断是否显示弹出框
    isShowBox() {
      this.isBox = !this.isBox;
      this.isIcon = !this.isIcon;
      if (this.isBox == true) {
        this.searchResource(1);
      }
    },

    // 搜索框函数
    searchResource(val) {
      clearTimeout(this.searchResourceTimer);
      this.resLoading = true;
      this.searchResourceTimer = setTimeout(async () => {
        clearTimeout(this.searchResourceTimer);
        let params = {
          discriminator: this.resourceType,
          page_size: 50,
          page: val ? val : 1,
          "order_by[]": "desc", //顺序   倒序
          "order_by_field[]": "id", //排序字段
          project_id: this.project_id
          // subject_id: this.subject_id,
        };
        let resourceinput = this.resourceinput.trim();
        switch (this.resourceType) {
          case "legacy_live":
            if (isNumber(resourceinput)) {
              params.legacy_live_id = resourceinput;
            } else {
              params.keywords = resourceinput;
            }
            break;
          case "paper":
            if (isNumber(resourceinput)) {
              params.paper_id = resourceinput;
            } else {
              params.keywords = resourceinput;
            }
            break;
          default:
            params.keywords = resourceinput;
            break;
        }
        let ret = await this.$http.getResource(params);
        if (ret.status == 0) {
          // console.log(ret);
          this.resLoading = false;
          this.resourceTable = ret.result.resources;
          this.pagination.total = ret.result.pagination.total;
        }
      }, 500);
    },

    //介绍信改变时
    changeWelcomeLetter(value) {
      this.userDefinedContent = value;
    },
    visibleChange(bool) {
      //选择器开关函数
      this.selectfalg = bool;
    },
    //下拉框选取项目后切换科目
    changeProject(val) {
      // console.log(val, "下拉框选取项目后切换科目");
      for (var obj in this.projectlist) {
        if (this.projectlist[obj].project_id == val) {
          let subject_list = [...this.projectlist[obj].subject_list];
          this.selectedlist = subject_list;
          if (this.selectfalg) {
            this.ruleForm.subject_id = "0";
          }
        }
      }
    },
    next(formName) {
      if( this.isTrue && this.ruleForm.course_type == 11&&this.place=="请选择视频"){
            this.$message({
                message: '请选择自定义视频',
                type: 'warning',
              });
              return false;
          }
      if (this.active >= this.progressText.length - 1) return;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.active++;
          this.progressText[this.active].isCustomerConfirm = true;
        } else {
          return false;
        }
      });
    },
    prev() {
      if (this.active <= 0) return;
      this.progressText[this.active].isCustomerConfirm = false;
      this.active--;
    },
    submitForm(formName) {
      // console.log(this.kForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.SetCourse();
        } else {
          return false;
        }
      });
    },
    async getCourseInfo() {
      let url = this.course_id;
      let ret = await this.$http.getCourseInfo(url);
      if (ret.status == 0) {
        // console.log("初始获取的值",ret.result);
        this.ruleForm.name = ret.result.course_name;
        this.ruleForm.project_id = ret.result.project_id;
        this.ruleForm.subject_id = ret.result.subject_id;
        this.changeProject(this.ruleForm.project_id); //匹配科目
        this.ruleForm.course_type = ret.result.course_type;
        this.ruleForm.welcome_letter = ret.result.welcome_letter; //欢迎信

        this.ruleForm.teacher_name = ret.result.teacher_name;
        this.ruleForm.welcome_letter_type = String(
          ret.result.welcome_letter_type
        ); //欢迎信类型
        this.templateContent = ret.result.welcome_letter_template; //通用模板
        this.userDefinedContent = ret.result.welcome_letter; //自定义内容
        if (ret.result.welcome_letter_type == 1) {
          //默认的通用模板
          this.userDefinedContent = "";
          this.ruleForm.welcome_letter = ret.result.welcome_letter_template; //默认的选1时，welcome_letter为空，将其设为通用模板
        }
        this.$store.dispatch("changeCover", ret.result); //封面图片

        this.ware_status_list = ret.result.ware_status_list; //制作状态
        this.kForm.ware_status = ret.result.ware_status;
        this.kForm.allow_question = ret.result.allow_question;
        //          this.kForm.allow_download = ret.result.allow_download;
        this.kForm.allow_plan = ret.result.allow_plan;
        //          this.kForm.allow_exam = ret.result.allow_exam;
        this.kForm.allow_investigate = ret.result.allow_investigate;
        this.kForm.investigate_url = ret.result.investigate_url;

        setTimeout(() => {
          // console.log('setTimeout',this.editor);
          // if(this.editor === undefined || this.editor === null){
          //   this.setEditor();
          //   ret.result.brief_introduction && this.editor && this.editor.setContent(ret.result.brief_introduction);
          // }else{
            ret.result.brief_introduction && this.editor && this.editor.setContent(ret.result.brief_introduction);
          // }
          //brief_introduction  富文本
        }, 500);

        // 添加判断EP2.0视频判断
        if(ret.result.course_type == "11" && ret.result.video_id == this.vid_id){
          this.isTrue = false;
        }else if(ret.result.course_type == "11" && ret.result.video_id != this.vid_id && ret.result.video_id != 0){
          this.isTrue = true;
          this.place = ret.result.video_id;
          this.index = "2";
          this.$http.searchResource(ret.result.video_id).then(res=>{
              // console.log(res);
              if(res.status == 0){
                this.chName = res.result.resource.title;
              }else{
                // console.log("自定义视频名称获取失败");
              }
            }).catch((err) => {
              // console.log('获取视频名失败',err);
            })
        }

      }
    },
    SetCourse() {
      if (this.kForm.allow_investigate == 0) {
        this.kForm.investigate_url = "";
      }
      if (this.ruleForm.welcome_letter_type == 0) {
        this.ruleForm.welcome_letter = "";
        this.ruleForm.teacher_name = "";
      }

      let url = this.course_id;
      let formData = {
        ...this.ruleForm,
        ...this.kForm,
        brief_introduction:
          this.editor.getContent() != `<p>${initial_info}</p>`
            ? this.editor.getContent()
            : "",
        "course_source_ids[]": this.$store.state.course.resource_intro_id,
        "course_update_ids[]": this.$store.state.course.course_update_ids,
        "course_update_titles[]": this.$store.state.course.course_update_titles,
        "course_update_contents[]": this.$store.state.course
          .course_update_contents,
        cover: this.$store.state.course.course_cover,
        // video_id:'123'
      };
      // 判断video_id的值
     if(this.ruleForm.course_type === '11' && this.isTrue){
       formData.video_id = this.place;
     }else if(this.ruleForm.course_type === '11' && !this.isTrue){
      formData.video_id = this.vid_id;
     }else{
       formData.video_id = "";
     }
      this.btnLoading = true;
      this.$http.SetCourse(url, formData).then(res => {
        this.btnLoading = false;
        // console.log("ooo",res);
        if (res.status == 0) {
          this.$message({
            type: "success",
            message: res.message ? res.message : "设置成功！"
          });
          this.active = 0;
          this.getCourseInfo();
          // setTimeout(() => {
          //   location.reload();
          // }, 1000);
        } else if (res.status == 2) {
          this.$message.error("设置失败！");
        }
      });
    },
    setEditor(){
        //富文本编辑器
        this.editor = UE.getEditor("ed", {
        //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
        toolbars: [["fullscreen", "undo", "redo", "|", "bold", "cleardoc"]],
        //focus时自动清空初始化时的内容
        autoClearinitialContent: true,
        //初始化编辑器的内容，
        initialContent: initial_info,
        //关闭字数统计
        wordCount: true,
        //允许的最大字符数
        maximumWords: 500,
        //关闭elementPath
        elementPathEnabled: false,
        //默认的编辑区域高度
        initialFrameHeight: 160
        //更多其他参数，请参考ueditor.config.js中的配置项
      });
    }
  },
  mounted() {
    //线上测试使用属性，可以建ep2课程
    let ep2 = localStorage.getItem('isInEP2') ? true :false;
    if (ep2){
      this.course_type =  course_type;
    }
    this.$nextTick(() => {
      setTimeout(() => {
        this.setEditor();
      },0)
    })
    //富文本编辑器
    // this.editor = UE.getEditor("ed", {
    //   //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
    //   toolbars: [["fullscreen", "undo", "redo", "|", "bold", "cleardoc"]],
    //   //focus时自动清空初始化时的内容
    //   autoClearinitialContent: true,
    //   //初始化编辑器的内容，
    //   initialContent: initial_info,
    //   //关闭字数统计
    //   wordCount: true,
    //   //允许的最大字符数
    //   maximumWords: 500,
    //   //关闭elementPath
    //   elementPathEnabled: false,
    //   //默认的编辑区域高度
    //   initialFrameHeight: 160
    //   //更多其他参数，请参考ueditor.config.js中的配置项
    // });
  },
  destroyed() {
    this.editor && this.editor.destroy();
  },
  created() {
    if (
      this.projectlist != undefined &&
      this.projectlist != null &&
      this.projectlist.length !== 0
    ) {
      this.getCourseInfo();
    } else {
      this.getProjectSubjectList();
    }

    let env = getEnv();
    // console.log("584",env);
    if( env == ''){ // 判断环境给初始视频id
      this.vid_id = '242241';
    }else{
      this.vid_id = '600616';
    }
  },
  filters:{
    changeVal: (val) => {
      if(val == "video"){
        return "视频";
      }
    }
  }
};
</script>
<style>
.messagebox {
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  border-radius: 3px;
}
.place {
  cursor: default;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #dcdfe6;
  color: #c0c4cc;
  border-radius: 3px;
  position: relative;
}
.ps{
  position: absolute;
  right: 10px;
  top:13px;
  /* color:#409EFF; */
}


.courseset {
  padding: 0 110px 0 0;
}

.courseset .progressBox {
  margin-top: 20px;
}

.courseset .formBox {
  margin-top: 30px;
}

.courseset .el-form-item__label {
  width: 150px !important;
}

.courseset .el-form-item__content {
  margin-left: 150px !important;
}

.courseset .formBox .pad_10 .el-form-item__label {
  padding-left: 10px;
}

.courseset .formBox .res_intro .resourceIntro .el-dialog--small {
  width: 40%;
}

.courseset .formBox .res_intro .resourceIntro .el-dialog--small .el-form-item {
  margin-bottom: 22px !important;
}

.courseset .formBox .res_intro .el-form-item__content .el-col.el-col-6 {
  margin-right: 10px;
  margin-bottom: 20px;
  height: 180px;
}

.courseset
  .formBox
  .res_intro
  .el-form-item__content
  .el-col.el-col-6
  .box-card {
  width: 100%;
  height: 100%;
}

.courseset
  .formBox
  .res_intro
  .el-form-item__content
  .el-col.el-col-6
  .box-card {
  position: relative;
}

.courseset
  .formBox
  .res_intro
  .el-form-item__content
  .el-col.el-col-6
  .box-card
  .el-card__header {
  padding: 10px 10px;
  font-size: 16px;
  color: #3a3e4a;
  font-weight: 600;
  border-bottom: none;
  line-height: 18px;
}

.courseset
  .formBox
  .res_intro
  .el-form-item__content
  .el-col.el-col-6
  .box-card
  .el-card__header
  .clearfix
  span {
  display: inline-block;
  width: 100%;
  word-wrap: break-word;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.courseset
  .formBox
  .res_intro
  .el-form-item__content
  .el-col.el-col-6
  .box-card
  .el-card__body
  .box-card-bottom {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  text-align: right;
  padding-right: 20px;
  box-sizing: border-box;
}

.courseset
  .formBox
  .res_intro
  .el-form-item__content
  .el-col.el-col-6
  .box-card
  .el-card__body {
  padding: 0 10px 10px 10px;
}

.courseset
  .formBox
  .res_intro
  .el-form-item__content
  .el-col.el-col-6
  .box-card
  .el-card__body
  .introItem {
  font-size: 14px;
  line-height: 24px;
  color: #3a3e4a;
  overflow-y: auto;
  height: 110px;
}

.courseset
  .formBox
  .res_intro
  .el-form-item__content
  .el-col.el-col-6
  .add-card
  .el-card__body {
  text-align: center;
  cursor: pointer;
  line-height: 120px;
  vertical-align: top;
}

.courseset
  .formBox
  .res_intro
  .el-form-item__content
  .el-col.el-col-6
  .add-card
  .el-card__body
  .el-icon-plus {
  font-size: 28px;
  color: #8c939d;
}

.courseset
  .formBox
  .res_intro
  .el-form-item__content
  .el-col.el-col-6
  .add-card
  .el-card__body
  p {
  line-height: 20px;
  font-size: 16px;
  color: #f09963;
}

.courseset .order-progress-bar {
  font-size: 12px;
  color: #8d98a9;
  text-align: center;
}

.courseset .order-progress-bar .progress-bar-dot {
  display: inline-block;
  position: relative;
  z-index: 10;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #bfc5cc;
  -webkit-box-shadow: inset 0 0 0 3px #dee5ed;
  -moz-box-shadow: inset 0 0 0 3px #dee5ed;
  box-shadow: inset 0 0 0 3px #dee5ed;
}

.courseset .order-progress-bar .progress-bar-line {
  position: relative;
  top: 8px;
  z-index: 9;
  display: block;
  border-top: 1px solid #e6ebf1;
}

.courseset .order-progress-bar .bar-line-current {
  border-top: 1px solid #f7cbb1;
}

.courseset .order-progress-bar .bar-dot-current {
  background: #f09862;
  -webkit-box-shadow: inset 0 0 0 3px #f7cbb0;
  -moz-box-shadow: inset 0 0 0 3px #f7cbb0;
  box-shadow: inset 0 0 0 3px #f7cbb0;
}

.courseset .order-progress-bar span {
  display: block;
}

.courseset .order-progress-bar .current-text {
  color: #f09862;
}
</style>
