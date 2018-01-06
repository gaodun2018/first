<template>
  <div class="module-edu-content courseset">
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
        <el-form :model="ruleForm" label-position="left" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
          <el-form-item label="课程名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="所属项目" prop="project_id">
            <el-select v-model="ruleForm.project_id" placeholder="请选择所属项目" @change="changeProject" @visible-change="visibleChange">
              <el-option :label="item.project_name" :value="item.project_id" v-for="(item,index) in projectlist" :key="item.project_id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所属科目" prop="subject_id">
            <el-select v-model="ruleForm.subject_id" placeholder="请选择所属科目">
              <el-option :label="item.subject_name" :value="item.subject_id" v-for="(item,index) in selectedlist" :key="item.subject_id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="网课类型" prop="course_type">
            <el-select v-model="ruleForm.course_type" placeholder="请选择网课类型">
              <el-option :label="item.name" :value="item.course_type_id" v-for="item in course_type" :key="item.course_type_id"></el-option>
            </el-select>
          </el-form-item>

         <!-- <el-form-item label="课程封面" class="pad_10">
            <ImgUpload :coverImageUrl="coverImageUrl"></ImgUpload>
          </el-form-item>-->

          <el-form-item label="课程简介" class="pad_10">
            <div id="ed" type="text/plain"></div>
          </el-form-item>
          <el-form-item label="资源介绍"  class="res_intro pad_10">
            <ResourceIntro></ResourceIntro>
          </el-form-item>
          <el-form-item label="给新学员的欢迎信" class="pad_10">
            <el-radio-group v-model="ruleForm.welcome_letter_type" @change="changeLetterType">
              <el-radio label="1">通用模板内容</el-radio>
              <el-radio label="2">自定义内容</el-radio>
              <el-radio label="0">不启用欢迎信</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="ruleForm.welcome_letter_type==0?false:true" prop="welcome_letter">
            <el-row>
              <el-col :span="24">
                <el-input v-model="ruleForm.welcome_letter" type="textarea" @change="changeWelcomeLetter" :autosize="{ minRows: 4}" :disabled="ruleForm.welcome_letter_type==1?true:false" class="coursetxt" auto-complete="off" placeholder="请输入欢迎信的正文内容（字数请控制在100-200字内）"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item v-if="ruleForm.welcome_letter_type==0?false:true" prop="teacher_name">
            <el-row>
              <el-col :span="6">
                <el-input v-model="ruleForm.teacher_name" class="coursetxt" auto-complete="off" placeholder="请输入老师名字"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item class="last-form-item">
            <el-button style="margin-top: 12px;" @click="next('ruleForm')">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="active == 1">
        <el-form :model="kForm" label-position="left" :rules="kFormRules" ref="kForm" label-width="100px" class="kForm">
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
          <el-form-item label="问卷地址" prop="investigate_url" v-if="kForm.allow_investigate=='1'?true:false">
            <el-input v-model="kForm.investigate_url"></el-input>
          </el-form-item>
          <el-form-item class="last-form-item">
            <el-button style="margin-top: 12px;" @click="prev">上一步</el-button>
            <el-button type="primary" @click="submitForm('kForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import {getCourseInfo,getProjectSubject} from '../../api/course'
  import {SetCourse,AddSourceIntro} from '../../api/fromAxios'
  import ImgUpload from './courseset/CourseModelUpload.vue'
  import ResourceIntro from './courseset/CourseModelResourceIntro.vue'
  export default {
    components: {
      ImgUpload,ResourceIntro
    },
    data() {
      var validname= (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入课程名称'));
        }else if(/^\s+$/g.test(value)){
          return callback(new Error('输入的课程名称不能为空格'));
        }else{
          return callback();
        }
      };
      var validwelcome = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入欢迎信内容'));
        }else if(/^\s+$/g.test(value)){
          return callback(new Error('欢迎信内容不能为空格'));
        }else{
          return callback();
        }
      };
      var validurl = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入完成URL地址'));
        }else if(/^\s+$/g.test(value)){
          return callback(new Error('URL地址不能为空格'));
        }else{
          return callback();
        }
      };
      return {
        editor:null,
        selectfalg: false,     //选择器搜索开关
        projectlist: [],    //项目列表
        selectedlist:[],   //科目列表
        ware_status_list:[],    //内容制作状态
        course_type:[
          {
            course_type_id:'0',
            name:'普通网课',
          },{
            course_type_id:'1',
            name:'任务制网课（选择考试时间）',
          },{
            course_type_id:'2',
            name:'任务制网课（选择自主学习时间）',
          },{
            course_type_id:'3',
            name:'自适应学习网课-EP',
          },{
            course_type_id:'4',
            name:'私播课-Glive+',
          }
        ],   //网课类型
        active: 0,
        progressText: [
          {
            text: '基本设置',
            currentLine: 'bar-line-current',
            currentDot: 'bar-dot-current',
            currentText: 'current-text',
            isCustomerConfirm: true
          }, {
            text: '功能模块',
            currentLine: 'bar-line-current',
            currentDot: 'bar-dot-current',
            currentText: 'current-text',
            isCustomerConfirm: false
          }
        ],
        rules: {
          name: [
            { required:true,validator: validname, trigger: 'blur' },
          ],
          project_id: [
            {required: true, message: '请选择所属项目', trigger: 'change'}
          ],
          subject_id: [
            {required: true, message: '请选择所属科目', trigger: 'change'}
          ],
          course_type: [
            {required: true, message: '请选择网课类型', trigger: 'change'}
          ],
          welcome_letter:[
            { required:true,validator: validwelcome, trigger: 'blur' },
          ]
        },
        kFormRules:{
          investigate_url: [
            { required:true,validator: validurl, trigger: 'blur' },
          ],
        },
        ruleForm: {
          name: '',
          project_id: '',
          subject_id: '',
          course_type: '',
          welcome_letter_type:'1',
          welcome_letter:'',
          teacher_name:'',
        },
        coverImageUrl:'',//封面图片
        templateContent:'',//通用模块介绍
        userDefinedContent:'',//自定义模块介绍
        kForm:{
          ware_status:'',
          allow_question:'0',
//          allow_download:'0',
          allow_plan:'0',
//          allow_exam:'0',
          allow_investigate:'0',
          investigate_url:''
        },
      }
    },
    computed:{
      course_id(){
        return this.$route.params.cid;
      },
    },
    methods: {
      //是否启用介绍信
      changeLetterType(value){
        console.log(value);
        if(value == 1){
          this.ruleForm.welcome_letter = this.templateContent;
        }else if(value == 2){
          this.ruleForm.welcome_letter = this.userDefinedContent;
        }
      },
      //介绍信改变时
      changeWelcomeLetter(value){
        this.userDefinedContent = value;
      },
      visibleChange(bool){  //选择器开关函数
        this.selectfalg = bool
      },
      //下拉框选取项目后切换科目
      changeProject(val){
        for(var obj in this.projectlist){
          if(this.projectlist[obj].project_id == val){
            let subject_list = [...this.projectlist[obj].subject_list];
            subject_list.unshift({
              subject_id:'0',
              subject_name:'全部'
            })
            this.selectedlist = subject_list;
            if(this.selectfalg){
              this.ruleForm.subject_id = '0';
            }
          }
        }
      },
      next(formName) {
        if(this.active >= this.progressText.length -1)return;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.active++;
            this.progressText[this.active].isCustomerConfirm=true;
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      prev(){
        if(this.active<=0)return
        this.progressText[this.active].isCustomerConfirm=false;
        this.active--;
      },
      submitForm(formName){
        console.log(this.kForm);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.SetCourse();
          } else {
            return false;
          }
        });
      },
      async getCourseInfo(){
        let url = this.course_id;
        let ret = await getCourseInfo(url);
        if(ret.status == 0){

          this.ruleForm.name = ret.result.course_name;
          this.ruleForm.project_id= ret.result.project_id;
          this.ruleForm.subject_id= ret.result.subject_id;
          this.ruleForm.course_type= ret.result.course_type;
          this.ruleForm.welcome_letter= ret.result.welcome_letter;    //欢迎信

          this.ruleForm.teacher_name= ret.result.teacher_name;
          this.ruleForm.welcome_letter_type= ret.result.welcome_letter_type;   //欢迎信类型
          this.templateContent = ret.result.welcome_letter_template;  //通用模板
          this.userDefinedContent = ret.result.welcome_letter; //自定义内容
          if(ret.result.welcome_letter_type == 1){
            this.userDefinedContent  = '';
          }
          this.coverImageUrl= ret.result.cover;    //封面图片
          this.ware_status_list = ret.result.ware_status_list;   //制作状态
          this.kForm.ware_status = ret.result.ware_status;
          this.kForm.allow_question = ret.result.allow_question;
//          this.kForm.allow_download = ret.result.allow_download;
          this.kForm.allow_plan = ret.result.allow_plan;
//          this.kForm.allow_exam = ret.result.allow_exam;
          this.kForm.allow_investigate = ret.result.allow_investigate;
          this.kForm.investigate_url = ret.result.investigate_url;
          setTimeout(()=>{
            this.editor.setContent(ret.result.brief_introduction?ret.result.brief_introduction:'');
            //brief_introduction  富文本
          },500)
        }
        console.log(ret);
      },
      async getProjectSubject(){
        let ret = await getProjectSubject();
        this.projectlist = ret.result;
        this.getCourseInfo();
      },
      SetCourse(){
        if(this.kForm.allow_investigate == 0){
          this.kForm.investigate_url = "";
        }
        if(this.ruleForm.welcome_letter_type == 0){
          this.ruleForm.welcome_letter = "";
          this.ruleForm.teacher_name = "";
        }
        let url = this.course_id;
        let fromData = {...this.ruleForm,...this.kForm,brief_introduction:this.editor.getContent()};
        SetCourse(url,fromData).then((res)=>{
          console.log(res);
          if(res.status == 0){
            this.$message({
              type: 'success',
              message: res.message
            })
            setTimeout(()=>{
              location.reload();
            },1000)
          }else if(res.status == 2){
            this.$message.error('设置失败');
          }
        })
      }
    },
    mounted() {
      //富文本编辑器
      this.editor = UE.getEditor('ed',{
        //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
        toolbars: [[
          'fullscreen', 'source', '|', 'undo', 'redo', '|',
          'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript','forecolor',   'cleardoc',
          'lineheight','customstyle', 'paragraph', 'fontfamily', 'fontsize', '|','indent','justifyleft', 'justifycenter']],
        //focus时自动清空初始化时的内容
        autoClearinitialContent:true,
        //关闭字数统计
        wordCount:false,
        //关闭elementPath
        elementPathEnabled:false,
        //默认的编辑区域高度
        initialFrameHeight:160
        //更多其他参数，请参考ueditor.config.js中的配置项
      })

    },
    destroyed() {
      this.editor.destroy();
    },
    created() {
      this.getProjectSubject();
    }
  }
</script>
<style>
  .courseset{
    padding: 0 110px 0 0;
  }
  .courseset .progressBox{
    margin-top: 20px;
  }
  .courseset .formBox{
    margin-top: 30px;
  }
  .courseset .el-form-item__label{
    width: 150px !important;
  }
  .courseset .el-form-item__content{
    margin-left: 150px !important;
  }
  .courseset .formBox .pad_10 .el-form-item__label{
    padding-left: 10px;
  }
  .courseset .formBox .res_intro .resourceIntro .el-dialog--small{
    width:40%;
  }
  .courseset .formBox .res_intro .resourceIntro .el-dialog--small .el-form-item{
    margin-bottom: 22px!important;
  }
  .courseset .formBox .res_intro .el-form-item__content .el-col.el-col-6{
    margin-right: 10px;
    margin-bottom: 20px;
    height: 180px;
  }
  .courseset .formBox .res_intro .el-form-item__content .el-col.el-col-6 .box-card{
    width: 100%;
    height: 100%;
  }
  .courseset .formBox .res_intro .el-form-item__content .el-col.el-col-6 .box-card{
    position: relative;
  }
  .courseset .formBox .res_intro .el-form-item__content .el-col.el-col-6 .box-card .el-card__header{
    padding: 10px 10px;
    font-size: 16px;
    color:#3A3E4A;
    font-weight: 600;
    border-bottom: none;
    line-height: 18px;
  }
  .courseset .formBox .res_intro .el-form-item__content .el-col.el-col-6 .box-card .el-card__header  .clearfix span{
    display: inline-block;
    width: 100%;
    word-wrap:break-word ;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .courseset .formBox .res_intro .el-form-item__content .el-col.el-col-6 .box-card .el-card__body .box-card-bottom{
    position: absolute;
    right: 0;
    bottom:0;
    width: 100%;
    text-align: right;
    padding-right: 20px;
    box-sizing: border-box;
  }
  .courseset .formBox .res_intro .el-form-item__content .el-col.el-col-6 .box-card .el-card__body{
    padding: 0 10px 10px 10px;
  }
  .courseset .formBox .res_intro .el-form-item__content .el-col.el-col-6 .box-card .el-card__body .introItem{
    font-size: 14px;
    line-height: 24px;
    color:#3A3E4A;
    overflow-y: auto;
    height: 110px;
  }

  .courseset .formBox .res_intro .el-form-item__content .el-col.el-col-6 .add-card .el-card__body{
    text-align: center;
    cursor: pointer;
    line-height: 120px;
    vertical-align: top;
  }
  .courseset .formBox .res_intro .el-form-item__content .el-col.el-col-6 .add-card .el-card__body .el-icon-plus{
    font-size: 28px;
    color: #8c939d;
  }
  .courseset .formBox .res_intro .el-form-item__content .el-col.el-col-6 .add-card .el-card__body p{
    line-height: 20px;
    font-size: 16px;
    color:#F09963;
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